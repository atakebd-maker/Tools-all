import React, { useState } from 'react';
import { DollarSign, Landmark, Calendar, PieChart } from 'lucide-react';

export const LoanEmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const calculateEmi = () => {
    if (principal <= 0 || interestRate <= 0 || tenureYears <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const results = calculateEmi();
  const principalRatio = results.totalPayment > 0 ? Math.round((principal / results.totalPayment) * 100) : 50;
  const interestRatio = 100 - principalRatio;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Loan Amount */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Loan Amount ($)
          </label>
          <input
            type="number"
            min="1000"
            step="1000"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-xl font-bold px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          <input
            type="range"
            min="1000"
            max="1000000"
            step="5000"
            value={principal}
            onChange={(e) => setPrincipal(parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Interest Rate */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full text-xl font-bold px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          <input
            type="range"
            min="1"
            max="25"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Tenure */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={tenureYears}
            onChange={(e) => setTenureYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-xl font-bold px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          <input
            type="range"
            min="1"
            max="30"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Results Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Monthly EMI Payment
          </span>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">
            ${results.emi.toLocaleString()}
          </p>
          <span className="text-xs text-blue-600 mt-1 block">per month</span>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Interest Payable
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            ${results.totalInterest.toLocaleString()}
          </p>
          <span className="text-xs text-slate-500 mt-1 block">over {tenureYears} years</span>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Payment (Principal + Interest)
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            ${results.totalPayment.toLocaleString()}
          </p>
          <span className="text-xs text-slate-500 mt-1 block">total amount paid back</span>
        </div>
      </div>

      {/* Visual Proportion Bar */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-blue-700">Principal: {principalRatio}% (${principal.toLocaleString()})</span>
          <span className="text-amber-700">Interest: {interestRatio}% (${results.totalInterest.toLocaleString()})</span>
        </div>
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100">
          <div style={{ width: `${principalRatio}%` }} className="bg-blue-600 h-full" />
          <div style={{ width: `${interestRatio}%` }} className="bg-amber-500 h-full" />
        </div>
      </div>
    </div>
  );
};
