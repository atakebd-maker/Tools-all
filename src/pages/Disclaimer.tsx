import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AlertTriangle, ShieldCheck, Cpu, DollarSign, ExternalLink } from 'lucide-react';

interface DisclaimerProps {
  onNavigateHome: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Disclaimer' }
        ]}
      />

      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Website Disclaimer</h1>
        <p className="text-slate-500 text-sm mt-2">Last updated: October 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
        {/* General Disclaimer */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-amber-950 m-0">General Informational Disclaimer</h2>
            <p className="text-xs sm:text-sm text-amber-900 m-0">
              The tools, calculators, generators, and content provided on Zynovexa are intended solely for general informational, educational, and productivity purposes. While we strive to maintain high accuracy and performance, we make no warranties or representations of any kind regarding completeness, precision, or suitability for critical tasks.
            </p>
          </div>
        </div>

        {/* Financial Calculators Disclaimer */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900 m-0">Financial & Mathematical Calculators</h2>
          </div>
          <p>
            Loan EMI calculators, GST/VAT calculators, compound interest estimators, and discount calculations are mathematical models based on standard formulas. They do not account for individual lender fees, compounding schedules, regional tax nuances, or institutional terms.
          </p>
          <p className="font-semibold text-slate-800">
            Calculations do not constitute professional financial, tax, or legal advice. Consult a certified financial planner or tax professional before making significant fiscal commitments.
          </p>
        </section>

        {/* Client-Side Privacy */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900 m-0">File Handling & Local Privacy</h2>
          </div>
          <p>
            All file operations, conversions, calculations, and data processing (including image resizing, cropping, compression, PDF merging, format conversions, and text manipulations) are processed 100% locally within your web browser using HTML5 Canvas, Web Cryptography, and client-side JavaScript. None of your source files or private input data are ever uploaded to or stored on any server.
          </p>
        </section>

        {/* Contact */}
        <section className="pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            For questions or concerns regarding this disclaimer or our terms of service, please reach out via our contact page.
          </p>
        </section>
      </div>
    </div>
  );
};
