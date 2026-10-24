import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { copyToClipboard, downloadText } from '../../utils/formatting';

export const SitemapGenerator: React.FC = () => {
  const [urlsInput, setUrlsInput] = useState<string>(
    'https://tstoolshub.com\nhttps://tstoolshub.com/all-tools\nhttps://tstoolshub.com/categories/image-tools\nhttps://tstoolshub.com/tools/image-resizer\nhttps://tstoolshub.com/about'
  );
  const [changefreq, setChangefreq] = useState<string>('weekly');
  const [priority, setPriority] = useState<string>('0.8');
  const [copied, setCopied] = useState<boolean>(false);

  const generateSitemap = (): string => {
    const urls = urlsInput.split('\n').map((u) => u.trim()).filter((u) => u.startsWith('http'));
    const today = new Date().toISOString().split('T')[0];

    const xmlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ];

    urls.forEach((url) => {
      xmlLines.push('  <url>');
      xmlLines.push(`    <loc>${url}</loc>`);
      xmlLines.push(`    <lastmod>${today}</lastmod>`);
      xmlLines.push(`    <changefreq>${changefreq}</changefreq>`);
      xmlLines.push(`    <priority>${priority}</priority>`);
      xmlLines.push('  </url>');
    });

    xmlLines.push('</urlset>');
    return xmlLines.join('\n');
  };

  const xmlOutput = generateSitemap();

  const handleCopy = async () => {
    await copyToClipboard(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadText(xmlOutput, 'sitemap.xml', 'application/xml');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Website URLs (One per line)
          </label>
          <textarea
            rows={5}
            value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            placeholder="https://example.com/page-1&#10;https://example.com/page-2"
            className="w-full p-3 font-mono text-xs border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Change Frequency
            </label>
            <select
              value={changefreq}
              onChange={(e) => setChangefreq(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 bg-white"
            >
              <option value="always">always</option>
              <option value="hourly">hourly</option>
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
              <option value="never">never</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Default Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 bg-white"
            >
              <option value="1.0">1.0 (Highest - Homepage)</option>
              <option value="0.8">0.8 (High - Main category / tools)</option>
              <option value="0.6">0.6 (Medium)</option>
              <option value="0.4">0.4 (Low)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Generated sitemap.xml
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download sitemap.xml
            </button>
          </div>
        </div>
        <textarea
          rows={10}
          readOnly
          value={xmlOutput}
          className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none"
        />
      </div>
    </div>
  );
};
