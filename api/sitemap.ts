import { generateSitemapXml } from '../src/data/sitemapData';

export default function handler(req: any, res: any) {
  try {
    const rawHost = req.headers['x-forwarded-host'] || req.headers['host'] || 'zynovexa.vercel.app';
    const host = (Array.isArray(rawHost) ? rawHost[0] : String(rawHost)).split(',')[0].trim();

    const rawProto = req.headers['x-forwarded-proto'];
    const proto = rawProto ? (Array.isArray(rawProto) ? rawProto[0] : String(rawProto)).split(',')[0].trim() : (host.includes('localhost') ? 'http' : 'https');

    const origin = `${proto}://${host}`;
    const xml = generateSitemapXml(origin);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200');
    return res.status(200).send(xml);
  } catch (error: any) {
    return res.status(500).send('Error generating sitemap');
  }
}
