import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, Download, Trash2, ArrowUpDown, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { downloadBlob } from '../../utils/formatting';

// 1. PDF Page Counter & Information Viewer
export const PdfInfoViewer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setIsLoading(true);
    setError(null);

    try {
      const buffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);

      setInfo({
        name: f.name,
        sizeMb: (f.size / (1024 * 1024)).toFixed(2),
        pageCount: pdfDoc.getPageCount(),
        title: pdfDoc.getTitle() || 'Not specified',
        author: pdfDoc.getAuthor() || 'Not specified',
        subject: pdfDoc.getSubject() || 'Not specified',
        creator: pdfDoc.getCreator() || 'Not specified',
        producer: pdfDoc.getProducer() || 'Not specified',
        creationDate: pdfDoc.getCreationDate()?.toLocaleDateString() || 'Unknown'
      });
    } catch (err: any) {
      setError('Failed to inspect PDF. The file may be password protected or corrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
        <FileText className="w-8 h-8 text-blue-600 mb-2" />
        <span className="text-sm font-semibold text-slate-800">Select PDF to Inspect</span>
        <span className="text-xs text-slate-400 mt-1">Extract page count, metadata & document properties</span>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
      </label>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {info && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <p className="text-3xl font-black text-blue-900">{info.pageCount}</p>
              <p className="text-xs text-blue-700 font-bold mt-1">Total Pages</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <p className="text-3xl font-black text-emerald-900">{info.sizeMb} MB</p>
              <p className="text-xs text-emerald-700 font-bold mt-1">File Size</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <p className="text-sm font-bold text-purple-900 truncate">{info.author}</p>
              <p className="text-xs text-purple-700 font-bold mt-1">Author</p>
            </div>
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-center">
              <p className="text-sm font-bold text-slate-800 truncate">{info.creationDate}</p>
              <p className="text-xs text-slate-600 font-bold mt-1">Created Date</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Title:</span>
              <span className="font-semibold text-slate-800">{info.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Subject:</span>
              <span className="font-semibold text-slate-800">{info.subject}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Application Creator:</span>
              <span className="font-semibold text-slate-800">{info.creator}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">PDF Producer:</span>
              <span className="font-semibold text-slate-800">{info.producer}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Extract PDF Pages
export const PdfPageExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState<string>('1, 2-3');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      setTotalPages(doc.getPageCount());
      setError(null);
    } catch (e) {
      setError('Unable to read PDF file.');
    }
  };

  const handleExtract = async () => {
    if (!file || !totalPages) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const newDoc = await PDFDocument.create();

      // Parse range: e.g. "1, 2-3"
      const indicesToExtract = new Set<number>();
      const parts = pageRange.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [startStr, endStr] = trimmed.split('-');
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
              if (i >= 1 && i <= totalPages) indicesToExtract.add(i - 1);
            }
          }
        } else {
          const p = parseInt(trimmed, 10);
          if (!isNaN(p) && p >= 1 && p <= totalPages) {
            indicesToExtract.add(p - 1);
          }
        }
      }

      if (indicesToExtract.size === 0) {
        throw new Error('No valid page numbers found in specified range.');
      }

      const copiedPages = await newDoc.copyPages(srcDoc, Array.from(indicesToExtract).sort((a, b) => a - b));
      copiedPages.forEach((p) => newDoc.addPage(p));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      downloadBlob(blob, `extracted-${file.name}`);
    } catch (err: any) {
      setError(err.message || 'Failed to extract pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800">Select PDF to Extract Pages From</span>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-slate-800">{file.name}</p>
              <p className="text-xs text-blue-600">{totalPages} pages total</p>
            </div>
            <button
              onClick={() => { setFile(null); setTotalPages(0); }}
              className="text-xs text-slate-400 hover:text-red-600 cursor-pointer"
            >
              Change file
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Pages to Extract (e.g. 1, 3-5)
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            onClick={handleExtract}
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isProcessing ? 'Extracting...' : 'Extract & Download PDF'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// 3. Delete PDF Pages
export const PdfPageDeleter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pagesToDelete, setPagesToDelete] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      setTotalPages(doc.getPageCount());
      setError(null);
    } catch (e) {
      setError('Unable to read PDF file.');
    }
  };

  const handleDelete = async () => {
    if (!file || !totalPages) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);

      const deleteSet = new Set<number>();
      const parts = pagesToDelete.split(',');
      for (const part of parts) {
        const num = parseInt(part.trim(), 10);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
          deleteSet.add(num - 1);
        }
      }

      if (deleteSet.size >= totalPages) {
        throw new Error('Cannot delete all pages in the PDF.');
      }

      // Delete in descending order so indices remain valid
      const sortedDesc = Array.from(deleteSet).sort((a, b) => b - a);
      for (const idx of sortedDesc) {
        doc.removePage(idx);
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      downloadBlob(blob, `trimmed-${file.name}`);
    } catch (err: any) {
      setError(err.message || 'Failed to remove pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800">Select PDF to Remove Pages</span>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <p className="font-bold text-sm text-slate-800">{file.name}</p>
            <p className="text-xs text-blue-600">{totalPages} pages total</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Page numbers to remove (e.g. 1, 3, 5)
            </label>
            <input
              type="text"
              value={pagesToDelete}
              onChange={(e) => setPagesToDelete(e.target.value)}
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isProcessing ? 'Removing...' : 'Delete Pages & Download'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
