import React, { useState } from 'react';
import { Copy, Check, Trash2, ArrowRightLeft, Sparkles, Download } from 'lucide-react';

interface TextToolProps {
  title: string;
  description: string;
  transform: (input: string, options?: any) => string;
  optionsUI?: (options: any, setOptions: React.Dispatch<React.SetStateAction<any>>) => React.ReactNode;
  defaultOptions?: any;
}

const GenericTextTool: React.FC<TextToolProps> = ({
  title,
  description,
  transform,
  optionsUI,
  defaultOptions = {}
}) => {
  const [input, setInput] = useState<string>('');
  const [options, setOptions] = useState<any>(defaultOptions);
  const [copied, setCopied] = useState<boolean>(false);

  const output = transform(input, options);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>

      {optionsUI && optionsUI(options, setOptions)}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Input Text</label>
            <span className="text-[11px] text-slate-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here..."
            rows={8}
            className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-white text-slate-900"
          />
          <button
            onClick={() => setInput('')}
            className="text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Processed Output</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            rows={8}
            className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl bg-slate-50/70 text-slate-800 font-mono focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// 1. Case Converter
export const CaseConverter: React.FC = () => {
  return (
    <GenericTextTool
      title="Case Converter"
      description="Convert text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case."
      defaultOptions={{ mode: 'uppercase' }}
      optionsUI={(opts, setOpts) => (
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'uppercase', label: 'UPPERCASE' },
            { id: 'lowercase', label: 'lowercase' },
            { id: 'titlecase', label: 'Title Case' },
            { id: 'sentencecase', label: 'Sentence case' },
            { id: 'camelcase', label: 'camelCase' },
            { id: 'snakecase', label: 'snake_case' },
            { id: 'kebabcase', label: 'kebab-case' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setOpts({ mode: item.id })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                opts.mode === item.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      transform={(text, opts) => {
        if (!text) return '';
        switch (opts.mode) {
          case 'uppercase':
            return text.toUpperCase();
          case 'lowercase':
            return text.toLowerCase();
          case 'titlecase':
            return text.replace(
              /\w\S*/g,
              (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
          case 'sentencecase':
            return text
              .toLowerCase()
              .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
          case 'camelcase':
            return text
              .toLowerCase()
              .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
              .replace(/^[A-Z]/, (c) => c.toLowerCase());
          case 'snakecase':
            return text
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/[^a-zA-Z0-9_]/g, '');
          case 'kebabcase':
            return text
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-zA-Z0-9-]/g, '');
          default:
            return text;
        }
      }}
    />
  );
};

// 2. Character Counter
export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const totalChars = text.length;
  const noSpaces = text.replace(/\s/g, '').length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const specials = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const bytes = new Blob([text]).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-xl font-black text-blue-900">{totalChars}</p>
          <p className="text-[11px] text-blue-700 font-medium">Total Chars</p>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <p className="text-xl font-black text-emerald-900">{noSpaces}</p>
          <p className="text-[11px] text-emerald-700 font-medium">Without Spaces</p>
        </div>
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
          <p className="text-xl font-black text-indigo-900">{letters}</p>
          <p className="text-[11px] text-indigo-700 font-medium">Letters</p>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-xl font-black text-amber-900">{digits}</p>
          <p className="text-[11px] text-amber-700 font-medium">Digits</p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <p className="text-xl font-black text-purple-900">{specials}</p>
          <p className="text-[11px] text-purple-700 font-medium">Special Symbols</p>
        </div>
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <p className="text-xl font-black text-slate-800">{bytes}</p>
          <p className="text-[11px] text-slate-600 font-medium">UTF-8 Bytes</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Type or paste text to inspect exact character metrics..."
        className="w-full text-sm p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
};

// 3. Remove Extra Spaces
export const RemoveExtraSpaces: React.FC = () => (
  <GenericTextTool
    title="Remove Extra Spaces"
    description="Clean multiple consecutive whitespaces, trailing spaces, and redundant blank lines."
    transform={(text) => {
      if (!text) return '';
      return text
        .split('\n')
        .map((line) => line.replace(/[ \t]+/g, ' ').trim())
        .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
        .join('\n')
        .trim();
    }}
  />
);

// 4. Remove Duplicate Lines
export const RemoveDuplicateLines: React.FC = () => (
  <GenericTextTool
    title="Remove Duplicate Lines"
    description="De-duplicate list items, URLs, or entries, preserving original order."
    defaultOptions={{ caseSensitive: true }}
    optionsUI={(opts, setOpts) => (
      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={opts.caseSensitive}
          onChange={(e) => setOpts({ caseSensitive: e.target.checked })}
          className="rounded text-blue-600"
        />
        <span>Case sensitive deduplication</span>
      </label>
    )}
    transform={(text, opts) => {
      if (!text) return '';
      const lines = text.split('\n');
      const seen = new Set<string>();
      const result: string[] = [];

      lines.forEach((line) => {
        const key = opts.caseSensitive ? line : line.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          result.push(line);
        }
      });
      return result.join('\n');
    }}
  />
);

