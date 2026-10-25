import React, { useState } from 'react';
import { Copy, Check, Trash2, Code2, Globe, Palette } from 'lucide-react';

// 1. HTML Encoder and Decoder
export const HtmlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('<div class="example">Hello & Welcome!</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState<boolean>(false);

  const encodeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const decodeHtml = (str: string) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const output = mode === 'encode' ? encodeHtml(input) : decodeHtml(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          HTML Entity Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          HTML Entity Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Input HTML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">Output</label>
            <button
              onClick={handleCopy}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

// 2. CSS Formatter & Minifier
export const CssFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('body{background:#fff;color:#333;margin:0}h1{font-size:2rem;font-weight:bold}');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [copied, setCopied] = useState<boolean>(false);

  const formatCss = (css: string) => {
    return css
      .replace(/\s*([\{\};:,])\s*/g, '$1')
      .replace(/\{/g, ' {\n  ')
      .replace(/;/g, ';\n  ')
      .replace(/\s*\}/g, '\n}\n\n')
      .trim();
  };

  const minifyCss = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([\{\};:,])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
  };

  const output = mode === 'beautify' ? formatCss(input) : minifyCss(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('beautify')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'beautify' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Beautify / Format CSS
        </button>
        <button
          onClick={() => setMode('minify')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'minify' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Minify CSS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">CSS Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">Processed CSS</label>
            <button onClick={handleCopy} className="text-xs text-blue-600 font-semibold cursor-pointer">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

// 3. HTML Minifier
export const HtmlMinifier: React.FC = () => {
  const [input, setInput] = useState<string>('<!-- Comment -->\n<div class="container">\n  <h1>  Hello World  </h1>\n</div>');
  const [copied, setCopied] = useState<boolean>(false);

  const output = input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">HTML Code</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">Minified HTML</label>
            <button onClick={handleCopy} className="text-xs text-blue-600 font-semibold cursor-pointer">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

// 4. URL Parser
export const UrlParser: React.FC = () => {
  const [urlStr, setUrlStr] = useState<string>('https://zynovexa.com:443/tools/pdf-merger?source=google&ref=top#instructions');

  let parsed: any = null;
  let params: [string, string][] = [];

  try {
    const u = new URL(urlStr);
    parsed = {
      protocol: u.protocol,
      hostname: u.hostname,
      port: u.port || '(default)',
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
      origin: u.origin
    };
    params = Array.from(u.searchParams.entries());
  } catch (e) {
    // invalid url
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">Enter Complete URL</label>
        <input
          type="text"
          value={urlStr}
          onChange={(e) => setUrlStr(e.target.value)}
          className="w-full text-xs sm:text-sm font-mono p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {parsed ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Protocol</span>
              <p className="text-sm font-mono font-bold text-blue-600 truncate">{parsed.protocol}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Hostname</span>
              <p className="text-sm font-mono font-bold text-slate-800 truncate">{parsed.hostname}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Port</span>
              <p className="text-sm font-mono font-bold text-slate-800 truncate">{parsed.port}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pathname</span>
              <p className="text-sm font-mono font-bold text-slate-800 truncate">{parsed.pathname}</p>
            </div>
          </div>

          {params.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Query Parameters ({params.length})</h4>
              <div className="space-y-1.5 font-mono text-xs">
                {params.map(([k, v], i) => (
                  <div key={i} className="flex gap-2 bg-slate-50 p-2 rounded">
                    <span className="text-blue-600 font-semibold">{k}:</span>
                    <span className="text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-red-500">Please enter a valid URL including protocol (e.g. https://...)</p>
      )}
    </div>
  );
};

// 5. HEX to RGB / RGB to HEX Converter
export const HexRgbConverter: React.FC = () => {
  const [hex, setHex] = useState<string>('#2563EB');
  const [r, setR] = useState<number>(37);
  const [g, setG] = useState<number>(99);
  const [b, setB] = useState<number>(235);

  const handleHexChange = (h: string) => {
    setHex(h);
    const clean = h.replace('#', '');
    if (clean.length === 6) {
      setR(parseInt(clean.substring(0, 2), 16) || 0);
      setG(parseInt(clean.substring(2, 4), 16) || 0);
      setB(parseInt(clean.substring(4, 6), 16) || 0);
    }
  };

  const handleRgbChange = (nr: number, ng: number, nb: number) => {
    setR(nr);
    setG(ng);
    setB(nb);
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
    setHex(`#${toHex(nr)}${toHex(ng)}${toHex(nb)}`.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div
          className="w-16 h-16 rounded-xl border border-slate-300 shadow-sm shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div>
          <p className="text-sm font-bold text-slate-800">Color Preview</p>
          <p className="text-xs font-mono text-slate-500 mt-0.5">HEX: {hex} • RGB: rgb({r}, {g}, {b})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">HEX Code</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full text-sm font-mono p-3 border border-slate-200 rounded-xl uppercase"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">RGB Channels (0 - 255)</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min="0"
              max="255"
              value={r}
              onChange={(e) => handleRgbChange(parseInt(e.target.value) || 0, g, b)}
              className="p-2.5 border border-slate-200 rounded-lg text-center text-xs font-mono"
            />
            <input
              type="number"
              min="0"
              max="255"
              value={g}
              onChange={(e) => handleRgbChange(r, parseInt(e.target.value) || 0, b)}
              className="p-2.5 border border-slate-200 rounded-lg text-center text-xs font-mono"
            />
            <input
              type="number"
              min="0"
              max="255"
              value={b}
              onChange={(e) => handleRgbChange(r, g, parseInt(e.target.value) || 0)}
              className="p-2.5 border border-slate-200 rounded-lg text-center text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. XML Formatter
export const XmlFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>');
  const [copied, setCopied] = useState<boolean>(false);

  const formatXml = (xml: string) => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    xml.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
      formatted += indent + '<' + node + '>\r\n';
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
  };

  const output = formatXml(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">XML Code</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">Beautified XML</label>
            <button onClick={handleCopy} className="text-xs text-blue-600 font-semibold cursor-pointer">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full text-xs font-mono p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};
