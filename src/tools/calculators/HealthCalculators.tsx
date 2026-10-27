import React, { useState } from 'react';
import { CalcCard } from './MathCalculators';
import { Activity, Heart, Flame, Scale, Droplet } from 'lucide-react';

// 56. BMI Calculator
export const BmiCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  let bmi = 0;
  let category = '';
  let color = '';

  if (unit === 'metric') {
    const hMeter = heightCm / 100;
    if (hMeter > 0) bmi = weightKg / (hMeter * hMeter);
  } else {
    const totalIn = heightFt * 12 + heightIn;
    if (totalIn > 0) bmi = (weightLbs * 703) / (totalIn * totalIn);
  }

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (bmi < 24.9) {
    category = 'Normal / Healthy Weight';
    color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (bmi < 29.9) {
    category = 'Overweight';
    color = 'text-orange-600 bg-orange-50 border-orange-200';
  } else {
    category = 'Obese';
    color = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  // Healthy weight range (BMI 18.5 - 24.9)
  const hM = unit === 'metric' ? heightCm / 100 : (heightFt * 12 + heightIn) * 0.0254;
  const minHealthy = (18.5 * hM * hM).toFixed(1);
  const maxHealthy = (24.9 * hM * hM).toFixed(1);

  return (
    <CalcCard
      title="BMI Calculator"
      description="Calculate Body Mass Index (BMI) and discover your recommended healthy weight range according to WHO guidelines."
      formula="BMI = Weight (kg) ÷ [Height (m)]² | Imperial: [Weight (lbs) × 703] ÷ [Height (in)]²"
      onReset={() => {
        setWeightKg(70);
        setHeightCm(175);
        setWeightLbs(154);
        setHeightFt(5);
        setHeightIn(9);
      }}
    >
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Metric (kg, cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Imperial (lbs, ft/in)
        </button>
      </div>

      {unit === 'metric' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Math.max(50, parseFloat(e.target.value) || 50))}
              className="w-full text-base p-3 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Math.max(20, parseFloat(e.target.value) || 20))}
              className="w-full text-base p-3 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Height (ft & in)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-1/2 text-base p-3 border border-slate-200 rounded-xl"
                placeholder="Feet"
              />
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-1/2 text-base p-3 border border-slate-200 rounded-xl"
                placeholder="Inches"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Weight (lbs)</label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(Math.max(40, parseFloat(e.target.value) || 40))}
              className="w-full text-base p-3 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Your BMI Score</span>
          <span className="text-4xl font-black text-blue-900 font-mono mt-1 block">{bmi.toFixed(1)}</span>
        </div>
        <div className={`p-5 rounded-2xl border text-center ${color}`}>
          <span className="text-xs font-bold block">WHO Category</span>
          <span className="text-xl font-black mt-2 block">{category}</span>
        </div>
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-600 block">Healthy Weight Range</span>
          <span className="text-lg font-bold text-slate-800 mt-2 block">
            {minHealthy} – {maxHealthy} kg
          </span>
        </div>
      </div>
    </CalcCard>
  );
};

// 57. BMR Calculator (Mifflin-St Jeor formula)
export const BmrCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(178);

  // Mifflin - St Jeor Equation:
  // Men: BMR = 10W + 6.25H - 5A + 5
  // Women: BMR = 10W + 6.25H - 5A - 161
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') bmr += 5;
  else bmr -= 161;

  return (
    <CalcCard
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) — the exact calories burned at complete rest using the Mifflin-St Jeor formula."
      formula="Men: 10×W(kg) + 6.25×H(cm) - 5×Age + 5 | Women: 10×W(kg) + 6.25×H(cm) - 5×Age - 161"
      onReset={() => {
        setGender('male');
        setAge(28);
        setWeightKg(72);
        setHeightCm(178);
      }}
    >
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setGender('male')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            gender === 'male' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setGender('female')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            gender === 'female' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Female
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Age (Years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Math.max(10, parseInt(e.target.value) || 10))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(Math.max(30, parseFloat(e.target.value) || 30))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(Math.max(100, parseFloat(e.target.value) || 100))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center max-w-sm mx-auto">
        <span className="text-xs font-bold text-blue-700 block">Basal Metabolic Rate</span>
        <span className="text-4xl font-black text-blue-900 font-mono mt-1 block">
          {Math.round(bmr).toLocaleString()}
        </span>
        <span className="text-xs text-blue-600 mt-1 block">Calories / day at complete rest</span>
      </div>
    </CalcCard>
  );
};

