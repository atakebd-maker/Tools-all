import React, { useState } from 'react';
import { Calendar, Clock, Cake, Sparkles } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [asOfDate, setAsOfDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(asOfDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDiffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(totalDiffMs / (1000 * 60 * 60));

    // Next birthday countdown
    let nextBdayYear = target.getFullYear();
    let nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(nextBdayYear + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysToNextBday
    };
  };

  const age = calculateAge();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Age as of Date
          </label>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {age ? (
        <div className="space-y-4">
          {/* Main Age Card */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Exact Age
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-900 mt-1">
                {age.years} <span className="text-lg font-medium text-blue-700">years</span> {age.months} <span className="text-lg font-medium text-blue-700">months</span> {age.days} <span className="text-lg font-medium text-blue-700">days</span>
              </div>
            </div>

            <div className="text-center sm:text-right bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 uppercase">
                <Cake className="w-4 h-4 text-pink-500" />
                <span>Next Birthday</span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
                in {age.daysToNextBday} {age.daysToNextBday === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Granular breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Days</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{age.totalDays.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Weeks</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{age.totalWeeks.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Hours</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{age.totalHours.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Please select a valid date of birth earlier than the target comparison date.
        </div>
      )}
    </div>
  );
};
