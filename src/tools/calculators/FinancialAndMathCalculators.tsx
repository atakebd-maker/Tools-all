import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Clock, Percent, Scale, TrendingUp, Thermometer } from 'lucide-react';

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
      // safe eval of math
      const res = Function(`"use strict"; return (${full})`)();
      setDisplay(String(Number(res.toFixed(8))));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="max-w-xs mx-auto bg-slate-900 p-5 rounded-3xl shadow-xl border border-slate-800 text-white font-mono">
      <div className="text-right text-xs text-slate-400 h-5 mb-1 truncate">{equation}</div>
      <div className="text-right text-3xl font-bold mb-4 tracking-tight truncate bg-slate-800 p-3 rounded-xl border border-slate-700">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
        <button onClick={handleClear} className="p-3 bg-red-600/80 hover:bg-red-600 rounded-xl cursor-pointer">C</button>
        <button onClick={() => setDisplay((p) => String(-parseFloat(p) || 0))} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer">±</button>
        <button onClick={() => setDisplay((p) => String(parseFloat(p) / 100 || 0))} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer">%</button>
        <button onClick={() => handleOperator('÷')} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-xl cursor-pointer">÷</button>

        <button onClick={() => handleDigit('7')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">7</button>
        <button onClick={() => handleDigit('8')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">8</button>
        <button onClick={() => handleDigit('9')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">9</button>
        <button onClick={() => handleOperator('×')} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-xl cursor-pointer">×</button>

        <button onClick={() => handleDigit('4')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">4</button>
        <button onClick={() => handleDigit('5')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">5</button>
        <button onClick={() => handleDigit('6')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">6</button>
        <button onClick={() => handleOperator('-')} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-xl cursor-pointer">-</button>

        <button onClick={() => handleDigit('1')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">1</button>
        <button onClick={() => handleDigit('2')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">2</button>
        <button onClick={() => handleDigit('3')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">3</button>
        <button onClick={() => handleOperator('+')} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-xl cursor-pointer">+</button>

        <button onClick={() => handleDigit('0')} className="col-span-2 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">0</button>
        <button onClick={() => handleDigit('.')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer">.</button>
        <button onClick={handleEqual} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer">=</button>
      </div>
    </div>
  );
};

// 2. Date Difference Calculator
export const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2025-01-01');
  const [endDate, setEndDate] = useState<string>('2026-12-31');

  const diffMs = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) || 0;
  const diffWeeks = (diffDays / 7).toFixed(1);
  const diffMonths = (diffDays / 30.4375).toFixed(1);
  const diffYears = (diffDays / 365.25).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-2xl font-black text-blue-900">{diffDays}</p>
          <p className="text-xs text-blue-700 font-semibold">Total Days</p>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <p className="text-2xl font-black text-emerald-900">{diffWeeks}</p>
          <p className="text-xs text-emerald-700 font-semibold">Weeks</p>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <p className="text-2xl font-black text-purple-900">{diffMonths}</p>
          <p className="text-xs text-purple-700 font-semibold">Months</p>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <p className="text-2xl font-black text-slate-800">{diffYears}</p>
          <p className="text-xs text-slate-600 font-semibold">Years</p>
        </div>
      </div>
    </div>
  );
};

// 3. Time Calculator
export const TimeCalculator: React.FC = () => {
  const [hours1, setHours1] = useState<number>(2);
  const [mins1, setMins1] = useState<number>(45);
  const [hours2, setHours2] = useState<number>(1);
  const [mins2, setMins2] = useState<number>(30);
  const [op, setOp] = useState<'add' | 'sub'>('add');

  const totalMin1 = hours1 * 60 + mins1;
  const totalMin2 = hours2 * 60 + mins2;
  const resultMins = op === 'add' ? totalMin1 + totalMin2 : Math.max(0, totalMin1 - totalMin2);

  const resH = Math.floor(resultMins / 60);
  const resM = resultMins % 60;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
          <input
            type="number"
            value={hours1}
            onChange={(e) => setHours1(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span className="text-xs font-bold text-slate-600">hrs</span>
          <input
            type="number"
            value={mins1}
            onChange={(e) => setMins1(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span className="text-xs font-bold text-slate-600">mins</span>
        </div>

        <select
          value={op}
          onChange={(e) => setOp(e.target.value as any)}
          className="p-2 border border-slate-200 rounded-lg font-bold text-sm bg-white"
        >
          <option value="add">+ Add</option>
          <option value="sub">- Subtract</option>
        </select>

        <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
          <input
            type="number"
            value={hours2}
            onChange={(e) => setHours2(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span className="text-xs font-bold text-slate-600">hrs</span>
          <input
            type="number"
            value={mins2}
            onChange={(e) => setMins2(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span className="text-xs font-bold text-slate-600">mins</span>
        </div>
      </div>

      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-sm mx-auto">
        <p className="text-3xl font-black text-blue-900">{resH} Hours {resM} Mins</p>
        <p className="text-xs text-blue-700 mt-1">Total: {resultMins} minutes ({Number((resultMins / 60).toFixed(2))} decimal hours)</p>
      </div>
    </div>
  );
};

// 4. Discount Calculator
export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  const discountAmount = (price * discountPercent) / 100;
  const finalPrice = Math.max(0, price - discountAmount);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Original Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <p className="text-3xl font-black text-emerald-900">${finalPrice.toFixed(2)}</p>
          <p className="text-xs text-emerald-700 font-bold mt-1">Final Price</p>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <p className="text-3xl font-black text-blue-900">${discountAmount.toFixed(2)}</p>
          <p className="text-xs text-blue-700 font-bold mt-1">You Save ({discountPercent}%)</p>
        </div>
      </div>
    </div>
  );
};

// 5. GST / VAT Calculator
export const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  let gstAmount = 0;
  let totalAmount = 0;
  let baseAmount = 0;

  if (mode === 'exclusive') {
    baseAmount = amount;
    gstAmount = (amount * rate) / 100;
    totalAmount = baseAmount + gstAmount;
  } else {
    totalAmount = amount;
    baseAmount = amount / (1 + rate / 100);
    gstAmount = totalAmount - baseAmount;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setMode('exclusive')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'exclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          GST Exclusive (Add GST)
        </button>
        <button
          onClick={() => setMode('inclusive')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            mode === 'inclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          GST Inclusive (Extract GST)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            {mode === 'exclusive' ? 'Base Amount' : 'Total Invoice Amount'} ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">GST / VAT Rate (%)</label>
          <select
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white"
          >
            <option value="5">5% (Essential)</option>
            <option value="12">12% (Standard)</option>
            <option value="18">18% (Services & General)</option>
            <option value="28">28% (Luxury)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <p className="text-xl font-bold text-slate-800">${baseAmount.toFixed(2)}</p>
          <p className="text-xs text-slate-500 font-medium">Net Price</p>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-xl font-bold text-amber-900">${gstAmount.toFixed(2)}</p>
          <p className="text-xs text-amber-700 font-medium">GST Amount</p>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-xl font-bold text-blue-900">${totalAmount.toFixed(2)}</p>
          <p className="text-xs text-blue-700 font-medium">Gross Total</p>
        </div>
      </div>
    </div>
  );
};

// 6. Average Calculator
export const AverageCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('12, 18, 25, 42, 65, 88, 92');

  const nums = input
    .split(/[\s,]+/)
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

  const min = count ? Math.min(...nums) : 0;
  const max = count ? Math.max(...nums) : 0;
  const range = max - min;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">Enter Numbers (separated by commas or spaces)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full text-sm p-3 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-2xl font-black text-blue-900">{mean}</p>
          <p className="text-xs text-blue-700 font-bold">Mean (Average)</p>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <p className="text-2xl font-black text-emerald-900">{median}</p>
          <p className="text-xs text-emerald-700 font-bold">Median</p>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <p className="text-2xl font-black text-purple-900">{sum}</p>
          <p className="text-xs text-purple-700 font-bold">Sum ({count} items)</p>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <p className="text-2xl font-black text-slate-800">{range}</p>
          <p className="text-xs text-slate-600 font-bold">Range ({min} - {max})</p>
        </div>
      </div>
    </div>
  );
};

// 7. Ratio Calculator
export const RatioCalculator: React.FC = () => {
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(5);
  const [c, setC] = useState<number>(100);

  // Solve A/B = C/D => D = (B * C) / A
  const d = a ? ((b * c) / a).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-xs font-bold text-slate-600">Solve for D in proportion: A : B = C : D</p>
      </div>

      <div className="flex items-center justify-center gap-3 text-lg font-bold flex-wrap">
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span>:</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
        </div>

        <span className="text-blue-600">=</span>

        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value) || 0)}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center"
          />
          <span>:</span>
          <div className="w-16 p-2 bg-blue-100 border border-blue-300 rounded-lg text-center text-blue-900">
            {d}
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-slate-500">
        Result: <strong>{a} : {b} = {c} : {d}</strong>
      </p>
    </div>
  );
};

// 8. Compound Interest Calculator
export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(5000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(5);
  const [compoundFreq, setCompoundFreq] = useState<number>(12); // monthly

  // A = P * (1 + r/n)^(n*t)
  const r = rate / 100;
  const n = compoundFreq;
  const t = years;
  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalAmount - principal;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Initial Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Time Horizon (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Compounding Frequency</label>
          <select
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(parseInt(e.target.value))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white"
          >
            <option value="12">Monthly (12/yr)</option>
            <option value="4">Quarterly (4/yr)</option>
            <option value="1">Annually (1/yr)</option>
            <option value="365">Daily (365/yr)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <p className="text-2xl font-black text-blue-900">${finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-blue-700 font-bold mt-1">Future Value</p>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <p className="text-2xl font-black text-emerald-900">${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-emerald-700 font-bold mt-1">Total Interest Earned</p>
        </div>
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <p className="text-2xl font-black text-slate-800">${principal.toLocaleString()}</p>
          <p className="text-xs text-slate-600 font-bold mt-1">Original Investment</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        Disclaimer: Results are mathematical estimates for planning purposes.
      </p>
    </div>
  );
};

// 9. Temperature Converter
export const TemperatureConverter: React.FC = () => {
  const [val, setVal] = useState<number>(25);
  const [fromUnit, setFromUnit] = useState<'C' | 'F' | 'K'>('C');

  let c = 0;
  if (fromUnit === 'C') c = val;
  else if (fromUnit === 'F') c = ((val - 32) * 5) / 9;
  else if (fromUnit === 'K') c = val - 273.15;

  const f = (c * 9) / 5 + 32;
  const k = c + 273.15;

  return (
    <div className="space-y-6">
      <div className="flex gap-3 max-w-sm mx-auto">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
          className="flex-1 text-sm p-3 border border-slate-200 rounded-xl"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value as any)}
          className="p-3 border border-slate-200 rounded-xl bg-white text-sm font-semibold"
        >
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
          <option value="K">Kelvin (K)</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-xl font-black text-blue-900">{c.toFixed(2)} °C</p>
          <p className="text-xs text-blue-700 font-semibold">Celsius</p>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-xl font-black text-amber-900">{f.toFixed(2)} °F</p>
          <p className="text-xs text-amber-700 font-semibold">Fahrenheit</p>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <p className="text-xl font-black text-purple-900">{k.toFixed(2)} K</p>
          <p className="text-xs text-purple-700 font-semibold">Kelvin</p>
        </div>
      </div>
    </div>
  );
};
