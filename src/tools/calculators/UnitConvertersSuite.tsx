import React, { useState } from 'react';
import { CalcCard } from './MathCalculators';
import { ArrowLeftRight, Check } from 'lucide-react';

// Common Generic Unit Converter Card Template
function createUnitConverter(
  title: string,
  description: string,
  units: { id: string; label: string; ratioToBase: number }[],
  defaultVal: number = 10,
  defaultFrom: string = units[0]?.id,
  defaultTo: string = units[1]?.id
) {
  return function UnitConverterComponent() {
    const [val, setVal] = useState<number>(defaultVal);
    const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
    const [toUnit, setToUnit] = useState<string>(defaultTo);

    const fromObj = units.find((u) => u.id === fromUnit) || units[0];
    const toObj = units.find((u) => u.id === toUnit) || units[1];

    // Base value = input * ratioToBase
    const baseVal = val * fromObj.ratioToBase;
    // Target value = baseVal / toObj.ratioToBase
    const converted = toObj.ratioToBase > 0 ? baseVal / toObj.ratioToBase : 0;

    return (
      <CalcCard
        title={title}
        description={description}
        formula={`1 ${fromObj.label} = ${(fromObj.ratioToBase / toObj.ratioToBase).toFixed(6)} ${toObj.label}`}
        onReset={() => {
          setVal(defaultVal);
          setFromUnit(defaultFrom);
          setToUnit(defaultTo);
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center mb-6">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">From Value</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={val}
                onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
                className="w-full text-base p-3 border border-slate-200 rounded-xl"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="p-3 border border-slate-200 rounded-xl bg-white font-semibold text-xs sm:text-sm"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-4 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                const prev = fromUnit;
                setFromUnit(toUnit);
                setToUnit(prev);
              }}
              className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
              title="Swap units"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">To Unit</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl bg-white font-semibold text-sm"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center mb-6">
          <span className="text-xs font-bold text-blue-700 block">Converted Result</span>
          <span className="text-3xl sm:text-4xl font-black text-blue-900 font-mono mt-1 block">
            {Number(converted.toFixed(6)).toLocaleString()} {toObj.label}
          </span>
          <span className="text-xs text-blue-600 mt-2 block">
            {val} {fromObj.label} = {Number(converted.toFixed(6))} {toObj.label}
          </span>
        </div>

        {/* Multi-unit Quick Table */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">All Equivalent Units</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {units.map((u) => {
              const eq = baseVal / u.ratioToBase;
              return (
                <div key={u.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-slate-500 block truncate">{u.label}</span>
                  <span className="font-mono font-bold text-slate-900 truncate block mt-0.5">
                    {Number(eq.toFixed(6))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CalcCard>
    );
  };
}

// 46. Length Converter (Base: Meter)
export const LengthConverter = createUnitConverter(
  'Length Converter',
  'Convert between metric and imperial length units: meters, kilometers, feet, inches, miles, and yards.',
  [
    { id: 'm', label: 'Meters (m)', ratioToBase: 1 },
    { id: 'km', label: 'Kilometers (km)', ratioToBase: 1000 },
    { id: 'cm', label: 'Centimeters (cm)', ratioToBase: 0.01 },
    { id: 'mm', label: 'Millimeters (mm)', ratioToBase: 0.001 },
    { id: 'mi', label: 'Miles (mi)', ratioToBase: 1609.344 },
    { id: 'yd', label: 'Yards (yd)', ratioToBase: 0.9144 },
    { id: 'ft', label: 'Feet (ft)', ratioToBase: 0.3048 },
    { id: 'in', label: 'Inches (in)', ratioToBase: 0.0254 },
    { id: 'nmi', label: 'Nautical Miles', ratioToBase: 1852 },
  ],
  10,
  'm',
  'ft'
);

// 47. Weight Converter (Base: Kilogram)
export const WeightConverter = createUnitConverter(
  'Weight Converter',
  'Convert between kilograms, grams, pounds (lbs), ounces (oz), metric tons, and stones.',
  [
    { id: 'kg', label: 'Kilograms (kg)', ratioToBase: 1 },
    { id: 'g', label: 'Grams (g)', ratioToBase: 0.001 },
    { id: 'mg', label: 'Milligrams (mg)', ratioToBase: 0.000001 },
    { id: 'lb', label: 'Pounds (lbs)', ratioToBase: 0.45359237 },
    { id: 'oz', label: 'Ounces (oz)', ratioToBase: 0.02834952 },
    { id: 't', label: 'Metric Ton (t)', ratioToBase: 1000 },
    { id: 'st', label: 'Stone (st)', ratioToBase: 6.35029 },
  ],
  5,
  'kg',
  'lb'
);

// 48. Temperature Converter (Dedicated formula support for °C, °F, K, °R)
export const TemperatureConverter: React.FC = () => {
  const [val, setVal] = useState<number>(25);
  const [unit, setUnit] = useState<'C' | 'F' | 'K' | 'R'>('C');

  let c = 0;
  if (unit === 'C') c = val;
  else if (unit === 'F') c = ((val - 32) * 5) / 9;
  else if (unit === 'K') c = val - 273.15;
  else if (unit === 'R') c = ((val - 491.67) * 5) / 9;

  const f = (c * 9) / 5 + 32;
  const k = c + 273.15;
  const r = (c + 273.15) * 1.8;

  return (
    <CalcCard
      title="Temperature Converter"
      description="Convert temperature between Celsius, Fahrenheit, Kelvin, and Rankine scales."
      formula="°F = (°C × 9/5) + 32; K = °C + 273.15; °R = (°C + 273.15) × 9/5"
      onReset={() => {
        setVal(25);
        setUnit('C');
      }}
    >
      <div className="flex gap-3 max-w-sm mx-auto mb-6">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
          className="flex-1 text-base p-3 border border-slate-200 rounded-xl"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as any)}
          className="p-3 border border-slate-200 rounded-xl bg-white font-semibold text-sm"
        >
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
          <option value="K">Kelvin (K)</option>
          <option value="R">Rankine (°R)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Celsius</span>
          <span className="text-2xl font-black text-blue-900 font-mono">{c.toFixed(2)} °C</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Fahrenheit</span>
          <span className="text-2xl font-black text-amber-900 font-mono">{f.toFixed(2)} °F</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Kelvin</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{k.toFixed(2)} K</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Rankine</span>
          <span className="text-2xl font-black text-emerald-900 font-mono">{r.toFixed(2)} °R</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 49. Area Converter (Base: Square Meter)
export const AreaConverter = createUnitConverter(
  'Area Converter',
  'Convert between square meters, square feet, acres, hectares, square kilometers, and square yards.',
  [
    { id: 'sqm', label: 'Square Meters (m²)', ratioToBase: 1 },
    { id: 'sqkm', label: 'Square Kilometers (km²)', ratioToBase: 1000000 },
    { id: 'sqft', label: 'Square Feet (ft²)', ratioToBase: 0.092903 },
    { id: 'sqyd', label: 'Square Yards (yd²)', ratioToBase: 0.836127 },
    { id: 'ac', label: 'Acres', ratioToBase: 4046.856422 },
    { id: 'ha', label: 'Hectares (ha)', ratioToBase: 10000 },
    { id: 'sqmi', label: 'Square Miles (mi²)', ratioToBase: 2589988.11 },
  ],
  100,
  'sqm',
  'sqft'
);

// 50. Volume Converter (Base: Liter)
export const VolumeConverter = createUnitConverter(
  'Volume Converter',
  'Convert between liters, milliliters, US gallons, UK gallons, cubic meters, and fluid ounces.',
  [
    { id: 'l', label: 'Liters (L)', ratioToBase: 1 },
    { id: 'ml', label: 'Milliliters (mL)', ratioToBase: 0.001 },
    { id: 'gal_us', label: 'Gallons (US)', ratioToBase: 3.78541 },
    { id: 'gal_uk', label: 'Gallons (UK)', ratioToBase: 4.54609 },
    { id: 'm3', label: 'Cubic Meters (m³)', ratioToBase: 1000 },
    { id: 'ft3', label: 'Cubic Feet (ft³)', ratioToBase: 28.3168 },
    { id: 'floz', label: 'Fluid Ounces (fl oz)', ratioToBase: 0.0295735 },
    { id: 'cup', label: 'Cups (US)', ratioToBase: 0.236588 },
  ],
  5,
  'l',
  'gal_us'
);

// 51. Speed Converter (Base: m/s)
export const SpeedConverter = createUnitConverter(
  'Speed Converter',
  'Convert speed between kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and knots.',
  [
    { id: 'ms', label: 'Meters/Second (m/s)', ratioToBase: 1 },
    { id: 'kmh', label: 'Kilometers/Hour (km/h)', ratioToBase: 0.277778 },
    { id: 'mph', label: 'Miles/Hour (mph)', ratioToBase: 0.44704 },
    { id: 'kn', label: 'Knots (kn)', ratioToBase: 0.514444 },
    { id: 'fts', label: 'Feet/Second (ft/s)', ratioToBase: 0.3048 },
  ],
  100,
  'kmh',
  'mph'
);

// 52. Time Unit Converter (Base: Second)
export const TimeUnitConverter = createUnitConverter(
  'Time Unit Converter',
  'Convert between seconds, minutes, hours, days, weeks, months, and years.',
  [
    { id: 's', label: 'Seconds (s)', ratioToBase: 1 },
    { id: 'min', label: 'Minutes (min)', ratioToBase: 60 },
    { id: 'h', label: 'Hours (h)', ratioToBase: 3600 },
    { id: 'd', label: 'Days (d)', ratioToBase: 86400 },
    { id: 'wk', label: 'Weeks (wk)', ratioToBase: 604800 },
    { id: 'mo', label: 'Months (30.4 days)', ratioToBase: 2629800 },
    { id: 'yr', label: 'Years (365.25 days)', ratioToBase: 31557600 },
  ],
  24,
  'h',
  'min'
);

// 53. Data Storage Converter (Base: Byte)
export const DataStorageConverter = createUnitConverter(
  'Data Storage Converter',
  'Convert digital memory between Bytes, KB, MB, GB, TB, PB, and bits.',
  [
    { id: 'b', label: 'Bytes (B)', ratioToBase: 1 },
    { id: 'bit', label: 'Bits (b)', ratioToBase: 0.125 },
    { id: 'kb', label: 'Kilobytes (KB)', ratioToBase: 1024 },
    { id: 'mb', label: 'Megabytes (MB)', ratioToBase: 1048576 },
    { id: 'gb', label: 'Gigabytes (GB)', ratioToBase: 1073741824 },
    { id: 'tb', label: 'Terabytes (TB)', ratioToBase: 1099511627776 },
    { id: 'pb', label: 'Petabytes (PB)', ratioToBase: 1125899906842624 },
  ],
  10,
  'gb',
  'mb'
);

// 54. Pressure Converter (Base: Pascal)
export const PressureConverter = createUnitConverter(
  'Pressure Converter',
  'Convert pressure between Pascal (Pa), Kilopascal (kPa), Bar, PSI, and Atmospheres (atm).',
  [
    { id: 'pa', label: 'Pascal (Pa)', ratioToBase: 1 },
    { id: 'kpa', label: 'Kilopascal (kPa)', ratioToBase: 1000 },
    { id: 'mpa', label: 'Megapascal (MPa)', ratioToBase: 1000000 },
    { id: 'bar', label: 'Bar', ratioToBase: 100000 },
    { id: 'psi', label: 'PSI (lbf/in²)', ratioToBase: 6894.76 },
    { id: 'atm', label: 'Atmosphere (atm)', ratioToBase: 101325 },
    { id: 'mmhg', label: 'mmHg / Torr', ratioToBase: 133.322 },
  ],
  1,
  'atm',
  'psi'
);

// 55. Energy Converter (Base: Joule)
export const EnergyConverter = createUnitConverter(
  'Energy Converter',
  'Convert between Joules (J), Kilojoules (kJ), Calories (cal), Kilocalories (kcal), Watt-hours, and BTU.',
  [
    { id: 'j', label: 'Joules (J)', ratioToBase: 1 },
    { id: 'kj', label: 'Kilojoules (kJ)', ratioToBase: 1000 },
    { id: 'cal', label: 'Calories (cal)', ratioToBase: 4.184 },
    { id: 'kcal', label: 'Kilocalories (kcal)', ratioToBase: 4184 },
    { id: 'wh', label: 'Watt-hours (Wh)', ratioToBase: 3600 },
    { id: 'kwh', label: 'Kilowatt-hours (kWh)', ratioToBase: 3600000 },
    { id: 'btu', label: 'BTU', ratioToBase: 1055.06 },
  ],
  1000,
  'j',
  'cal'
);
