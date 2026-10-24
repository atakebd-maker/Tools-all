import React, { useState } from 'react';
import { Upload, Copy, Check, FileCheck, ShieldCheck } from 'lucide-react';
import { copyToClipboard, formatFileSize } from '../../utils/formatting';

export const FileChecksum: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sha256, setSha256] = useState<string>('');
  const [sha512, setSha512] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setIsCalculating(true);
    setSha256('');
    setSha512('');

    try {
      const buffer = await selected.arrayBuffer();

      // SHA-256
      const hashBuf256 = await window.crypto.subtle.digest('SHA-256', buffer);
      const hashArray256 = Array.from(new Uint8Array(hashBuf256));
      setSha256(hashArray256.map((b) => b.toString(16).padStart(2, '0')).join(''));

      // SHA-512
      const hashBuf512 = await window.crypto.subtle.digest('SHA-512', buffer);
      const hashArray512 = Array.from(new Uint8Array(hashBuf512));
      setSha512(hashArray512.map((b) => b.toString(16).padStart(2, '0')).join(''));

      setIsCalculating(false);
    } catch {
      setIsCalculating(false);
    }
  };

  const handleCopy = async (val: string, key: string) => {
    await copyToClipboard(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
        <label className="cursor-pointer block">
          <FileCheck className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <span className="text-base sm:text-lg font-semibold text-slate-900 block mb-1">
            Select Any File to Calculate Cryptographic Checksum
          </span>
          <span className="text-sm text-slate-500 block mb-4">
            Verify file integrity with SHA-256 and SHA-512 checksums (Processed 100% locally)
          </span>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
            Browse File
          </span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {file && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 text-sm truncate max-w-sm">{file.name}</p>
              <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
            {isCalculating && (
              <span className="text-xs text-blue-600 font-semibold animate-pulse">
                Hashing in progress...
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  SHA-256 Checksum
                </span>
                <button
                  onClick={() => handleCopy(sha256, 'sha256')}
                  disabled={!sha256}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'sha256' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="font-mono text-xs text-slate-800 break-all select-all bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {sha256 || (isCalculating ? 'Computing hash...' : '')}
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  SHA-512 Checksum
                </span>
                <button
                  onClick={() => handleCopy(sha512, 'sha512')}
                  disabled={!sha512}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {copiedKey === 'sha512' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'sha512' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="font-mono text-xs text-slate-800 break-all select-all bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {sha512 || (isCalculating ? 'Computing hash...' : '')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
