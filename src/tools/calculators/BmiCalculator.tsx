import React, { useState } from 'react';
import { Heart, Activity, AlertCircle } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const calculateBmi = () => {
    let bmi = 0;
    if (unitSystem === 'metric') {
      if (heightCm <= 0 || weightKg <= 0) return 0;
      const heightM = heightCm / 100;
      bmi = weightKg / (heightM * heightM);
    } else {
      const totalInches = heightFt * 12 + heightIn;
      if (totalInches <= 0 || weightLbs <= 0) return 0;
      bmi = (703 * weightLbs) / (totalInches * totalInches);
    }
    return parseFloat(bmi.toFixed(1));
  };

  const bmi = calculateBmi();

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { name: 'Underweight', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (val < 25.0) return { name: 'Normal weight (Healthy)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val < 30.0) return { name: 'Overweight', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { name: 'Obese', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const category = getBmiCategory(bmi);

  return (
    <div className="space-y-6">
      {/* Unit Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setUnitSystem('metric')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            unitSystem === 'metric' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Metric Units (cm, kg)
        </button>
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            unitSystem === 'imperial' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Imperial Units (ft, in, lbs)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          {unitSystem === 'metric' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Height: {heightCm} cm
                </label>
                <input
                  type="range"
                  min="100"
                  max="240"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Weight: {weightKg} kg
                </label>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Feet (ft)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="8"
                    value={heightFt}
                    onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Inches (in)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Weight: {weightLbs} lbs
                </label>
                <input
                  type="range"
                  min="60"
                  max="450"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Your Body Mass Index (BMI)
            </span>
            <div className="text-5xl font-extrabold text-slate-900 mt-2 mb-3">
              {bmi > 0 ? bmi : '—'}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${category.color}`}>
              {category.name}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
            <p>• Underweight: BMI &lt; 18.5</p>
            <p>• Normal weight: BMI 18.5 – 24.9</p>
            <p>• Overweight: BMI 25 – 29.9</p>
            <p>• Obese: BMI ≥ 30</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Medical Estimate Disclaimer:</strong> BMI is a general screening indicator based solely on height and weight. It does not directly assess body fat percentage or muscle composition and should not replace clinical medical advice.
        </p>
      </div>
    </div>
  );
};
