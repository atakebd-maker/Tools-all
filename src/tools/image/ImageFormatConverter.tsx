import React, { useState, useRef } from 'react';
import { Upload, Download, RotateCcw, ArrowRight } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

export const ImageFormatConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<string>('image/webp');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [quality, setQuality] = useState<number>(92);
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setError('');
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    setConvertedUrl('');

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
    };
    img.src = url;
  };

  const handleConvert = () => {
    if (!imgRef.current) return;
    setIsProcessing(true);
    setError('');

    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');

      // For JPEG or custom background, fill the canvas first
      if (targetFormat === 'image/jpeg' || bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          setIsProcessing(false);
          if (blob) {
            if (convertedUrl) URL.revokeObjectURL(convertedUrl);
            setConvertedUrl(URL.createObjectURL(blob));
            setConvertedSize(blob.size);
          } else {
            setError('Failed to convert image.');
          }
        },
        targetFormat,
        quality / 100
      );
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'Error during conversion.');
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !file) return;
    const ext = targetFormat === 'image/jpeg' ? 'jpg' : targetFormat === 'image/webp' ? 'webp' : 'png';
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'converted';
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `${baseName}.${ext}`;
    link.click();
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setFile(null);
    setPreviewUrl('');
    setConvertedUrl('');
    setConvertedSize(0);
    setError('');
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Convert
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Convert between JPG, PNG, and WebP formats with local privacy
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
              <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-slate-500">
                Current format: <span className="uppercase font-semibold">{file.type.replace('image/', '')}</span> • {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="image/png">PNG (Lossless & Transparent)</option>
                <option value="image/jpeg">JPG / JPEG (Universal)</option>
                <option value="image/webp">WebP (Modern & Lightweight)</option>
              </select>
            </div>

            {targetFormat === 'image/jpeg' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Background Color (for Transparency)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-9 p-0.5 border border-slate-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {targetFormat !== 'image/png' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full mt-2 accent-blue-600 cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Converting...' : 'Convert Format'}
            </button>
            {convertedUrl && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Converted Image ({formatFileSize(convertedSize)})
              </button>
            )}
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          {convertedUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                Conversion Preview
              </span>
              <div className="max-h-96 flex items-center justify-center overflow-hidden rounded-lg bg-slate-200/50 p-2">
                <img src={convertedUrl} alt="Converted" className="max-h-80 object-contain rounded" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
