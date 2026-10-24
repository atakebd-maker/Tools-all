import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeftRight, Eye } from 'lucide-react';

export const ContrastChecker: React.FC = () => {
  const [textColor, setTextColor] = useState<string>('#0F172A');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');

  const getLuminance = (hex: string): number => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const rgb = [
      parseInt(clean.slice(0, 2), 16) / 255,
      parseInt(clean.slice(2, 4), 16) / 255,
      parseInt(clean.slice(4, 6), 16) / 255
    ].map((val) => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const getContrastRatio = () => {
    const lum1 = getLuminance(textColor);
    const lum2 = getLuminance(bgColor);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return parseFloat(ratio.toFixed(2));
  };

  const ratio = getContrastRatio();

  const swap = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
        <div className="sm:col-span-2 p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Text Color (Foreground)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 p-0.5 border border-slate-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm border border-slate-200 rounded-lg text-slate-900 font-bold"
            />
          </div>
        </div>

        <div className="sm:col-span-1 flex justify-center">
          <button
            onClick={swap}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer border border-slate-200"
            title="Swap colors"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        <div className="sm:col-span-2 p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 p-0.5 border border-slate-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm border border-slate-200 rounded-lg text-slate-900 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Ratio Score & Live Preview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Contrast Ratio
          </span>
          <div className="text-5xl font-extrabold text-blue-400 mt-2 mb-1">
            {ratio} : 1
          </div>
          <span className="text-xs text-slate-400">
            {ratio >= 7 ? 'Superb contrast' : ratio >= 4.5 ? 'Good contrast' : 'Poor contrast'}
          </span>
        </div>

        {/* Live sample preview */}
        <div
          style={{ backgroundColor: bgColor, color: textColor }}
          className="p-8 rounded-2xl border border-slate-300 shadow-sm flex flex-col justify-center min-h-[160px]"
        >
          <p className="text-2xl font-bold mb-2">Headline Preview Text</p>
          <p className="text-sm leading-relaxed">
            The quick brown fox jumps over the lazy dog. Ensure sufficient readability for all users.
          </p>
        </div>
      </div>

      {/* WCAG Criteria Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          ratio >= 4.5 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span className="text-xs font-semibold uppercase mb-1">AA Normal Text</span>
          <div className="flex items-center gap-1 font-bold text-sm">
            {ratio >= 4.5 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            {ratio >= 4.5 ? 'Pass (≥ 4.5:1)' : 'Fail'}
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          ratio >= 3.0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span className="text-xs font-semibold uppercase mb-1">AA Large Text (18pt+)</span>
          <div className="flex items-center gap-1 font-bold text-sm">
            {ratio >= 3.0 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            {ratio >= 3.0 ? 'Pass (≥ 3.0:1)' : 'Fail'}
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          ratio >= 7.0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span className="text-xs font-semibold uppercase mb-1">AAA Normal Text</span>
          <div className="flex items-center gap-1 font-bold text-sm">
            {ratio >= 7.0 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            {ratio >= 7.0 ? 'Pass (≥ 7.0:1)' : 'Fail'}
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          ratio >= 4.5 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span className="text-xs font-semibold uppercase mb-1">AAA Large Text</span>
          <div className="flex items-center gap-1 font-bold text-sm">
            {ratio >= 4.5 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            {ratio >= 4.5 ? 'Pass (≥ 4.5:1)' : 'Fail'}
          </div>
        </div>
      </div>
    </div>
  );
};
