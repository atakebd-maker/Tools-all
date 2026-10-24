import React, { useState } from 'react';
import { Upload, Download, FileText, AlertCircle, Scissors, Trash2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize } from '../../utils/formatting';

export const PdfSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [mode, setMode] = useState<'extract' | 'delete'>('extract');
  const [pageRange, setPageRange] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setError('');
    setResultBlob(null);

    try {
      const buffer = await selected.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setFile(selected);
      setTotalPages(count);
      setPageRange(`1-${Math.min(count, 3)}`);
    } catch (err: any) {
      setError('Could not read PDF. Make sure it is not corrupted or password-protected.');
    }
  };

  const parsePageIndices = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(',').map((s) => s.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(maxPages, Math.max(start, end));
          for (let i = from; i <= to; i++) {
            pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pages.add(pageNum - 1);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleProcess = async () => {
    if (!file || totalPages === 0) return;
    setIsProcessing(true);
    setError('');

    try {
      const arrayBuf = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuf);
      const newDoc = await PDFDocument.create();

      const selectedIndices = parsePageIndices(pageRange, totalPages);

      let targetIndices: number[] = [];
      if (mode === 'extract') {
        if (selectedIndices.length === 0) {
          throw new Error('Please specify at least one valid page number to extract.');
        }
        targetIndices = selectedIndices;
      } else {
        // delete mode
        const allIndices = Array.from({ length: totalPages }, (_, i) => i);
        targetIndices = allIndices.filter((idx) => !selectedIndices.includes(idx));
        if (targetIndices.length === 0) {
          throw new Error('You cannot delete all pages of the document.');
        }
      }

      const copiedPages = await newDoc.copyPages(srcDoc, targetIndices);
      copiedPages.forEach((p) => newDoc.addPage(p));

      const outBytes = await newDoc.save();
      const blob = new Blob([outBytes as any], { type: 'application/pdf' });
      setResultBlob(blob);
      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'Error processing PDF pages.');
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mode === 'extract' ? 'extracted' : 'modified'}-${file?.name || 'document.pdf'}`;
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
              Select or Drop a PDF File to Split or Extract Pages
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Extract specific page ranges or remove unwanted pages directly in the browser
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
                setResultBlob(null);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200 cursor-pointer"
            >
              Change File
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <button
              onClick={() => {
                setMode('extract');
                setResultBlob(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                mode === 'extract' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Scissors className="w-4 h-4" />
              Extract Selected Pages
            </button>
            <button
              onClick={() => {
                setMode('delete');
                setResultBlob(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                mode === 'delete' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Delete Pages
            </button>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {mode === 'extract' ? 'Pages to Extract' : 'Pages to Delete'} (Range: 1 to {totalPages})
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g. 1, 3-5, 8"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <p className="text-xs text-slate-500">
              Enter individual pages or comma-separated ranges. Example: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">1, 3-5</code>
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Processing PDF...' : mode === 'extract' ? 'Extract Pages' : 'Remove Pages'}
            </button>

            {resultBlob && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download New PDF ({formatFileSize(resultBlob.size)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
