import React, { useState } from 'react';
import { Shuffle, Coins, Dices, HelpCircle, Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const RandomPicker: React.FC = () => {
  const [tab, setTab] = useState<'number' | 'coin' | 'dice' | 'list'>('number');

  // Random Number
  const [numMin, setNumMin] = useState<number>(1);
  const [numMax, setNumMax] = useState<number>(100);
  const [numCount, setNumCount] = useState<number>(1);
  const [allowDupes, setAllowDupes] = useState<boolean>(false);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([42]);

  // Coin Flip
  const [coinResult, setCoinResult] = useState<'Heads' | 'Tails' | null>(null);
  const [flipCount, setFlipCount] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });

  // Dice
  const [diceSides, setDiceSides] = useState<number>(6);
  const [diceCount, setDiceCount] = useState<number>(2);
  const [diceResults, setDiceResults] = useState<number[]>([3, 5]);

  // List Picker
  const [listInput, setListInput] = useState<string>('Option 1\nOption 2\nOption 3\nOption 4');
  const [chosenItem, setChosenItem] = useState<string | null>(null);

  const generateRandomNumbers = () => {
    const min = Math.min(numMin, numMax);
    const max = Math.max(numMin, numMax);
    const range = max - min + 1;
    const count = Math.min(numCount, allowDupes ? 100 : Math.min(range, 100));

    const results: number[] = [];
    if (!allowDupes && range >= count) {
      const set = new Set<number>();
      while (set.size < count) {
        const rand = Math.floor(Math.random() * range) + min;
        set.add(rand);
      }
      results.push(...Array.from(set));
    } else {
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * range) + min);
      }
    }
    setGeneratedNumbers(results);
  };

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    const res = isHeads ? 'Heads' : 'Tails';
    setCoinResult(res);
    setFlipCount((prev) => ({
      heads: prev.heads + (isHeads ? 1 : 0),
      tails: prev.tails + (!isHeads ? 1 : 0)
    }));
  };

  const rollDice = () => {
    const rolls: number[] = [];
    for (let i = 0; i < diceCount; i++) {
      rolls.push(Math.floor(Math.random() * diceSides) + 1);
    }
    setDiceResults(rolls);
  };

  const pickFromList = () => {
    const items = listInput.split('\n').map((s) => s.trim()).filter(Boolean);
    if (items.length === 0) return;
    const pick = items[Math.floor(Math.random() * items.length)];
    setChosenItem(pick);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
        <button
          onClick={() => setTab('number')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'number' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Random Number
        </button>
        <button
          onClick={() => setTab('coin')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'coin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Coin Flipper
        </button>
        <button
          onClick={() => setTab('dice')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'dice' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Dice Roller
        </button>
        <button
          onClick={() => setTab('list')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Choice from List
        </button>
      </div>

      {tab === 'number' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                Minimum
              </label>
              <input
                type="number"
                value={numMin}
                onChange={(e) => setNumMin(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                Maximum
              </label>
              <input
                type="number"
                value={numMax}
                onChange={(e) => setNumMax(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                Count of Numbers
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={numCount}
                onChange={(e) => setNumCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={generateRandomNumbers}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm cursor-pointer transition-colors"
            >
              Generate Random Number{numCount > 1 ? 's' : ''}
            </button>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-3xl text-center border border-slate-800 shadow-xl">
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider block mb-3">
              Generated Result
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {generatedNumbers.map((num, i) => (
                <span
                  key={i}
                  className="px-5 py-3 rounded-2xl bg-slate-800 text-3xl font-extrabold font-mono text-white border border-slate-700"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'coin' && (
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-400 border-4 border-amber-200 shadow-xl flex items-center justify-center text-slate-900 font-extrabold text-xl">
              {coinResult || 'Flip!'}
            </div>

            <div className="text-2xl font-bold text-white">
              {coinResult ? `It's ${coinResult}!` : 'Click below to flip the coin'}
            </div>

            <button
              onClick={flipCoin}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl cursor-pointer shadow-md transition-colors"
            >
              Flip Coin
            </button>
          </div>

          <div className="flex justify-around p-4 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700">
            <div>Heads: {flipCount.heads}</div>
            <div className="border-r border-slate-200" />
            <div>Tails: {flipCount.tails}</div>
          </div>
        </div>
      )}

      {tab === 'dice' && (
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div className="flex justify-center gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Dice Type</label>
              <select
                value={diceSides}
                onChange={(e) => setDiceSides(parseInt(e.target.value))}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
              >
                <option value={6}>D6 (6-sided)</option>
                <option value={10}>D10 (10-sided)</option>
                <option value={20}>D20 (20-sided)</option>
                <option value={100}>D100 (Percentile)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Number of Dice</label>
              <input
                type="number"
                min="1"
                max="6"
                value={diceCount}
                onChange={(e) => setDiceCount(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center"
              />
            </div>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              {diceResults.map((roll, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-2xl bg-white text-slate-900 font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-slate-200"
                >
                  {roll}
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-400">
              Total Sum: <span className="font-bold text-white text-lg">{diceResults.reduce((a, b) => a + b, 0)}</span>
            </div>

            <button
              onClick={rollDice}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md transition-colors"
            >
              Roll Dice
            </button>
          </div>
        </div>
      )}

      {tab === 'list' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Enter Options (One per line)
            </label>
            <textarea
              rows={6}
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={pickFromList}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer shadow-sm transition-colors flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Pick Random Option
            </button>
          </div>

          {chosenItem && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Winner Selected
              </span>
              <p className="text-2xl font-extrabold text-emerald-900">{chosenItem}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
