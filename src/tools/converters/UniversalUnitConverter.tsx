import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'data' | 'area' | 'volume' | 'speed' | 'time' | 'pressure';

interface UnitDef {
  name: string;
  factor: number; // factor to convert to base unit
}

const CATEGORIES_DATA: Record<UnitCategory, { name: string; base: string; units: Record<string, UnitDef> }> = {
  length: {
    name: 'Length',
    base: 'm',
    units: {
      m: { name: 'Meter (m)', factor: 1 },
      km: { name: 'Kilometer (km)', factor: 1000 },
      cm: { name: 'Centimeter (cm)', factor: 0.01 },
      mm: { name: 'Millimeter (mm)', factor: 0.001 },
      in: { name: 'Inch (in)', factor: 0.0254 },
      ft: { name: 'Foot (ft)', factor: 0.3048 },
      yd: { name: 'Yard (yd)', factor: 0.9144 },
      mi: { name: 'Mile (mi)', factor: 1609.344 }
    }
  },
  weight: {
    name: 'Weight / Mass',
    base: 'kg',
    units: {
      kg: { name: 'Kilogram (kg)', factor: 1 },
      g: { name: 'Gram (g)', factor: 0.001 },
      mg: { name: 'Milligram (mg)', factor: 0.000001 },
      lb: { name: 'Pound (lb)', factor: 0.45359237 },
      oz: { name: 'Ounce (oz)', factor: 0.02834952 },
      t: { name: 'Metric Ton (t)', factor: 1000 }
    }
  },
  temperature: {
    name: 'Temperature',
    base: 'C',
    units: {
      C: { name: 'Celsius (°C)', factor: 1 },
      F: { name: 'Fahrenheit (°F)', factor: 1 },
      K: { name: 'Kelvin (K)', factor: 1 }
    }
  },
  data: {
    name: 'Data Storage',
    base: 'B',
    units: {
      B: { name: 'Byte (B)', factor: 1 },
      KB: { name: 'Kilobyte (KB - 1,024 B)', factor: 1024 },
      MB: { name: 'Megabyte (MB - 1,024 KB)', factor: 1024 * 1024 },
      GB: { name: 'Gigabyte (GB - 1,024 MB)', factor: 1024 * 1024 * 1024 },
      TB: { name: 'Terabyte (TB - 1,024 GB)', factor: 1024 * 1024 * 1024 * 1024 },
      PB: { name: 'Petabyte (PB)', factor: 1024 * 1024 * 1024 * 1024 * 1024 }
    }
  },
  area: {
    name: 'Area',
    base: 'm2',
    units: {
      m2: { name: 'Square Meter (m²)', factor: 1 },
      km2: { name: 'Square Kilometer (km²)', factor: 1000000 },
      ft2: { name: 'Square Foot (ft²)', factor: 0.092903 },
      ac: { name: 'Acre', factor: 4046.86 },
      ha: { name: 'Hectare (ha)', factor: 10000 }
    }
  },
  volume: {
    name: 'Volume',
    base: 'L',
    units: {
      L: { name: 'Liter (L)', factor: 1 },
      mL: { name: 'Milliliter (mL)', factor: 0.001 },
      gal: { name: 'US Gallon (gal)', factor: 3.78541 },
      qt: { name: 'US Quart (qt)', factor: 0.946353 },
      pt: { name: 'US Pint (pt)', factor: 0.473176 },
      cup: { name: 'US Cup', factor: 0.236588 },
      m3: { name: 'Cubic Meter (m³)', factor: 1000 }
    }
  },
  speed: {
    name: 'Speed',
    base: 'mps',
    units: {
      mps: { name: 'Meters/second (m/s)', factor: 1 },
      kmh: { name: 'Kilometers/hour (km/h)', factor: 0.277778 },
      mph: { name: 'Miles/hour (mph)', factor: 0.44704 },
      knot: { name: 'Knots', factor: 0.514444 }
    }
  },
  time: {
    name: 'Time',
    base: 's',
    units: {
      s: { name: 'Second (s)', factor: 1 },
      min: { name: 'Minute (min)', factor: 60 },
      h: { name: 'Hour (h)', factor: 3600 },
      d: { name: 'Day (d)', factor: 86400 },
      wk: { name: 'Week (wk)', factor: 604800 },
      yr: { name: 'Year (365 days)', factor: 31536000 }
    }
  },
  pressure: {
    name: 'Pressure',
    base: 'Pa',
    units: {
      Pa: { name: 'Pascal (Pa)', factor: 1 },
      kPa: { name: 'Kilopascal (kPa)', factor: 1000 },
      bar: { name: 'Bar', factor: 100000 },
      psi: { name: 'Pounds/sq inch (PSI)', factor: 6894.76 },
      atm: { name: 'Atmosphere (atm)', factor: 101325 }
    }
  }
};

export const UniversalUnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('mi');
  const [inputValue, setInputValue] = useState<string>('10');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const unitKeys = Object.keys(CATEGORIES_DATA[newCat].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const calculateResult = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '—';

    // Temperature has offset logic
    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'F') celsius = ((val - 32) * 5) / 9;
      if (fromUnit === 'K') celsius = val - 273.15;

      let out = celsius;
      if (toUnit === 'F') out = (celsius * 9) / 5 + 32;
      if (toUnit === 'K') out = celsius + 273.15;
      return out.toLocaleString(undefined, { maximumFractionDigits: 4 });
    }

    const currentCat = CATEGORIES_DATA[category];
    const fromFactor = currentCat.units[fromUnit]?.factor || 1;
    const toFactor = currentCat.units[toUnit]?.factor || 1;

    // Convert to base unit then to target unit
    const inBase = val * fromFactor;
    const result = inBase / toFactor;

    return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const result = calculateResult();

  const handleCopy = async () => {
    await copyToClipboard(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {(Object.keys(CATEGORIES_DATA) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            onClick={() => handleCategoryChange(catKey)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              category === catKey ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {CATEGORIES_DATA[catKey].name}
          </button>
        ))}
      </div>

      {/* Converter Box */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
          {/* From Col */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              From
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-xl font-bold px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium bg-white"
            >
              {Object.entries(CATEGORIES_DATA[category].units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2">
            <button
              onClick={swapUnits}
              className="p-3 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors cursor-pointer"
              title="Swap units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* To Col */}
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                To (Result)
              </label>
              <button
                onClick={handleCopy}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="w-full text-xl font-extrabold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-blue-600 truncate">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium bg-white"
            >
              {Object.entries(CATEGORIES_DATA[category].units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {category === 'data' && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
          <strong>Note on Data Storage Conventions:</strong> This converter calculates standard binary byte units where 1 KB = 1,024 Bytes, 1 MB = 1,024 KB, and 1 GB = 1,024 MB (widely used in computer operating systems and RAM sizing).
        </div>
      )}
    </div>
  );
};
