import React, { useState } from 'react';
import { Search, Replace, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const FindReplace: React.FC = () => {
  const [text, setText] = useState<string>(
    'The quick brown fox jumps over the lazy dog. The fox was nimble and quick.'
  );
  const [findStr, setFindStr] = useState<string>('fox');
  const [replaceStr, setReplaceStr] = useState<string>('cat');
  const [matchCase, setMatchCase] = useState<boolean>(false);
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [replacedCount, setReplacedCount] = useState<number | null>(null);

  const handleReplaceAll = () => {
    if (!findStr) return;
    try {
      let count = 0;
      let newText = '';

      if (useRegex) {
        const flags = matchCase ? 'g' : 'gi';
        const regex = new RegExp(findStr, flags);
        const matches = text.match(regex);
        count = matches ? matches.length : 0;
        newText = text.replace(regex, replaceStr);
      } else {
        const flags = matchCase ? 'g' : 'gi';
        const escaped = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, flags);
        const matches = text.match(regex);
        count = matches ? matches.length : 0;
        newText = text.replace(regex, replaceStr);
      }

      setText(newText);
      setReplacedCount(count);
    } catch {
      setReplacedCount(0);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Find Text
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={findStr}
              onChange={(e) => {
                setFindStr(e.target.value);
                setReplacedCount(null);
              }}
              placeholder="Search for..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Replace With
          </label>
          <div className="relative">
            <Replace className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => {
                setReplaceStr(e.target.value);
                setReplacedCount(null);
              }}
              placeholder="Replace with..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2 flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Match Case</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Use Regular Expressions</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReplaceAll}
              disabled={!findStr}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Replace All Occurrences
            </button>
          </div>
        </div>
      </div>

      {replacedCount !== null && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-medium">
          Replaced {replacedCount} occurrence{replacedCount === 1 ? '' : 's'}.
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Document Text
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-xs text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={() => setText('')}
              className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-md text-xs font-semibold cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm font-sans focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
};
