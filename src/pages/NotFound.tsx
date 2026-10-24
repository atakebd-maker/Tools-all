import React from 'react';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';

interface NotFoundProps {
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome, onNavigateAllTools }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Page or Tool Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          The tool or page URL you requested doesn't exist or may have been relocated.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          Go to Homepage
        </button>
        <button
          onClick={onNavigateAllTools}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          Browse All Tools
        </button>
      </div>
    </div>
  );
};
