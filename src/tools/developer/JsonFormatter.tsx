import React, { useState } from 'react';
import { Copy, Check, Download, AlertCircle, Sparkles, Minimize2, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadText, formatFileSize } from '../../utils/formatting';

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>(
    JSON.stringify(
      {
        name: 'Zynovexa',
        type: 'Online Browser Tools & Automation',
        features: ['100% Client-Side', 'No Server Uploads', 'Free Forever'],
        stats: { tools: 100, requiresAuth: false, isPWA: false }
      },
      null,
      2
    )
  );
  const [indentSize, setIndentSize] = useState<number>(2);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = (spaces: number) => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err.message || 'Invalid JSON syntax');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(inputJson);
      setValidationError(null);
      alert('Valid JSON syntax!');
    } catch (err: any) {
      setValidationError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadText(inputJson, 'data.json', 'application/json');
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => formatJson(2)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Format (2 Spaces)
          </button>
          <button
            onClick={() => formatJson(4)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={minifyJson}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minify JSON
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
          <button
            onClick={() => setInputJson('')}
            className="px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {validationError ? (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Invalid JSON: {validationError}</span>
        </div>
      ) : (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Valid JSON syntax structure</span>
        </div>
      )}

      {/* Editor Area */}
      <textarea
        rows={16}
        value={inputJson}
        onChange={(e) => {
          setInputJson(e.target.value);
          try {
            JSON.parse(e.target.value);
            setValidationError(null);
          } catch (err: any) {
            setValidationError(err.message);
          }
        }}
        className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
      />
    </div>
  );
};
