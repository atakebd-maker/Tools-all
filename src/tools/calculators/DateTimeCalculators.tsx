import React, { useState, useEffect } from 'react';
import { CalcCard } from './MathCalculators';
import { Calendar, Clock, Timer, Hourglass, ArrowRight } from 'lucide-react';

// 39. Age Calculator
export const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState<string>('2000-05-15');
  const [targetDate, setTargetDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  const calcAge = () => {
    const birth = new Date(dob);
    const target = new Date(targetDate);
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next birthday
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalHours, daysToNextBday };
  };

  const res = calcAge();

  return (
    <CalcCard
      title="Age Calculator"
      description="Calculate exact age in years, months, and days, total days lived, and countdown to next birthday."
      formula="Chronological Gregorian calendar age calculation accounting for leap years"
      onReset={() => {
        setDob('2000-01-01');
        setTargetDate(new Date().toISOString().split('T')[0]);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Age as of Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {res ? (
        <div className="space-y-4">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center">
            <span className="text-xs font-bold text-blue-700 block">Exact Age</span>
            <span className="text-3xl sm:text-4xl font-black text-blue-900 block mt-1">
              {res.years} Years, {res.months} Months, {res.days} Days
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs font-bold text-emerald-700 block">Total Days</span>
              <span className="text-2xl font-black text-emerald-900">{res.totalDays.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <span className="text-xs font-bold text-purple-700 block">Total Weeks</span>
              <span className="text-2xl font-black text-purple-900">{res.totalWeeks.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <span className="text-xs font-bold text-amber-700 block">Total Hours</span>
              <span className="text-2xl font-black text-amber-900">{res.totalHours.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
              <span className="text-xs font-bold text-slate-600 block">Next Birthday in</span>
              <span className="text-2xl font-black text-slate-800">{res.daysToNextBday} days</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm text-center">
          Please select a valid date of birth earlier than the target date.
        </div>
      )}
    </CalcCard>
  );
};

// 40. Date Difference Calculator
export const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2025-01-01');
  const [endDate, setEndDate] = useState<string>('2025-12-31');

  const diffMs = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) || 0;
  const diffWeeks = (diffDays / 7).toFixed(1);
  const diffMonths = (diffDays / 30.4375).toFixed(1);
  const diffYears = (diffDays / 365.25).toFixed(2);

  return (
    <CalcCard
      title="Date Difference Calculator"
      description="Find the precise duration between two calendar dates in days, weeks, months, and years."
      formula="Time Difference = |End Date - Start Date| in milliseconds converted to calendar units"
      onReset={() => {
        setStartDate('2025-01-01');
        setEndDate('2025-12-31');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Days</span>
          <span className="text-3xl font-black text-blue-900">{diffDays}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Weeks</span>
          <span className="text-3xl font-black text-emerald-900">{diffWeeks}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Months</span>
          <span className="text-3xl font-black text-purple-900">{diffMonths}</span>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Years</span>
          <span className="text-3xl font-black text-slate-800">{diffYears}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 41. Days Between Dates Calculator
export const DaysBetweenDatesCalculator: React.FC = () => {
  const [d1, setD1] = useState<string>('2025-06-01');
  const [d2, setD2] = useState<string>('2025-06-30');
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(true);

  const start = new Date(d1);
  const end = new Date(d2);
  let totalDays = Math.floor(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (includeEndDay) totalDays += 1;

  // Weekdays vs Weekend count
  let weekdays = 0;
  let weekends = 0;
  const cur = new Date(Math.min(start.getTime(), end.getTime()));
  const finish = new Date(Math.max(start.getTime(), end.getTime()));

  while (cur <= finish) {
    const dayOfWeek = cur.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) weekends++;
    else weekdays++;
    cur.setDate(cur.getDate() + 1);
  }

  return (
    <CalcCard
      title="Days Between Dates Calculator"
      description="Count total calendar days, working business days, and weekends between two dates."
      formula="Calendar days count with inclusive/exclusive boundary options"
      onReset={() => {
        setD1('2025-06-01');
        setD2('2025-06-30');
        setIncludeEndDay(true);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">First Date</label>
          <input
            type="date"
            value={d1}
            onChange={(e) => setD1(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Second Date</label>
          <input
            type="date"
            value={d2}
            onChange={(e) => setD2(e.target.value)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="incEnd"
          checked={includeEndDay}
          onChange={(e) => setIncludeEndDay(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="incEnd" className="text-xs font-semibold text-slate-700 cursor-pointer">
          Include end day in total count (+1 day)
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Days</span>
          <span className="text-3xl font-black text-blue-900">{totalDays}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Weekdays (Mon-Fri)</span>
          <span className="text-3xl font-black text-emerald-900">{weekdays}</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Weekend Days</span>
          <span className="text-3xl font-black text-purple-900">{weekends}</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 42. Time Duration Calculator
export const TimeDurationCalculator: React.FC = () => {
  const [h1, setH1] = useState<number>(3);
  const [m1, setM1] = useState<number>(45);
  const [h2, setH2] = useState<number>(2);
  const [m2, setM2] = useState<number>(20);
  const [op, setOp] = useState<'add' | 'sub'>('add');

  const min1 = h1 * 60 + m1;
  const min2 = h2 * 60 + m2;
  const resultMins = op === 'add' ? min1 + min2 : Math.max(0, min1 - min2);

  const resH = Math.floor(resultMins / 60);
  const resM = resultMins % 60;

  return (
    <CalcCard
      title="Time Duration Calculator"
      description="Add or subtract hours and minutes with instant total duration."
      formula="Total Minutes = (H1 × 60 + M1) ± (H2 × 60 + M2)"
      onReset={() => {
        setH1(3);
        setM1(45);
        setH2(2);
        setM2(20);
        setOp('add');
      }}
    >
      <div className="flex items-center justify-center gap-4 flex-wrap p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
        <div className="flex gap-2 items-center bg-white p-3 rounded-xl border border-slate-200">
          <input
            type="number"
            value={h1}
            onChange={(e) => setH1(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center font-bold"
          />
          <span className="text-xs font-bold text-slate-600">hrs</span>
          <input
            type="number"
            value={m1}
            onChange={(e) => setM1(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center font-bold"
          />
          <span className="text-xs font-bold text-slate-600">mins</span>
        </div>

        <select
          value={op}
          onChange={(e) => setOp(e.target.value as any)}
          className="p-3 border border-slate-200 rounded-xl font-bold bg-white cursor-pointer"
        >
          <option value="add">+ Add</option>
          <option value="sub">- Subtract</option>
        </select>

        <div className="flex gap-2 items-center bg-white p-3 rounded-xl border border-slate-200">
          <input
            type="number"
            value={h2}
            onChange={(e) => setH2(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center font-bold"
          />
          <span className="text-xs font-bold text-slate-600">hrs</span>
          <input
            type="number"
            value={m2}
            onChange={(e) => setM2(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            className="w-16 p-2 border border-slate-200 rounded-lg text-center font-bold"
          />
          <span className="text-xs font-bold text-slate-600">mins</span>
        </div>
      </div>

      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-sm mx-auto">
        <span className="text-xs font-bold text-blue-700 block">Total Duration</span>
        <span className="text-3xl font-black text-blue-900 mt-1 block">
          {resH}h {resM}m
        </span>
        <span className="text-xs text-blue-600 mt-1 block">
          {resultMins} total minutes ({(resultMins / 60).toFixed(2)} decimal hours)
        </span>
      </div>
    </CalcCard>
  );
};

// 43. Hours to Minutes Converter
export const HoursToMinutesConverter: React.FC = () => {
  const [hours, setHours] = useState<string>('2.75');

  const h = parseFloat(hours) || 0;
  const totalMins = h * 60;
  const totalSecs = totalMins * 60;
  const formattedH = Math.floor(h);
  const formattedM = Math.round((h - formattedH) * 60);

  return (
    <CalcCard
      title="Hours to Minutes Converter"
      description="Convert decimal hours into minutes, seconds, and clock hours/minutes format."
      formula="Minutes = Hours × 60; Seconds = Hours × 3,600"
      onReset={() => setHours('2.75')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Enter Hours</label>
        <input
          type="number"
          step="0.05"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Minutes</span>
          <span className="text-3xl font-black text-blue-900">{totalMins} min</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Formatted Duration</span>
          <span className="text-2xl font-black text-emerald-900">{formattedH}h {formattedM}m</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Total Seconds</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{totalSecs.toLocaleString()}s</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 44. Minutes to Seconds Converter
export const MinutesToSecondsConverter: React.FC = () => {
  const [minutes, setMinutes] = useState<string>('45.5');

  const m = parseFloat(minutes) || 0;
  const secs = m * 60;
  const hrs = (m / 60).toFixed(4);

  return (
    <CalcCard
      title="Minutes to Seconds Converter"
      description="Convert minutes to seconds and fractional hours."
      formula="Seconds = Minutes × 60; Hours = Minutes ÷ 60"
      onReset={() => setMinutes('45.5')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Enter Minutes</label>
        <input
          type="number"
          step="0.1"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Total Seconds</span>
          <span className="text-3xl font-black text-blue-900 font-mono">{secs.toLocaleString()} seconds</span>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Hours Equivalent</span>
          <span className="text-3xl font-black text-emerald-900 font-mono">{hrs} hours</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 45. Countdown Calculator
export const CountdownCalculator: React.FC = () => {
  const [targetDatetime, setTargetDatetime] = useState<string>('2026-01-01T00:00');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDatetime).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDatetime]);

  return (
    <CalcCard
      title="Countdown Calculator"
      description="Live real-time countdown timer to any upcoming event, holiday, or deadline."
      formula="Remaining Time = Target Timestamp - Current Timestamp (updated every second)"
      onReset={() => setTargetDatetime('2026-12-31T23:59')}
    >
      <div className="max-w-md mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Target Date and Time</label>
        <input
          type="datetime-local"
          value={targetDatetime}
          onChange={(e) => setTargetDatetime(e.target.value)}
          className="w-full text-base p-3 border border-slate-200 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        <div className="p-4 bg-blue-600 text-white rounded-2xl text-center">
          <span className="text-3xl sm:text-4xl font-black font-mono block">{timeLeft.days}</span>
          <span className="text-xs uppercase font-bold text-blue-200 tracking-wider">Days</span>
        </div>
        <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
          <span className="text-3xl sm:text-4xl font-black font-mono block">{timeLeft.hours}</span>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Hours</span>
        </div>
        <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
          <span className="text-3xl sm:text-4xl font-black font-mono block">{timeLeft.minutes}</span>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Mins</span>
        </div>
        <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
          <span className="text-3xl sm:text-4xl font-black font-mono block text-emerald-400">{timeLeft.seconds}</span>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Secs</span>
        </div>
      </div>
    </CalcCard>
  );
};
