import React, { useState } from 'react';
import { CalcCard } from './MathCalculators';
import { Trophy, Plus, Trash2, TrendingUp, ShieldAlert, Zap } from 'lucide-react';

// Helper: Convert overs string like "10.4" to total legal balls (10 * 6 + 4 = 64 balls)
export function oversToBalls(oversStr: string | number): number {
  const parts = String(oversStr).split('.');
  const overs = parseInt(parts[0], 10) || 0;
  const balls = parseInt(parts[1], 10) || 0;
  return overs * 6 + Math.min(balls, 5);
}

// Helper: Convert total legal balls back to overs notation e.g. 64 balls -> "10.4"
export function ballsToOvers(balls: number): string {
  const o = Math.floor(balls / 6);
  const b = balls % 6;
  return b > 0 ? `${o}.${b}` : `${o}`;
}

// 19. Cricket Batting Average Calculator (Mode A: Summary stats & Mode B: Match-by-match innings)
interface MatchInnings {
  id: string;
  match: string;
  runs: number;
  balls: number;
  isNotOut: boolean;
}

export const CricketBattingAverageCalculator: React.FC = () => {
  const [mode, setMode] = useState<'summary' | 'detailed'>('summary');

  // Mode A: Summary stats
  const [totalRuns, setTotalRuns] = useState<number>(1250);
  const [totalInnings, setTotalInnings] = useState<number>(32);
  const [notOuts, setNotOuts] = useState<number>(7);

  const dismissalsA = Math.max(0, totalInnings - notOuts);
  const battingAvgA = dismissalsA > 0 ? (totalRuns / dismissalsA).toFixed(2) : 'Undefeated (∞)';

  // Mode B: Match-by-match
  const [inningsList, setInningsList] = useState<MatchInnings[]>([
    { id: '1', match: 'Match 1 vs Titans', runs: 74, balls: 52, isNotOut: false },
    { id: '2', match: 'Match 2 vs Lions', runs: 102, balls: 88, isNotOut: true },
    { id: '3', match: 'Match 3 vs Warriors', runs: 45, balls: 31, isNotOut: false },
    { id: '4', match: 'Match 4 vs Kings', runs: 88, balls: 64, isNotOut: true },
  ]);

  const totalRunsB = inningsList.reduce((acc, curr) => acc + curr.runs, 0);
  const notOutsB = inningsList.filter((i) => i.isNotOut).length;
  const dismissalsB = Math.max(0, inningsList.length - notOutsB);
  const battingAvgB = dismissalsB > 0 ? (totalRunsB / dismissalsB).toFixed(2) : 'Undefeated (∞)';
  const highScoreB = inningsList.length > 0 ? Math.max(...inningsList.map((i) => i.runs)) : 0;

  const addInnings = () => {
    setInningsList([
      ...inningsList,
      {
        id: Date.now().toString(),
        match: `Innings #${inningsList.length + 1}`,
        runs: 50,
        balls: 40,
        isNotOut: false,
      },
    ]);
  };

  const removeInnings = (id: string) => {
    setInningsList(inningsList.filter((i) => i.id !== id));
  };

  const updateInnings = (id: string, field: keyof MatchInnings, val: any) => {
    setInningsList(inningsList.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  return (
    <CalcCard
      title="Cricket Batting Average Calculator"
      description="Compute accurate cricket batting averages using official ICC rules where Not Out innings do not count as dismissals."
      formula="Batting Average = Total Runs Scored ÷ Total Dismissals (where Dismissals = Total Innings - Not Outs)"
      onReset={() => {
        setTotalRuns(1250);
        setTotalInnings(32);
        setNotOuts(7);
      }}
    >
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setMode('summary')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            mode === 'summary' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Mode A: Career Summary
        </button>
        <button
          onClick={() => setMode('detailed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            mode === 'detailed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Mode B: Match-by-Match Innings
        </button>
      </div>

      {mode === 'summary' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Total Runs Scored</label>
              <input
                type="number"
                value={totalRuns}
                onChange={(e) => setTotalRuns(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-base p-3 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Total Innings Batted</label>
              <input
                type="number"
                value={totalInnings}
                onChange={(e) => setTotalInnings(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-base p-3 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Times Not Out (*)</label>
              <input
                type="number"
                value={notOuts}
                onChange={(e) => setNotOuts(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-base p-3 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
              <span className="text-xs font-bold text-blue-700 block">Batting Average</span>
              <span className="text-3xl font-black text-blue-900">{battingAvgA}</span>
            </div>
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <span className="text-xs font-bold text-emerald-700 block">Times Dismissed</span>
              <span className="text-3xl font-black text-emerald-900">{dismissalsA}</span>
            </div>
            <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-center">
              <span className="text-xs font-bold text-slate-600 block">Total Runs</span>
              <span className="text-3xl font-black text-slate-800">{totalRuns}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-slate-800">Innings Log</h3>
            <button
              onClick={addInnings}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Innings
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {inningsList.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex-wrap sm:flex-nowrap"
              >
                <input
                  type="text"
                  value={item.match}
                  onChange={(e) => updateInnings(item.id, 'match', e.target.value)}
                  className="flex-1 min-w-[120px] text-xs font-medium p-2 border border-slate-200 rounded-lg bg-white"
                />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Runs:</span>
                  <input
                    type="number"
                    value={item.runs}
                    onChange={(e) => updateInnings(item.id, 'runs', parseInt(e.target.value) || 0)}
                    className="w-16 text-xs font-bold p-2 border border-slate-200 rounded-lg text-center bg-white"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Balls:</span>
                  <input
                    type="number"
                    value={item.balls}
                    onChange={(e) => updateInnings(item.id, 'balls', parseInt(e.target.value) || 0)}
                    className="w-16 text-xs font-bold p-2 border border-slate-200 rounded-lg text-center bg-white"
                  />
                </div>
                <label className="flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-100/60 px-2.5 py-1.5 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isNotOut}
                    onChange={(e) => updateInnings(item.id, 'isNotOut', e.target.checked)}
                    className="w-3.5 h-3.5 text-blue-600 rounded"
                  />
                  Not Out (*)
                </label>
                <button
                  onClick={() => removeInnings(item.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <span className="text-xs font-bold text-blue-700 block">Batting Average</span>
              <span className="text-2xl font-black text-blue-900">{battingAvgB}</span>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs font-bold text-emerald-700 block">Total Runs</span>
              <span className="text-2xl font-black text-emerald-900">{totalRunsB}</span>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <span className="text-xs font-bold text-purple-700 block">High Score</span>
              <span className="text-2xl font-black text-purple-900">{highScoreB}</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <span className="text-xs font-bold text-amber-700 block">Not Outs / Dismissals</span>
              <span className="text-xl font-black text-amber-900">
                {notOutsB}* / {dismissalsB}
              </span>
            </div>
          </div>
        </div>
      )}
    </CalcCard>
  );
};

// 20. Cricket Strike Rate Calculator
export const CricketStrikeRateCalculator: React.FC = () => {
  const [runs, setRuns] = useState<number>(68);
  const [balls, setBalls] = useState<number>(42);

  const strikeRate = balls > 0 ? ((runs / balls) * 100).toFixed(2) : '0.00';
  const runsPerBall = balls > 0 ? (runs / balls).toFixed(2) : '0.00';

  return (
    <CalcCard
      title="Cricket Strike Rate Calculator"
      description="Calculate batsman scoring rate per 100 balls faced."
      formula="Strike Rate (SR) = (Runs Scored ÷ Balls Faced) × 100"
      onReset={() => {
        setRuns(68);
        setBalls(42);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Runs Scored</label>
          <input
            type="number"
            value={runs}
            onChange={(e) => setRuns(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Balls Faced</label>
          <input
            type="number"
            value={balls}
            onChange={(e) => setBalls(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Strike Rate (SR)</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{strikeRate}</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Runs Per Ball (RPB)</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{runsPerBall}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 21. Cricket Bowling Average Calculator
export const CricketBowlingAverageCalculator: React.FC = () => {
  const [runsConceded, setRunsConceded] = useState<number>(36);
  const [wickets, setWickets] = useState<number>(3);
  const [oversBowled, setOversBowled] = useState<string>('4.0');

  const totalBalls = oversToBalls(oversBowled);
  const bowlingAvg = wickets > 0 ? (runsConceded / wickets).toFixed(2) : 'No Wickets';
  const strikeRate = wickets > 0 ? (totalBalls / wickets).toFixed(1) : 'N/A';

  return (
    <CalcCard
      title="Cricket Bowling Average Calculator"
      description="Determine bowler effectiveness: runs conceded per wicket taken and bowling strike rate."
      formula="Bowling Average = Runs Conceded ÷ Wickets Taken | Bowling SR = Legal Balls Bowled ÷ Wickets Taken"
      onReset={() => {
        setRunsConceded(36);
        setWickets(3);
        setOversBowled('4.0');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Runs Conceded</label>
          <input
            type="number"
            value={runsConceded}
            onChange={(e) => setRunsConceded(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Wickets Taken</label>
          <input
            type="number"
            value={wickets}
            onChange={(e) => setWickets(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overs Bowled (e.g. 4.3)</label>
          <input
            type="text"
            value={oversBowled}
            onChange={(e) => setOversBowled(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Bowling Average</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{bowlingAvg}</span>
        </div>
        <div className="p-5 bg-purple-50 border border-purple-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Bowling Strike Rate (Balls / Wicket)</span>
          <span className="text-3xl font-black text-purple-900 font-mono">{strikeRate}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 22. Cricket Economy Rate Calculator
export const CricketEconomyRateCalculator: React.FC = () => {
  const [runsConceded, setRunsConceded] = useState<number>(28);
  const [oversStr, setOversStr] = useState<string>('4.2');

  const totalBalls = oversToBalls(oversStr);
  const decimalOvers = totalBalls / 6;
  const economy = decimalOvers > 0 ? (runsConceded / decimalOvers).toFixed(2) : '0.00';

  return (
    <CalcCard
      title="Cricket Economy Rate Calculator"
      description="Calculate bowler economy rate per 6-ball over, correctly parsing partial overs (e.g. 4.2 overs = 26 balls)."
      formula="Economy Rate = Runs Conceded ÷ (Legal Balls ÷ 6)"
      onReset={() => {
        setRunsConceded(28);
        setOversStr('4.2');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Runs Conceded</label>
          <input
            type="number"
            value={runsConceded}
            onChange={(e) => setRunsConceded(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overs Bowled (e.g. 3.4)</label>
          <input
            type="text"
            value={oversStr}
            onChange={(e) => setOversStr(e.target.value)}
            placeholder="e.g. 4.2"
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Economy Rate</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{economy}</span>
          <span className="text-[11px] text-blue-600">runs per over</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Total Legal Balls</span>
          <span className="text-2xl font-black text-emerald-900 font-mono">{totalBalls}</span>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Decimal Overs</span>
          <span className="text-2xl font-black text-slate-800 font-mono">{decimalOvers.toFixed(2)}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 23. Required Run Rate Calculator
export const RequiredRunRateCalculator: React.FC = () => {
  const [target, setTarget] = useState<number>(185);
  const [currentScore, setCurrentScore] = useState<number>(115);
  const [oversLeftStr, setOversLeftStr] = useState<string>('6.4');

  const runsNeeded = Math.max(0, target - currentScore);
  const ballsLeft = oversToBalls(oversLeftStr);
  const decimalOversLeft = ballsLeft / 6;
  const rrr = decimalOversLeft > 0 ? (runsNeeded / decimalOversLeft).toFixed(2) : '0.00';
  const runsPerBall = ballsLeft > 0 ? (runsNeeded / ballsLeft).toFixed(2) : '0.00';

  return (
    <CalcCard
      title="Required Run Rate Calculator"
      description="Determine required scoring rate to win a run chase given target score and overs remaining."
      formula="Required Run Rate (RRR) = Runs Needed ÷ Overs Remaining"
      onReset={() => {
        setTarget(185);
        setCurrentScore(115);
        setOversLeftStr('6.4');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Target Score (To Win)</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Current Score</label>
          <input
            type="number"
            value={currentScore}
            onChange={(e) => setCurrentScore(parseInt(e.target.value) || 0)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overs Remaining (e.g. 5.2)</label>
          <input
            type="text"
            value={oversLeftStr}
            onChange={(e) => setOversLeftStr(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Required Run Rate (RRR)</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{rrr}</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Runs Needed</span>
          <span className="text-3xl font-black text-amber-900 font-mono">{runsNeeded}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Runs Per Ball</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{runsPerBall}</span>
          <span className="text-[11px] text-emerald-700">({ballsLeft} balls left)</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 24. Current Run Rate Calculator
export const CurrentRunRateCalculator: React.FC = () => {
  const [runs, setRuns] = useState<number>(142);
  const [oversCompletedStr, setOversCompletedStr] = useState<string>('16.3');

  const totalBalls = oversToBalls(oversCompletedStr);
  const oversDecimal = totalBalls / 6;
  const crr = oversDecimal > 0 ? (runs / oversDecimal).toFixed(2) : '0.00';

  const projected20 = oversDecimal > 0 ? Math.round(parseFloat(crr) * 20) : 0;
  const projected50 = oversDecimal > 0 ? Math.round(parseFloat(crr) * 50) : 0;

  return (
    <CalcCard
      title="Current Run Rate Calculator"
      description="Calculate current run rate per over and projected 20-over and 50-over innings totals."
      formula="Current Run Rate (CRR) = Current Runs ÷ Overs Completed"
      onReset={() => {
        setRuns(142);
        setOversCompletedStr('16.3');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Current Runs Scored</label>
          <input
            type="number"
            value={runs}
            onChange={(e) => setRuns(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overs Completed (e.g. 14.5)</label>
          <input
            type="text"
            value={oversCompletedStr}
            onChange={(e) => setOversCompletedStr(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Current Run Rate (CRR)</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{crr}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Projected (T20 - 20 Ov)</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{projected20}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Projected (ODI - 50 Ov)</span>
          <span className="text-3xl font-black text-purple-900 font-mono">{projected50}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 25. Run Chase Calculator
export const RunChaseCalculator: React.FC = () => {
  const [target, setTarget] = useState<number>(200);
  const [currentScore, setCurrentScore] = useState<number>(130);
  const [oversBowledStr, setOversBowledStr] = useState<string>('14.0');
  const [totalMatchOvers, setTotalMatchOvers] = useState<number>(20);
  const [wicketsLost, setWicketsLost] = useState<number>(3);

  const runsNeeded = Math.max(0, target - currentScore);
  const ballsBowled = oversToBalls(oversBowledStr);
  const totalMatchBalls = totalMatchOvers * 6;
  const ballsRemaining = Math.max(0, totalMatchBalls - ballsBowled);
  const oversRemainingDecimal = ballsRemaining / 6;

  const currentRate = ballsBowled > 0 ? ((currentScore / ballsBowled) * 6).toFixed(2) : '0.00';
  const reqRate = oversRemainingDecimal > 0 ? (runsNeeded / oversRemainingDecimal).toFixed(2) : '0.00';

  return (
    <CalcCard
      title="Run Chase Calculator"
      description="Complete second innings chase equation with balls remaining, current vs required run rates, and wickets in hand."
      formula="Chase Equation: Runs Needed = Target - Score; RRR = Runs Needed ÷ (Balls Left / 6)"
      onReset={() => {
        setTarget(200);
        setCurrentScore(130);
        setOversBowledStr('14.0');
        setTotalMatchOvers(20);
        setWicketsLost(3);
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Target</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Current Score</label>
          <input
            type="number"
            value={currentScore}
            onChange={(e) => setCurrentScore(parseInt(e.target.value) || 0)}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overs Bowled</label>
          <input
            type="text"
            value={oversBowledStr}
            onChange={(e) => setOversBowledStr(e.target.value)}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Match Overs</label>
          <input
            type="number"
            value={totalMatchOvers}
            onChange={(e) => setTotalMatchOvers(parseInt(e.target.value) || 20)}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Wickets Lost</label>
          <input
            type="number"
            value={wicketsLost}
            onChange={(e) => setWicketsLost(Math.min(10, parseInt(e.target.value) || 0))}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Needs to Win</span>
          <span className="text-2xl font-black text-blue-900 font-mono">{runsNeeded} runs</span>
          <span className="text-[11px] text-blue-700">off {ballsRemaining} balls</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Required Rate (RRR)</span>
          <span className="text-2xl font-black text-amber-900 font-mono">{reqRate}</span>
          <span className="text-[11px] text-amber-700">rpo</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Current Rate (CRR)</span>
          <span className="text-2xl font-black text-emerald-900 font-mono">{currentRate}</span>
          <span className="text-[11px] text-emerald-700">rpo</span>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-700 block">Wickets in Hand</span>
          <span className="text-2xl font-black text-slate-900 font-mono">{10 - wicketsLost}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 26. Partnership Run Rate Calculator
export const PartnershipRunRateCalculator: React.FC = () => {
  const [runs, setRuns] = useState<number>(85);
  const [balls, setBalls] = useState<number>(56);
  const [bat1Runs, setBat1Runs] = useState<number>(52);
  const [bat2Runs, setBat2Runs] = useState<number>(33);

  const overs = balls / 6;
  const runRate = overs > 0 ? (runs / overs).toFixed(2) : '0.00';
  const strikeRate = balls > 0 ? ((runs / balls) * 100).toFixed(2) : '0.00';

  const bat1Pct = runs > 0 ? ((bat1Runs / runs) * 100).toFixed(1) : '50.0';
  const bat2Pct = runs > 0 ? ((bat2Runs / runs) * 100).toFixed(1) : '50.0';

  return (
    <CalcCard
      title="Partnership Run Rate Calculator"
      description="Calculate partnership run rate, scoring tempo, and individual contribution percentages."
      formula="Partnership Run Rate = Partnership Runs ÷ (Partnership Balls / 6)"
      onReset={() => {
        setRuns(85);
        setBalls(56);
        setBat1Runs(52);
        setBat2Runs(33);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Total Partnership Runs</label>
          <input
            type="number"
            value={runs}
            onChange={(e) => setRuns(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Total Balls Faced</label>
          <input
            type="number"
            value={balls}
            onChange={(e) => setBalls(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Batter 1 Runs</label>
          <input
            type="number"
            value={bat1Runs}
            onChange={(e) => setBat1Runs(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Batter 2 Runs</label>
          <input
            type="number"
            value={bat2Runs}
            onChange={(e) => setBat2Runs(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Partnership Run Rate</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{runRate}</span>
          <span className="text-[11px] text-blue-600">runs per over</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Partnership Strike Rate</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{strikeRate}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Contribution Share</span>
          <span className="text-sm font-bold text-purple-900 block mt-2">
            Batter 1: {bat1Pct}% | Batter 2: {bat2Pct}%
          </span>
        </div>
      </div>
    </CalcCard>
  );
};
