import React, { useState } from 'react';
import { Upload, Copy, Check, Download, ArrowRightLeft } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatting';

export const Base64Image: React.FC = () => {
  const [mode, setMode] = useState<'image-to-base64' | 'base64-to-image'>('image-to-base64');
  const [base64Text, setBase64Text] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('image.png');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBase64Text(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Input = (val: string) => {
    setBase64Text(val);
    if (val.trim().startsWith('data:image/')) {
      setImagePreview(val.trim());
    } else if (val.trim().length > 10) {
      setImagePreview(`data:image/png;base64,${val.trim()}`);
    } else {
      setImagePreview('');
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(base64Text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!imagePreview) return;
    const a = document.createElement('a');
    a.href = imagePreview;
    a.download = `decoded-${fileName || 'image.png'}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setMode('image-to-base64')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            mode === 'image-to-base64' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Image to Base64
        </button>
        <button
          onClick={() => setMode('base64-to-image')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            mode === 'base64-to-image' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Base64 to Image
        </button>
      </div>

      {mode === 'image-to-base64' ? (
        <div className="space-y-5">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
            <label className="cursor-pointer block">
              <Upload className="w-10 h-10 mx-auto text-blue-600 mb-3" />
              <span className="text-base font-semibold text-slate-900 block mb-1">
                Upload image to encode as Base64
              </span>
              <span className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-2">
                Browse Image
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {base64Text && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 uppercase">
                  Data URI String ({base64Text.length.toLocaleString()} characters)
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Data URI' : 'Copy Data URI'}
                </button>
              </div>

              <textarea
                value={base64Text}
                readOnly
                rows={6}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none"
              />

              {imagePreview && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center max-h-60 overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="max-h-52 object-contain rounded" />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Paste Base64 String or Data URI
            </label>
            <textarea
              value={base64Text}
              onChange={(e) => handleBase64Input(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
              rows={6}
              className="w-full p-3 font-mono text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {imagePreview && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center max-h-72 overflow-hidden">
                <img src={imagePreview} alt="Decoded preview" className="max-h-64 object-contain rounded" />
              </div>

              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Decoded Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
