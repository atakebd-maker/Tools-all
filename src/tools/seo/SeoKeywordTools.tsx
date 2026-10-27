import React, { useState } from 'react';
import {
  Globe,
  Copy,
  Check,
  Download,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  FileCode,
  FileSpreadsheet,
  Link,
  Layers,
  AlertCircle
} from 'lucide-react';

// ==========================================
// 24. SEO Keyword Slug Generator
// ==========================================
export const SeoKeywordSlugGenerator: React.FC = () => {
  const [input, setInput] = useState<string>('Free Online Tools 2026\nBest PDF Merger Without Sign Up\nImage Resizer & Compressor');
  const [separator, setSeparator] = useState<string>('-');
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [removeNumbers, setRemoveNumbers] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const cleanSlug = (text: string) => {
    let s = text.trim();
    if (lowercase) s = s.toLowerCase();
    if (removeNumbers) s = s.replace(/[0-9]/g, '');
    // remove special chars, normalize accents
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    s = s.replace(/[^a-zA-Z0-9\s_-]/g, '');
    s = s.replace(/[\s_-]+/g, separator);
    return s.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
  };

  const slugs = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(cleanSlug);

  const outputText = slugs.join('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            Keywords or Titles (one per line)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            placeholder="Enter phrases, blog post titles, or keyword ideas..."
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Slug Transformation Options
          </label>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Word Separator</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Hyphen (-)', val: '-' },
                { label: 'Underscore (_)', val: '_' },
                { label: 'Plus (+)', val: '+' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSeparator(opt.val)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                    separator === opt.val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs font-medium text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Convert all letters to lowercase</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeNumbers}
                onChange={(e) => setRemoveNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Remove numbers / digits from slug</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">
            Generated SEO Slugs ({slugs.length})
          </span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!outputText}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Slugs
          </button>
        </div>
        <textarea
          readOnly
          value={outputText}
          rows={5}
          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 25. URL Slug Generator
// ==========================================
export const UrlSlugGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('How to Optimize Images for Web Performance in 2026!');
  const [copied, setCopied] = useState<boolean>(false);

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">Page or Article Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title or headline..."
          className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium"
        />
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Clean URL-Safe Slug
        </span>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl font-mono text-base text-blue-700 break-all select-all font-semibold">
          {slug || 'your-url-slug'}
        </div>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(slug);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Slug'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 26. SEO Meta Tag Generator
// ==========================================
export const SeoMetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('Zynovexa - 100% Free Online Browser Tools');
  const [desc, setDesc] = useState<string>('Free online tools for image optimization, PDF editing, text manipulation, and developer utilities with complete client-side privacy.');
  const [url, setUrl] = useState<string>('https://zynovexa.com');
  const [author, setAuthor] = useState<string>('Zynovexa');
  const [ogImage, setOgImage] = useState<string>('https://zynovexa.com/og-banner.png');
  const [robots, setRobots] = useState<string>('index, follow');
  const [copied, setCopied] = useState<boolean>(false);

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">
<meta name="author" content="${author}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<meta property="twitter:image" content="${ogImage}">`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Meta Title ({title.length}/60 chars)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Meta Description ({desc.length}/160 chars)
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={2}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Social Image URL</label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Generated HTML Meta Tags</span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy HTML
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed select-all">
          {metaHtml}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 27. HTML Meta Description Generator
// ==========================================
export const MetaDescriptionGenerator: React.FC = () => {
  const [desc, setDesc] = useState<string>('Convert images, merge PDFs, format JSON, count words, and calculate equations for free with Zynovexa. 100% private in-browser utility suite.');
  const [copied, setCopied] = useState<boolean>(false);

  const length = desc.length;
  const isOptimal = length >= 120 && length <= 160;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-900">Meta Description Content</label>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isOptimal ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {length} / 160 chars {isOptimal ? '(Optimal)' : length < 120 ? '(Too Short)' : '(May Truncate)'}
          </span>
        </div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          placeholder="Write a concise, compelling 120-160 character description..."
          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm leading-relaxed"
        />
      </div>

      {/* Google SERP Live Simulation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Google Search Snippet Preview
        </span>
        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1">
          <div className="text-xs text-slate-600 font-mono">https://zynovexa.com › tools</div>
          <div className="text-base text-blue-700 hover:underline font-semibold cursor-pointer">
            Zynovexa - Free Online Tools Suite
          </div>
          <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {desc || 'Your meta description will appear here in search engine results.'}
          </div>
        </div>

        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(`<meta name="description" content="${desc}">`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-3"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied HTML Meta Tag!' : 'Copy <meta> Tag'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 28. Meta Keywords Tag Generator
// ==========================================
export const MetaKeywordsGenerator: React.FC = () => {
  const [input, setInput] = useState<string>('free online tools, pdf merger, image compressor, json formatter, word counter');
  const [copied, setCopied] = useState<boolean>(false);

  const keywords = Array.from(
    new Set(
      input
        .split(/[,\n]/)
        .map((k) => k.trim())
        .filter(Boolean)
    )
  );

  const tag = `<meta name="keywords" content="${keywords.join(', ')}">`;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">
          Keywords (comma or newline separated)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs">
        <AlertCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
        <span>
          <strong>SEO Best Practice:</strong> Modern search engines (including Google) do not use the meta keywords tag for web search rankings. However, internal site search engines and select regional directories still parse it.
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">
            Clean Deduplicated Tag ({keywords.length} items)
          </span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(tag);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Tag
          </button>
        </div>
        <textarea
          readOnly
          value={tag}
          rows={3}
          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs select-all"
        />
      </div>
    </div>
  );
};

// ==========================================
// 29. Robots.txt Generator
// ==========================================
export const RobotsTxtGenerator: React.FC = () => {
  const [sitemapUrl, setSitemapUrl] = useState<string>('https://zynovexa.com/sitemap.xml');
  const [allowAll, setAllowAll] = useState<boolean>(true);
  const [disallowAdmin, setDisallowAdmin] = useState<boolean>(true);
  const [disallowApi, setDisallowApi] = useState<boolean>(false);
  const [crawlDelay, setCrawlDelay] = useState<string>('None');
  const [copied, setCopied] = useState<boolean>(false);

  let output = `# Robots.txt generated by Zynovexa\nUser-agent: *\n`;
  if (allowAll) output += `Allow: /\n`;
  if (disallowAdmin) output += `Disallow: /admin/\nDisallow: /private/\n`;
  if (disallowApi) output += `Disallow: /api/\n`;
  if (crawlDelay !== 'None') output += `Crawl-delay: ${crawlDelay}\n`;
  if (sitemapUrl.trim()) output += `\nSitemap: ${sitemapUrl.trim()}\n`;

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Robots.txt Directives
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">XML Sitemap URL</label>
          <input
            type="url"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div className="space-y-2 pt-2 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allowAll}
              onChange={(e) => setAllowAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Allow All Bots by Default (Allow: /)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disallowAdmin}
              onChange={(e) => setDisallowAdmin(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Disallow /admin/ and /private/ directories</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disallowApi}
              onChange={(e) => setDisallowApi(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Disallow /api/ endpoints</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Crawl Delay (Seconds)</label>
          <select
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value="None">None (Default)</option>
            <option value="5">5 Seconds</option>
            <option value="10">10 Seconds</option>
            <option value="20">20 Seconds</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Preview: robots.txt</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={output}
          rows={9}
          className="w-full p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 30. XML Sitemap Generator
// ==========================================
export const XmlSitemapGenerator: React.FC = () => {
  const [urlsText, setUrlsText] = useState<string>('https://zynovexa.com/\nhttps://zynovexa.com/all-tools\nhttps://zynovexa.com/about\nhttps://zynovexa.com/contact');
  const [changefreq, setChangefreq] = useState<string>('weekly');
  const [priority, setPriority] = useState<string>('0.8');
  const [copied, setCopied] = useState<boolean>(false);

  const today = new Date().toISOString().split('T')[0];
  const urls = urlsText.split('\n').map((u) => u.trim()).filter(Boolean);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  urls.forEach((u) => {
    xml += `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;

  const handleDownload = () => {
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-900 mb-1">
            Website URLs (one per line)
          </label>
          <textarea
            value={urlsText}
            onChange={(e) => setUrlsText(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Change Frequency</label>
          <select
            value={changefreq}
            onChange={(e) => setChangefreq(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value="always">Always</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly (Standard)</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Default Priority (0.1 - 1.0)</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="1.0"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">
            Generated XML Sitemap ({urls.length} URLs)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(xml);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy XML
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={xml}
          rows={8}
          className="w-full p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 31. UTM Link Generator
// ==========================================
export const UtmLinkGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('https://zynovexa.com');
  const [source, setSource] = useState<string>('newsletter');
  const [medium, setMedium] = useState<string>('email');
  const [campaign, setCampaign] = useState<string>('spring_promo');
  const [term, setTerm] = useState<string>('online+tools');
  const [content, setContent] = useState<string>('cta_button');
  const [copied, setCopied] = useState<boolean>(false);

  const buildUtmUrl = () => {
    if (!url.trim()) return '';
    try {
      const u = new URL(url.trim().match(/^https?:\/\//i) ? url.trim() : `https://${url.trim()}`);
      if (source.trim()) u.searchParams.set('utm_source', source.trim());
      if (medium.trim()) u.searchParams.set('utm_medium', medium.trim());
      if (campaign.trim()) u.searchParams.set('utm_campaign', campaign.trim());
      if (term.trim()) u.searchParams.set('utm_term', term.trim());
      if (content.trim()) u.searchParams.set('utm_content', content.trim());
      return u.toString();
    } catch {
      return '';
    }
  };

  const finalUrl = buildUtmUrl();

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Destination Website URL *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/pricing"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Source (utm_source) *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. google, facebook, newsletter"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Medium (utm_medium) *</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="e.g. cpc, email, banner, social"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Name (utm_campaign) *</label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="e.g. summer_sale_2026"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Term (utm_term)</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. running+shoes (paid search keyword)"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <span className="text-sm font-bold text-slate-900">Final Trackable Campaign URL</span>
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-blue-700 break-all select-all font-medium">
          {finalUrl || 'Please provide a valid website URL.'}
        </div>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(finalUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          disabled={!finalUrl}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Campaign Link!' : 'Copy Trackable URL'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 32. SEO Title Generator
// ==========================================
export const SeoTitleGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('Online PDF Tools');
  const [brand, setBrand] = useState<string>('Zynovexa');
  const [copied, setCopied] = useState<string | null>(null);

  const variations = [
    `${topic} - 100% Free & Fast | ${brand}`,
    `Free ${topic} - No Sign In Required - ${brand}`,
    `Best ${topic} in 2026: Fast, Secure & Private - ${brand}`,
    `${topic} Online | Complete Free Browser Suite by ${brand}`,
    `All-in-One ${topic} (Free & Secure) - ${brand}`
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Primary Keyword</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-300 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-300 text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">
          SEO Title Variations (Click to Copy)
        </label>
        {variations.map((title, idx) => (
          <div
            key={idx}
            onClick={async () => {
              await navigator.clipboard.writeText(title);
              setCopied(title);
              setTimeout(() => setCopied(null), 2000);
            }}
            className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-center justify-between cursor-pointer transition-all shadow-2xs"
          >
            <div>
              <div className="font-semibold text-slate-900 text-sm">{title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{title.length} characters</div>
            </div>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
              {copied === title ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === title ? 'Copied!' : 'Copy'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 33. Keyword List Formatter
// ==========================================
export const KeywordListFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('free tools\npdf merger\nimage resizer\njson formatter');
  const [matchType, setMatchType] = useState<'broad' | 'phrase' | 'exact' | 'clean'>('phrase');
  const [copied, setCopied] = useState<boolean>(false);

  const keywords = input.split('\n').map((k) => k.trim()).filter(Boolean);

  const formatted = keywords.map((k) => {
    if (matchType === 'phrase') return `"${k}"`;
    if (matchType === 'exact') return `[${k}]`;
    if (matchType === 'broad') return `+${k.replace(/\s+/g, ' +')}`;
    return k;
  }).join('\n');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Original Keywords</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-900 mb-1">Select PPC / Search Match Type</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'phrase', label: 'Phrase Match ("keyword")' },
              { id: 'exact', label: 'Exact Match ([keyword])' },
              { id: 'broad', label: 'Broad Match Modifier (+keyword)' },
              { id: 'clean', label: 'Clean Plain Text' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMatchType(m.id as any)}
                className={`p-3 rounded-xl text-xs font-semibold border text-left cursor-pointer ${
                  matchType === m.id ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">Formatted Keywords</span>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(formatted);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={formatted}
              rows={4}
              className="w-full p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-xs select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 34. Keyword Deduplication Tool
// ==========================================
export const KeywordDeduplicationTool: React.FC = () => {
  const [input, setInput] = useState<string>('pdf tools\nimage tools\npdf tools\nIMAGE TOOLS\ntext tools\njson tools\ntext tools');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const rawLines = input.split('\n').map((l) => l.trim()).filter(Boolean);
  const seen = new Set<string>();
  const uniqueLines: string[] = [];

  rawLines.forEach((line) => {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueLines.push(line);
    }
  });

  const output = uniqueLines.join('\n');
  const removedCount = rawLines.length - uniqueLines.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">Original List ({rawLines.length} items)</label>
            <button type="button" onClick={() => setInput('')} className="text-xs text-slate-400 hover:text-red-600 cursor-pointer">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">
              Clean Deduplicated ({uniqueLines.length} items • {removedCount} removed)
            </label>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Output'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={7}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs select-all focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 35. Keyword Case Converter
// ==========================================
export const KeywordCaseConverter: React.FC = () => {
  const [input, setInput] = useState<string>('free online tools\npdf converter\nimage compressor');
  const [mode, setMode] = useState<'lower' | 'upper' | 'title' | 'sentence'>('title');
  const [copied, setCopied] = useState<boolean>(false);

  const convert = (str: string) => {
    if (mode === 'lower') return str.toLowerCase();
    if (mode === 'upper') return str.toUpperCase();
    if (mode === 'title') {
      return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    if (mode === 'sentence') {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str;
  };

  const output = input.split('\n').map(convert).join('\n');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'lower', label: 'lowercase' },
          { id: 'upper', label: 'UPPERCASE' },
          { id: 'title', label: 'Title Case' },
          { id: 'sentence', label: 'Sentence case' }
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setMode(btn.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              mode === btn.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="Enter keyword list..."
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
          />
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="absolute right-3 top-3 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 36. Keyword Separator Converter
// ==========================================
export const KeywordSeparatorConverter: React.FC = () => {
  const [input, setInput] = useState<string>('seo tools, pdf converter, image tools, json viewer');
  const [inputSep, setInputSep] = useState<string>('comma');
  const [outputSep, setOutputSep] = useState<string>('newline');
  const [copied, setCopied] = useState<boolean>(false);

  const getSplitRegex = (sep: string) => {
    if (sep === 'comma') return /[,]+/;
    if (sep === 'newline') return /[\r\n]+/;
    if (sep === 'semicolon') return /[;]+/;
    if (sep === 'pipe') return /[|]+/;
    return /[\s]+/;
  };

  const getJoinString = (sep: string) => {
    if (sep === 'comma') return ', ';
    if (sep === 'newline') return '\n';
    if (sep === 'semicolon') return '; ';
    if (sep === 'pipe') return ' | ';
    return ' ';
  };

  const items = input.split(getSplitRegex(inputSep)).map((s) => s.trim()).filter(Boolean);
  const result = items.join(getJoinString(outputSep));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Source Separator</label>
          <select
            value={inputSep}
            onChange={(e) => setInputSep(e.target.value)}
            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-medium"
          >
            <option value="comma">Commas (,)</option>
            <option value="newline">New Lines (\n)</option>
            <option value="semicolon">Semicolons (;)</option>
            <option value="pipe">Pipes (|)</option>
            <option value="space">Spaces</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Target Output Separator</label>
          <select
            value={outputSep}
            onChange={(e) => setOutputSep(e.target.value)}
            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-medium"
          >
            <option value="newline">New Lines (\n)</option>
            <option value="comma">Commas (,)</option>
            <option value="semicolon">Semicolons (;)</option>
            <option value="pipe">Pipes (|)</option>
            <option value="space">Spaces</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
        <div className="relative">
          <textarea
            readOnly
            value={result}
            rows={6}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
          />
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(result);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="absolute right-3 top-3 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 37. Keyword-to-CSV Generator
// ==========================================
export const KeywordToCsvGenerator: React.FC = () => {
  const [input, setInput] = useState<string>('free online tools\npdf compressor\nimage resizer\njson formatter');
  const [includeVolume, setIncludeVolume] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const keywords = input.split('\n').map((k) => k.trim()).filter(Boolean);

  let csv = includeVolume
    ? 'Keyword,Category,SearchVolumeEstimate\n' + keywords.map((k, i) => `"${k}","General Tools","${1000 + (i * 250)}"`).join('\n')
    : 'Keyword\n' + keywords.map((k) => `"${k}"`).join('\n');

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    a.download = `zynovexa-keywords-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Keywords List (one per line)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVolume}
                onChange={(e) => setIncludeVolume(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Include Category & Volume Template Headers</span>
            </label>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">CSV Output ({keywords.length} rows)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(csv);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" /> Download CSV
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={csv}
              rows={5}
              className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs select-all focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 38. Keyword-to-JSON Generator
// ==========================================
export const KeywordToJsonGenerator: React.FC = () => {
  const [input, setInput] = useState<string>('free online tools\npdf compressor\nimage resizer\njson formatter');
  const [copied, setCopied] = useState<boolean>(false);

  const keywords = input.split('\n').map((k) => k.trim()).filter(Boolean);
  const jsonOutput = JSON.stringify(
    keywords.map((k, idx) => ({ id: idx + 1, keyword: k, slug: k.toLowerCase().replace(/[^a-z0-9]+/g, '-') })),
    null,
    2
  );

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Keywords Input (one per line)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 uppercase">JSON Array ({keywords.length} items)</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(jsonOutput);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download JSON
              </button>
            </div>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs max-h-56 overflow-y-auto select-all">
            {jsonOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
