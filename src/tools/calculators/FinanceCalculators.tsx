import React, { useState } from 'react';
import { CalcCard } from './MathCalculators';

// 27. Discount Calculator
export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [extraDiscount, setExtraDiscount] = useState<number>(0);

  const primaryDiscount = (originalPrice * discountPercent) / 100;
  const afterPrimary = originalPrice - primaryDiscount;
  const additionalDiscount = (afterPrimary * extraDiscount) / 100;
  const finalPrice = Math.max(0, afterPrimary - additionalDiscount);
  const totalSavings = primaryDiscount + additionalDiscount;
  const effectivePct = originalPrice > 0 ? ((totalSavings / originalPrice) * 100).toFixed(1) : '0';

  return (
    <CalcCard
      title="Discount Calculator"
      description="Calculate discounted sale price, cash savings, and stacked coupon discounts."
      formula="Final Price = Original Price × (1 - Discount/100); Savings = Original Price - Final Price"
      onReset={() => {
        setOriginalPrice(120);
        setDiscountPercent(25);
        setExtraDiscount(0);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Original Price ($)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Primary Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Additional Coupon (%) (Optional)</label>
          <input
            type="number"
            value={extraDiscount}
            onChange={(e) => setExtraDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Final Sale Price</span>
          <span className="text-3xl font-black text-emerald-900">${finalPrice.toFixed(2)}</span>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total You Save</span>
          <span className="text-3xl font-black text-blue-900">${totalSavings.toFixed(2)}</span>
        </div>
        <div className="p-5 bg-purple-50 border border-purple-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Effective Total Discount</span>
          <span className="text-3xl font-black text-purple-900">{effectivePct}%</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 28. Profit and Loss Calculator
export const ProfitLossCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState<number>(400);
  const [sellingPrice, setSellingPrice] = useState<number>(550);

  const diff = sellingPrice - costPrice;
  const isProfit = diff >= 0;
  const percentage = costPrice > 0 ? ((Math.abs(diff) / costPrice) * 100).toFixed(2) : '0.00';

  return (
    <CalcCard
      title="Profit and Loss Calculator"
      description="Determine net profit or loss amount and exact percentage return on cost price."
      formula="Profit/Loss = Selling Price - Cost Price; Percentage = (|Profit/Loss| ÷ Cost Price) × 100"
      onReset={() => {
        setCostPrice(400);
        setSellingPrice(550);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Cost Price (CP) ($)</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price (SP) ($)</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`p-5 rounded-2xl border text-center ${
            isProfit ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
          }`}
        >
          <span className={`text-xs font-bold block ${isProfit ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isProfit ? 'Net Profit' : 'Net Loss'}
          </span>
          <span className={`text-3xl font-black ${isProfit ? 'text-emerald-900' : 'text-rose-900'}`}>
            ${Math.abs(diff).toFixed(2)}
          </span>
        </div>
        <div
          className={`p-5 rounded-2xl border text-center ${
            isProfit ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <span className={`text-xs font-bold block ${isProfit ? 'text-blue-700' : 'text-amber-700'}`}>
            {isProfit ? 'Profit Percentage' : 'Loss Percentage'}
          </span>
          <span className={`text-3xl font-black ${isProfit ? 'text-blue-900' : 'text-amber-900'}`}>
            {percentage}%
          </span>
        </div>
      </div>
    </CalcCard>
  );
};

// 29. Markup Calculator
export const MarkupCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(80);
  const [markupPct, setMarkupPct] = useState<number>(35);

  const markupAmount = (cost * markupPct) / 100;
  const sellingPrice = cost + markupAmount;
  const grossMargin = sellingPrice > 0 ? ((markupAmount / sellingPrice) * 100).toFixed(2) : '0';

  return (
    <CalcCard
      title="Markup Calculator"
      description="Compute retail selling price from cost and target markup percentage."
      formula="Markup Amount = Cost × (Markup % / 100); Selling Price = Cost + Markup Amount"
      onReset={() => {
        setCost(80);
        setMarkupPct(35);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Cost Price ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Markup Percentage (%)</label>
          <input
            type="number"
            value={markupPct}
            onChange={(e) => setMarkupPct(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Selling Price</span>
          <span className="text-2xl font-black text-blue-900">${sellingPrice.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Markup Profit</span>
          <span className="text-2xl font-black text-emerald-900">${markupAmount.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Equivalent Margin</span>
          <span className="text-2xl font-black text-purple-900">{grossMargin}%</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 30. Margin Calculator
export const MarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(200);
  const [cost, setCost] = useState<number>(130);

  const profit = Math.max(0, revenue - cost);
  const marginPct = revenue > 0 ? ((profit / revenue) * 100).toFixed(2) : '0';
  const markupPct = cost > 0 ? ((profit / cost) * 100).toFixed(2) : '0';

  return (
    <CalcCard
      title="Margin Calculator"
      description="Compute gross profit margin and compare margin percentage with markup percentage."
      formula="Gross Margin % = ((Revenue - Cost) ÷ Revenue) × 100"
      onReset={() => {
        setRevenue(200);
        setCost(130);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Revenue / Selling Price ($)</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Cost of Goods Sold (COGS) ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Gross Profit Margin</span>
          <span className="text-3xl font-black text-blue-900">{marginPct}%</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Gross Profit</span>
          <span className="text-3xl font-black text-emerald-900">${profit.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Equivalent Markup</span>
          <span className="text-2xl font-black text-slate-800">{markupPct}%</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 31. Simple Interest Calculator
export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(6.5);
  const [timeYears, setTimeYears] = useState<number>(3);

  const interest = (principal * rate * timeYears) / 100;
  const totalAmount = principal + interest;

  return (
    <CalcCard
      title="Simple Interest Calculator"
      description="Calculate simple interest and maturity amount based on principal, rate, and time."
      formula="Simple Interest (SI) = (Principal × Rate × Time) ÷ 100; Total = Principal + SI"
      onReset={() => {
        setPrincipal(10000);
        setRate(6.5);
        setTimeYears(3);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Principal Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Time Period (Years)</label>
          <input
            type="number"
            value={timeYears}
            onChange={(e) => setTimeYears(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Maturity Amount</span>
          <span className="text-3xl font-black text-blue-900">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Total Simple Interest</span>
          <span className="text-3xl font-black text-emerald-900">${interest.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 32. Compound Interest Calculator
export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(5000);
  const [rate, setRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(5);
  const [compoundFreq, setCompoundFreq] = useState<number>(12); // monthly

  const r = rate / 100;
  const n = compoundFreq;
  const t = years;
  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalAmount - principal;

  return (
    <CalcCard
      title="Compound Interest Calculator"
      description="Estimate investment growth over time with annual, quarterly, or monthly compounding."
      formula="A = P(1 + r/n)^(nt); Total Interest = A - P"
      onReset={() => {
        setPrincipal(5000);
        setRate(7.5);
        setYears(5);
        setCompoundFreq(12);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Frequency</label>
          <select
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(parseInt(e.target.value))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl bg-white"
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
          <span className="text-xs font-bold text-blue-700 block">Future Value</span>
          <span className="text-2xl font-black text-blue-900">
            ${finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Total Interest Earned</span>
          <span className="text-2xl font-black text-emerald-900">
            ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Initial Investment</span>
          <span className="text-2xl font-black text-slate-800">${principal.toLocaleString()}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 33. Loan EMI Calculator
export const LoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(15);

  const principal = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate > 0) {
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    emi = principal / totalMonths;
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return (
    <CalcCard
      title="Loan EMI Calculator"
      description="Calculate equal monthly installments (EMI), total interest payable, and overall loan repayment."
      formula="EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ - 1]"
      onReset={() => {
        setLoanAmount(250000);
        setInterestRate(6.5);
        setTenureYears(15);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Interest Rate (% per year)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Tenure (Years)</label>
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Monthly EMI</span>
          <span className="text-3xl font-black text-blue-900">${emi.toFixed(2)}</span>
        </div>
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Total Interest</span>
          <span className="text-3xl font-black text-amber-900">${totalInterest.toFixed(2)}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Total Repayment</span>
          <span className="text-3xl font-black text-emerald-900">${totalPayment.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 34. Sales Tax Calculator
export const SalesTaxCalculator: React.FC = () => {
  const [price, setPrice] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(8.5);

  const taxAmount = (price * taxRate) / 100;
  const totalPrice = price + taxAmount;

  return (
    <CalcCard
      title="Sales Tax Calculator"
      description="Compute state and local sales tax amount and total transaction cost."
      formula="Sales Tax = Net Price × (Tax Rate / 100); Total = Net Price + Sales Tax"
      onReset={() => {
        setPrice(100);
        setTaxRate(8.5);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Price Before Tax ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Sales Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Net Price</span>
          <span className="text-2xl font-black text-slate-800">${price.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Tax Amount</span>
          <span className="text-2xl font-black text-amber-900">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total With Tax</span>
          <span className="text-2xl font-black text-blue-900">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 35. GST Calculator
export const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  let base = 0;
  let gst = 0;
  let total = 0;

  if (mode === 'exclusive') {
    base = amount;
    gst = (amount * rate) / 100;
    total = base + gst;
  } else {
    total = amount;
    base = amount / (1 + rate / 100);
    gst = total - base;
  }

  const halfGst = gst / 2;

  return (
    <CalcCard
      title="GST Calculator"
      description="Calculate Goods and Services Tax (GST) in both inclusive and exclusive modes with CGST and SGST splits."
      formula="Exclusive: GST = (Base × Rate)/100 | Inclusive: GST = Amount - [Amount ÷ (1 + Rate/100)]"
      onReset={() => {
        setAmount(1000);
        setRate(18);
        setMode('exclusive');
      }}
    >
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setMode('exclusive')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            mode === 'exclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          GST Exclusive (Add GST)
        </button>
        <button
          onClick={() => setMode('inclusive')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            mode === 'inclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          GST Inclusive (Extract GST)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            {mode === 'exclusive' ? 'Base Amount ($)' : 'Total Invoice Amount ($)'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">GST Slab Rate (%)</label>
          <select
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl bg-white"
          >
            <option value="5">5% (Essential items)</option>
            <option value="12">12% (Standard goods)</option>
            <option value="18">18% (Standard services)</option>
            <option value="28">28% (Luxury items)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Net Base Price</span>
          <span className="text-xl font-black text-slate-800">${base.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Total GST</span>
          <span className="text-xl font-black text-amber-900">${gst.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">CGST / SGST</span>
          <span className="text-base font-bold text-purple-900">
            ${halfGst.toFixed(2)} each
          </span>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Gross Total</span>
          <span className="text-xl font-black text-blue-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 36. Tip Calculator
export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number>(85);
  const [tipPct, setTipPct] = useState<number>(18);
  const [people, setPeople] = useState<number>(2);

  const tipAmount = (bill * tipPct) / 100;
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmount / people : tipAmount;

  return (
    <CalcCard
      title="Tip Calculator"
      description="Quickly calculate tips and evenly split dinner bills across any party size."
      formula="Tip = Bill × (Tip % / 100); Per Person = (Bill + Tip) ÷ Party Size"
      onReset={() => {
        setBill(85);
        setTipPct(18);
        setPeople(2);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Bill Amount ($)</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Tip Percentage (%)</label>
          <div className="flex gap-1.5 mb-1.5 flex-wrap">
            {[10, 15, 18, 20, 25].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setTipPct(pct)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                  tipPct === pct ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={tipPct}
            onChange={(e) => setTipPct(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-base p-2 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Number of People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total per Person</span>
          <span className="text-2xl font-black text-blue-900">${perPerson.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Tip per Person</span>
          <span className="text-2xl font-black text-emerald-900">${tipPerPerson.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Total Tip</span>
          <span className="text-2xl font-black text-purple-900">${tipAmount.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-700 block">Total Bill</span>
          <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 37. Split Bill Calculator
export const SplitBillCalculator: React.FC = () => {
  const [totalBill, setTotalBill] = useState<number>(150);
  const [numPeople, setNumPeople] = useState<number>(4);
  const [taxAmount, setTaxAmount] = useState<number>(12);
  const [tipAmount, setTipAmount] = useState<number>(25);

  const grandTotal = totalBill + taxAmount + tipAmount;
  const perPerson = numPeople > 0 ? grandTotal / numPeople : grandTotal;

  return (
    <CalcCard
      title="Split Bill Calculator"
      description="Divide group restaurant, grocery, or vacation expenses fairly with tax and tip inclusions."
      formula="Grand Total = Subtotal + Tax + Tip; Each Pays = Grand Total ÷ Number of People"
      onReset={() => {
        setTotalBill(150);
        setNumPeople(4);
        setTaxAmount(12);
        setTipAmount(25);
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Subtotal ($)</label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Tax ($)</label>
          <input
            type="number"
            value={taxAmount}
            onChange={(e) => setTaxAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Tip ($)</label>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Group Size</label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Each Person Pays</span>
          <span className="text-4xl font-black text-blue-900">${perPerson.toFixed(2)}</span>
        </div>
        <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Grand Total Bill</span>
          <span className="text-4xl font-black text-slate-800">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 38. Percentage Increase and Decrease Calculator
export const PercentageIncreaseDecreaseCalculator: React.FC = () => {
  const [initialVal, setInitialVal] = useState<number>(50);
  const [finalVal, setFinalVal] = useState<number>(75);

  const diff = finalVal - initialVal;
  const pctChange = initialVal !== 0 ? ((diff / Math.abs(initialVal)) * 100).toFixed(2) : '0';
  const isIncrease = diff >= 0;

  return (
    <CalcCard
      title="Percentage Increase and Decrease Calculator"
      description="Compute the exact relative percentage increase or decrease between any two numeric quantities."
      formula="Percentage Change = ((Final Value - Initial Value) ÷ |Initial Value|) × 100%"
      onReset={() => {
        setInitialVal(50);
        setFinalVal(75);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Initial Value (From)</label>
          <input
            type="number"
            value={initialVal}
            onChange={(e) => setInitialVal(parseFloat(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Final Value (To)</label>
          <input
            type="number"
            value={finalVal}
            onChange={(e) => setFinalVal(parseFloat(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`p-6 rounded-2xl border text-center ${
            isIncrease ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
          }`}
        >
          <span className={`text-xs font-bold block ${isIncrease ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isIncrease ? 'Percentage Increase' : 'Percentage Decrease'}
          </span>
          <span className={`text-4xl font-black ${isIncrease ? 'text-emerald-900' : 'text-rose-900'}`}>
            {isIncrease ? `+${pctChange}%` : `${pctChange}%`}
          </span>
        </div>
        <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Absolute Difference</span>
          <span className="text-4xl font-black text-slate-800 font-mono">
            {diff > 0 ? `+${diff}` : `${diff}`}
          </span>
        </div>
      </div>
    </CalcCard>
  );
};
