import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Zap, Sparkles, Check } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

export const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<string>('image/jpeg');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP).');
      return;
    }
    setError('');
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      compressImage(img, quality, outputFormat);
    };
    img.src = url;
  };

  const compressImage = (
    img: HTMLImageElement,
    qual: number,
    format: string
  ) => {
    setIsProcessing(true);
    setError('');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          setIsProcessing(false);
          if (blob) {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            const newUrl = URL.createObjectURL(blob);
            setCompressedUrl(newUrl);
            setCompressedSize(blob.size);
          } else {
            setError('Failed to compress image.');
          }
        },
        format,
        qual / 100
      );
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'Compression error occurred.');
    }
  };

  const handleQualityChange = (newQual: number) => {
    setQuality(newQual);
    if (imgRef.current) {
      compressImage(imgRef.current, newQual, outputFormat);
    }
  };

  const handleFormatChange = (newFormat: string) => {
    setOutputFormat(newFormat);
    if (imgRef.current) {
      compressImage(imgRef.current, quality, newFormat);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    const ext = outputFormat === 'image/webp' ? 'webp' : 'jpg';
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setFile(null);
    setPreviewUrl('');
    setCompressedUrl('');
    setCompressedSize(0);
    setError('');
  };

  const savings = file && compressedSize > 0
    ? Math.round(((file.size - compressedSize) / file.size) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image to Compress
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Reduces image file size instantly with real-time preview
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
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-slate-500">
                Original Size: <span className="font-medium text-slate-700">{formatFileSize(file.size)}</span>
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Image
            </button>
          </div>

          {/* Compression Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs text-slate-500 font-medium uppercase">Original</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{formatFileSize(file.size)}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <span className="text-xs text-blue-700 font-medium uppercase">Compressed</span>
              <p className="text-xl font-bold text-blue-700 mt-1">
                {compressedSize > 0 ? formatFileSize(compressedSize) : 'Calculating...'}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-xs text-emerald-700 font-medium uppercase">Savings</span>
              <p className="text-xl font-bold text-emerald-700 mt-1">
                {savings > 0 ? `-${savings}%` : '0%'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="w-full sm:w-2/3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-slate-900">Compression Level: {quality}%</label>
                  <span className="text-xs text-slate-500">
                    {quality > 80 ? 'High Quality' : quality > 50 ? 'Balanced' : 'High Compression'}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={quality}
                  onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => handleFormatChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="image/jpeg">JPEG (Universal)</option>
                  <option value="image/webp">WebP (Best Compression)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium self-center mr-2">Quick:</span>
              <button
                onClick={() => handleQualityChange(85)}
                className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                  quality === 85 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Light (85%)
              </button>
              <button
                onClick={() => handleQualityChange(70)}
                className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                  quality === 70 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Standard (70%)
              </button>
              <button
                onClick={() => handleQualityChange(45)}
                className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                  quality === 45 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Maximum (45%)
              </button>
            </div>
          </div>

          {/* Download Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!compressedUrl || isProcessing}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download Compressed Image ({formatFileSize(compressedSize)})
            </button>
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          {/* Visual Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase">
                <span>Original</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <div className="aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                <img src={previewUrl} alt="Original" className="max-h-full max-w-full object-contain rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase">
                <span>Compressed Result</span>
                <span className="text-emerald-600 font-bold">
                  {formatFileSize(compressedSize)} {savings > 0 ? `(-${savings}%)` : ''}
                </span>
              </div>
              <div className="aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                {compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain rounded" />
                ) : (
                  <div className="text-xs text-slate-400">Processing...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
