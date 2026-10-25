import React, { useState, useRef } from 'react';
import { Upload, RotateCw, FlipHorizontal, FlipVertical, Download, Eye, Maximize2, FileCheck } from 'lucide-react';
import { downloadBlob } from '../../utils/formatting';

// 1. Image Rotator
export const ImageRotator: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('rotated-image.png');
  const [rotation, setRotation] = useState<number>(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rads = (rotation * Math.PI) / 180;
      const is90or270 = Math.abs(rotation % 180) === 90;

      canvas.width = is90or270 ? img.height : img.width;
      canvas.height = is90or270 ? img.width : img.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rads);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `rotated-${fileName}`);
      }, 'image/png');
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800">Choose Image to Rotate</span>
          <span className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP</span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <button
                onClick={() => handleRotate(90)}
                className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Rotate 90°</span>
              </button>
              <button
                onClick={() => handleRotate(180)}
                className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Rotate 180°</span>
              </button>
              <button
                onClick={() => setRotation(0)}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Reset ({rotation}°)
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Rotated</span>
            </button>
          </div>

          <div className="flex items-center justify-center p-8 bg-slate-100 rounded-2xl min-h-[300px] overflow-hidden">
            <img
              src={imageSrc}
              alt="Preview"
              style={{ transform: `rotate(${rotation}deg)` }}
              className="max-h-80 max-w-full transition-transform duration-200 rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Image Flipper
export const ImageFlipper: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('flipped-image.png');
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `flipped-${fileName}`);
      }, 'image/png');
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800">Select Image to Mirror / Flip</span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <button
                onClick={() => setFlipH(!flipH)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  flipH ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Flip Horizontal (Mirror)</span>
              </button>
              <button
                onClick={() => setFlipV(!flipV)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  flipV ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Flip Vertical</span>
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Flipped</span>
            </button>
          </div>

          <div className="flex items-center justify-center p-8 bg-slate-100 rounded-2xl min-h-[300px]">
            <img
              src={imageSrc}
              alt="Preview"
              style={{
                transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`
              }}
              className="max-h-80 max-w-full rounded-lg shadow-sm transition-transform duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Image Preview & Inspector Tool
export const ImagePreviewTool: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        setDetails({
          name: file.name,
          sizeKb: (file.size / 1024).toFixed(1),
          type: file.type || 'image/png',
          width: img.width,
          height: img.height,
          aspectRatio: (img.width / img.height).toFixed(2)
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
          <Eye className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800">Upload Image to Inspect</span>
          <span className="text-xs text-slate-400 mt-1">Instant browser-side preview & analysis</span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          {details && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <p className="text-base font-bold text-blue-900">{details.width} × {details.height} px</p>
                <p className="text-[11px] text-blue-700 font-medium">Dimensions</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <p className="text-base font-bold text-emerald-900">{details.sizeKb} KB</p>
                <p className="text-[11px] text-emerald-700 font-medium">File Size</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center">
                <p className="text-base font-bold text-purple-900">{details.aspectRatio}:1</p>
                <p className="text-[11px] text-purple-700 font-medium">Aspect Ratio</p>
              </div>
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center">
                <p className="text-base font-bold text-slate-800 truncate">{details.type.split('/')[1]?.toUpperCase()}</p>
                <p className="text-[11px] text-slate-600 font-medium">MIME Type</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center p-6 bg-slate-100 rounded-2xl max-h-[450px] overflow-auto">
            <img src={imageSrc} alt="Preview" className="max-w-full rounded shadow-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Image Dimension Checker
export const ImageDimensionChecker: React.FC = () => {
  return <ImagePreviewTool />;
};