// 5. Text Reverser
export const TextReverser: React.FC = () => (
  <GenericTextTool
    title="Text Reverser"
    description="Reverse characters, reverse words order, or flip line order instantly."
    defaultOptions={{ mode: 'chars' }}
    optionsUI={(opts, setOpts) => (
      <div className="flex gap-2">
        {[
          { id: 'chars', label: 'Reverse Characters' },
          { id: 'words', label: 'Reverse Words' },
          { id: 'lines', label: 'Reverse Lines' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setOpts({ mode: item.id })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              opts.mode === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
    transform={(text, opts) => {
      if (!text) return '';
      if (opts.mode === 'chars') {
        return Array.from(text).reverse().join('');
      } else if (opts.mode === 'words') {
        return text
          .split('\n')
          .map((line) => line.split(/\s+/).reverse().join(' '))
          .join('\n');
      } else {
        return text.split('\n').reverse().join('\n');
      }
    }}
  />
);

// 6. Sort Lines
export const SortLines: React.FC = () => (
  <GenericTextTool
    title="Sort Lines"
    description="Alphabetize lines (A-Z, Z-A), sort numerically, or order by length."
    defaultOptions={{ mode: 'az' }}
    optionsUI={(opts, setOpts) => (
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'az', label: 'Alphabetical (A → Z)' },
          { id: 'za', label: 'Reverse (Z → A)' },
          { id: 'numeric', label: 'Numeric (1 → 9)' },
          { id: 'length', label: 'By Line Length' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setOpts({ mode: item.id })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              opts.mode === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
    transform={(text, opts) => {
      if (!text) return '';
      const lines = text.split('\n');
      if (opts.mode === 'az') {
        return [...lines].sort((a, b) => a.localeCompare(b)).join('\n');
      } else if (opts.mode === 'za') {
        return [...lines].sort((a, b) => b.localeCompare(a)).join('\n');
      } else if (opts.mode === 'numeric') {
        return [...lines]
          .sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0))
          .join('\n');
      } else {
        return [...lines].sort((a, b) => a.length - b.length).join('\n');
      }
    }}
  />
);

// 7. Text to Slug
export const TextToSlug: React.FC = () => (
  <GenericTextTool
    title="Text to URL Slug Generator"
    description="Generate clean, SEO-friendly URL slugs from blog titles or product names."
    defaultOptions={{ separator: '-' }}
    optionsUI={(opts, setOpts) => (
      <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
        <span>Separator:</span>
        <button
          onClick={() => setOpts({ separator: '-' })}
          className={`px-2.5 py-1 rounded cursor-pointer ${
            opts.separator === '-' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Hyphen (-)
        </button>
        <button
          onClick={() => setOpts({ separator: '_' })}
          className={`px-2.5 py-1 rounded cursor-pointer ${
            opts.separator === '_' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Underscore (_)
        </button>
      </div>
    )}
    transform={(text, opts) => {
      if (!text) return '';
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, opts.separator)
        .replace(new RegExp(`^${opts.separator}+|${opts.separator}+$`, 'g'), '');
    }}
  />
);
