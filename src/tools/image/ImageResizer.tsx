import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, Lock, Unlock } from 'lucide-react';
import { downloadBlob, formatFileSize } from '../../utils/formatting';

export const ImageResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<string>('image/png');
  const [quality, setQuality] = useState<number>(90);
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }
    setError('');
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    setProcessedUrl('');

    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.naturalWidth);
      setOrigHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      imgRef.current = img;
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (keepAspect && origWidth > 0) {
      setHeight(Math.round((val / origWidth) * origHeight));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (keepAspect && origHeight > 0) {
      setWidth(Math.round((val / origHeight) * origWidth));
    }
  };

  const handleResize = () => {
    if (!imgRef.current || width <= 0 || height <= 0) return;
    setIsProcessing(true);
    setError('');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas rendering context not available');

      // For JPEG conversions, fill background with white
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgRef.current, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          setIsProcessing(false);
          if (blob) {
            if (processedUrl) URL.revokeObjectURL(processedUrl);
            const newUrl = URL.createObjectURL(blob);
            setProcessedUrl(newUrl);
            setProcessedSize(blob.size);
          } else {
            setError('Failed to encode image in chosen format.');
          }
        },
        format,
        quality / 100
      );
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An error occurred during resizing.');
    }
  };

  const handleDownload = () => {
    if (!processedUrl || !file) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `${baseName}-${width}x${height}.${ext}`;
    link.click();
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setFile(null);
    setPreviewUrl('');
    setProcessedUrl('');
    setOrigWidth(0);
    setOrigHeight(0);
    setWidth(0);
    setHeight(0);
    setError('');
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Resize
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Supports PNG, JPG, JPEG, WebP, SVG, GIF, BMP
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
              Browse Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-slate-500">
                  Original: {origWidth} × {origHeight} px • {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Width (px)
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={width || ''}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Height (px)
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={height || ''}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="image/png">PNG (Lossless)</option>
                <option value="image/jpeg">JPG / JPEG</option>
                <option value="image/webp">WebP (Modern)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                disabled={format === 'image/png'}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full mt-2 accent-blue-600 cursor-pointer disabled:opacity-50"
              />
            </div>
          </div>

          {/* Quick preset dimensions & Aspect ratio lock */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setKeepAspect(!keepAspect)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                keepAspect
                  ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {keepAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              Maintain Aspect Ratio
            </button>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-medium mr-1">Presets:</span>
              <button
                onClick={() => {
                  setWidth(origWidth);
                  setHeight(origHeight);
                }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                100%
              </button>
              <button
                onClick={() => {
                  setWidth(Math.round(origWidth * 0.75));
                  setHeight(Math.round(origHeight * 0.75));
                }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                75%
              </button>
              <button
                onClick={() => {
                  setWidth(Math.round(origWidth * 0.5));
                  setHeight(Math.round(origHeight * 0.5));
                }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                50%
              </button>
              <button
                onClick={() => {
                  setWidth(Math.round(origWidth * 0.25));
                  setHeight(Math.round(origHeight * 0.25));
                }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                25%
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResize}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? 'Processing Image...' : 'Apply & Resize'}
            </button>
            {processedUrl && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Resized Image
              </button>
            )}
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          {/* Preview Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase">
                <span>Original Preview</span>
                <span>{origWidth} × {origHeight} px</span>
              </div>
              <div className="aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={previewUrl}
                  alt="Original"
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase">
                <span>Resized Result</span>
                {processedUrl && (
                  <span className="text-blue-600 font-bold">
                    {width} × {height} px • {formatFileSize(processedSize)}
                  </span>
                )}
              </div>
              <div className="aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                {processedUrl ? (
                  <img
                    src={processedUrl}
                    alt="Processed"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-center text-slate-400 text-xs">
                    Click "Apply & Resize" to preview output
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
