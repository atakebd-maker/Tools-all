import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Enable CORS if accessed from different origin
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Only POST is supported.' });
  }

  try {
    const activeKey = process.env.GEMINI_API_KEY;
    if (!activeKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on Vercel. Please add GEMINI_API_KEY to your Vercel Project Environment Variables (Settings > Environment Variables).'
      });
    }

    const { prompt, systemInstruction, temperature = 0.7 } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt string is required.' });
    }

    if (prompt.length > 32000) {
      return res.status(400).json({ error: 'Prompt exceeds maximum allowed length (32,000 characters).' });
    }

    const client = new GoogleGenAI({
      apiKey: activeKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let outputText = '';
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await client.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction:
              systemInstruction ||
              'You are an expert AI assistant that provides accurate, direct, well-structured output without unnecessary filler.',
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
        console.warn(`Model ${modelName} failed on Vercel:`, mErr.message);
        if (mErr.status === 401 || mErr.status === 400) {
          throw mErr;
        }
      }
    }

    if (lastError && !outputText) {
      throw lastError;
    }

    return res.status(200).json({ result: outputText });
  } catch (error: any) {
    console.error('Vercel Gemini API Error:', error);

    const status = error.status || 500;
    let message = 'An error occurred while generating AI content. Please try again.';

    if (error.message?.includes('API_KEY_INVALID') || error.status === 401) {
      message = 'Invalid Gemini API key. Please verify GEMINI_API_KEY in your Vercel Project Settings.';
    } else if (error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429) {
      message = 'Rate limit or quota exceeded. Please wait a moment before trying again.';
    } else if (error.message) {
      message = error.message;
    }

    return res.status(status).json({ error: message });
  }
}
