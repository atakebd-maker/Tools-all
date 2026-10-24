import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Cpu, Lock, Globe, Sparkles } from 'lucide-react';

interface AboutProps {
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateHome, onNavigateAllTools }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'About Us' }
        ]}
      />

      <div className="space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Our Philosophy & Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About Zynovexa
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Zynovexa is an all-in-one suite of fast, lightweight, and completely private online tools designed for everyday technical tasks, document manipulation, media optimization, and calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">100% Client-Side Execution</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Unlike traditional utility sites that upload your photos, documents, and private data to cloud servers, all processing in Zynovexa happens directly inside your web browser using HTML5 Canvas, Web Cryptography, and local Web APIs.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Guaranteed Privacy</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Because your files and text never leave your computer or mobile device, your confidential contracts, medical calculations, financial estimates, and passwords remain strictly yours.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">No Accounts or API Keys</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            There are no registration paywalls, spam emails, credit card prompts, or complex API configuration steps. Every tool is immediately accessible whenever you need it.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Universal Compatibility</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Engineered to run seamlessly across desktops, laptops, tablets, and smartphones, with touch-friendly controls and responsive layouts on any modern browser.
          </p>
        </div>
      </div>

      <div className="p-8 bg-blue-50 border border-blue-200 rounded-3xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Ready to explore?</h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Browse through our directory of image editors, PDF processors, calculators, and developer tools.
        </p>
        <button
          onClick={onNavigateAllTools}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          Explore All Tools
        </button>
      </div>
    </div>
  );
};
