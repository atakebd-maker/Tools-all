import React, { useState } from 'react';
import { Upload, Download, FolderArchive, FileText, Check, AlertCircle } from 'lucide-react';
import JSZip from 'jszip';
import { formatFileSize } from '../../utils/formatting';

interface ExtractedEntry {
  name: string;
  size: number;
  isDir: boolean;
  fileObj: JSZip.JSZipObject;
}

export const ZipExtractor: React.FC = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<ExtractedEntry[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setZipFile(file);
    setIsExtracting(true);

    try {
      const zip = new JSZip();
      const loaded = await zip.loadAsync(file);
      const list: ExtractedEntry[] = [];

      loaded.forEach((relativePath, zipEntry) => {
        list.push({
          name: relativePath,
          size: (zipEntry as any)._data?.uncompressedSize || 0,
          isDir: zipEntry.dir,
          fileObj: zipEntry
        });
      });

      setEntries(list);
      setIsExtracting(false);
    } catch {
      setIsExtracting(false);
      setError('Failed to extract ZIP archive. Make sure the file is not password-protected or corrupted.');
    }
  };

  const downloadSingleEntry = async (entry: ExtractedEntry) => {
    if (entry.isDir) return;
    const blob = await entry.fileObj.async('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = entry.name.split('/').pop() || 'file';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      {!zipFile ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
          <label className="cursor-pointer block">
            <FolderArchive className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
              Select or Drop a ZIP File to Extract
            </span>
            <span className="text-sm text-slate-500 block mb-4">
              Inspect archived files and extract individual files directly in the browser
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
              Browse ZIP
            </span>
            <input type="file" accept=".zip,application/zip" className="hidden" onChange={handleZipUpload} />
          </label>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <p className="font-semibold text-slate-900 text-sm truncate max-w-xs">{zipFile.name}</p>
              <p className="text-xs text-slate-500">
                {entries.length} items found • {formatFileSize(zipFile.size)}
              </p>
            </div>
            <button
              onClick={() => {
                setZipFile(null);
                setEntries([]);
              }}
              className="text-xs font-semibold text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
            >
              Change Archive
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {entries.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className={`truncate font-mono ${item.isDir ? 'font-bold text-blue-700' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                  {!item.isDir && item.size > 0 && (
                    <span className="text-slate-400">({formatFileSize(item.size)})</span>
                  )}
                </div>

                {!item.isDir && (
                  <button
                    onClick={() => downloadSingleEntry(item)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Extract
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
