import React, { useState, useEffect } from 'react';
import { Copy, Check, Hash, ShieldCheck } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const HashGenerator: React.FC = () => {
  const [inputStr, setInputStr] = useState<string>('Hello World');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': ''
  });
  const [copiedKey, setCopiedKey] = useState<string>('');

  const computeHashes = async (text: string) => {
    const enc = new TextEncoder();
    const data = enc.encode(text);
    const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    const results: Record<string, string> = {};

    for (const algo of algos) {
      try {
        const hashBuf = await window.crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuf));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        results[algo] = hashHex;
      } catch {
        results[algo] = 'Error generating hash';
      }
    }
    setHashes(results);
  };

  useEffect(() => {
    computeHashes(inputStr);
  }, [inputStr]);

  const handleCopy = async (val: string, key: string) => {
    await copyToClipboard(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Plain Text Input
        </label>
        <textarea
          rows={4}
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          placeholder="Enter text to generate cryptographic hash..."
          className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {Object.entries(hashes).map(([algo, hashVal]) => (
          <div key={algo} className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                {algo} Hash
              </span>
              <button
                onClick={() => handleCopy(hashVal, algo)}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === algo ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === algo ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="font-mono text-xs text-slate-800 break-all select-all bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              {hashVal || 'Calculating...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
