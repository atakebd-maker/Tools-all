import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Download, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadText } from '../../utils/formatting';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        keywordDensity: []
      };
    }

    const wordsArray = raw.split(/\s+/).filter((w) => w.length > 0);
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    // Sentences: split on ., !, ?
    const sentences = raw.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    // Paragraphs: split on double newlines or lines
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    const readingTimeMin = Math.ceil(words / 200);
    const speakingTimeMin = Math.ceil(words / 130);

    // Keyword density calculation
    const freqMap: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'at', 'by', 'this', 'be', 'are', 'or', 'an']);

    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean.length > 2 && !stopWords.has(clean)) {
        freqMap[clean] = (freqMap[clean] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(freqMap)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / words) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
      keywordDensity
    };
  }, [text]);

  const handleCaseChange = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'clean-spaces') => {
    if (type === 'upper') setText(text.toUpperCase());
    else if (type === 'lower') setText(text.toLowerCase());
    else if (type === 'title') {
      setText(
        text
          .toLowerCase()
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      );
    } else if (type === 'sentence') {
      setText(
        text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
      );
    } else if (type === 'clean-spaces') {
      setText(text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim());
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadText(text, 'text-document.txt');
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Words</span>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-0.5">{stats.words.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Characters</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.charsWithSpaces.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">No Spaces</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.charsNoSpaces.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Sentences</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.sentences.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Paragraphs</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.paragraphs.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Read Time</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.readingTimeMin} min</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Speak Time</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{stats.speakingTimeMin} min</p>
        </div>
      </div>

      {/* Quick Transforms Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 font-semibold uppercase mr-1">Case:</span>
          <button
            onClick={() => handleCaseChange('upper')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 cursor-pointer"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => handleCaseChange('lower')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 cursor-pointer"
          >
            lowercase
          </button>
          <button
            onClick={() => handleCaseChange('title')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 cursor-pointer"
          >
            Title Case
          </button>
          <button
            onClick={() => handleCaseChange('sentence')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 cursor-pointer"
          >
            Sentence case
          </button>
          <button
            onClick={() => handleCaseChange('clean-spaces')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 cursor-pointer"
          >
            Clean Extra Spaces
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!text}
            className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            Download .txt
          </button>
          <button
            onClick={() => setText('')}
            disabled={!text}
            className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-md font-semibold cursor-pointer disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type, write, or paste your text here..."
        className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />

      {/* Keyword Frequency & Density */}
      {stats.keywordDensity.length > 0 && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Top Keywords & Density
            </span>
            <span className="text-xs text-slate-400">Excludes common stop words</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {stats.keywordDensity.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-xs truncate mr-2">{item.word}</span>
                <span className="text-xs font-mono text-blue-600 font-bold shrink-0">
                  {item.count} ({item.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
