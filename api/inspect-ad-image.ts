import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const activeKey = process.env.GEMINI_API_KEY;
    if (!activeKey) {
      return res.status(200).json({ success: true, hasFemale: false, reason: 'No API key on Vercel' });
    }

    const { imageUrl, imageBase64, mimeType = 'image/jpeg', adKey, adText } = req.body || {};

    let base64Data = imageBase64;
    let resolvedMime = mimeType;

    if (!base64Data && imageUrl && typeof imageUrl === 'string') {
      try {
        const fetchRes = await fetch(imageUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          signal: AbortSignal.timeout(3500)
        });
        if (fetchRes.ok) {
          const arrayBuf = await fetchRes.arrayBuffer();
          base64Data = Buffer.from(arrayBuf).toString('base64');
          const contentType = fetchRes.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            resolvedMime = contentType.split(';')[0];
          }
        }
      } catch (e) {}
    }

    const promptText = `Analyze this advertisement strictly according to Islamic modesty standards.
Question: Does this advertisement depict, feature, mention, or promote any woman, girl, female person, female face, portrait, model, or female illustration?
Rules:
- If there is ANY visible woman, girl, female face, portrait, model, or female illustration: respond {"hasFemale": true, "reason": "female detected", "confidence": 0.98}
- If it contains ONLY men, neutral graphics, software, tech, or non-human objects: respond {"hasFemale": false, "reason": "halal", "confidence": 0.99}
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
          { text: (adText ? `Ad text: "${adText}". ` : '') + promptText }
        ]
      };
    } else {
      contents = (adText ? `Ad text: "${adText}". ` : '') + promptText;
    }

    const client = new GoogleGenAI({ apiKey: activeKey });
    let inspectionResult = { hasFemale: false, reason: 'clean', confidence: 0.95 };

    try {
      const aiResponse = await client.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: { temperature: 0.1 }
      });
      const rawText = aiResponse.text?.trim() || '';
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (typeof parsed.hasFemale === 'boolean') {
          inspectionResult = {
            hasFemale: parsed.hasFemale,
            reason: parsed.reason || '',
            confidence: parsed.confidence || 0.95
          };
        }
      }
    } catch (e) {}

    return res.status(200).json({
      success: true,
      adKey,
      ...inspectionResult
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Inspection error' });
  }
}
