export default function handler(req: any, res: any) {
  const rawHost = req.headers['x-forwarded-host'] || req.headers['host'] || 'zynovexa.vercel.app';
  const host = (Array.isArray(rawHost) ? rawHost[0] : String(rawHost)).split(',')[0].trim();

  const rawProto = req.headers['x-forwarded-proto'] || 'https';
  const proto = (Array.isArray(rawProto) ? rawProto[0] : String(rawProto)).split(',')[0].trim();

  const origin = `${proto}://${host}`;

  const robots = `# Zynovexa Robots.txt
# Optimized for Google Search Console & All Major Search Engines

User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

# Canonical XML Sitemap
Sitemap: ${origin}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  return res.status(200).send(robots);
}
