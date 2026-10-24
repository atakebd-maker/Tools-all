import React, { useState } from 'react';
import { Eye, Code, ShieldAlert, RotateCcw } from 'lucide-react';

export const HtmlPreviewer: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      max-width: 400px;
    }
    h2 { margin-top: 0; color: #2563eb; }
    button {
      background: #2563eb;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Sandboxed HTML Preview</h2>
    <p>This code runs inside an isolated iframe for maximum client security.</p>
    <button onclick="alert('Clicked inside sandbox!')">Click Me</button>
  </div>
</body>
</html>`);

  return (
    <div className="space-y-6">
      {/* Sandbox security notice */}
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong>Security Sandboxing:</strong> Code is executed inside an isolated, sandboxed browser iframe with restricted origins. It cannot access cookies, parent DOM elements, or storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-4 h-4 text-blue-600" />
              HTML / CSS Code Editor
            </span>
            <button
              onClick={() => setHtmlCode('')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={16}
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-600" />
            Live Rendered Output
          </span>
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs h-[360px]">
            <iframe
              title="HTML Sandbox Preview"
              srcDoc={htmlCode}
              sandbox="allow-scripts"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
