import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Sliders, Sparkles } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

export const ImageFilters: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<string>('#2563EB');

  const [outputUrl, setOutputUrl] = useState<string>('');
  const [outputSize, setOutputSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setImgSrc(url);
    setOutputUrl('');

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      renderCanvas(img);
    };
    img.src = url;
  };

  const renderCanvas = (img: HTMLImageElement) => {
    const isRotated90or270 = rotation % 180 !== 0;
    const canvas = document.createElement('canvas');
    const width = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
    const height = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();

    // Filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) grayscale(${grayscale}%) invert(${invert}%)`;

    // Position canvas center
    ctx.translate(width / 2, height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Draw image centered
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    ctx.restore();

    // Draw borders & rounded corners if enabled
    if (borderWidth > 0) {
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
    }

    canvas.toBlob((blob) => {
      if (blob) {
        if (outputUrl) URL.revokeObjectURL(outputUrl);
        setOutputUrl(URL.createObjectURL(blob));
        setOutputSize(blob.size);
      }
    }, 'image/png');
  };

  useEffect(() => {
    if (imgRef.current) {
      renderCanvas(imgRef.current);
    }
  }, [rotation, flipH, flipV, brightness, contrast, blur, grayscale, invert, borderWidth, borderColor]);

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `edited-${file?.name || 'image.png'}`;
    a.click();
  };

  const handleResetFilters = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setBrightness(100);
    setContrast(100);
    setBlur(0);
    setGrayscale(0);
    setInvert(0);
    setBorderRadius(0);
    setBorderWidth(0);
  };

  const handleFullReset = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(null);
    setImgSrc('');
    setOutputUrl('');
    handleResetFilters();
  };

  return (
    <div className="space-y-6">
      {!imgSrc ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Edit & Filter
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Rotate, flip, invert, adjust brightness, contrast, blur, grayscale, and borders
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
              <p className="text-xs text-slate-500">
                Processed with client-side Canvas 2D
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                Reset Adjustments
              </button>
              <button
                onClick={handleFullReset}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Change File
              </button>
            </div>
          </div>

          {/* Transform & Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white border border-slate-200 rounded-xl">
            {/* Transformations */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-blue-600" />
                Transform & Orientation
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Rotate 90°
                </button>
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border ${
                    flipH ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  Flip Horizontal
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border ${
                    flipV ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <FlipVertical className="w-3.5 h-3.5" />
                  Flip Vertical
                </button>
              </div>

              {/* Borders */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Border Width: {borderWidth}px</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-6 h-6 p-0 border border-slate-300 rounded cursor-pointer"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Adjustments */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                Color & Filter Adjustments
              </h3>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Brightness</span>
                  <span className="font-medium">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Contrast</span>
                  <span className="font-medium">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Blur</span>
                  <span className="font-medium">{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={blur}
                  onChange={(e) => setBlur(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Grayscale</span>
                    <span className="font-medium">{grayscale}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Invert Color</span>
                    <span className="font-medium">{invert}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={invert}
                    onChange={(e) => setInvert(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!outputUrl}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download Result ({formatFileSize(outputSize)})
            </button>
          </div>

          {outputUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                Live Preview
              </span>
              <div className="max-h-[420px] flex items-center justify-center overflow-hidden rounded-lg bg-slate-200/50 p-4">
                <img src={outputUrl} alt="Filtered Preview" className="max-h-[380px] object-contain rounded" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
