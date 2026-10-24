import React, { useState } from 'react';
import { Smartphone, Monitor, Globe, Search, AlertTriangle } from 'lucide-react';

export const SerpPreview: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [title, setTitle] = useState<string>('Free Online Tools & Automation – Zynovexa');
  const [url, setUrl] = useState<string>('https://zynovexa.com');
  const [description, setDescription] = useState<string>(
    'Resize images, convert units, manage PDF documents, format JSON, calculate loans, and use powerful browser-based tools with complete local privacy.'
  );

  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Page Title
            </label>
            <span
              className={`text-xs font-semibold ${
                titleLen > 60 ? 'text-red-600' : titleLen < 30 ? 'text-amber-600' : 'text-emerald-600'
              }`}
            >
              {titleLen} / 60 characters {titleLen > 60 ? '(May truncate on Google)' : ''}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
            Target Page URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Meta Description
            </label>
            <span
              className={`text-xs font-semibold ${
                descLen > 160 ? 'text-red-600' : descLen < 70 ? 'text-amber-600' : 'text-emerald-600'
              }`}
            >
              {descLen} / 160 characters {descLen > 160 ? '(May truncate on Google)' : ''}
            </span>
          </div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Device Switcher & SERP Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Google Search Snippet Simulation
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                device === 'desktop' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                device === 'mobile' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>
        </div>

        {/* Google Result Preview Mockup */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className={device === 'mobile' ? 'max-w-sm mx-auto border-x border-slate-100 px-3 py-2' : 'max-w-2xl'}>
            {/* Breadcrumb URL */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                🌐
              </div>
              <div className="text-xs text-slate-700 leading-none">
                <span className="font-medium text-slate-800">
                  {url.replace(/^https?:\/\//, '').split('/')[0]}
                </span>
                <span className="text-slate-400 text-[11px] block mt-0.5 truncate max-w-xs">{url}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
              {title || 'Page Title'}
            </h3>

            {/* Snippet */}
            <p className="text-xs sm:text-sm text-[#4d5156] mt-1 leading-relaxed line-clamp-2">
              {description || 'Meta description will appear here as a brief summary in search results.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
