import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'Zynovexa',
      architecture: '100% Client-Side Browser Utilities',
      totalTools: 78
    });
  });

  // Sitemap.xml endpoint (dynamic & SEO ready)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
      let xml = fs.readFileSync(sitemapPath, 'utf8');

      const host = req.get('host');
      const protocol = req.protocol === 'http' ? 'http' : 'https';

      // If requested from a Cloud Run or preview domain, adapt domain to prevent GSC cross-domain error
      if (host && !host.includes('localhost') && !host.includes('zynovexa.com')) {
        xml = xml.replace(/https:\/\/zynovexa\.com/g, `${protocol}://${host}`);
      }

      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(xml);
    } catch (e) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
    }
  });

  // Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    try {
      const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
      let text = fs.readFileSync(robotsPath, 'utf8');

      const host = req.get('host');
      const protocol = req.protocol === 'http' ? 'http' : 'https';

      if (host && !host.includes('localhost') && !host.includes('zynovexa.com')) {
        text = text.replace(/https:\/\/zynovexa\.com/g, `${protocol}://${host}`);
      }

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(text);
    } catch (e) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.sendFile(path.resolve(__dirname, 'public', 'robots.txt'));
    }
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
