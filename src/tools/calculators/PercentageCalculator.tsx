import React, { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState<string>('15');
  const [val1B, setVal1B] = useState<string>('250');

  // Mode 2: X is what percent of Y?
  const [val2A, setVal2A] = useState<string>('45');
  const [val2B, setVal2B] = useState<string>('180');

  // Mode 3: % Increase / Decrease from X to Y?
  const [val3A, setVal3A] = useState<string>('80');
  const [val3B, setVal3B] = useState<string>('120');

  const res1 = (() => {
    const a = parseFloat(val1A);
    const b = parseFloat(val1B);
    if (isNaN(a) || isNaN(b)) return null;
    return (a / 100) * b;
  })();

  const res2 = (() => {
    const a = parseFloat(val2A);
    const b = parseFloat(val2B);
    if (isNaN(a) || isNaN(b) || b === 0) return null;
    return (a / b) * 100;
  })();

  const res3 = (() => {
    const a = parseFloat(val3A);
    const b = parseFloat(val3B);
    if (isNaN(a) || isNaN(b) || a === 0) return null;
    const diff = b - a;
    const pct = (diff / a) * 100;
    return {
      pct: Math.abs(pct),
      isIncrease: pct >= 0,
      diff
    };
  })();

  return (
    <div className="space-y-6">
      {/* Mode 1 */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">1</span>
          What is X% of Y?
        </h3>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 font-medium">What is</span>
            <input
              type="number"
              value={val1A}
              onChange={(e) => setVal1A(e.target.value)}
              className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
            <span className="text-sm text-slate-600 font-medium">% of</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={val1B}
              onChange={(e) => setVal1B(e.target.value)}
              className="w-32 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
            <span className="text-sm text-slate-600 font-medium">?</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 font-semibold uppercase">Result:</span>
            <span className="text-xl font-extrabold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-200">
              {res1 !== null ? res1.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Mode 2 */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">2</span>
          X is what percentage of Y?
        </h3>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={val2A}
              onChange={(e) => setVal2A(e.target.value)}
              className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
            <span className="text-sm text-slate-600 font-medium">is what % of</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={val2B}
              onChange={(e) => setVal2B(e.target.value)}
              className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
            <span className="text-sm text-slate-600 font-medium">?</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 font-semibold uppercase">Result:</span>
            <span className="text-xl font-extrabold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-200">
              {res2 !== null ? `${res2.toLocaleString(undefined, { maximumFractionDigits: 2 })}%` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Mode 3 */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
          Percentage Increase or Decrease from X to Y
        </h3>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 font-medium">From</span>
            <input
              type="number"
              value={val3A}
              onChange={(e) => setVal3A(e.target.value)}
              className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
            <span className="text-sm text-slate-600 font-medium">to</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={val3B}
              onChange={(e) => setVal3B(e.target.value)}
              className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold text-center"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 font-semibold uppercase">Change:</span>
            {res3 !== null ? (
              <span
                className={`text-xl font-extrabold px-4 py-1.5 rounded-xl border ${
                  res3.isIncrease
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-red-700 bg-red-50 border-red-200'
                }`}
              >
                {res3.isIncrease ? '▲ +' : '▼ -'}
                {res3.pct.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </span>
            ) : (
              <span className="text-xl font-extrabold text-slate-400 bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-200">
                —
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
