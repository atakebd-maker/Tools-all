import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '10mb' }));

  // Setup Gemini AI client if key is available
  // GoogleGenAI automatically checks GEMINI_API_KEY if not passed or passed explicitly
  const apiKey = process.env.GEMINI_API_KEY || '';
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      model: 'gemini-3.8-flash'
    });
  });

  // Server-side Gemini API route
  app.post('/api/gemini', async (req, res) => {
    try {
      const activeKey = process.env.GEMINI_API_KEY;
      if (!activeKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in the environment or secrets configuration.'
        });
      }

      const client = ai || new GoogleGenAI({ apiKey: activeKey });
      const { prompt, systemInstruction, temperature = 0.7 } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Valid prompt string is required.' });
      }

      // Safety limit on input length (up to 32,000 characters)
      if (prompt.length > 32000) {
        return res.status(400).json({ error: 'Prompt exceeds maximum allowed length (32,000 characters).' });
      }

      // gemini-3.1-flash-lite is the fastest, high-availability model (sub-second latency)
      const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let outputText = '';
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          const response = await client.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction: systemInstruction || 'You are an expert AI assistant that provides accurate, direct, well-structured output without unnecessary filler.',
              temperature: typeof temperature === 'number' ? Math.max(0, Math.min(1, temperature)) : 0.7,
            }
          });
          outputText = response.text || '';
          if (outputText) {
            lastError = null;
            break;
          }
        } catch (mErr: any) {
          lastError = mErr;
          console.warn(`Model ${modelName} failed or unavailable, trying fallback...`, mErr.message);
          // If error is invalid API key or 400 bad request, don't retry other models
          if (mErr.status === 401 || mErr.status === 400) {
            throw mErr;
          }
        }
      }

      if (lastError && !outputText) {
        throw lastError;
      }

      return res.json({ result: outputText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);

      const status = error.status || 500;
      let message = 'An error occurred while generating AI content. Please try again.';

      if (error.message?.includes('API_KEY_INVALID') || error.status === 401) {
        message = 'Invalid Gemini API key. Please check your GEMINI_API_KEY configuration.';
      } else if (error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429) {
        message = 'Rate limit or quota exceeded. Please wait a moment before trying again.';
      } else if (error.message) {
        message = error.message;
      }

      return res.status(status).json({ error: message });
    }
  });

  // AI Ad Image & Content Inspector endpoint: Uses Gemini to detect female imagery in ads
  app.post('/api/inspect-ad-image', async (req, res) => {
    try {
      const activeKey = process.env.GEMINI_API_KEY;
      if (!activeKey) {
        return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on server.' });
      }

      const client = ai || new GoogleGenAI({
        apiKey: activeKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const { imageUrl, imageBase64, mimeType = 'image/jpeg', adKey, adText } = req.body;

      let base64Data = imageBase64;
      let resolvedMime = mimeType;

      if (!base64Data && imageUrl && typeof imageUrl === 'string') {
        try {
          const fetchRes = await fetch(imageUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            signal: AbortSignal.timeout(4000)
          });
          if (fetchRes.ok) {
            const arrayBuf = await fetchRes.arrayBuffer();
            base64Data = Buffer.from(arrayBuf).toString('base64');
            const contentType = fetchRes.headers.get('content-type');
            if (contentType && contentType.startsWith('image/')) {
              resolvedMime = contentType.split(';')[0];
            }
          }
        } catch (fetchErr: any) {
          console.warn('Could not fetch image URL:', fetchErr.message);
        }
      }

      const promptText = `Analyze this advertisement strictly according to Islamic modesty standards.
Question: Does this advertisement (image, text, or title) depict, feature, mention, or promote any woman, girl, female person, female face, portrait, model, or female illustration?
Rules:
- If there is ANY visible woman, girl, female face, female portrait/model, female illustration, or text promoting women/dating/girls: respond {"hasFemale": true, "reason": "female person, model, or female content detected", "confidence": 0.98}
- If it contains ONLY men, boys, neutral graphics, electronics, software, tech products, text, or non-human objects: respond {"hasFemale": false, "reason": "halal / no female person detected", "confidence": 0.99}
Output strictly valid JSON format only without markdown blocks.`;

      let contents: any;
      if (base64Data) {
        contents = {
          parts: [
            {
              inlineData: {
                mimeType: resolvedMime,
                data: base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '')
              }
            },
            {
              text: (adText ? `Ad text: "${adText}". ` : '') + promptText
            }
          ]
        };
      } else {
        contents = (adText ? `Ad text: "${adText}". ` : '') + promptText;
      }

      const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let inspectionResult = { hasFemale: false, reason: 'No female detected', confidence: 0.9 };

      for (const model of modelsToTry) {
        try {
          const aiResponse = await client.models.generateContent({
            model,
            contents,
            config: {
              temperature: 0.1,
            }
          });

          const rawText = aiResponse.text?.trim() || '';
          const match = rawText.match(/\{[\s\S]*\}/);
          if (match) {
            const parsed = JSON.parse(match[0]);
            if (typeof parsed.hasFemale === 'boolean') {
              inspectionResult = {
                hasFemale: parsed.hasFemale,
                reason: parsed.reason || (parsed.hasFemale ? 'Female detected by Gemini AI' : 'Halal / No female detected'),
                confidence: parsed.confidence || 0.95
              };
              break;
            }
          }
        } catch (visionErr: any) {
          console.warn(`Vision model ${model} failed:`, visionErr.message);
        }
      }

      return res.json({
        success: true,
        adKey,
        ...inspectionResult
      });
    } catch (error: any) {
      console.error('Error in /api/inspect-ad-image:', error);
      return res.status(500).json({ error: error.message || 'Inspection failed' });
    }
  });

  // Sitemap.xml endpoint (dynamic & SEO ready)
  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
  });

  // Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.resolve(__dirname, 'public', 'robots.txt'));
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zynovexa server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
