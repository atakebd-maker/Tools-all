import React, { useState } from 'react';
import { Columns, RotateCcw } from 'lucide-react';

export const TextDiff: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>(
    'Apple\nBanana\nCherry\nDate\nElderberry'
  );
  const [modifiedText, setModifiedText] = useState<string>(
    'Apple\nBlueberry\nCherry\nDate\nFig\nGrape'
  );

  const lines1 = originalText.split('\n');
  const lines2 = modifiedText.split('\n');
  const maxLines = Math.max(lines1.length, lines2.length);

  const diffRows = [];
  for (let i = 0; i < maxLines; i++) {
    const l1 = lines1[i] !== undefined ? lines1[i] : null;
    const l2 = lines2[i] !== undefined ? lines2[i] : null;

    let status = 'same';
    if (l1 === null && l2 !== null) status = 'added';
    else if (l1 !== null && l2 === null) status = 'removed';
    else if (l1 !== l2) status = 'changed';

    diffRows.push({ lineNum: i + 1, l1, l2, status });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Original Text (Before)
          </label>
          <textarea
            rows={8}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Modified Text (After)
          </label>
          <textarea
            rows={8}
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 uppercase">
          <span className="flex items-center gap-1.5">
            <Columns className="w-4 h-4 text-blue-600" />
            Comparison Difference Output
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Added
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Removed
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Changed
            </span>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden font-mono text-xs divide-y divide-slate-100 bg-white">
          {diffRows.map((row) => (
            <div
              key={row.lineNum}
              className={`grid grid-cols-12 p-1.5 ${
                row.status === 'added'
                  ? 'bg-emerald-50/70 text-emerald-900'
                  : row.status === 'removed'
                  ? 'bg-red-50/70 text-red-900'
                  : row.status === 'changed'
                  ? 'bg-amber-50/70 text-amber-900'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="col-span-1 text-slate-400 select-none text-right pr-2">
                {row.lineNum}
              </div>
              <div className="col-span-5 border-r border-slate-200 pr-2 truncate">
                {row.l1 !== null ? row.l1 : <span className="text-slate-300 italic">(empty)</span>}
              </div>
              <div className="col-span-6 pl-2 truncate">
                {row.l2 !== null ? row.l2 : <span className="text-slate-300 italic">(empty)</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
