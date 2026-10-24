import React, { useState } from 'react';
import { Copy, Check, Link2 } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const UrlEncoderDecoder: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'uri'>('component');
  const [inputVal, setInputVal] = useState<string>('https://tstoolshub.com/search?q=free tools & online=yes');
  const [copied, setCopied] = useState<boolean>(false);

  const getOutput = (): string => {
    if (!inputVal) return '';
    try {
      if (mode === 'encode') {
        return encodeType === 'component' ? encodeURIComponent(inputVal) : encodeURI(inputVal);
      } else {
        return decodeURIComponent(inputVal);
      }
    } catch {
      return 'Error: Invalid percent-encoded URI sequence.';
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
            URL Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            URL Decode
          </button>
        </div>

        {mode === 'encode' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="encType"
                checked={encodeType === 'component'}
                onChange={() => setEncodeType('component')}
                className="text-blue-600"
              />
              <span>encodeURIComponent (all special characters)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer ml-3">
              <input
                type="radio"
                name="encType"
                checked={encodeType === 'uri'}
                onChange={() => setEncodeType('uri')}
                className="text-blue-600"
              />
              <span>encodeURI (preserves :// and ?)</span>
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Input
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
              Output
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
    </div>
  );
};
