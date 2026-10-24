import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string>('');

  const append = (char: string) => {
    if (display === '0' && char !== '.') {
      setDisplay(char);
    } else {
      setDisplay((prev) => prev + char);
    }
  };

  const clear = () => {
    setDisplay('0');
    setHistory('');
  };

  const backspace = () => {
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
  };

  const calculate = () => {
    try {
      // Clean string for safe evaluation
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Math functions
      expr = expr.replace(/sin\(/g, 'Math.sin(');
      expr = expr.replace(/cos\(/g, 'Math.cos(');
      expr = expr.replace(/tan\(/g, 'Math.tan(');
      expr = expr.replace(/ln\(/g, 'Math.log(');
      expr = expr.replace(/log\(/g, 'Math.log10(');
      expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');

      // Safe JS evaluation with Function
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${expr}`)();
      if (typeof result === 'number' && !isNaN(result)) {
        setHistory(display + ' =');
        setDisplay(Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString());
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const scientificButtons = [
    { label: 'sin', action: () => append('sin(') },
    { label: 'cos', action: () => append('cos(') },
    { label: 'tan', action: () => append('tan(') },
    { label: 'ln', action: () => append('ln(') },
    { label: 'log', action: () => append('log(') },
    { label: '√', action: () => append('sqrt(') },
    { label: 'π', action: () => append('π') },
    { label: 'e', action: () => append('e') },
    { label: '(', action: () => append('(') },
    { label: ')', action: () => append(')') },
    { label: '^', action: () => append('**') },
    { label: '%', action: () => append('/100') }
  ];

  return (
    <div className="max-w-md mx-auto bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 text-white">
      {/* Display Screen */}
      <div className="bg-slate-950 rounded-2xl p-4 mb-5 text-right border border-slate-800/80">
        <div className="h-6 text-xs text-slate-400 font-mono overflow-hidden">
          {history}
        </div>
        <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white overflow-x-auto whitespace-nowrap mt-1">
          {display}
        </div>
      </div>

      {/* Scientific Function Grid */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {scientificButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className="py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-blue-400 font-mono text-sm font-semibold transition-colors cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Standard Keypad Grid */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={clear}
          className="py-3.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 font-bold text-base transition-colors cursor-pointer"
        >
          C
        </button>
        <button
          onClick={backspace}
          className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-base transition-colors cursor-pointer flex items-center justify-center"
        >
          <Delete className="w-5 h-5" />
        </button>
        <button
          onClick={() => append('÷')}
          className="py-3.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold text-lg transition-colors cursor-pointer"
        >
          ÷
        </button>
        <button
          onClick={() => append('×')}
          className="py-3.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold text-lg transition-colors cursor-pointer"
        >
          ×
        </button>

        {['7', '8', '9'].map((n) => (
          <button
            key={n}
            onClick={() => append(n)}
            className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg font-mono transition-colors cursor-pointer"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => append('-')}
          className="py-3.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold text-xl transition-colors cursor-pointer"
        >
          -
        </button>

        {['4', '5', '6'].map((n) => (
          <button
            key={n}
            onClick={() => append(n)}
            className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg font-mono transition-colors cursor-pointer"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => append('+')}
          className="py-3.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold text-xl transition-colors cursor-pointer"
        >
          +
        </button>

        {['1', '2', '3'].map((n) => (
          <button
            key={n}
            onClick={() => append(n)}
            className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg font-mono transition-colors cursor-pointer"
          >
            {n}
          </button>
        ))}
        <button
          onClick={calculate}
          className="row-span-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-2xl transition-colors cursor-pointer shadow-lg shadow-blue-600/30 flex items-center justify-center"
        >
          =
        </button>

        <button
          onClick={() => append('0')}
          className="col-span-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg font-mono transition-colors cursor-pointer"
        >
          0
        </button>
        <button
          onClick={() => append('.')}
          className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg font-mono transition-colors cursor-pointer"
        >
          .
        </button>
      </div>
    </div>
  );
};