// 58. Daily Calorie Estimate Calculator (TDEE)
export const DailyCalorieCalculator: React.FC = () => {
  const [bmr, setBmr] = useState<number>(1700);
  const [activity, setActivity] = useState<number>(1.55); // moderate

  const tdee = Math.round(bmr * activity);
  const mildLoss = tdee - 250;
  const weightLoss = tdee - 500;
  const muscleGain = tdee + 300;

  return (
    <CalcCard
      title="Daily Calorie Estimate Calculator"
      description="Estimate your Total Daily Energy Expenditure (TDEE) and caloric targets for weight maintenance, loss, or muscle gain."
      formula="TDEE = BMR × Activity Level Multiplier"
      onReset={() => {
        setBmr(1700);
        setActivity(1.55);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Basal Metabolic Rate (BMR in kcal)</label>
          <input
            type="number"
            value={bmr}
            onChange={(e) => setBmr(Math.max(500, parseInt(e.target.value) || 500))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Daily Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl bg-white"
          >
            <option value="1.2">Sedentary (desk job, little or no exercise)</option>
            <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
            <option value="1.9">Extra Active (intense athlete / physical job)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Maintenance (TDEE)</span>
          <span className="text-2xl font-black text-blue-900 font-mono">{tdee}</span>
          <span className="text-[11px] text-blue-600">kcal/day</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Mild Weight Loss</span>
          <span className="text-2xl font-black text-emerald-900 font-mono">{mildLoss}</span>
          <span className="text-[11px] text-emerald-600">-0.25 kg/week</span>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-bold text-amber-700 block">Standard Fat Loss</span>
          <span className="text-2xl font-black text-amber-900 font-mono">{weightLoss}</span>
          <span className="text-[11px] text-amber-600">-0.5 kg/week</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Muscle Building</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{muscleGain}</span>
          <span className="text-[11px] text-purple-600">+Lean bulk</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 59. Ideal Weight Estimator
export const IdealWeightEstimator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(175);

  const totalInches = heightCm / 2.54;
  const inchesOver5Ft = Math.max(0, totalInches - 60);

  // Devine Formula (1974)
  const devine = gender === 'male' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
  // Robinson Formula (1983)
  const robinson = gender === 'male' ? 52 + 1.9 * inchesOver5Ft : 49 + 1.7 * inchesOver5Ft;
  // Miller Formula (1983)
  const miller = gender === 'male' ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;
  // Hamwi Formula (1964)
  const hamwi = gender === 'male' ? 48 + 2.7 * inchesOver5Ft : 45.5 + 2.2 * inchesOver5Ft;

  return (
    <CalcCard
      title="Ideal Weight Estimator"
      description="Compare ideal body weight estimates based on 4 established medical formulas (Devine, Robinson, Miller, and Hamwi)."
      formula="Clinical body mass equations standardized for adult height and biological sex"
      onReset={() => {
        setGender('male');
        setHeightCm(175);
      }}
    >
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setGender('male')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            gender === 'male' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setGender('female')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            gender === 'female' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Female
        </button>
      </div>

      <div className="max-w-xs mx-auto mb-6">
        <label className="text-xs font-bold text-slate-700 block mb-1">Height (cm)</label>
        <input
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(Math.max(140, parseFloat(e.target.value) || 140))}
          className="w-full text-base p-3 border border-slate-200 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Devine Formula</span>
          <span className="text-2xl font-black text-blue-900 font-mono">{devine.toFixed(1)} kg</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-xs font-bold text-emerald-700 block">Robinson Formula</span>
          <span className="text-2xl font-black text-emerald-900 font-mono">{robinson.toFixed(1)} kg</span>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
          <span className="text-xs font-bold text-purple-700 block">Miller Formula</span>
          <span className="text-2xl font-black text-purple-900 font-mono">{miller.toFixed(1)} kg</span>
        </div>
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
          <span className="text-xs font-bold text-slate-700 block">Hamwi Formula</span>
          <span className="text-2xl font-black text-slate-900 font-mono">{hamwi.toFixed(1)} kg</span>
        </div>
      </div>
    </CalcCard>
  );
};

// 60. Water Intake Estimator
export const WaterIntakeEstimator: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [exerciseMins, setExerciseMins] = useState<number>(30);
  const [climate, setClimate] = useState<'moderate' | 'hot'>('moderate');

  // Baseline: 35ml per kg of bodyweight
  let waterMl = weightKg * 35;
  // Exercise addition: ~12ml per minute of exercise
  waterMl += exerciseMins * 12;
  // Hot climate addition: +500ml
  if (climate === 'hot') waterMl += 500;

  const liters = (waterMl / 1000).toFixed(2);
  const glasses = Math.round(waterMl / 250); // 250ml glass
  const flOz = Math.round(waterMl * 0.033814);

  return (
    <CalcCard
      title="Water Intake Estimator"
      description="Calculate your recommended daily hydration needs based on body mass, workout activity, and climate."
      formula="Daily Water = (Weight(kg) × 35ml) + (Exercise Mins × 12ml) + Climate Allowance"
      onReset={() => {
        setWeightKg(70);
        setExerciseMins(30);
        setClimate('moderate');
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Body Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(Math.max(30, parseFloat(e.target.value) || 30))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Daily Exercise (Minutes)</label>
          <input
            type="number"
            value={exerciseMins}
            onChange={(e) => setExerciseMins(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full text-base p-3 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Environment / Weather</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as any)}
            className="w-full text-base p-3 border border-slate-200 rounded-xl bg-white"
          >
            <option value="moderate">Moderate / Temperate</option>
            <option value="hot">Hot, Humid, or Summer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 block">Daily Target</span>
          <span className="text-4xl font-black text-blue-900 font-mono mt-1 block">{liters} L</span>
          <span className="text-xs text-blue-600 mt-1 block">Liters per day</span>
        </div>
        <div className="p-5 bg-cyan-50 border border-cyan-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-cyan-700 block">Standard Glasses</span>
          <span className="text-4xl font-black text-cyan-900 font-mono mt-1 block">~{glasses}</span>
          <span className="text-xs text-cyan-600 mt-1 block">250ml glasses</span>
        </div>
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-600 block">US Fluid Ounces</span>
          <span className="text-4xl font-black text-slate-800 font-mono mt-1 block">{flOz}</span>
          <span className="text-xs text-slate-600 mt-1 block">fl oz</span>
        </div>
      </div>
    </CalcCard>
  );
};
