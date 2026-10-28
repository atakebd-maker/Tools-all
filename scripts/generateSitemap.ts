import fs from 'fs';
import path from 'path';
import { generateSitemapXml } from '../src/data/sitemapData';

const xml = generateSitemapXml('https://zynovexa.vercel.app');
const outPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log('Sitemap generated successfully at:', outPath, 'Length:', xml.length);
