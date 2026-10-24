import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Pipette, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const ImageColorPicker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ hex: string; rgb: string; hsl: string }>({
    hex: '#2563EB',
    rgb: 'rgb(37, 99, 235)',
    hsl: 'hsl(221, 83%, 53%)'
  });
  const [copiedKey, setCopiedKey] = useState<string>('');
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setImgSrc(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      if (canvasRef.current) {
        const cvs = canvasRef.current;
        cvs.width = img.naturalWidth;
        cvs.height = img.naturalHeight;
        const ctx = cvs.getContext('2d');
        if (ctx) ctx.drawImage(img, 0, 0);
      }
    };
    img.src = url;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    const rgbStr = `rgb(${r}, ${g}, ${b})`;

    // Convert to HSL
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

    const hslStr = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    setSelectedColor({ hex, rgb: rgbStr, hsl: hslStr });
    setColorHistory((prev) => [hex, ...prev.filter((c) => c !== hex)].slice(0, 10));
  };

  const handleCopy = async (val: string, key: string) => {
    await copyToClipboard(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6">
      {!imgSrc ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Pick Colors
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Click anywhere on the image to inspect pixel color codes
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
              Browse Image
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Pipette className="w-4 h-4 text-blue-600" />
              <span>Click on any part of the image below to extract its color</span>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setImgSrc('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>

          {/* Color Display Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg border border-slate-300 shadow-inner shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">Selected Color</span>
                <p className="font-mono font-bold text-slate-900 text-base">{selectedColor.hex}</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">HEX</span>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{selectedColor.hex}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedColor.hex, 'hex')}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                {copiedKey === 'hex' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">RGB</span>
                <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedColor.rgb}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedColor.rgb, 'rgb')}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                {copiedKey === 'rgb' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">HSL</span>
                <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedColor.hsl}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedColor.hsl, 'hsl')}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                {copiedKey === 'hsl' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* History */}
          {colorHistory.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex-wrap">
              <span className="text-xs font-semibold text-slate-500 uppercase mr-1">Sampled History:</span>
              {colorHistory.map((hex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor({ hex, rgb: '', hsl: '' })}
                  className="w-6 h-6 rounded-md border border-slate-300 shadow-xs hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          )}

          {/* Interactive Canvas Viewport */}
          <div className="p-4 bg-slate-900/5 border border-slate-200 rounded-xl overflow-auto flex items-center justify-center max-h-[500px]">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="max-h-[460px] max-w-full cursor-crosshair rounded shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};
