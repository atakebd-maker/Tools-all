import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Type } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

export const ImageWatermark: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [watermarkText, setWatermarkText] = useState<string>('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState<number>(36);
  const [color, setColor] = useState<string>('#FFFFFF');
  const [opacity, setOpacity] = useState<number>(60);
  const [position, setPosition] = useState<string>('bottom-right'); // center, top-left, top-right, bottom-left, bottom-right, tiled
  const [resultUrl, setResultUrl] = useState<string>('');
  const [resultSize, setResultSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setImgSrc(url);
    setResultUrl('');

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      applyWatermark(img);
    };
    img.src = url;
  };

  const applyWatermark = (img: HTMLImageElement) => {
    if (!img) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';

    if (position === 'tiled') {
      const stepX = 260;
      const stepY = 160;
      ctx.rotate((-25 * Math.PI) / 180);
      for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
        for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
          ctx.fillText(watermarkText, x, y);
        }
      }
    } else {
      const metrics = ctx.measureText(watermarkText);
      const textWidth = metrics.width;
      let x = 40;
      let y = 40;

      if (position === 'center') {
        x = (canvas.width - textWidth) / 2;
        y = canvas.height / 2;
      } else if (position === 'top-left') {
        x = 40;
        y = fontSize + 40;
      } else if (position === 'top-right') {
        x = canvas.width - textWidth - 40;
        y = fontSize + 40;
      } else if (position === 'bottom-left') {
        x = 40;
        y = canvas.height - 40;
      } else if (position === 'bottom-right') {
        x = canvas.width - textWidth - 40;
        y = canvas.height - 40;
      }

      ctx.fillText(watermarkText, x, y);
    }

    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) {
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(blob));
        setResultSize(blob.size);
      }
    }, 'image/png');
  };

  useEffect(() => {
    if (imgRef.current) {
      applyWatermark(imgRef.current);
    }
  }, [watermarkText, fontSize, color, opacity, position]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `watermarked-${file?.name || 'image.png'}`;
    link.click();
  };

  const handleReset = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setImgSrc('');
    setResultUrl('');
  };

  return (
    <div className="space-y-6">
      {!imgSrc ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Add Watermark
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Add custom text stamps, copyright notices, or repeated diagonal tiles
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
            <div>
              <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{file?.name}</p>
              <p className="text-xs text-slate-500">Live watermark overlay</p>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>

          {/* Watermark Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. © 2026 Your Brand"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="center">Center</option>
                <option value="tiled">Tiled Repeating</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Color & Opacity ({opacity}%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 p-0.5 border border-slate-300 rounded cursor-pointer"
                />
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="14"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!resultUrl}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download Watermarked Image ({formatFileSize(resultSize)})
            </button>
          </div>

          {resultUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                Preview Result
              </span>
              <div className="max-h-[420px] flex items-center justify-center overflow-hidden rounded-lg bg-slate-200/50 p-4">
                <img src={resultUrl} alt="Watermark Preview" className="max-h-[380px] object-contain rounded" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
