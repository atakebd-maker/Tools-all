import React, { useState } from 'react';
import { Upload, Download, Trash2, FolderArchive, FileText, Check } from 'lucide-react';
import JSZip from 'jszip';
import { formatFileSize } from '../../utils/formatting';

export const ZipCreator: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [zipName, setZipName] = useState<string>('archive.zip');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zippedBlob, setZippedBlob] = useState<Blob | null>(null);

  const handleFilesAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    setFiles((prev) => [...prev, ...selected]);
    setZippedBlob(null);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setZippedBlob(null);
  };

  const handleCreateZip = async () => {
    if (files.length === 0) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }

      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      setZippedBlob(content);
      setIsZipping(false);
    } catch {
      setIsZipping(false);
    }
  };

  const handleDownload = () => {
    if (!zippedBlob) return;
    const url = URL.createObjectURL(zippedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipName.endsWith('.zip') ? zipName : `${zipName}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const totalRawSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
        <label className="cursor-pointer block">
          <FolderArchive className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
            Select Files to Package into a ZIP Archive
          </span>
          <span className="text-sm text-slate-500 block mb-4">
            Compress any files directly on your computer with complete privacy
          </span>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
            Browse Files
          </span>
          <input type="file" multiple className="hidden" onChange={handleFilesAdded} />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 uppercase">
                {files.length} {files.length === 1 ? 'file' : 'files'} selected • Total: {formatFileSize(totalRawSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={zipName}
                onChange={(e) => setZipName(e.target.value)}
                placeholder="archive.zip"
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 bg-white"
              />
              <button
                onClick={() => {
                  setFiles([]);
                  setZippedBlob(null);
                }}
                className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white max-h-60 overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{f.name}</span>
                  <span className="text-slate-400">({formatFileSize(f.size)})</span>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateZip}
              disabled={isZipping || files.length === 0}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isZipping ? 'Compressing Archive...' : 'Create ZIP File'}
            </button>

            {zippedBlob && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download ZIP ({formatFileSize(zippedBlob.size)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
