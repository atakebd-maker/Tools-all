import React, { useState, useRef } from 'react';
import { Upload, Download, RotateCcw, Share2 } from 'lucide-react';
import { formatFileSize } from '../../utils/formatting';

interface SocialPreset {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  ratio: string;
}

const PRESETS: SocialPreset[] = [
  { id: 'yt-thumb', name: 'YouTube Thumbnail', platform: 'YouTube', width: 1280, height: 720, ratio: '16:9' },
  { id: 'ig-square', name: 'Instagram Post', platform: 'Instagram', width: 1080, height: 1080, ratio: '1:1' },
  { id: 'ig-story', name: 'Instagram Story / Reel', platform: 'Instagram', width: 1080, height: 1920, ratio: '9:16' },
  { id: 'fb-post', name: 'Facebook Feed Post', platform: 'Facebook', width: 1200, height: 630, ratio: '1.91:1' },
  { id: 'fb-cover', name: 'Facebook Cover Photo', platform: 'Facebook', width: 820, height: 312, ratio: '2.6:1' },
  { id: 'x-post', name: 'X / Twitter Post', platform: 'X', width: 1200, height: 675, ratio: '16:9' },
  { id: 'x-header', name: 'X / Twitter Header', platform: 'X', width: 1500, height: 500, ratio: '3:1' },
  { id: 'li-banner', name: 'LinkedIn Banner', platform: 'LinkedIn', width: 1584, height: 396, ratio: '4:1' },
  { id: 'pin', name: 'Pinterest Pin', platform: 'Pinterest', width: 1000, height: 1500, ratio: '2:3' }
];

export const SocialImageResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<SocialPreset>(PRESETS[0]);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const [resizedSize, setResizedSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      renderResize(img, selectedPreset, fitMode, bgColor);
    };
    img.src = url;
  };

  const renderResize = (
    img: HTMLImageElement,
    preset: SocialPreset,
    fit: 'cover' | 'contain',
    bg: string
  ) => {
    const canvas = document.createElement('canvas');
    canvas.width = preset.width;
    canvas.height = preset.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;

    let drawW = canvas.width;
    let drawH = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (fit === 'cover') {
      if (imgAspect > canvasAspect) {
        drawW = canvas.height * imgAspect;
        drawX = (canvas.width - drawW) / 2;
      } else {
        drawH = canvas.width / imgAspect;
        drawY = (canvas.height - drawH) / 2;
      }
    } else {
      // contain
      if (imgAspect > canvasAspect) {
        drawH = canvas.width / imgAspect;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgAspect;
        drawX = (canvas.width - drawW) / 2;
      }
    }

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    canvas.toBlob((blob) => {
      if (blob) {
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        setResizedUrl(URL.createObjectURL(blob));
        setResizedSize(blob.size);
      }
    }, 'image/jpeg', 0.92);
  };

  const handlePresetSelect = (preset: SocialPreset) => {
    setSelectedPreset(preset);
    if (imgRef.current) {
      renderResize(imgRef.current, preset, fitMode, bgColor);
    }
  };

  const handleFitChange = (mode: 'cover' | 'contain') => {
    setFitMode(mode);
    if (imgRef.current) {
      renderResize(imgRef.current, selectedPreset, mode, bgColor);
    }
  };

  const handleBgChange = (color: string) => {
    setBgColor(color);
    if (imgRef.current) {
      renderResize(imgRef.current, selectedPreset, fitMode, color);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const link = document.createElement('a');
    link.href = resizedUrl;
    link.download = `${selectedPreset.id}-${selectedPreset.width}x${selectedPreset.height}.jpg`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop an Image for Social Media
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Instantly resize and format for YouTube, Instagram, X/Twitter, Facebook, LinkedIn
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
                Resizing to {selectedPreset.name} ({selectedPreset.width} × {selectedPreset.height} px)
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl('');
                setResizedUrl('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
            >
              Change Image
            </button>
          </div>

          {/* Presets Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Social Media Platform & Target Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPreset.id === p.id
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {p.platform}
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.width} × {p.height} ({p.ratio})</p>
                </button>
              ))}
            </div>
          </div>

          {/* Fit & Background Options */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="uppercase text-[10px] text-slate-400">Fitting:</span>
              <button
                onClick={() => handleFitChange('cover')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  fitMode === 'cover' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Cover (Fill & Crop edges)
              </button>
              <button
                onClick={() => handleFitChange('contain')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  fitMode === 'contain' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Contain (Fit Entire Image)
              </button>
            </div>

            {fitMode === 'contain' && (
              <div className="flex items-center gap-2">
                <span className="uppercase text-[10px] text-slate-400">Letterbox Color:</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => handleBgChange(e.target.value)}
                  className="w-8 h-8 p-0.5 border border-slate-300 rounded cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {resizedUrl && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download for {selectedPreset.name} ({formatFileSize(resizedSize)})
              </button>
            )}
          </div>

          {/* Preview result */}
          {resizedUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-slate-600 uppercase block">
                Result Preview ({selectedPreset.width} × {selectedPreset.height} px)
              </span>
              <div className="max-h-[420px] flex items-center justify-center overflow-hidden rounded-lg bg-slate-200/50 p-4">
                <img src={resizedUrl} alt="Resized" className="max-h-[380px] object-contain rounded shadow-sm" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
