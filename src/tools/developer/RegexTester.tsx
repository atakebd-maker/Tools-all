import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState<string>('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b');
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false
  });
  const [testString, setTestString] = useState<string>(
    'Contact support at help@tstoolshub.com or sales@example.org for questions. Invalid: test@.com'
  );

  const getFlagString = () => {
    let res = '';
    if (flags.g) res += 'g';
    if (flags.i) res += 'i';
    if (flags.m) res += 'm';
    if (flags.s) res += 's';
    return res;
  };

  const testRegex = () => {
    if (!pattern) return { matches: [], error: null };
    try {
      const flagStr = getFlagString();
      const regex = new RegExp(pattern, flagStr);

      const matches: { match: string; index: number; groups?: string[] }[] = [];
      if (flags.g) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (regex.lastIndex === match.index) {
            regex.lastIndex++; // prevent infinite loop
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
      return { matches, error: null };
    } catch (err: any) {
      return { matches: [], error: err.message };
    }
  };

  const { matches, error } = testRegex();

  return (
    <div className="space-y-6">
      {/* Pattern Input & Flags */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Regular Expression
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 font-bold text-lg">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \w+"
              className="flex-1 px-3 py-2 font-mono text-sm border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <span className="font-mono text-slate-400 font-bold text-lg">/</span>
            <span className="font-mono text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-200">
              {getFlagString() || 'none'}
            </span>
          </div>
        </div>

        {/* Flag Checkboxes */}
        <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
          <span className="text-slate-400 uppercase text-[10px]">Flags:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.g}
              onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>Global (g)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.i}
              onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>Case-Insensitive (i)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.m}
              onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>Multiline (m)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.s}
              onChange={(e) => setFlags({ ...flags, s: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>DotAll (s)</span>
          </label>
        </div>
      </div>

      {error ? (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Regex Syntax Error: {error}</span>
        </div>
      ) : (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-medium flex items-center justify-between">
          <span>Found {matches.length} match{matches.length === 1 ? '' : 'es'}.</span>
          {matches.length > 0 && <span className="text-emerald-700 font-bold">Expression matched</span>}
        </div>
      )}

      {/* Test String */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Test String
        </label>
        <textarea
          rows={6}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full p-4 font-mono text-xs border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Matched items table */}
      {matches.length > 0 && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Extracted Matches ({matches.length})
          </span>
          <div className="divide-y divide-slate-100 font-mono text-xs border border-slate-100 rounded-lg overflow-hidden bg-slate-50">
            {matches.map((m, idx) => (
              <div key={idx} className="p-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-500 text-[11px] font-sans">#{idx + 1} at index {m.index}:</span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">{m.match}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
