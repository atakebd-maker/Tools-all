import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flag, Globe, Clock } from 'lucide-react';

const CITIES = [
  { name: 'UTC', zone: 'UTC' },
  { name: 'New York (EST/EDT)', zone: 'America/New_York' },
  { name: 'London (GMT/BST)', zone: 'Europe/London' },
  { name: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
  { name: 'Dubai (GST)', zone: 'Asia/Dubai' },
  { name: 'Sydney (AEST/AEDT)', zone: 'Australia/Sydney' }
];

export const WorldClockStopwatch: React.FC = () => {
  const [tab, setTab] = useState<'clock' | 'stopwatch'>('clock');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Stopwatch state
  const [swTime, setSwTime] = useState<number>(0); // in ms
  const [swRunning, setSwRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    let swInterval: any = null;
    if (swRunning) {
      const start = Date.now() - swTime;
      swInterval = setInterval(() => {
        setSwTime(Date.now() - start);
      }, 10);
    } else {
      clearInterval(swInterval);
    }
    return () => clearInterval(swInterval);
  }, [swRunning]);

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([swTime, ...laps]);
  };

  const handleResetStopwatch = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab('clock')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'clock' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          World Clock
        </button>
        <button
          onClick={() => setTab('stopwatch')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            tab === 'stopwatch' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Stopwatch with Laps
        </button>
      </div>

      {tab === 'clock' ? (
        <div className="space-y-6">
          {/* Main Hero Clock */}
          <div className="p-8 bg-slate-900 text-white rounded-3xl text-center space-y-2 border border-slate-800 shadow-lg">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Local Device Time
            </span>
            <div className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
              {currentTime.toLocaleTimeString()}
            </div>
            <p className="text-sm text-slate-400 font-medium">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* World Cities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CITIES.map((city) => (
              <div key={city.name} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  {city.name}
                </span>
                <p className="text-2xl font-bold font-mono text-slate-900">
                  {currentTime.toLocaleTimeString('en-US', { timeZone: city.zone, hour12: true })}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {currentTime.toLocaleDateString('en-US', { timeZone: city.zone, month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <div className="text-5xl sm:text-6xl font-extrabold font-mono text-blue-400">
              {formatStopwatch(swTime)}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setSwRunning(!swRunning)}
                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-sm ${
                  swRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {swRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {swRunning ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={handleLap}
                disabled={!swRunning}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <Flag className="w-4 h-4" />
                Lap
              </button>

              <button
                onClick={handleResetStopwatch}
                disabled={swTime === 0}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold text-sm cursor-pointer disabled:opacity-40"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {laps.length > 0 && (
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-left">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
                Recorded Laps ({laps.length})
              </span>
              <div className="divide-y divide-slate-100 font-mono text-xs max-h-48 overflow-y-auto">
                {laps.map((lapMs, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-slate-800">
                    <span className="text-slate-400 font-sans">Lap #{laps.length - idx}</span>
                    <span className="font-bold">{formatStopwatch(lapMs)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
