import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const getDuration = (m: 'work' | 'shortBreak' | 'longBreak') => {
    if (m === 'work') return 25 * 60;
    if (m === 'shortBreak') return 5 * 60;
    return 15 * 60;
  };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext unavailable
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playBeep();
      setIsRunning(false);
      if (mode === 'work') {
        setCompletedCycles((c) => c + 1);
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDuration(newMode));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const total = getDuration(mode);
  const progressPercent = Math.round(((total - timeLeft) / total) * 100);

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      {/* Mode Buttons */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-xl">
        <button
          onClick={() => switchMode('work')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mode === 'work' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pomodoro (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mode === 'shortBreak' ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mode === 'longBreak' ? 'bg-white shadow-xs text-purple-600' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Main Countdown Display */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight text-blue-400">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-full transition-all duration-300 ${
              mode === 'work' ? 'bg-blue-600' : mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-purple-500'
            }`}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-colors ${
              isRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Start Focus'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-around text-xs text-slate-600">
        <div>
          <span className="font-semibold uppercase text-slate-400 block text-[10px]">Completed Focus Cycles</span>
          <span className="text-lg font-bold text-slate-900">{completedCycles} 🍅</span>
        </div>
        <div className="border-l border-slate-200 pl-4">
          <span className="font-semibold uppercase text-slate-400 block text-[10px]">Session Status</span>
          <span className="font-bold text-blue-600 capitalize">{mode === 'work' ? 'Focus Session' : 'Rest Break'}</span>
        </div>
      </div>
    </div>
  );
};
