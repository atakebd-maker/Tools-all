import React, { useState } from 'react';
import { DollarSign, Users, Percent } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number>(75);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [people, setPeople] = useState<number>(2);

  const calculate = () => {
    const billVal = Math.max(0, bill);
    const peopleVal = Math.max(1, people);
    const tipAmount = (billVal * tipPercent) / 100;
    const totalAmount = billVal + tipAmount;
    const tipPerPerson = tipAmount / peopleVal;
    const totalPerPerson = totalAmount / peopleVal;

    return {
      tipAmount,
      totalAmount,
      tipPerPerson,
      totalPerPerson
    };
  };

  const results = calculate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Bill Amount ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={bill || ''}
                onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Tip Percentage: {tipPercent}%
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    tipPercent === pct
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={tipPercent}
              onChange={(e) => setTipPercent(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Split Between People
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-xl text-slate-900 border border-slate-200 py-1.5 rounded-lg">
                {people} {people === 1 ? 'person' : 'people'}
              </div>
              <button
                onClick={() => setPeople(people + 1)}
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase block">Tip Amount</span>
                <span className="text-xs text-slate-500">Total tip added</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                ${results.tipAmount.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase block">Total Bill</span>
                <span className="text-xs text-slate-500">Bill + Tip combined</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ${results.totalAmount.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase block">Each Person Pays</span>
                <span className="text-xs text-slate-400">Total split equally</span>
              </div>
              <div className="text-4xl font-extrabold text-emerald-400">
                ${results.totalPerPerson.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
            Tip per person: ${results.tipPerPerson.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
