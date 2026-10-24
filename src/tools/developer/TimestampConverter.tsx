import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const TimestampConverter: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [copiedKey, setCopiedKey] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDecodedDate = () => {
    const num = parseInt(inputTimestamp, 10);
    if (isNaN(num)) return null;
    // Auto-detect seconds vs milliseconds
    const ms = inputTimestamp.length > 11 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;

    return {
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      iso: d.toISOString(),
      relative: getRelativeTimeString(d)
    };
  };

  const getRelativeTimeString = (d: Date): string => {
    const diffSec = Math.floor((d.getTime() - Date.now()) / 1000);
    const abs = Math.abs(diffSec);
    const prefix = diffSec < 0 ? 'ago' : 'from now';
    if (abs < 60) return `${abs} seconds ${prefix}`;
    if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${prefix}`;
    if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${prefix}`;
    return `${Math.floor(abs / 86400)} days ${prefix}`;
  };

  const getTimestampFromDate = () => {
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime()
    };
  };

  const decoded = getDecodedDate();
  const dateToTs = getTimestampFromDate();

  const handleCopy = async (val: string, key: string) => {
    await copyToClipboard(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Current Live Epoch */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Current Unix Epoch Timestamp</span>
            <p className="text-2xl font-mono font-bold text-white mt-0.5">{currentTimestamp}</p>
          </div>
        </div>

        <button
          onClick={() => handleCopy(currentTimestamp.toString(), 'current')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copiedKey === 'current' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copiedKey === 'current' ? 'Copied' : 'Copy Timestamp'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Unix Timestamp → Human Date
          </h3>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Enter Timestamp (seconds or milliseconds)
            </label>
            <input
              type="text"
              value={inputTimestamp}
              onChange={(e) => setInputTimestamp(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {decoded ? (
            <div className="space-y-2 pt-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">UTC Time</span>
                  <span className="font-semibold text-slate-800">{decoded.utc}</span>
                </div>
                <button
                  onClick={() => handleCopy(decoded.utc, 'utc')}
                  className="text-slate-400 hover:text-blue-600 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Local Time</span>
                  <span className="font-semibold text-slate-800">{decoded.local}</span>
                </div>
                <button
                  onClick={() => handleCopy(decoded.local, 'local')}
                  className="text-slate-400 hover:text-blue-600 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Relative</span>
                  <span className="font-semibold text-slate-800">{decoded.relative}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              Invalid timestamp number.
            </p>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Date → Unix Timestamp
          </h3>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {dateToTs && (
            <div className="space-y-2 pt-2 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-blue-600 font-semibold block uppercase text-[10px]">Seconds Timestamp</span>
                  <span className="font-mono font-bold text-blue-900 text-sm">{dateToTs.seconds}</span>
                </div>
                <button
                  onClick={() => handleCopy(dateToTs.seconds.toString(), 'tsSec')}
                  className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Milliseconds Timestamp</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{dateToTs.milliseconds}</span>
                </div>
                <button
                  onClick={() => handleCopy(dateToTs.milliseconds.toString(), 'tsMs')}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
