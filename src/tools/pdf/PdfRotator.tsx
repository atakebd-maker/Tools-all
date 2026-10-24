import React, { useState } from 'react';
import { Upload, Download, RotateCw, FileText, AlertCircle } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { formatFileSize } from '../../utils/formatting';

export const PdfRotator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [scope, setScope] = useState<'all' | 'custom'>('all');
  const [customRange, setCustomRange] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setError('');
    setRotatedBlob(null);

    try {
      const buffer = await selected.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setFile(selected);
      setTotalPages(doc.getPageCount());
      setCustomRange(`1-${doc.getPageCount()}`);
    } catch {
      setError('Could not open PDF file.');
    }
  };

  const handleRotate = async () => {
    if (!file || totalPages === 0) return;
    setIsProcessing(true);
    setError('');

    try {
      const arrayBuf = await file.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuf);
      const pages = doc.getPages();

      let targetIndices: number[] = [];
      if (scope === 'all') {
        targetIndices = pages.map((_, i) => i);
      } else {
        const parts = customRange.split(',').map((s) => s.trim());
        const set = new Set<number>();
        for (const p of parts) {
          if (p.includes('-')) {
            const [s, e] = p.split('-').map((n) => parseInt(n.trim(), 10));
            if (!isNaN(s) && !isNaN(e)) {
              for (let i = Math.min(s, e); i <= Math.max(s, e); i++) {
                if (i >= 1 && i <= totalPages) set.add(i - 1);
              }
            }
          } else {
            const num = parseInt(p, 10);
            if (!isNaN(num) && num >= 1 && num <= totalPages) set.add(num - 1);
          }
        }
        targetIndices = Array.from(set);
      }

      for (const idx of targetIndices) {
        if (pages[idx]) {
          const currentRotation = pages[idx].getRotation().angle;
          pages[idx].setRotation(degrees((currentRotation + rotationAngle) % 360));
        }
      }

      const outBytes = await doc.save();
      const blob = new Blob([outBytes as any], { type: 'application/pdf' });
      setRotatedBlob(blob);
      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'Error rotating PDF pages.');
    }
  };

  const handleDownload = () => {
    if (!rotatedBlob) return;
    const url = URL.createObjectURL(rotatedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rotated-${file?.name || 'document.pdf'}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop a PDF File to Rotate
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Rotate all pages or specific page numbers by 90°, 180°, or 270°
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
              Browse PDF
            </span>
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-slate-500">
                  {totalPages} {totalPages === 1 ? 'Page' : 'Pages'} • {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setRotatedBlob(null);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200 cursor-pointer"
            >
              Change File
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Rotation Angle
              </label>
              <div className="flex items-center gap-2">
                {[90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotationAngle(deg)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      rotationAngle === deg
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    +{deg}°
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Pages to Apply
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScope('all')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    scope === 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All Pages ({totalPages})
                </button>
                <button
                  onClick={() => setScope('custom')}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    scope === 'custom'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Selected Range
                </button>
              </div>
            </div>

            {scope === 'custom' && (
              <div className="sm:col-span-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Specify Pages (e.g. 1, 3-5)
                </label>
                <input
                  type="text"
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleRotate}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              {isProcessing ? 'Rotating Pages...' : 'Apply Rotation'}
            </button>

            {rotatedBlob && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Rotated PDF ({formatFileSize(rotatedBlob.size)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
