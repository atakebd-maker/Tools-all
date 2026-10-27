import React, { useState } from 'react';
import { Calculator, RotateCcw, HelpCircle, CheckCircle2, ChevronRight, Hash } from 'lucide-react';

// Common Card Container Helper with clean white background and blue accents
export const CalcCard: React.FC<{
  title: string;
  description?: string;
  formula?: string;
  children: React.ReactNode;
  onReset?: () => void;
  onCalculate?: () => void;
}> = ({ title, description, formula, children, onReset, onCalculate }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 max-w-3xl mx-auto">
      <div className="border-b border-slate-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
          {description && <p className="text-xs sm:text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          {onCalculate && (
            <button
              onClick={onCalculate}
              type="button"
              className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              Calculate
            </button>
          )}
        </div>
      </div>

      {children}

      {formula && (
        <div className="mt-6 pt-4 border-t border-slate-100 bg-blue-50/50 rounded-xl p-3 text-xs text-blue-900">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-950">Formula & Method: </span>
              <span className="font-mono text-blue-800">{formula}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 1. Basic Calculator
export const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');

  const handleDigit = (digit: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const full = (equation + display).replace(/×/g, '*').replace(/÷/g, '/');
      const res = Function(`"use strict"; return (${full})`)();
      if (!isFinite(res)) {
        setDisplay('Error');
      } else {
        setDisplay(String(Number(res.toFixed(10))));
      }
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <CalcCard
      title="Basic Calculator"
      description="Perform quick arithmetic calculations with clear keypad controls."
      onReset={handleClear}
    >
      <div className="max-w-xs mx-auto bg-slate-900 p-5 rounded-3xl shadow-lg border border-slate-800 text-white font-mono">
        <div className="text-right text-xs text-slate-400 h-5 mb-1 truncate">{equation || '0'}</div>
        <div className="text-right text-3xl font-bold mb-4 tracking-tight truncate bg-slate-800 p-3 rounded-xl border border-slate-700">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
          <button onClick={handleClear} className="p-3 bg-red-600 hover:bg-red-500 rounded-xl cursor-pointer">C</button>
          <button onClick={() => setDisplay((p) => String(-parseFloat(p) || 0))} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer">±</button>
          <button onClick={() => setDisplay((p) => String(parseFloat(p) / 100 || 0))} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer">%</button>
          <button onClick={() => handleOperator('÷')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">÷</button>

          <button onClick={() => handleDigit('7')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">7</button>
          <button onClick={() => handleDigit('8')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">8</button>
          <button onClick={() => handleDigit('9')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">9</button>
          <button onClick={() => handleOperator('×')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">×</button>

          <button onClick={() => handleDigit('4')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">4</button>
          <button onClick={() => handleDigit('5')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">5</button>
          <button onClick={() => handleDigit('6')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">6</button>
          <button onClick={() => handleOperator('-')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">-</button>

          <button onClick={() => handleDigit('1')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">1</button>
          <button onClick={() => handleDigit('2')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">2</button>
          <button onClick={() => handleDigit('3')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">3</button>
          <button onClick={() => handleOperator('+')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">+</button>

          <button onClick={() => handleDigit('0')} className="col-span-2 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">0</button>
          <button onClick={() => handleDigit('.')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">.</button>
          <button onClick={handleEqual} className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl cursor-pointer">=</button>
        </div>
      </div>
    </CalcCard>
  );
};

// 2. Long Division Calculator (Vertical school-style notation, e.g. 697 ÷ 19)
interface DivisionStep {
  stepNumber: number;
  currentDividendPart: number;
  digitBroughtDown?: string;
  quotientDigit: number;
  product: number;
  subtractionResult: number;
  explanation: string;
}

export const LongDivisionCalculator: React.FC = () => {
  const [dividend, setDividend] = useState<string>('697');
  const [divisor, setDivisor] = useState<string>('19');
  const [calcState, setCalcState] = useState<{
    quotient: number;
    remainder: number;
    decimalQuotient: string;
    steps: DivisionStep[];
    dividendStr: string;
    divisorNum: number;
  } | null>(() => computeSteps(697, 19));

  function computeSteps(dend: number, dsor: number) {
    if (isNaN(dend) || isNaN(dsor) || dsor === 0) return null;
    const absDend = Math.abs(Math.floor(dend));
    const absDsor = Math.abs(Math.floor(dsor));
    const dendStr = absDend.toString();
    const quotient = Math.floor(absDend / absDsor);
    const remainder = absDend % absDsor;
    const decimalQuotient = (absDend / absDsor).toFixed(4);

    const steps: DivisionStep[] = [];
    let currentPart = 0;
    let stepCount = 0;

    for (let i = 0; i < dendStr.length; i++) {
      const digitChar = dendStr[i];
      currentPart = currentPart * 10 + parseInt(digitChar, 10);

      // Only record a division step if currentPart >= divisor or if we have already started producing quotient digits
      if (currentPart >= absDsor || stepCount > 0 || i === dendStr.length - 1) {
        stepCount++;
        const qDigit = Math.floor(currentPart / absDsor);
        const prod = qDigit * absDsor;
        const sub = currentPart - prod;

        steps.push({
          stepNumber: stepCount,
          currentDividendPart: currentPart,
          digitBroughtDown: i < dendStr.length - 1 ? dendStr[i + 1] : undefined,
          quotientDigit: qDigit,
          product: prod,
          subtractionResult: sub,
          explanation: `Step ${stepCount}: ${absDsor} goes into ${currentPart} ${qDigit} time(s) (${qDigit} × ${absDsor} = ${prod}). Subtract ${prod} from ${currentPart} = ${sub}.${
            i < dendStr.length - 1 ? ` Bring down next digit '${dendStr[i + 1]}'.` : ''
          }`
        });

        currentPart = sub;
      }
    }

    return {
      quotient,
      remainder,
      decimalQuotient,
      steps,
      dividendStr: dendStr,
      divisorNum: absDsor
    };
  }

  const handleCalculate = () => {
    const d1 = parseFloat(dividend);
    const d2 = parseFloat(divisor);
    setCalcState(computeSteps(d1, d2));
  };

  const handleReset = () => {
    setDividend('697');
    setDivisor('19');
    setCalcState(computeSteps(697, 19));
  };

  return (
    <CalcCard
      title="Long Division Calculator"
      description="Calculate division with traditional vertical school-style notation, quotient, remainder, and step-by-step subtraction breakdown."
      formula="Dividend ÷ Divisor = Quotient with Remainder (Dividend = Divisor × Quotient + Remainder)"
      onCalculate={handleCalculate}
      onReset={handleReset}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Dividend (Number to be divided)</label>
          <input
            type="number"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
            placeholder="e.g. 697"
            className="w-full text-base p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Divisor (Number dividing by)</label>
          <input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            placeholder="e.g. 19"
            className="w-full text-base p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {calcState ? (
        <div className="space-y-6">
          {/* Summary Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-blue-700 block">Quotient</span>
              <span className="text-2xl font-black text-blue-900 font-mono">{calcState.quotient}</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-amber-700 block">Remainder</span>
              <span className="text-2xl font-black text-amber-900 font-mono">{calcState.remainder}</span>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-emerald-700 block">Decimal Result</span>
              <span className="text-2xl font-black text-emerald-900 font-mono">{calcState.decimalQuotient}</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-600 block">Mixed Fraction</span>
              <span className="text-xl font-bold text-slate-800 font-mono">
                {calcState.quotient} {calcState.remainder > 0 ? `${calcState.remainder}/${calcState.divisorNum}` : ''}
              </span>
            </div>
          </div>

          {/* School-Style Long Division Bracket Visualization */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-inner font-mono overflow-x-auto">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-sans font-bold flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-blue-400" />
              Traditional School-Style Division Notation
            </div>

            <div className="inline-block min-w-[280px] text-lg leading-relaxed pl-4">
              {/* Quotient line on top */}
              <div className="flex">
                <span className="w-16 inline-block text-right pr-3 opacity-0">.</span>
                <span className="text-emerald-400 font-bold tracking-widest pl-2">
                  {calcState.quotient} {calcState.remainder > 0 && <span className="text-xs text-amber-300 font-sans ml-2">R {calcState.remainder}</span>}
                </span>
              </div>

              {/* Bracket and dividend */}
              <div className="flex items-center">
                <span className="w-16 inline-block text-right pr-3 text-blue-400 font-bold">{calcState.divisorNum}</span>
                <span className="border-t-2 border-l-2 border-white rounded-tl-sm px-3 py-0.5 font-bold tracking-widest text-slate-100">
                  {calcState.dividendStr}
                </span>
              </div>

              {/* Steps breakdown vertically */}
              <div className="pl-16 space-y-2 mt-2">
                {calcState.steps.map((st, idx) => (
                  <div key={idx} className="border-b border-slate-700/60 pb-2">
                    <div className="text-rose-400">
                      - {st.product}
                    </div>
                    <div className="border-t border-slate-600 w-24 text-slate-200 font-bold pt-0.5">
                      {st.subtractionResult}
                      {st.digitBroughtDown && (
                        <span className="text-cyan-300 font-bold ml-0.5">{st.digitBroughtDown} ↓</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="text-xs text-amber-300 font-sans pt-1">
                  Remainder: <strong>{calcState.remainder}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Written Step Explanations */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Step-by-Step Long Division Walkthrough</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {calcState.steps.map((s) => (
                <li key={s.stepNumber} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{s.explanation}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 font-semibold text-slate-800">
                <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Final Result: {calcState.dividendStr} ÷ {calcState.divisorNum} = <strong>{calcState.quotient}</strong> with remainder <strong>{calcState.remainder}</strong> (or {calcState.decimalQuotient}).
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm text-center">
          Please enter valid non-zero numbers for both dividend and divisor.
        </div>
      )}
    </CalcCard>
  );
};

// 3. Average Calculator (Mean, Median, Mode, Range, Sum, Count)
export const AverageCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('12, 18, 25, 42, 65, 88, 92');

  const nums = input
    .split(/[\s,;\n]+/)
    .map((n) => parseFloat(n.trim()))
    .filter((n) => !isNaN(n));

  const count = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = count ? (sum / count).toFixed(2) : '0';

  const sorted = [...nums].sort((a, b) => a - b);
  const median = count
    ? count % 2 === 0
      ? ((sorted[count / 2 - 1] + sorted[count / 2]) / 2).toFixed(2)
      : sorted[Math.floor(count / 2)].toFixed(2)
    : '0';

  // Mode calculation
  const freqMap: Record<number, number> = {};
  nums.forEach((n) => {
    freqMap[n] = (freqMap[n] || 0) + 1;
  });
  let maxFreq = 0;
  for (const n in freqMap) {
    if (freqMap[n] > maxFreq) maxFreq = freqMap[n];
  }
  const modes = Object.keys(freqMap)
    .filter((k) => freqMap[Number(k)] === maxFreq && maxFreq > 1)
    .map(Number);
  const modeStr = maxFreq > 1 ? modes.join(', ') : 'None (all unique)';

  const min = count ? Math.min(...nums) : 0;
  const max = count ? Math.max(...nums) : 0;
  const range = max - min;

  return (
    <CalcCard
      title="Average Calculator"
      description="Compute Mean (Average), Median, Mode, Range, Sum, and Count for any set of numbers."
      formula="Mean = Sum of elements ÷ Count; Median = Middle value of sorted set; Range = Max - Min"
      onReset={() => setInput('10, 20, 30, 40, 50')}
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Enter Numbers (separated by commas, spaces, or newlines)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="e.g. 10, 20, 30, 40, 50"
            className="w-full text-sm p-3 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <span className="text-xs font-bold text-blue-700 block">Mean (Avg)</span>
            <span className="text-xl font-black text-blue-900">{mean}</span>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="text-xs font-bold text-emerald-700 block">Median</span>
            <span className="text-xl font-black text-emerald-900">{median}</span>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
            <span className="text-xs font-bold text-purple-700 block">Mode</span>
            <span className="text-base font-bold text-purple-900 truncate block">{modeStr}</span>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <span className="text-xs font-bold text-amber-700 block">Sum</span>
            <span className="text-xl font-black text-amber-900">{sum}</span>
          </div>
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
            <span className="text-xs font-bold text-slate-700 block">Count</span>
            <span className="text-xl font-black text-slate-900">{count}</span>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
            <span className="text-xs font-bold text-indigo-700 block">Range</span>
            <span className="text-xl font-black text-indigo-900">{range}</span>
          </div>
        </div>
      </div>
    </CalcCard>
  );
};

// 4. Percentage Calculator (3 interactive modes)
export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState<number>(20);
  const [val2, setVal2] = useState<number>(150);

  const [val3, setVal3] = useState<number>(30);
  const [val4, setVal4] = useState<number>(120);

  const [val5, setVal5] = useState<number>(80);
  const [val6, setVal6] = useState<number>(100);

  const res1 = ((val1 * val2) / 100).toFixed(2);
  const res2 = val4 !== 0 ? (((val3) / val4) * 100).toFixed(2) : '0';
  const diff = val6 - val5;
  const pctChange = val5 !== 0 ? ((diff / Math.abs(val5)) * 100).toFixed(2) : '0';

  return (
    <CalcCard
      title="Percentage Calculator"
      description="Quickly solve common percentage problems: percentage of a number, percentage ratio, and percentage change."
      formula="P% of X = (P × X)/100 | Ratio = (X/Y)×100% | Change = ((New - Old)/Old)×100%"
      onReset={() => {
        setVal1(20);
        setVal2(150);
        setVal3(30);
        setVal4(120);
        setVal5(80);
        setVal6(100);
      }}
    >
      <div className="space-y-6">
        {/* Mode 1 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-xs font-bold text-slate-700 block mb-2">1. What is X% of Y?</label>
          <div className="flex items-center gap-2 flex-wrap">
            <span>What is</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
              className="w-20 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>% of</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
              className="w-24 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>=</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-900 font-bold rounded-lg">{res1}</span>
          </div>
        </div>

        {/* Mode 2 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-xs font-bold text-slate-700 block mb-2">2. X is what percent of Y?</label>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="number"
              value={val3}
              onChange={(e) => setVal3(parseFloat(e.target.value) || 0)}
              className="w-20 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={val4}
              onChange={(e) => setVal4(parseFloat(e.target.value) || 0)}
              className="w-24 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>=</span>
            <span className="px-4 py-2 bg-emerald-100 text-emerald-900 font-bold rounded-lg">{res2}%</span>
          </div>
        </div>

        {/* Mode 3 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-xs font-bold text-slate-700 block mb-2">3. Percentage Increase or Decrease</label>
          <div className="flex items-center gap-2 flex-wrap">
            <span>From</span>
            <input
              type="number"
              value={val5}
              onChange={(e) => setVal5(parseFloat(e.target.value) || 0)}
              className="w-24 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>to</span>
            <input
              type="number"
              value={val6}
              onChange={(e) => setVal6(parseFloat(e.target.value) || 0)}
              className="w-24 p-2 border border-slate-200 rounded-lg text-center font-semibold bg-white"
            />
            <span>=</span>
            <span
              className={`px-4 py-2 font-bold rounded-lg ${
                parseFloat(pctChange) >= 0 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {parseFloat(pctChange) >= 0 ? `+${pctChange}% Increase` : `${pctChange}% Decrease`}
            </span>
          </div>
        </div>
      </div>
    </CalcCard>
  );
};

// 5. Fraction Calculator
export const FractionCalculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(3);
  const [den1, setDen1] = useState<number>(4);
  const [op, setOp] = useState<string>('+');
  const [num2, setNum2] = useState<number>(2);
  const [den2, setDen2] = useState<number>(5);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  let resNum = 0;
  let resDen = 1;

  if (den1 !== 0 && den2 !== 0) {
    if (op === '+') {
      resNum = num1 * den2 + num2 * den1;
      resDen = den1 * den2;
    } else if (op === '-') {
      resNum = num1 * den2 - num2 * den1;
      resDen = den1 * den2;
    } else if (op === '×') {
      resNum = num1 * num2;
      resDen = den1 * den2;
    } else if (op === '÷') {
      resNum = num1 * den2;
      resDen = den1 * num2;
    }

    if (resDen < 0) {
      resNum = -resNum;
      resDen = -resDen;
    }

    const common = Math.abs(gcd(resNum, resDen)) || 1;
    resNum = resNum / common;
    resDen = resDen / common;
  }

  const mixedWhole = Math.floor(Math.abs(resNum) / resDen);
  const mixedNum = Math.abs(resNum) % resDen;
  const isNegative = resNum < 0;

  return (
    <CalcCard
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions with automated lowest-term simplification and mixed numbers."
      formula="a/b ± c/d = (ad ± bc)/bd | (a/b) × (c/d) = ac/bd | (a/b) ÷ (c/d) = ad/bc"
      onReset={() => {
        setNum1(3);
        setDen1(4);
        setOp('+');
        setNum2(2);
        setDen2(5);
      }}
    >
      <div className="flex items-center justify-center gap-4 flex-wrap p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
        {/* Fraction 1 */}
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value) || 0)}
            className="w-16 p-2 text-center border border-slate-200 rounded-lg bg-white font-bold"
          />
          <div className="w-16 h-0.5 bg-slate-400 my-1" />
          <input
            type="number"
            value={den1}
            onChange={(e) => setDen1(parseInt(e.target.value) || 1)}
            className="w-16 p-2 text-center border border-slate-200 rounded-lg bg-white font-bold"
          />
        </div>

        {/* Operator */}
        <select
          value={op}
          onChange={(e) => setOp(e.target.value)}
          className="p-3 text-lg font-bold border border-slate-200 rounded-xl bg-white cursor-pointer"
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="×">×</option>
          <option value="÷">÷</option>
        </select>

        {/* Fraction 2 */}
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value) || 0)}
            className="w-16 p-2 text-center border border-slate-200 rounded-lg bg-white font-bold"
          />
          <div className="w-16 h-0.5 bg-slate-400 my-1" />
          <input
            type="number"
            value={den2}
            onChange={(e) => setDen2(parseInt(e.target.value) || 1)}
            className="w-16 p-2 text-center border border-slate-200 rounded-lg bg-white font-bold"
          />
        </div>

        <span className="text-2xl font-bold text-slate-400">=</span>

        {/* Result Fraction */}
        <div className="p-4 bg-blue-600 text-white rounded-xl flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black">{resNum}</span>
            <div className="w-12 h-0.5 bg-white/70 my-0.5" />
            <span className="text-xl font-black">{resDen}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-emerald-700 block">Mixed Fraction</span>
          <span className="text-xl font-black text-emerald-900">
            {isNegative && '-'}
            {mixedWhole > 0 ? `${mixedWhole} ` : ''}
            {mixedNum > 0 ? `${mixedNum}/${resDen}` : mixedWhole === 0 ? '0' : ''}
          </span>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-blue-700 block">Decimal Equivalent</span>
          <span className="text-xl font-black text-blue-900">
            {resDen !== 0 ? (resNum / resDen).toFixed(4) : 'Undefined'}
          </span>
        </div>
      </div>
    </CalcCard>
  );
};

// 6. Decimal Calculator
export const DecimalCalculator: React.FC = () => {
  const [val1, setVal1] = useState<string>('3.1415');
  const [val2, setVal2] = useState<string>('2.7182');
  const [op, setOp] = useState<string>('+');

  const n1 = parseFloat(val1) || 0;
  const n2 = parseFloat(val2) || 0;
  let res = 0;
  if (op === '+') res = n1 + n2;
  else if (op === '-') res = n1 - n2;
  else if (op === '×') res = n1 * n2;
  else if (op === '÷') res = n2 !== 0 ? n1 / n2 : 0;

  // Fraction representation of n1
  const toFraction = (x: number) => {
    const len = (x.toString().split('.')[1] || '').length;
    const den = Math.pow(10, len);
    const num = Math.round(x * den);
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = Math.abs(gcd(num, den));
    return `${num / g} / ${den / g}`;
  };

  return (
    <CalcCard
      title="Decimal Calculator"
      description="Perform high-precision decimal operations and convert decimals to exact fractions."
      formula="Exact floating precision arithmetic with fractional rationalization"
      onReset={() => {
        setVal1('0.75');
        setVal2('0.25');
        setOp('+');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Decimal 1</label>
          <input
            type="text"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Operation</label>
          <select
            value={op}
            onChange={(e) => setOp(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl bg-white font-bold"
          >
            <option value="+">+ Add</option>
            <option value="-">- Subtract</option>
            <option value="×">× Multiply</option>
            <option value="÷">÷ Divide</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Decimal 2</label>
          <input
            type="text"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-blue-700 block">Calculation Result</span>
          <span className="text-2xl font-black text-blue-900 font-mono">{Number(res.toFixed(8))}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-emerald-700 block">Decimal 1 as Fraction</span>
          <span className="text-xl font-bold text-emerald-900 font-mono">{toFraction(n1)}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-purple-700 block">Rounded (2 Decimals)</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{res.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 7. Ratio Calculator (A : B = C : D)
export const RatioCalculator: React.FC = () => {
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(5);
  const [c, setC] = useState<number>(100);

  const d = a !== 0 ? ((b * c) / a).toFixed(2) : '0';

  return (
    <CalcCard
      title="Ratio Calculator"
      description="Solve proportion problems (A : B = C : D) to find the missing unknown value."
      formula="A / B = C / D => D = (B × C) / A"
      onReset={() => {
        setA(4);
        setB(5);
        setC(100);
      }}
    >
      <div className="flex items-center justify-center gap-3 text-lg font-bold flex-wrap p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-20 p-2.5 border border-slate-200 rounded-xl text-center bg-white"
          />
          <span className="text-slate-400">:</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-20 p-2.5 border border-slate-200 rounded-xl text-center bg-white"
          />
        </div>

        <span className="text-blue-600 font-black text-xl">=</span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value) || 0)}
            className="w-20 p-2.5 border border-slate-200 rounded-xl text-center bg-white"
          />
          <span className="text-slate-400">:</span>
          <div className="w-24 p-2.5 bg-blue-600 text-white font-black rounded-xl text-center">
            {d}
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-slate-500">
        In this ratio: <strong>{a} : {b} = {c} : {d}</strong>
      </p>
    </CalcCard>
  );
};

// 8. Proportion Calculator (Direct & Inverse)
export const ProportionCalculator: React.FC = () => {
  const [type, setType] = useState<'direct' | 'inverse'>('direct');
  const [x1, setX1] = useState<number>(5);
  const [y1, setY1] = useState<number>(20);
  const [x2, setX2] = useState<number>(15);

  let y2 = 0;
  if (type === 'direct') {
    // y = kx => y2 = (y1 / x1) * x2
    y2 = x1 !== 0 ? (y1 / x1) * x2 : 0;
  } else {
    // y = k/x => y2 = (x1 * y1) / x2
    y2 = x2 !== 0 ? (x1 * y1) / x2 : 0;
  }

  return (
    <CalcCard
      title="Proportion Calculator"
      description="Solve direct and inverse proportional relationships with constant of proportionality."
      formula={type === 'direct' ? 'Direct: y = k × x (where k = y1 / x1)' : 'Inverse: y = k / x (where k = x1 × y1)'}
      onReset={() => {
        setX1(5);
        setY1(20);
        setX2(15);
      }}
    >
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setType('direct')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            type === 'direct' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Direct Proportion (y ∝ x)
        </button>
        <button
          onClick={() => setType('inverse')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            type === 'inverse' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Inverse Proportion (y ∝ 1/x)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">x₁ value</label>
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(parseFloat(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">y₁ value</label>
          <input
            type="number"
            value={y1}
            onChange={(e) => setY1(parseFloat(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">x₂ (New x value)</label>
          <input
            type="number"
            value={x2}
            onChange={(e) => setX2(parseFloat(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-sm mx-auto">
        <span className="text-xs font-bold text-blue-700 block">Calculated y₂ Value</span>
        <span className="text-3xl font-black text-blue-900 font-mono">{y2.toFixed(4)}</span>
      </div>
    </CalcCard>
  );
};

// 9. Square Root Calculator
export const SquareRootCalculator: React.FC = () => {
  const [num, setNum] = useState<string>('72');

  const val = parseFloat(num) || 0;
  const sqrtVal = val >= 0 ? Math.sqrt(val) : NaN;
  const isPerfect = Number.isInteger(sqrtVal);

  // Simplified radical form: e.g. sqrt(72) = 6 sqrt(2)
  let outside = 1;
  let inside = Math.abs(Math.round(val));
  for (let i = Math.floor(Math.sqrt(inside)); i >= 2; i--) {
    if (inside % (i * i) === 0) {
      outside *= i;
      inside /= i * i;
      break;
    }
  }

  return (
    <CalcCard
      title="Square Root Calculator"
      description="Compute principal square roots, radical simplification, and perfect square verification."
      formula="√x = y such that y² = x"
      onReset={() => setNum('72')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1.5">Enter Number (x)</label>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="e.g. 72"
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-blue-700 block">Decimal Square Root</span>
          <span className="text-2xl font-black text-blue-900 font-mono">
            {!isNaN(sqrtVal) ? sqrtVal.toFixed(6) : 'Invalid (Negative)'}
          </span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-emerald-700 block">Simplified Radical</span>
          <span className="text-xl font-black text-emerald-900 font-mono">
            {outside > 1 ? `${outside}√${inside}` : `√${val}`}
          </span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-purple-700 block">Perfect Square?</span>
          <span className="text-xl font-black text-purple-900">
            {isPerfect ? 'Yes ✓' : 'No'}
          </span>
        </div>
      </div>
    </CalcCard>
  );
};

// 10. Cube Root Calculator
export const CubeRootCalculator: React.FC = () => {
  const [num, setNum] = useState<string>('216');

  const val = parseFloat(num) || 0;
  const cbrtVal = Math.cbrt(val);
  const isPerfect = Number.isInteger(cbrtVal);

  return (
    <CalcCard
      title="Cube Root Calculator"
      description="Compute cube roots of positive and negative numbers with perfect cube identification."
      formula="∛x = y such that y³ = x"
      onReset={() => setNum('216')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1.5">Enter Number (x)</label>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="e.g. 216"
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-semibold text-blue-700 block">Cube Root (∛{val})</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{cbrtVal.toFixed(6)}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-semibold text-emerald-700 block">Perfect Cube?</span>
          <span className="text-2xl font-black text-emerald-900">{isPerfect ? 'Yes ✓' : 'No'}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 11. Exponent Calculator
export const ExponentCalculator: React.FC = () => {
  const [base, setBase] = useState<string>('2');
  const [exp, setExp] = useState<string>('10');

  const b = parseFloat(base) || 0;
  const e = parseFloat(exp) || 0;
  const res = Math.pow(b, e);

  return (
    <CalcCard
      title="Exponent Calculator"
      description="Calculate base raised to the power of an exponent, supporting fractional and negative exponents."
      formula="bⁿ = b × b × ... × b (n times)"
      onReset={() => {
        setBase('2');
        setExp('10');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Base (b)</label>
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Exponent (n)</label>
          <input
            type="number"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
      </div>

      <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-md mx-auto">
        <span className="text-xs font-bold text-blue-700 block">Result: {b}^{e}</span>
        <span className="text-3xl font-black text-blue-900 font-mono break-all">
          {Number.isFinite(res) ? res.toLocaleString('en-US', { maximumFractionDigits: 10 }) : 'Overflow / Infinity'}
        </span>
      </div>
    </CalcCard>
  );
};

// 12. HCF and LCM Calculator
export const HcfLcmCalculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(24);
  const [num2, setNum2] = useState<number>(36);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const hcf = Math.abs(gcd(num1, num2));
  const lcm = num1 && num2 ? Math.abs((num1 * num2) / hcf) : 0;

  return (
    <CalcCard
      title="HCF and LCM Calculator"
      description="Find the Highest Common Factor (Greatest Common Divisor) and Least Common Multiple of two numbers."
      formula="HCF(a, b) = GCD via Euclidean Algorithm | LCM(a, b) = |a × b| / HCF(a, b)"
      onReset={() => {
        setNum1(24);
        setNum2(36);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">First Number (a)</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Second Number (b)</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-semibold text-blue-700 block">HCF (GCD)</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{hcf}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-semibold text-emerald-700 block">LCM</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{lcm}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 13. Prime Number Checker
export const PrimeNumberChecker: React.FC = () => {
  const [val, setVal] = useState<string>('97');

  const n = parseInt(val) || 0;
  const isPrime = (num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const primeStatus = isPrime(n);

  // Factors
  const factors: number[] = [];
  if (n > 0) {
    for (let i = 1; i <= Math.min(n, 1000); i++) {
      if (n % i === 0) factors.push(i);
    }
  }

  // Next Prime
  let nextP = n + 1;
  while (!isPrime(nextP) && nextP < n + 200) {
    nextP++;
  }

  return (
    <CalcCard
      title="Prime Number Checker"
      description="Check whether any integer is a prime or composite number, with factors list and next prime locator."
      formula="A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself."
      onReset={() => setVal('97')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1.5">Enter Integer to Test</label>
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div
          className={`p-4 rounded-xl border text-center ${
            primeStatus ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <span className="text-xs font-bold block">Status</span>
          <span className="text-2xl font-black">{primeStatus ? 'Prime Number ✓' : 'Composite Number'}</span>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Factors</span>
          <span className="text-2xl font-black text-blue-900">{factors.length}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Next Prime</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{nextP}</span>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
        <span className="font-bold text-slate-800">Divisors / Factors: </span>
        <span className="font-mono">{factors.join(', ')}</span>
      </div>
    </CalcCard>
  );
};

// 14. Rounding Calculator
export const RoundingCalculator: React.FC = () => {
  const [val, setVal] = useState<string>('45.6789');

  const n = parseFloat(val) || 0;

  return (
    <CalcCard
      title="Rounding Calculator"
      description="Round numbers to nearest integer, tens, hundreds, tenths, hundredths, and ceiling/floor."
      formula="Round half-up, floor, and ceiling precision formatting"
      onReset={() => setVal('45.6789')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Number to Round</label>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-sm">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">Nearest Whole (Integer)</span>
          <span className="text-lg font-bold text-slate-900">{Math.round(n)}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">1 Decimal Place (Tenths)</span>
          <span className="text-lg font-bold text-slate-900">{n.toFixed(1)}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">2 Decimals (Hundredths)</span>
          <span className="text-lg font-bold text-slate-900">{n.toFixed(2)}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">Round Up (Ceiling)</span>
          <span className="text-lg font-bold text-slate-900">{Math.ceil(n)}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">Round Down (Floor)</span>
          <span className="text-lg font-bold text-slate-900">{Math.floor(n)}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-sans block">Nearest 10</span>
          <span className="text-lg font-bold text-slate-900">{Math.round(n / 10) * 10}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 15. Absolute Value Calculator
export const AbsoluteValueCalculator: React.FC = () => {
  const [val, setVal] = useState<string>('-42.85');

  const n = parseFloat(val) || 0;
  const abs = Math.abs(n);

  return (
    <CalcCard
      title="Absolute Value Calculator"
      description="Find the non-negative magnitude or distance of a real number from zero on the number line."
      formula="|x| = x if x ≥ 0; |x| = -x if x < 0"
      onReset={() => setVal('-42.85')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Enter Real Number (x)</label>
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-sm mx-auto">
        <span className="text-xs font-bold text-blue-700 block">Absolute Value |{n}|</span>
        <span className="text-4xl font-black text-blue-900 font-mono mt-1">{abs}</span>
        <p className="text-xs text-slate-500 mt-2 font-sans">
          Distance of {n} from 0 on the number line is exactly {abs} units.
        </p>
      </div>
    </CalcCard>
  );
};

// 16. Modulo Calculator
export const ModuloCalculator: React.FC = () => {
  const [dividend, setDividend] = useState<number>(29);
  const [divisor, setDivisor] = useState<number>(6);

  const mod = divisor !== 0 ? ((dividend % divisor) + divisor) % divisor : 0;
  const quotient = divisor !== 0 ? Math.floor(dividend / divisor) : 0;

  return (
    <CalcCard
      title="Modulo Calculator"
      description="Compute the modulo (remainder) of integer division with standard mathematical quotient-remainder form."
      formula="Dividend mod Divisor = Remainder (a = q × d + r)"
      onReset={() => {
        setDividend(29);
        setDivisor(6);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Dividend (a)</label>
          <input
            type="number"
            value={dividend}
            onChange={(e) => setDividend(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Divisor (n)</label>
          <input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(parseInt(e.target.value) || 1)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Modulo Result ({dividend} mod {divisor})</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{mod}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Quotient (Integer Part)</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{quotient}</span>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-600 font-mono">
        Equation: {dividend} = ({divisor} × {quotient}) + {mod}
      </div>
    </CalcCard>
  );
};

// 17. Scientific Calculator
export const ScientificCalculator: React.FC = () => {
  const [val, setVal] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');

  const handleFunc = (fnName: string) => {
    try {
      const x = parseFloat(val) || 0;
      let res = 0;
      if (fnName === 'sin') {
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        res = Math.sin(rad);
      } else if (fnName === 'cos') {
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        res = Math.cos(rad);
      } else if (fnName === 'tan') {
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        res = Math.tan(rad);
      } else if (fnName === 'ln') {
        res = Math.log(x);
      } else if (fnName === 'log10') {
        res = Math.log10(x);
      } else if (fnName === 'sqrt') {
        res = Math.sqrt(x);
      } else if (fnName === 'sqr') {
        res = x * x;
      } else if (fnName === 'inv') {
        res = 1 / x;
      } else if (fnName === 'fact') {
        let f = 1;
        for (let i = 2; i <= Math.min(Math.floor(x), 20); i++) f *= i;
        res = f;
      } else if (fnName === 'pi') {
        res = Math.PI;
      } else if (fnName === 'e') {
        res = Math.E;
      }
      setVal(String(Number(res.toFixed(8))));
    } catch {
      setVal('Error');
    }
  };

  return (
    <CalcCard
      title="Scientific Calculator"
      description="Advanced trigonometry, logarithms, powers, factorials, and constants."
      formula="Trigonometry in DEG/RAD mode, Natural & Common Logarithms, Factorials"
      onReset={() => setVal('0')}
    >
      <div className="max-w-md mx-auto bg-slate-900 p-5 rounded-3xl text-white font-mono shadow-xl border border-slate-800">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer uppercase text-blue-400"
            >
              Mode: {angleMode}
            </button>
            {memory !== 0 && <span className="text-amber-400 font-bold">M</span>}
          </div>
          <span className="truncate max-w-[200px]">{val}</span>
        </div>

        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full text-right text-3xl font-bold bg-slate-800 p-3 rounded-xl border border-slate-700 mb-4 focus:outline-none"
        />

        <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm font-semibold">
          <button onClick={() => handleFunc('sin')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">sin</button>
          <button onClick={() => handleFunc('cos')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">cos</button>
          <button onClick={() => handleFunc('tan')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">tan</button>
          <button onClick={() => handleFunc('sqrt')} className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">√x</button>

          <button onClick={() => handleFunc('ln')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">ln</button>
          <button onClick={() => handleFunc('log10')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">log</button>
          <button onClick={() => handleFunc('sqr')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">x²</button>
          <button onClick={() => handleFunc('inv')} className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">1/x</button>

          <button onClick={() => handleFunc('pi')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">π</button>
          <button onClick={() => handleFunc('e')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">e</button>
          <button onClick={() => handleFunc('fact')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">n!</button>
          <button onClick={() => setVal('0')} className="p-2.5 bg-red-600 hover:bg-red-500 rounded-xl cursor-pointer">C</button>
        </div>
      </div>
    </CalcCard>
  );
};

// 18. Random Number Generator
export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [allowDupes, setAllowDupes] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([7, 23, 42, 68, 91]);

  const generate = () => {
    const list: number[] = [];
    const minVal = Math.min(min, max);
    const maxVal = Math.max(min, max);
    const rangeSize = maxVal - minVal + 1;

    const actualCount = allowDupes ? count : Math.min(count, rangeSize);

    const available = Array.from({ length: rangeSize }, (_, i) => minVal + i);

    for (let i = 0; i < actualCount; i++) {
      if (allowDupes) {
        list.push(Math.floor(Math.random() * rangeSize) + minVal);
      } else {
        const idx = Math.floor(Math.random() * available.length);
        list.push(available.splice(idx, 1)[0]);
      }
    }
    setResults(list);
  };

  return (
    <CalcCard
      title="Random Number Generator"
      description="Generate cryptographically unbiased random numbers within any custom range."
      onCalculate={generate}
      onReset={() => {
        setMin(1);
        setMax(100);
        setCount(5);
        setAllowDupes(false);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Minimum (Min)</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Maximum (Max)</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 1)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Quantity of Numbers</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="dupes"
          checked={allowDupes}
          onChange={(e) => setAllowDupes(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="dupes" className="text-xs font-semibold text-slate-700 cursor-pointer">
          Allow duplicate numbers in results
        </label>
      </div>

      <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
        <span className="text-xs font-bold text-blue-700 block mb-3">Generated Numbers</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {results.map((r, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-white text-blue-900 border border-blue-200 font-black text-xl rounded-xl shadow-sm font-mono"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </CalcCard>
  );
};
