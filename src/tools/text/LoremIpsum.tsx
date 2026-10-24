import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
  'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'in',
  'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
  'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
  'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum'
];

export const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [wrapHtml, setWrapHtml] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateSentence = (capitalize = true): string => {
    const len = Math.floor(Math.random() * 10) + 8;
    const words: string[] = [];
    for (let i = 0; i < len; i++) {
      words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    const str = words.join(' ');
    return (capitalize ? str.charAt(0).toUpperCase() + str.slice(1) : str) + '.';
  };

  const generateParagraph = (isFirst = false): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    const sentences: string[] = [];

    if (isFirst && startWithLorem) {
      sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
      for (let i = 1; i < sentenceCount; i++) {
        sentences.push(generateSentence());
      }
    } else {
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence());
      }
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';
    if (unit === 'words') {
      const words: string[] = [];
      if (startWithLorem) words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      while (words.length < count) {
        words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      result = words.slice(0, count).join(' ');
    } else if (unit === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(' ');
    } else {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        const p = generateParagraph(i === 0);
        paras.push(wrapHtml ? `<p>${p}</p>` : p);
      }
      result = paras.join('\n\n');
    }

    setOutput(result);
  };

  React.useEffect(() => {
    generate();
  }, [count, unit, startWithLorem, wrapHtml]);

  const handleCopy = async () => {
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Count
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium bg-white"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="sm:col-span-2 flex items-center gap-6 pt-5">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Start with "Lorem ipsum..."</span>
          </label>

          {unit === 'paragraphs' && (
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Wrap in &lt;p&gt; tags</span>
            </label>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Generated Placeholder Text
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={generate}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>
        <textarea
          rows={10}
          readOnly
          value={output}
          className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed bg-slate-50 focus:outline-none"
        />
      </div>
    </div>
  );
};
