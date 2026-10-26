export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  return res.status(200).json({
    status: hasApiKey ? 'online' : 'unconfigured',
    hasApiKey,
    platform: 'vercel-serverless',
    model: 'gemini-3.1-flash-lite / gemini-3.8-flash'
  });
}
