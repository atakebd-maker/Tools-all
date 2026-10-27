import { CATEGORIES } from './categories';
import { TOOLS } from './tools';

export const STATIC_ROUTES = [
  '',
  '/all-tools',
  '/about',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/contact'
];

export function generateSitemapXml(origin: string = 'https://zynovexa.com'): string {
  // Normalize origin without trailing slash
  const cleanOrigin = origin.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages (homepage root MUST have a trailing slash: e.g. https://zynovexa.com/)
  for (const route of STATIC_ROUTES) {
    const loc = route === '' ? `${cleanOrigin}/` : `${cleanOrigin}${route}`;
    const priority = route === '' ? '1.0' : '0.8';
    const changefreq = route === '' ? 'daily' : 'weekly';
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // Category pages
  for (const cat of CATEGORIES) {
    xml += '  <url>\n';
    xml += `    <loc>${cleanOrigin}/categories/${cat.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }

  // Tool pages
  for (const tool of TOOLS) {
    xml += '  <url>\n';
    xml += `    <loc>${cleanOrigin}/tools/${tool.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${tool.popular ? '0.9' : '0.7'}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}
