import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  Eye,
  RefreshCw,
  Layout,
  Table,
  Layers,
  Sparkles,
  Sliders,
  Play
} from 'lucide-react';

// ==========================================
// 76. HTML Boilerplate Generator
// ==========================================
export const HtmlBoilerplateGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('My Awesome Project');
  const [lang, setLang] = useState<string>('en');
  const [includeTailwind, setIncludeTailwind] = useState<boolean>(true);
  const [includeGoogleFonts, setIncludeGoogleFonts] = useState<boolean>(true);
  const [includeMetaTags, setIncludeMetaTags] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>${includeMetaTags ? `\n  <meta name="description" content="Welcome to ${title}">\n  <meta name="author" content="Zynovexa User">\n  <link rel="icon" type="image/svg+xml" href="/favicon.svg">` : ''}${includeGoogleFonts ? `\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">\n  <style>body { font-family: 'Inter', sans-serif; }</style>` : ''}${includeTailwind ? `\n  <script src="https://cdn.tailwindcss.com"></script>` : ''}
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col items-center justify-center p-6">
  <main class="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
    <h1 class="text-3xl font-black text-slate-900">${title}</h1>
    <p class="text-slate-600 text-sm">Welcome to your new modern web application template.</p>
    <button class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-xs">
      Get Started
    </button>
  </main>
</body>
</html>`;

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Document Language Code</label>
          <input
            type="text"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white font-mono"
          />
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-4 text-xs font-medium text-slate-700 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTailwind}
              onChange={(e) => setIncludeTailwind(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include Tailwind CSS CDN</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeGoogleFonts}
              onChange={(e) => setIncludeGoogleFonts(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include Inter Google Font</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeMetaTags}
              onChange={(e) => setIncludeMetaTags(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include Responsive Viewport & Meta</span>
          </label>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated index.html</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(html);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Code
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download index.html
            </button>
          </div>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed select-all">
          {html}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 77. HTML Table Generator
// ==========================================
export const HtmlTableGenerator: React.FC = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [striped, setStriped] = useState<boolean>(true);
  const [bordered, setBordered] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  let html = `<table class="min-w-full text-left text-sm ${bordered ? 'border border-slate-200' : ''}">\n  <thead class="bg-slate-100 text-slate-700 font-bold">\n    <tr>\n`;
  for (let c = 1; c <= cols; c++) {
    html += `      <th class="p-3 border-b border-slate-200">Header ${c}</th>\n`;
  }
  html += `    </tr>\n  </thead>\n  <tbody>\n`;
  for (let r = 1; r <= rows; r++) {
    html += `    <tr class="${striped && r % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100">\n`;
    for (let c = 1; c <= cols; c++) {
      html += `      <td class="p-3">Data ${r},${c}</td>\n`;
    }
    html += `    </tr>\n`;
  }
  html += `  </tbody>\n</table>`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-wrap gap-6 items-center">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Rows: {rows}</label>
          <input
            type="number"
            min={1}
            max={20}
            value={rows}
            onChange={(e) => setRows(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="w-24 p-2 bg-white rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Columns: {cols}</label>
          <input
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(Math.max(1, Math.min(10, Number(e.target.value))))}
            className="w-24 p-2 bg-white rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div className="flex gap-4 text-xs font-medium text-slate-700 pt-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={striped}
              onChange={(e) => setStriped(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Striped Rows</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={bordered}
              onChange={(e) => setBordered(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Bordered Table</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-900">HTML Code</span>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(html);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy HTML
            </button>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs max-h-72 overflow-y-auto select-all">
            {html}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <span className="text-sm font-bold text-slate-900">Live Render Preview</span>
          <div className="overflow-x-auto p-2" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 78. CSS Button Generator
// ==========================================
export const CssButtonGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Click Me');
  const [bgColor, setBgColor] = useState<string>('#2563eb');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [paddingY, setPaddingY] = useState<number>(12);
  const [paddingX, setPaddingX] = useState<number>(24);
  const [radius, setRadius] = useState<number>(12);
  const [hasShadow, setHasShadow] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const css = `.custom-btn {
  background-color: ${bgColor};
  color: ${textColor};
  padding: ${paddingY}px ${paddingX}px;
  border-radius: ${radius}px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;${hasShadow ? `\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);` : ''}
}

