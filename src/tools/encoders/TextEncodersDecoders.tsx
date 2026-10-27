import React, { useState } from 'react';
import {
  Binary,
  Code,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Volume2,
  VolumeX,
  ArrowRightLeft,
  AlertCircle
} from 'lucide-react';

// ==========================================
// 39. URL Encoder and Decoder
// ==========================================
export const UrlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('https://zynovexa.com/search?q=free tools & privacy=100%');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeFull, setEncodeFull] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  let output = '';
  try {
    if (mode === 'encode') {
      output = encodeFull ? encodeURIComponent(input) : encodeURI(input);
    } else {
      output = decodeURIComponent(input);
    }
    if (error) setError('');
  } catch (e: any) {
    output = '';
    if (!error) setError(e.message || 'Malformed URI sequence');
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          URL Encode
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          URL Decode
        </button>
      </div>

      {mode === 'encode' && (
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={encodeFull}
            onChange={(e) => setEncodeFull(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>Encode Component (encodes slashes, colons, and question marks)</span>
        </label>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          {mode === 'encode' ? 'Input Text / URL to Encode' : 'Encoded URL to Decode'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Output Result</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!output}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        {error ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
            Error: {error}
          </div>
        ) : (
          <textarea
            readOnly
            value={output}
            rows={4}
            className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 40. Base64 Encoder and Decoder (Full Unicode & Bengali Safe)
// ==========================================
export const Base64EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('Hello Zynovexa! স্বাগতম (Welcome to free online tools)');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const encodeUtf8Base64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  };

  const decodeUtf8Base64 = (b64: string) => {
    const bin = atob(b64.trim().replace(/\s+/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  };

  let output = '';
  try {
    if (mode === 'encode') {
      output = encodeUtf8Base64(input);
    } else {
      output = decodeUtf8Base64(input);
    }
  } catch (e: any) {
    output = '';
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Text to Base64 (Encode)
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Base64 to Text (Decode)
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          {mode === 'encode' ? 'Plain Text / Unicode / Bengali' : 'Base64 Encoded String'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Output Result</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!output}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          placeholder="Output will appear here..."
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 41. HTML Entity Encoder and Decoder
// ==========================================
export const HtmlEntityEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('<div class="hero">Hello & welcome! "Zynovexa" 2026 &copy;</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState<boolean>(false);

  const encodeHtml = (str: string) => {
    return str.replace(/[&<>"']/g, (m) => {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  };

  const decodeHtml = (str: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  const output = mode === 'encode' ? encodeHtml(input) : decodeHtml(input);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          HTML Entity Encode
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          HTML Entity Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          {mode === 'encode' ? 'HTML / Raw Text' : 'Encoded Entities String'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Result</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 42. Binary-to-Text Converter
// ==========================================
export const BinaryToTextConverter: React.FC = () => {
  const [binary, setBinary] = useState<string>('01011010 01111001 01101110 01101111 01110110 01100101 01111000 01100001');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  let textResult = '';
  try {
    const cleanBin = binary.replace(/[^01]/g, ' ').trim().split(/\s+/).filter(Boolean);
    const bytes = cleanBin.map((b) => parseInt(b, 2));
    textResult = new TextDecoder().decode(new Uint8Array(bytes));
  } catch (e: any) {
    textResult = '';
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          Binary String (8-bit bytes separated by space or newline)
        </label>
        <textarea
          value={binary}
          onChange={(e) => setBinary(e.target.value)}
          rows={4}
          placeholder="e.g. 01001000 01101001"
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Decoded Text</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(textResult);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!textResult}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 font-sans text-base min-h-[80px] break-words">
          {textResult || <span className="text-slate-400 italic">Enter valid 8-bit binary numbers to decode...</span>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 43. Text-to-Binary Converter
// ==========================================
export const TextToBinaryConverter: React.FC = () => {
  const [text, setText] = useState<string>('Zynovexa');
  const [delimiter, setDelimiter] = useState<string>(' ');
  const [copied, setCopied] = useState<boolean>(false);

  const bytes = new TextEncoder().encode(text);
  const binaryString = Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(delimiter);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">Text to Convert to Binary</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Type any word, sentence, or Unicode text..."
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
        <span>Byte Delimiter:</span>
        <button
          type="button"
          onClick={() => setDelimiter(' ')}
          className={`px-3 py-1 rounded-lg border cursor-pointer ${delimiter === ' ' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Space
        </button>
        <button
          type="button"
          onClick={() => setDelimiter(', ')}
          className={`px-3 py-1 rounded-lg border cursor-pointer ${delimiter === ', ' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Comma
        </button>
        <button
          type="button"
          onClick={() => setDelimiter('')}
          className={`px-3 py-1 rounded-lg border cursor-pointer ${delimiter === '' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          No Space
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">8-Bit Binary Representation ({bytes.length} bytes)</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(binaryString);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Binary
          </button>
        </div>
        <textarea
          readOnly
          value={binaryString}
          rows={4}
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 44. Hexadecimal Encoder and Decoder
// ==========================================
export const HexEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('Zynovexa');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [delimiter, setDelimiter] = useState<string>(' ');
  const [copied, setCopied] = useState<boolean>(false);

  const encodeHex = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join(delimiter);
  };

  const decodeHex = (hex: string) => {
    try {
      const clean = hex.replace(/[^0-9a-fA-F]/g, '');
      const bytes = new Uint8Array(clean.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
      return new TextDecoder().decode(bytes);
    } catch {
      return 'Invalid Hex string.';
    }
  };

  const output = mode === 'encode' ? encodeHex(input) : decodeHex(input);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Text to Hex (Encode)
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Hex to Text (Decode)
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          {mode === 'encode' ? 'Text Input' : 'Hexadecimal String (e.g. 5A 79 6E)'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Hexadecimal Result</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 45. ASCII Converter
// ==========================================
export const AsciiConverter: React.FC = () => {
  const [text, setText] = useState<string>('Zynovexa');
  const [copied, setCopied] = useState<boolean>(false);

  const charTable = Array.from(text).map((ch) => {
    const code = ch.charCodeAt(0);
    return {
      char: ch,
      dec: code,
      hex: '0x' + code.toString(16).toUpperCase(),
      bin: code.toString(2).padStart(8, '0'),
      oct: '0' + code.toString(8)
    };
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">Input Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 text-sm font-mono"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 overflow-x-auto">
        <span className="text-sm font-bold text-slate-900">ASCII Character Analysis</span>
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <th className="p-2.5">Char</th>
              <th className="p-2.5">Decimal</th>
              <th className="p-2.5">Hex</th>
              <th className="p-2.5">Binary</th>
              <th className="p-2.5">Octal</th>
            </tr>
          </thead>
          <tbody>
            {charTable.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-2.5 font-bold text-blue-600">{row.char === ' ' ? '(space)' : row.char}</td>
                <td className="p-2.5">{row.dec}</td>
                <td className="p-2.5">{row.hex}</td>
                <td className="p-2.5">{row.bin}</td>
                <td className="p-2.5">{row.oct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// 46. Unicode Code Point Converter
// ==========================================
export const UnicodeCodePointConverter: React.FC = () => {
  const [input, setInput] = useState<string>('Hello 🌍 বাংলা');
  const [copied, setCopied] = useState<boolean>(false);

  const codePoints = Array.from(input).map((ch) => {
    const cp = ch.codePointAt(0) || 0;
    return `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  }).join(' ');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">Input Text or Characters</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Unicode Code Points (U+XXXX)</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(codePoints);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm text-slate-800 break-words select-all">
          {codePoints}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 47. UTF-8 Byte Converter
// ==========================================
export const Utf8ByteConverter: React.FC = () => {
  const [input, setInput] = useState<string>('Zynovexa বাংলা');
  const [copied, setCopied] = useState<boolean>(false);

  const bytes = new TextEncoder().encode(input);
  const hexBytes = Array.from(bytes).map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  const decBytes = Array.from(bytes).join(' ');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">Input Unicode Text</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase">UTF-8 Hex Bytes ({bytes.length} bytes)</span>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-blue-700 mt-1 select-all break-words">
            {hexBytes}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-700 uppercase">UTF-8 Decimal Bytes</span>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 mt-1 select-all break-words">
            {decBytes}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 48. JSON String Escape and Unescape Tool
// ==========================================
export const JsonEscapeTool: React.FC = () => {
  const [input, setInput] = useState<string>('Path: C:\\Users\\Name\nMessage: "Hello World"\tTabbed');
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');
  const [copied, setCopied] = useState<boolean>(false);

  let output = '';
  try {
    if (mode === 'escape') {
      output = JSON.stringify(input).slice(1, -1);
    } else {
      output = JSON.parse(`"${input}"`);
    }
  } catch (e: any) {
    output = 'Error parsing JSON escaped string.';
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('escape')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'escape' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Escape for JSON String
        </button>
        <button
          type="button"
          onClick={() => setMode('unescape')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'unescape' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Unescape JSON String
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Output Result</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 49. Text-to-HTML Converter
// ==========================================
export const TextToHtmlConverter: React.FC = () => {
  const [input, setInput] = useState<string>('Welcome to Zynovexa\n\nThis is paragraph one with useful tools.\nThis is a second line.');
  const [format, setFormat] = useState<'p' | 'br'>('p');
  const [copied, setCopied] = useState<boolean>(false);

  let output = '';
  if (format === 'p') {
    output = input
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.replace(/\n/g, '<br>\n')}</p>`)
      .join('\n\n');
  } else {
    output = input.replace(/\n/g, '<br>\n');
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-4 text-xs font-medium text-slate-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="fmt"
            checked={format === 'p'}
            onChange={() => setFormat('p')}
            className="w-4 h-4 text-blue-600"
          />
          <span>Wrap in &lt;p&gt; Paragraph Tags</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="fmt"
            checked={format === 'br'}
            onChange={() => setFormat('br')}
            className="w-4 h-4 text-blue-600"
          />
          <span>Use &lt;br&gt; Break Tags Only</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Plain Text Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-xl border border-slate-300 font-sans text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">HTML Code Output</label>
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
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs select-all focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 50. ROT13 Encoder and Decoder
// ==========================================
export const Rot13EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('Why did the chicken cross the road? Gb trg gb gur bgure fvqr!');
  const [rot, setRot] = useState<number>(13);
  const [copied, setCopied] = useState<boolean>(false);

  const rotate = (str: string, shift: number) => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });
  };

  const output = rotate(input, rot);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="text-xs font-bold text-slate-700">Caesar Shift Amount: ROT-{rot}</label>
        <input
          type="range"
          min={1}
          max={25}
          value={rot}
          onChange={(e) => setRot(Number(e.target.value))}
          className="flex-1 accent-blue-600"
        />
        <button
          type="button"
          onClick={() => setRot(13)}
          className="px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-semibold cursor-pointer"
        >
          Reset to ROT-13
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">ROT-{rot} Result</label>
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
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 51. Morse Code Encoder and Decoder (with Web Audio Playback)
// ==========================================
export const MorseCodeEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('SOS ZYNOVEXA');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const morseMap: Record<string, string> = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const reverseMorseMap: Record<string, string> = Object.entries(morseMap).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {} as Record<string, string>);

  const encodeMorse = (str: string) => {
    return str
      .toUpperCase()
      .split('')
      .map((ch) => morseMap[ch] || '')
      .join(' ');
  };

  const decodeMorse = (m: string) => {
    return m
      .trim()
      .split(/\s+/)
      .map((code) => reverseMorseMap[code] || (code === '/' ? ' ' : '?'))
      .join('');
  };

  const output = mode === 'encode' ? encodeMorse(input) : decodeMorse(input);

  // Play Morse audio tones using Web Audio API
  const playMorse = async () => {
    if (isPlaying) return;
    const morseCode = mode === 'encode' ? output : input;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setIsPlaying(true);
      const dotTime = 0.08;

      let currentTime = audioCtx.currentTime;

      for (const char of morseCode) {
        if (char === '.') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.value = 650;
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(currentTime);
          osc.stop(currentTime + dotTime);
          currentTime += dotTime * 2;
        } else if (char === '-') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.value = 650;
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(currentTime);
          osc.stop(currentTime + dotTime * 3);
          currentTime += dotTime * 4;
        } else if (char === ' ') {
          currentTime += dotTime * 3;
        } else if (char === '/') {
          currentTime += dotTime * 7;
        }
      }

      setTimeout(() => {
        setIsPlaying(false);
      }, (currentTime - audioCtx.currentTime) * 1000 + 100);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'encode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Text to Morse Code
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            mode === 'decode' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          Morse Code to Text
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-1">
          {mode === 'encode' ? 'Text Input' : 'Morse Code Input (Dots & Dashes)'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Morse Code Output</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={playMorse}
              disabled={isPlaying}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isPlaying ? 'Playing Audio...' : 'Play Audio Tone'}
            </button>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full p-3 bg-white rounded-xl border border-slate-200 font-mono text-base select-all tracking-widest focus:outline-none"
        />
      </div>
    </div>
  );
};

// ==========================================
// 57. Line Break Converter
// ==========================================
export const LineBreakConverter: React.FC = () => {
  const [input, setInput] = useState<string>('Line 1\nLine 2\n\nLine 3 with gap\nLine 4');
  const [target, setTarget] = useState<'lf' | 'crlf' | 'space' | 'comma'>('lf');
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  let lines = input.split(/\r\n|\r|\n/);
  if (removeEmpty) {
    lines = lines.filter((l) => l.trim() !== '');
  }

  let output = '';
  if (target === 'lf') output = lines.join('\n');
  if (target === 'crlf') output = lines.join('\r\n');
  if (target === 'space') output = lines.join(' ');
  if (target === 'comma') output = lines.join(', ');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'lf', label: 'Unix LF (\\n)' },
          { id: 'crlf', label: 'Windows CRLF (\\r\\n)' },
          { id: 'space', label: 'Single Space' },
          { id: 'comma', label: 'Comma Separator' }
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setTarget(btn.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              target === btn.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={removeEmpty}
          onChange={(e) => setRemoveEmpty(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <span>Remove empty blank lines automatically</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-900">Output Result</label>
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
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm select-all focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
