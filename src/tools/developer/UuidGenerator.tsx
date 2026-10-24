import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generateUuidV4 = (): string => {
    // Crypto secure UUID v4
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let u = generateUuidV4();
      if (!hyphens) u = u.replace(/-/g, '');
      if (uppercase) u = u.toUpperCase();
      list.push(u);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateBatch();
  }, [count, uppercase, hyphens]);

  const handleCopyAll = async () => {
    await copyToClipboard(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold"
          />
        </div>

        <div className="flex items-center gap-4 pt-5 sm:col-span-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Include Hyphens</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Uppercase Letters</span>
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Generated UUIDs (Version 4 RFC 4122)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={generateBatch}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New
            </button>
            <button
              onClick={handleCopyAll}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied All' : 'Copy All'}
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50 font-mono text-xs sm:text-sm max-h-96 overflow-y-auto">
          {uuids.map((u, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between gap-2 hover:bg-slate-100 transition-colors">
              <span className="text-slate-800 font-semibold truncate">{u}</span>
              <button
                onClick={() => copyToClipboard(u)}
                className="text-xs text-blue-600 hover:text-blue-700 font-sans font-medium shrink-0 cursor-pointer"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
