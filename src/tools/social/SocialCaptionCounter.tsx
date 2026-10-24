import React, { useState } from 'react';
import { Copy, Check, Hash, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

interface PlatformLimit {
  name: string;
  max: number;
}

const PLATFORMS: PlatformLimit[] = [
  { name: 'X / Twitter Post', max: 280 },
  { name: 'Instagram Caption', max: 2200 },
  { name: 'Instagram Bio', max: 150 },
  { name: 'TikTok Caption', max: 2200 },
  { name: 'LinkedIn Post', max: 3000 },
  { name: 'YouTube Title', max: 100 },
  { name: 'YouTube Description', max: 5000 },
  { name: 'Pinterest Pin Description', max: 500 }
];

export const SocialCaptionCounter: React.FC = () => {
  const [caption, setCaption] = useState<string>(
    'Discover free browser tools that respect your privacy! No uploads, no API keys, and 100% fast. Check out Zynovexa #tools #tech #developer #design'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const charCount = caption.length;
  const wordsCount = caption.trim() ? caption.trim().split(/\s+/).length : 0;
  const hashtags = (caption.match(/#[a-zA-Z0-9_]+/g) || []).length;

  const handleCopy = async () => {
    await copyToClipboard(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Header */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase">Characters</span>
          <p className="text-2xl font-extrabold text-blue-600 mt-0.5">{charCount.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase">Words</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{wordsCount.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase">Hashtags (#)</span>
          <p className="text-2xl font-extrabold text-purple-600 mt-0.5">{hashtags}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Caption & Content Editor
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button
              onClick={() => setCaption('')}
              className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-md text-xs font-semibold cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          rows={6}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Type or paste caption here..."
          className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Platform Meters */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Platform Character Limits Breakdown
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLATFORMS.map((plat) => {
            const remaining = plat.max - charCount;
            const isExceeded = remaining < 0;
            const percent = Math.min(100, Math.round((charCount / plat.max) * 100));

            return (
              <div key={plat.name} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{plat.name}</span>
                  <span
                    className={`font-mono font-bold ${
                      isExceeded ? 'text-red-600' : remaining < 20 ? 'text-amber-600' : 'text-slate-500'
                    }`}
                  >
                    {isExceeded ? `${Math.abs(remaining)} over limit` : `${remaining} left`} ({charCount}/{plat.max})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full transition-all duration-150 ${
                      isExceeded ? 'bg-red-600' : percent > 85 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
