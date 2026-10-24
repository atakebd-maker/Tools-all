import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const TextBinaryHex: React.FC = () => {
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text' | 'text-to-hex' | 'hex-to-text'>('text-to-binary');
  const [inputVal, setInputVal] = useState<string>('Hello World');
  const [copied, setCopied] = useState<boolean>(false);

  const getOutput = (): string => {
    try {
      if (mode === 'text-to-binary') {
        return inputVal
          .split('')
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' ');
      }
      if (mode === 'binary-to-text') {
        const bytes = inputVal.trim().split(/\s+/);
        return bytes
          .map((byte) => String.fromCharCode(parseInt(byte, 2)))
          .join('');
      }
      if (mode === 'text-to-hex') {
        return inputVal
          .split('')
          .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
          .join(' ');
      }
      if (mode === 'hex-to-text') {
        const hexes = inputVal.trim().replace(/\s+/g, '').match(/.{1,2}/g) || [];
        return hexes
          .map((hex) => String.fromCharCode(parseInt(hex, 16)))
          .join('');
      }
    } catch {
      return 'Error: Invalid input encoding for selected mode.';
    }
    return '';
  };

  const outputVal = getOutput();

  const handleCopy = async () => {
    await copyToClipboard(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
        <button
          onClick={() => {
            setMode('text-to-binary');
            setInputVal('Hello World');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === 'text-to-binary' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Text → Binary
        </button>
        <button
          onClick={() => {
            setMode('binary-to-text');
            setInputVal('01001000 01100101 01101100 01101100 01101111');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === 'binary-to-text' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Binary → Text
        </button>
        <button
          onClick={() => {
            setMode('text-to-hex');
            setInputVal('Hello World');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === 'text-to-hex' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Text → Hex
        </button>
        <button
          onClick={() => {
            setMode('hex-to-text');
            setInputVal('48 65 6c 6c 6f 20 57 6f 72 6c 64');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === 'hex-to-text' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Hex → Text
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Input ({mode.split('-')[0]})
          </label>
          <textarea
            rows={8}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Output ({mode.split('-')[2]})
            </label>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            rows={8}
            readOnly
            value={outputVal}
            className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