.custom-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Background</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-xs">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Text Color</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-xs">{textColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Y-Padding ({paddingY}px)</label>
              <input
                type="range"
                min={6}
                max={24}
                value={paddingY}
                onChange={(e) => setPaddingY(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">X-Padding ({paddingX}px)</label>
              <input
                type="range"
                min={10}
                max={48}
                value={paddingX}
                onChange={(e) => setPaddingX(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Radius ({radius}px)</label>
              <input
                type="range"
                min={0}
                max={32}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Interactive Preview</span>
          <button
            type="button"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              padding: `${paddingY}px ${paddingX}px`,
              borderRadius: `${radius}px`,
              boxShadow: hasShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none'
            }}
            className="font-semibold text-sm transition-transform active:scale-95 cursor-pointer"
          >
            {text}
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated CSS & HTML</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(css);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy CSS
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto select-all">
          {css}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 79. CSS Gradient Generator
// ==========================================
export const CssGradientGenerator: React.FC = () => {
  const [color1, setColor1] = useState<string>('#3b82f6');
  const [color2, setColor2] = useState<string>('#9333ea');
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [copied, setCopied] = useState<boolean>(false);

  const cssValue = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssRule = `background: ${color1};\nbackground: ${cssValue};`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="h-44 rounded-2xl border border-slate-200 shadow-inner" style={{ background: cssValue }} />

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Color 1</label>
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
            />
            <span className="font-mono text-xs">{color1}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Color 2</label>
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
            />
            <span className="font-mono text-xs">{color2}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>

        {type === 'linear' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Angle ({angle}°)</label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated CSS</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(cssRule);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy CSS
          </button>
        </div>
        <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs select-all">
          {cssRule}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 80. CSS Box Shadow Generator
// ==========================================
export const CssBoxShadowGenerator: React.FC = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(10);
  const [blur, setBlur] = useState<number>(25);
  const [spread, setSpread] = useState<number>(-5);
  const [color, setColor] = useState<string>('#000000');
  const [opacity, setOpacity] = useState<number>(0.15);
  const [inset, setInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // convert hex to rgba
  const hexToRgb = (hex: string) => {
    const c = hex.replace('#', '');
    return `${parseInt(c.substring(0, 2), 16)}, ${parseInt(c.substring(2, 4), 16)}, ${parseInt(c.substring(4, 6), 16)}`;
  };

  const shadowCss = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`;
  const fullRule = `box-shadow: ${shadowCss};`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
        <div
          className="w-48 h-32 bg-white rounded-2xl flex items-center justify-center text-xs font-bold text-slate-600 transition-all border border-slate-100"
          style={{ boxShadow: shadowCss }}
        >
          Preview Box
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
        <div>
          <label className="block text-slate-700 mb-1">Offset X: {x}px</label>
          <input type="range" min={-50} max={50} value={x} onChange={(e) => setX(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Offset Y: {y}px</label>
          <input type="range" min={-50} max={50} value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Blur: {blur}px</label>
          <input type="range" min={0} max={80} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Spread: {spread}px</label>
          <input type="range" min={-30} max={30} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>

        <div className="col-span-2">
          <label className="block text-slate-700 mb-1">Opacity: {Math.round(opacity * 100)}%</label>
          <input type="range" min={0} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>

        <div className="col-span-2 flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0" />
            <span className="font-mono">{color}</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span>Inset Shadow</span>
          </label>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated CSS Rule</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(fullRule);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy CSS
          </button>
        </div>
        <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs select-all">
          {fullRule}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 81. CSS Border Radius Generator
// ==========================================
export const CssBorderRadiusGenerator: React.FC = () => {
  const [tl, setTl] = useState<number>(16);
  const [tr, setTr] = useState<number>(32);
  const [br, setBr] = useState<number>(16);
  const [bl, setBl] = useState<number>(32);
  const [copied, setCopied] = useState<boolean>(false);

  const radiusRule = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="p-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
        <div
          className="w-48 h-32 bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md transition-all"
          style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
        >
          Border Radius Shape
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 text-xs font-medium">
        <div>
          <label className="block text-slate-700 mb-1">Top-Left: {tl}px</label>
          <input type="range" min={0} max={64} value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Top-Right: {tr}px</label>
          <input type="range" min={0} max={64} value={tr} onChange={(e) => setTr(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Bottom-Right: {br}px</label>
          <input type="range" min={0} max={64} value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-slate-700 mb-1">Bottom-Left: {bl}px</label>
          <input type="range" min={0} max={64} value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated CSS</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(radiusRule);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Rule
          </button>
        </div>
        <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs select-all">
          {radiusRule}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 83. CSS Flexbox Playground Generator
// ==========================================
export const CssFlexboxGenerator: React.FC = () => {
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'>('center');
  const [align, setAlign] = useState<'flex-start' | 'center' | 'flex-end' | 'stretch'>('center');
  const [gap, setGap] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);

  const css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div
        className="min-h-[220px] bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all"
        style={{
          display: 'flex',
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          gap: `${gap}px`
        }}
      >
        <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-xs">1</div>
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-xs">2</div>
        <div className="w-16 h-16 bg-violet-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-xs">3</div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
        <div>
          <label className="block text-slate-700 mb-1 font-bold">Direction</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value as any)} className="w-full p-2 bg-white rounded-lg border border-slate-300">
            <option value="row">row</option>
            <option value="column">column</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 mb-1 font-bold">Justify Content</label>
          <select value={justify} onChange={(e) => setJustify(e.target.value as any)} className="w-full p-2 bg-white rounded-lg border border-slate-300">
            <option value="flex-start">flex-start</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 mb-1 font-bold">Align Items</label>
          <select value={align} onChange={(e) => setAlign(e.target.value as any)} className="w-full p-2 bg-white rounded-lg border border-slate-300">
            <option value="flex-start">flex-start</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
            <option value="stretch">stretch</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 mb-1 font-bold">Gap ({gap}px)</label>
          <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Generated Flexbox CSS</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(css);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy CSS
          </button>
        </div>
        <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs select-all">
          {css}
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// 88. JSON to CSV Converter
// ==========================================
export const JsonToCsvConverter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(`[
  { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "Developer" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Designer" },
  { "id": 3, "name": "Alex Johnson", "email": "alex@example.com", "role": "Product Manager" }
]`);
  const [csvOutput, setCsvOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const convert = () => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      if (items.length === 0) {
        setCsvOutput('');
        return;
      }
      const headers = Object.keys(items[0]);
      let csv = headers.join(',') + '\n';
      items.forEach((row: any) => {
        csv += headers.map((h) => JSON.stringify(row[h] ?? '')).join(',') + '\n';
      });
      setCsvOutput(csv.trim());
    } catch (e: any) {
      setError(e.message || 'Invalid JSON format.');
      setCsvOutput('');
    }
  };

  React.useEffect(() => {
    convert();
  }, [jsonInput]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">JSON Array Input</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">CSV Output</label>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(csvOutput);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              disabled={!csvOutput}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              Copy CSV
            </button>
          </div>
          {error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono">
              Error: {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={csvOutput}
              rows={8}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs select-all focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 89. CSV to JSON Converter
// ==========================================
export const CsvToJsonConverter: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>(`id,name,role\n1,Zynovexa,Admin\n2,User,Viewer`);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const convert = () => {
    try {
      const lines = csvInput.trim().split('\n').filter(Boolean);
      if (lines.length < 2) {
        setJsonOutput('[]');
        return;
      }
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
      const list = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
        const obj: Record<string, any> = {};
        headers.forEach((h, i) => {
          obj[h] = values[i] ?? '';
        });
        return obj;
      });
      setJsonOutput(JSON.stringify(list, null, 2));
    } catch {
      setJsonOutput('[]');
    }
  };

  React.useEffect(() => {
    convert();
  }, [csvInput]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">CSV Text Input</label>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">JSON Output</label>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(jsonOutput);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              Copy JSON
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs max-h-72 overflow-y-auto select-all">
            {jsonOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 92. Regex Tester (Safe & Resilient)
// ==========================================
export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState<string>('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
  const [flags, setFlags] = useState<string>('g');
  const [testText, setTestText] = useState<string>('Contact our support team at support@zynovexa.com or sales@example.org for questions.');
  const [error, setError] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);

  React.useEffect(() => {
    if (!pattern) {
      setError('');
      setMatches([]);
      return;
    }
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const found: string[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes('g')) {
        while ((m = regex.exec(testText)) !== null) {
          found.push(m[0]);
          if (regex.lastIndex === m.index) regex.lastIndex++; // prevent infinite loops
        }
      } else {
        const single = regex.exec(testText);
        if (single) found.push(single[0]);
      }
      setMatches(found);
    } catch (e: any) {
      setError(e.message || 'Invalid regular expression.');
      setMatches([]);
    }
  }, [pattern, flags, testText]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-700 mb-1">Regular Expression Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm bg-white"
            />
          </div>
          <div className="w-24">
            <label className="block text-xs font-bold text-slate-700 mb-1">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m"
              className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Test String / Corpus</label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border border-slate-300 font-sans text-sm bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">
            Matches Found ({matches.length})
          </span>
          {error && <span className="text-xs text-red-600 font-medium">Syntax Error in Regex</span>}
        </div>

        {error ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono">
            {error}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
            {matches.length > 0 ? (
              matches.map((match, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md font-mono text-xs font-semibold">
                  {match}
                </span>
              ))
            ) : (
              <span className="text-slate-400 text-xs italic">No matches found for the given pattern.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 93. SQL Query Template Generator
// ==========================================
export const SqlTemplateGenerator: React.FC = () => {
  const [table, setTable] = useState<string>('users');
  const [operation, setOperation] = useState<'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'CREATE'>('SELECT');
  const [copied, setCopied] = useState<boolean>(false);

  let query = '';
  if (operation === 'SELECT') {
    query = `SELECT id, name, email, created_at\nFROM ${table}\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 50;`;
  } else if (operation === 'INSERT') {
    query = `INSERT INTO ${table} (name, email, role, created_at)\nVALUES ('John Doe', 'john@example.com', 'member', NOW());`;
  } else if (operation === 'UPDATE') {
    query = `UPDATE ${table}\nSET name = 'Jane Doe', updated_at = NOW()\nWHERE id = 101;`;
  } else if (operation === 'DELETE') {
    query = `DELETE FROM ${table}\nWHERE id = 101 AND status = 'inactive';`;
  } else {
    query = `CREATE TABLE ${table} (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);`;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-wrap gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">Table Name</label>
          <input
            type="text"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">SQL Statement</label>
          <div className="flex gap-1">
            {(['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE'] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  operation === op ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">SQL Template Query</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(query);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy SQL
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-blue-300 rounded-xl font-mono text-xs overflow-x-auto select-all leading-relaxed">
          {query}
        </pre>
      </div>
    </div>
  );
};
