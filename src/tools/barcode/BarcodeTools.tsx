import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import {
  Barcode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  AlertCircle,
  FileSpreadsheet,
  FileText,
  PackageCheck
} from 'lucide-react';

// ==========================================
// Base Barcode Studio Component
// ==========================================
interface BarcodeStudioProps {
  format: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'ITF';
  defaultValue: string;
  placeholder?: string;
  validator?: (val: string) => string | null;
  helpText?: string;
  title?: string;
}

export const BarcodeStudio: React.FC<BarcodeStudioProps> = ({
  format,
  defaultValue,
  placeholder = 'Enter barcode value...',
  validator,
  helpText
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [lineColor, setLineColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [displayValue, setDisplayValue] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(2);
  const [height, setHeight] = useState<number>(100);
  const [fontSize, setFontSize] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    if (!value || value.trim() === '') {
      setError('Please provide a value to generate the barcode.');
      return;
    }

    if (validator) {
      const valErr = validator(value.trim());
      if (valErr) {
        setError(valErr);
        return;
      }
    }

    try {
      setError('');
      JsBarcode(svgRef.current, value.trim(), {
        format,
        lineColor,
        background: bgColor,
        displayValue,
        width,
        height,
        fontSize,
        margin: 12,
        valid: (valid: boolean) => {
          if (!valid) {
            setError(`Invalid characters or length for ${format} standard.`);
          }
        }
      });
    } catch (e: any) {
      setError(e.message || `Could not generate ${format} barcode.`);
    }
  }, [value, format, lineColor, bgColor, displayValue, width, height, fontSize, validator]);

  const handleDownloadSvg = () => {
    if (!svgRef.current || error) return;
    const svgXml = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zynovexa-${format.toLowerCase()}-${value.trim()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!svgRef.current || error) return;
    const svgXml = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const img = new Image();
    const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width || 400;
      canvas.height = img.height || 160;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `zynovexa-${format.toLowerCase()}-${value.trim()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(value.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Column */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-900">
              {format} Code Input
            </label>
            <button
              type="button"
              onClick={() => setValue('')}
              className="text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 text-base font-mono tracking-wider"
          />
          {helpText && <p className="text-xs text-slate-500 leading-relaxed">{helpText}</p>}
        </div>

        {/* Styling & Dimension Options */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Barcode Style & Dimensions
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Bar Color</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-[11px]">{lineColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Background</label>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1.5">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-slate-600 text-[11px]">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Bar Width</label>
              <select
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
              >
                <option value={1}>1px (Compact)</option>
                <option value={2}>2px (Standard)</option>
                <option value={3}>3px (Large)</option>
                <option value={4}>4px (Extra Wide)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Bar Height</label>
              <select
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
              >
                <option value={60}>60px</option>
                <option value={80}>80px</option>
                <option value={100}>100px (Default)</option>
                <option value={140}>140px (Tall)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={displayValue}
                onChange={(e) => setDisplayValue(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Display text / numbers below barcode</span>
            </label>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>
            <strong>Official Authority Notice:</strong> Generating a barcode code in this tool does not officially register your product with GS1, UPC, or EAN commercial authorities. Official retail distribution through major global retailers requires certified GS1 registered company prefixes.
          </span>
        </div>
      </div>

      {/* Live Preview Column */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Barcode className="w-4 h-4 text-blue-600" />
            {format} Live Barcode
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Vector SVG
          </span>
        </div>

        {/* SVG Output Area */}
        <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl flex items-center justify-center max-w-full overflow-x-auto min-h-[180px] w-full">
          {error ? (
            <div className="p-3 text-red-600 text-xs font-medium max-w-xs">{error}</div>
          ) : (
            <svg ref={svgRef} className="max-w-full h-auto" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={!value.trim() || !!error}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl font-semibold text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>

          <button
            type="button"
            onClick={handleDownloadSvg}
            disabled={!value.trim() || !!error}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white rounded-xl font-semibold text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download SVG
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            disabled={!value.trim()}
            className="col-span-2 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium text-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Copied Barcode Value!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Barcode Value
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 14. Universal Barcode Generator
// ==========================================
export const BarcodeGenerator: React.FC = () => {
  const [format, setFormat] = useState<'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'ITF'>('CODE128');

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Barcode Symbology Format
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {(['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'ITF'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                format === fmt
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <BarcodeStudio
        key={format}
        format={format}
        defaultValue={format === 'EAN13' ? '5901234123457' : format === 'EAN8' ? '96385074' : format === 'UPC' ? '123456789012' : format === 'ITF' ? '1234567890' : 'ZYNOVEXA-2026'}
        helpText={`Current format: ${format}. Input standard format characters only.`}
      />
    </div>
  );
};

// ==========================================
// 15. Code 128 Barcode Generator
// ==========================================
export const Code128BarcodeGenerator: React.FC = () => {
  return (
    <BarcodeStudio
      format="CODE128"
      defaultValue="ZYN-PROD-9842"
      placeholder="e.g. ABC-12345-XYZ"
      helpText="Code 128 supports all 128 ASCII characters, including letters, digits, and punctuation symbols."
    />
  );
};

// ==========================================
// 16. Code 39 Barcode Generator
// ==========================================
export const Code39BarcodeGenerator: React.FC = () => {
  const validator = (val: string) => {
    if (!/^[0-9A-Z\-.$/+% ]+$/i.test(val)) {
      return 'Code 39 only supports uppercase A-Z, 0-9, and symbols (- . $ / + % space).';
    }
    return null;
  };

  return (
    <BarcodeStudio
      format="CODE39"
      defaultValue="INVENTORY-01"
      placeholder="e.g. PART-8899"
      validator={validator}
      helpText="Code 39 is widely used in automotive, defense, and industrial inventory tracking."
    />
  );
};

// ==========================================
// 17. EAN-13 Barcode Generator
// ==========================================
export const Ean13BarcodeGenerator: React.FC = () => {
  const validator = (val: string) => {
    if (!/^\d{12,13}$/.test(val)) {
      return 'EAN-13 requires exactly 12 or 13 digits (numeric 0-9 only).';
    }
    return null;
  };

  return (
    <BarcodeStudio
      format="EAN13"
      defaultValue="5901234123457"
      placeholder="12 or 13 digits e.g. 5901234123457"
      validator={validator}
      helpText="Standard 13-digit International Article Number for worldwide retail merchandise."
    />
  );
};

// ==========================================
// 18. EAN-8 Barcode Generator
// ==========================================
export const Ean8BarcodeGenerator: React.FC = () => {
  const validator = (val: string) => {
    if (!/^\d{7,8}$/.test(val)) {
      return 'EAN-8 requires exactly 7 or 8 digits (numeric 0-9 only).';
    }
    return null;
  };

  return (
    <BarcodeStudio
      format="EAN8"
      defaultValue="96385074"
      placeholder="7 or 8 digits e.g. 96385074"
      validator={validator}
      helpText="Compact 8-digit barcode designed for small confectionery and cosmetic packages."
    />
  );
};

// ==========================================
// 19. UPC-A Barcode Generator
// ==========================================
export const UpcABarcodeGenerator: React.FC = () => {
  const validator = (val: string) => {
    if (!/^\d{11,12}$/.test(val)) {
      return 'UPC-A requires exactly 11 or 12 digits (numeric 0-9 only).';
    }
    return null;
  };

  return (
    <BarcodeStudio
      format="UPC"
      defaultValue="123456789012"
      placeholder="11 or 12 digits e.g. 012345678905"
      validator={validator}
      helpText="Universal Product Code standard used widely across the United States and Canada."
    />
  );
};

// ==========================================
// 20. ITF Barcode Generator
// ==========================================
export const ItfBarcodeGenerator: React.FC = () => {
  const validator = (val: string) => {
    if (!/^\d+$/.test(val)) {
      return 'ITF (Interleaved 2 of 5) requires numeric digits only.';
    }
    if (val.length % 2 !== 0) {
      return 'ITF requires an even number of digits (e.g. 10, 12, or 14 digits).';
    }
    return null;
  };

  return (
    <BarcodeStudio
      format="ITF"
      defaultValue="1234567890"
      placeholder="Even number of digits e.g. 1234567890"
      validator={validator}
      helpText="Interleaved 2 of 5 (ITF) encodes pairs of numeric digits, commonly used on corrugated shipping cartons."
    />
  );
};

// ==========================================
// 21. Product SKU Generator
// ==========================================
export const ProductSkuGenerator: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('ZYN');
  const [category, setCategory] = useState<string>('TECH');
  const [attribute, setAttribute] = useState<string>('BLK');
  const [startSeq, setStartSeq] = useState<number>(101);
  const [count, setCount] = useState<number>(5);
  const [separator, setSeparator] = useState<string>('-');
  const [generatedSkus, setGeneratedSkus] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      const parts = [
        prefix.trim().toUpperCase(),
        category.trim().toUpperCase(),
        attribute.trim().toUpperCase(),
        String(startSeq + i).padStart(4, '0')
      ].filter(Boolean);
      list.push(parts.join(separator));
    }
    setGeneratedSkus(list);
  };

  useEffect(() => {
    generate();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedSkus.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,SKU,Prefix,Category,Attribute,Sequence\n' +
      generatedSkus.map((sku, idx) => `"${sku}","${prefix}","${category}","${attribute}","${startSeq + idx}"`).join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csvContent);
    a.download = `zynovexa-skus-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Store Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Category Code</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Color / Size / Variant</label>
          <input
            type="text"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Starting Number</label>
          <input
            type="number"
            value={startSeq}
            onChange={(e) => setStartSeq(Math.max(1, Number(e.target.value)))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Quantity to Generate</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value={5}>5 SKUs</option>
            <option value={10}>10 SKUs</option>
            <option value={25}>25 SKUs</option>
            <option value={50}>50 SKUs</option>
            <option value={100}>100 SKUs</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Delimiter / Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
            <option value="/">Slash (/)</option>
            <option value="">No Separator</option>
          </select>
        </div>

        <div className="sm:col-span-3 pt-2">
          <button
            type="button"
            onClick={generate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Generate SKU Series
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">
            Generated Product SKUs ({generatedSkus.length})
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              Copy All
            </button>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Download CSV
            </button>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-mono text-sm">
          {generatedSkus.map((sku, idx) => (
            <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200/50 last:border-0">
              <span className="text-slate-900 font-semibold">{sku}</span>
              <span className="text-xs text-slate-400">#{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 22. Random Product Code Generator
// ==========================================
export const RandomProductCodeGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [includeLetters, setIncludeLetters] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [prefix, setPrefix] = useState<string>('PRD-');
  const [code, setCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    let chars = '';
    if (includeLetters) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (includeNumbers) chars += '23456789';
    if (!chars) chars = '0123456789';

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setCode(`${prefix}${result}`);
  };

  useEffect(() => {
    generate();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Random Characters Length: {length}</label>
          <input
            type="range"
            min={6}
            max={24}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="flex gap-4 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLetters}
              onChange={(e) => setIncludeLetters(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include Uppercase Letters</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Include Numbers</span>
          </label>
        </div>

        <button
          type="button"
          onClick={generate}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Generate Random Code
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Generated Product Identifier
        </span>
        <div className="p-4 bg-slate-50 rounded-xl font-mono text-xl sm:text-2xl font-bold text-slate-900 break-all select-all border border-slate-200">
          {code}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 23. Batch Product Code Generator
// ==========================================
export const BatchProductCodeGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(20);
  const [prefix, setPrefix] = useState<string>('ITEM-');
  const [digits, setDigits] = useState<number>(8);
  const [codes, setCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    const list: string[] = [];
    const used = new Set<string>();
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    while (list.length < count) {
      const array = new Uint32Array(digits);
      window.crypto.getRandomValues(array);
      let str = '';
      for (let i = 0; i < digits; i++) {
        str += chars[array[i] % chars.length];
      }
      const full = `${prefix}${str}`;
      if (!used.has(full)) {
        used.add(full);
        list.push(full);
      }
    }
    setCodes(list);
  };

  useEffect(() => {
    generate();
  }, []);

  const handleDownloadCsv = () => {
    const content = 'data:text/csv;charset=utf-8,Index,ProductCode\n' +
      codes.map((c, i) => `${i + 1},"${c}"`).join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(content);
    a.download = `zynovexa-batch-codes-${Date.now()}.csv`;
    a.click();
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([codes.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zynovexa-batch-codes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Code Length</label>
          <input
            type="number"
            min={4}
            max={20}
            value={digits}
            onChange={(e) => setDigits(Math.max(4, Math.min(20, Number(e.target.value))))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Batch Size</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
          >
            <option value={10}>10 Codes</option>
            <option value={20}>20 Codes</option>
            <option value={50}>50 Codes</option>
            <option value={100}>100 Codes</option>
            <option value={250}>250 Codes</option>
            <option value={500}>500 Codes</option>
          </select>
        </div>

        <div className="sm:col-span-3 pt-2">
          <button
            type="button"
            onClick={generate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Generate {count} Unique Codes
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm font-bold text-slate-900">
            Batch Product Codes Output ({codes.length})
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(codes.join('\n'));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              Copy
            </button>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
            </button>
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> TXT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs">
          {codes.map((code, idx) => (
            <div key={idx} className="bg-white p-2 rounded border border-slate-200/80 text-slate-800 font-semibold select-all">
              {code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
