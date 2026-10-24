import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputVal, setInputVal] = useState<string>('Hello from Zynovexa!');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOutput = (): string => {
    if (!inputVal) return '';
    try {
      if (mode === 'encode') {
        // UTF-8 safe base64
        const utf8Bytes = new TextEncoder().encode(inputVal);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return b64;
      } else {
        let b64 = inputVal.trim();
        if (urlSafe) {
          b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
          while (b64.length % 4) b64 += '=';
        }
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
      }
    } catch {
      return 'Error: Invalid base64 sequence or string characters.';
    }
  };

  const outputVal = getOutput();

  const handleCopy = async () => {
    await copyToClipboard(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Encode to Base64
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Decode from Base64
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span>URL-Safe Format (- and _ instead of + and /)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Input ({mode === 'encode' ? 'Plain Text' : 'Base64'})
          </label>
          <textarea
            rows={8}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full p-4 font-mono text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Output ({mode === 'encode' ? 'Base64' : 'Plain Text'})
            </label>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            rows={8}
            readOnly
            value={outputVal}
            className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
        <strong>Privacy & Security Note:</strong> Base64 is an encoding format for binary-to-text representation, not cryptographic encryption. All conversions occur entirely within your browser.
      </div>
    </div>
  );
};
