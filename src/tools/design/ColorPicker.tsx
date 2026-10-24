import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Palette } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const ColorPicker: React.FC = () => {
  const [hex, setHex] = useState<string>('#2563EB');
  const [copiedKey, setCopiedKey] = useState<string>('');

  const hexToRgb = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  const rgb = hexToRgb(hex);

  const rgbToHsl = (r: number, g: number, b: number) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const getPalettes = () => {
    // Complementary (+180 deg)
    const compHue = (hsl.h + 180) % 360;
    // Triadic (+120 and +240)
    const tri1 = (hsl.h + 120) % 360;
    const tri2 = (hsl.h + 240) % 360;
    // Analogous (-30 and +30)
    const ana1 = (hsl.h + 330) % 360;
    const ana2 = (hsl.h + 30) % 360;

    return {
      complementary: `hsl(${compHue}, ${hsl.s}%, ${hsl.l}%)`,
      triadic: [`hsl(${tri1}, ${hsl.s}%, ${hsl.l}%)`, `hsl(${tri2}, ${hsl.s}%, ${hsl.l}%)`],
      analogous: [`hsl(${ana1}, ${hsl.s}%, ${hsl.l}%)`, `hsl(${ana2}, ${hsl.s}%, ${hsl.l}%)`]
    };
  };

  const palettes = getPalettes();

  const handleCopy = async (val: string, key: string) => {
    await copyToClipboard(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const randomizeColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setHex(color);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Large Preview & Input */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center space-y-4">
          <div
            style={{ backgroundColor: hex }}
            className="w-full h-44 rounded-2xl shadow-inner border border-slate-200/50 flex items-center justify-center transition-colors"
          >
            <span className="text-white font-mono font-bold text-lg drop-shadow-md">
              {hex}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value.toUpperCase())}
              className="w-12 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full px-3 py-2 font-mono font-bold text-sm border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <button
              onClick={randomizeColor}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
              title="Random Color"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Color Code Formats */}
        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">HEX Code</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{hex}</span>
            </div>
            <button
              onClick={() => handleCopy(hex, 'hex')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'hex' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">RGB String</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </span>
            </div>
            <button
              onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'rgb' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'rgb' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">HSL String</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </span>
            </div>
            <button
              onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'hsl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'hsl' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Harmonic Palettes */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-blue-600" />
          Harmonic Color Palettes
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500">Complementary</span>
            <div
              style={{ backgroundColor: palettes.complementary }}
              className="h-14 rounded-xl border border-slate-200/50 shadow-2xs flex items-center justify-center"
            >
              <span className="text-white text-xs font-mono font-bold drop-shadow">
                {palettes.complementary}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500">Analogous</span>
            <div className="flex gap-1.5 h-14">
              {palettes.analogous.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="flex-1 rounded-xl border border-slate-200/50 shadow-2xs"
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500">Triadic</span>
            <div className="flex gap-1.5 h-14">
              {palettes.triadic.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="flex-1 rounded-xl border border-slate-200/50 shadow-2xs"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
