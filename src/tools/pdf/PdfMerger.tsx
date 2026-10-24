import React, { useState } from 'react';
import { Upload, Download, Trash2, ArrowUp, ArrowDown, FileText, Check, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize } from '../../utils/formatting';

interface PdfFileItem {
  id: string;
  file: File;
  pageCount?: number;
}

export const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [mergedSize, setMergedSize] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setError('');
    const newItems: PdfFileItem[] = [];

    for (const f of selectedFiles) {
      if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) {
        setError('Only PDF files are supported for merging.');
        continue;
      }
      try {
        const arrayBuf = await f.arrayBuffer();
        const doc = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
        newItems.push({
          id: Math.random().toString(36).substring(7),
          file: f,
          pageCount: doc.getPageCount()
        });
      } catch (err: any) {
        newItems.push({
          id: Math.random().toString(36).substring(7),
          file: f
        });
      }
    }

    setFiles((prev) => [...prev, ...newItems]);
    setMergedBlob(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setFiles(updated);
    setMergedBlob(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsMerging(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const fileBytes = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      setMergedBlob(blob);
      setMergedSize(blob.size);
      setIsMerging(false);
    } catch (err: any) {
      setIsMerging(false);
      setError(err.message || 'Error merging PDF files. Please ensure files are not encrypted or password protected.');
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    const url = URL.createObjectURL(mergedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `merged-document-${Date.now()}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-10 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
        <label className="cursor-pointer block">
          <Upload className="w-10 h-10 mx-auto text-blue-600 mb-3" />
          <span className="text-base font-semibold text-slate-900 block mb-1">
            Choose Multiple PDF Files to Combine
          </span>
          <span className="text-sm text-slate-500 block mb-3">
            Drag & drop or select PDF files to merge in order
          </span>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
            Select PDF Files
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleFilesSelected}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 uppercase">
            <span>Files Queue ({files.length} documents)</span>
            <button
              onClick={() => {
                setFiles([]);
                setMergedBlob(null);
              }}
              className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
            {files.map((item, idx) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 truncate">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <FileText className="w-5 h-5 text-red-500 shrink-0" />
                  <div className="truncate">
                    <p className="font-medium text-slate-900 text-sm truncate">{item.file.name}</p>
                    <p className="text-xs text-slate-400">
                      {formatFileSize(item.file.size)} {item.pageCount ? `• ${item.pageCount} pages` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleMerge}
              disabled={isMerging || files.length < 2}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isMerging ? 'Merging PDFs...' : 'Merge PDF Files'}
            </button>

            {mergedBlob && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Merged PDF ({formatFileSize(mergedSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
