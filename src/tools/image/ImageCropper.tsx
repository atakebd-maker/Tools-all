import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Crop as CropIcon } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

export const ImageCropper: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [aspect, setAspect] = useState<string>('free'); // free, 1:1, 16:9, 4:3
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 }); // in percentages
  const [croppedUrl, setCroppedUrl] = useState<string>('');
  const [croppedSize, setCroppedSize] = useState<number>(0);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setImageSrc(url);
    setCroppedUrl('');

    const img = new Image();
    img.onload = () => {
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      setCrop({ x: 10, y: 10, width: 80, height: 80 });
    };
    img.src = url;
  };

  const handleAspectChange = (newAspect: string) => {
    setAspect(newAspect);
    if (newAspect === '1:1') {
      const minSide = Math.min(crop.width, crop.height);
      setCrop({ ...crop, width: minSide, height: minSide });
    } else if (newAspect === '16:9') {
      const h = Math.round(crop.width * (9 / 16));
      setCrop({ ...crop, height: Math.min(h, 90) });
    } else if (newAspect === '4:3') {
      const h = Math.round(crop.width * (3 / 4));
      setCrop({ ...crop, height: Math.min(h, 90) });
    }
  };

  const executeCrop = () => {
    if (!imageRef.current || naturalSize.width === 0) return;

    const canvas = document.createElement('canvas');
    const pixelX = Math.round((crop.x / 100) * naturalSize.width);
    const pixelY = Math.round((crop.y / 100) * naturalSize.height);
    const pixelW = Math.round((crop.width / 100) * naturalSize.width);
    const pixelH = Math.round((crop.height / 100) * naturalSize.height);

    canvas.width = Math.max(1, pixelW);
    canvas.height = Math.max(1, pixelH);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imageRef.current,
      pixelX,
      pixelY,
      pixelW,
      pixelH,
      0,
      0,
      pixelW,
      pixelH
    );

    canvas.toBlob((blob) => {
      if (blob) {
        if (croppedUrl) URL.revokeObjectURL(croppedUrl);
        setCroppedUrl(URL.createObjectURL(blob));
        setCroppedSize(blob.size);
      }
    }, 'image/png');
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const link = document.createElement('a');
    link.href = croppedUrl;
    link.download = `cropped-${file?.name || 'image.png'}`;
    link.click();
  };

  const handleReset = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    setFile(null);
    setImageSrc('');
    setCroppedUrl('');
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select an Image to Crop
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Crop with custom aspect ratios or fine-tuned coordinates
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
                Resolution: {naturalSize.width} × {naturalSize.height} px
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

          {/* Aspect Ratio & Coordinate sliders */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-600 uppercase mr-2">Aspect Ratio:</span>
              {['free', '1:1', '16:9', '4:3'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleAspectChange(item)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase border transition-colors ${
                    aspect === item ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  Crop Width: {crop.width}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={crop.width}
                  onChange={(e) => {
                    const w = parseInt(e.target.value);
                    setCrop({ ...crop, width: w, x: Math.min(crop.x, 100 - w) });
                  }}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  Crop Height: {crop.height}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={crop.height}
                  onChange={(e) => {
                    const h = parseInt(e.target.value);
                    setCrop({ ...crop, height: h, y: Math.min(crop.y, 100 - h) });
                  }}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  Horizontal Offset: {crop.x}%
                </label>
                <input
                  type="range"
                  min="0"
                  max={100 - crop.width}
                  value={crop.x}
                  onChange={(e) => setCrop({ ...crop, x: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  Vertical Offset: {crop.y}%
                </label>
                <input
                  type="range"
                  min="0"
                  max={100 - crop.height}
                  value={crop.y}
                  onChange={(e) => setCrop({ ...crop, y: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Interactive Visual Overlay Preview */}
          <div className="relative border border-slate-300 rounded-xl overflow-hidden bg-slate-900/5 p-4 flex items-center justify-center max-h-[450px]">
            <div className="relative inline-block max-h-[400px]">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="To Crop"
                className="max-h-[380px] max-w-full block rounded select-none pointer-events-none"
              />
              {/* Crop box visual indicator */}
              <div
                style={{
                  left: `${crop.x}%`,
                  top: `${crop.y}%`,
                  width: `${crop.width}%`,
                  height: `${crop.height}%`
                }}
                className="absolute border-2 border-blue-500 bg-blue-500/20 shadow-xl pointer-events-none transition-all duration-75"
              >
                <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  {Math.round((crop.width / 100) * naturalSize.width)} × {Math.round((crop.height / 100) * naturalSize.height)} px
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={executeCrop}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <CropIcon className="w-4 h-4" />
              Apply Crop
            </button>
            {croppedUrl && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Cropped Image ({formatFileSize(croppedSize)})
              </button>
            )}
          </div>

          {croppedUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                Cropped Output
              </span>
              <div className="flex items-center justify-center p-2 bg-white rounded-lg border border-slate-200 max-h-72 overflow-hidden">
                <img src={croppedUrl} alt="Cropped preview" className="max-h-64 object-contain rounded" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
