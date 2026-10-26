import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ShieldCheck, Info, HelpCircle, Sparkles } from 'lucide-react';
import { AdBanner, AD_KEYS } from './AdBanner';

interface ToolWrapperProps {
  name: string;
  categoryName: string;
  categorySlug: string;
  description: string;
  instructions?: string[];
  limitations?: string[];
  faqs?: { q: string; a: string }[];
  onNavigateCategory: () => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
  relatedTools?: { id: string; name: string; description: string; onSelect: () => void }[];
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({
  name,
  categoryName,
  description,
  instructions,
  limitations,
  faqs,
  onNavigateCategory,
  onNavigateHome,
  children,
  relatedTools
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: categoryName, onClick: onNavigateCategory },
          { label: name }
        ]}
      />

      {/* Tool Top Banner (468x60) - Opens at top of each tool */}
      <div className="w-full flex justify-center my-3 overflow-hidden">
        <div className="max-w-full overflow-x-auto flex justify-center">
          <AdBanner
            adKey={AD_KEYS.TOOL_HEADER_AND_MID}
            slotType="toolTop"
            width={468}
            height={60}
            label={true}
            wrapperClassName="!my-0 scale-90 sm:scale-100 origin-center"
            className="bg-white shadow-2xs"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{name}</h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Browser Processing
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Free & Private
          </span>
        </div>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">{description}</p>
      </div>

      {/* Primary Tool Interactive Interface Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
        {children}
      </div>

      {/* Tool Middle Ad Banner (468x60) - Inside middle space */}
      <div className="w-full flex justify-center my-6 overflow-hidden">
        <div className="max-w-full overflow-x-auto flex justify-center">
          <AdBanner
            adKey={AD_KEYS.TOOL_HEADER_AND_MID}
            slotType="toolMiddle"
            width={468}
            height={60}
            label={true}
            wrapperClassName="!my-0 scale-90 sm:scale-100 origin-center"
            className="bg-white shadow-2xs"
          />
        </div>
      </div>

      {/* Privacy Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-10 flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Privacy Guarantee: Processed Locally</h3>
          <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">
            Your files and input data never leave your computer. All manipulations are computed entirely inside your web browser using HTML5 Canvas, Web Cryptography, and local Web APIs. Nothing is uploaded to any server.
          </p>
        </div>
      </div>

      {/* Tool Instructions & Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {instructions && instructions.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-base">
              <Info className="w-5 h-5 text-blue-600" />
              <h2>How to Use This Tool</h2>
            </div>
            <ol className="space-y-2.5 text-sm text-slate-600 list-decimal list-inside leading-relaxed">
              {instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span className="text-slate-800 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {limitations && limitations.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-base">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h2>Features & Browser Limitations</h2>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600 list-disc list-inside leading-relaxed">
              {limitations.map((lim, idx) => (
                <li key={idx} className="pl-1">
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FAQs Section */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold text-lg">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools & Sponsored Vertical Ad Unit */}
      {relatedTools && relatedTools.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={tool.onSelect}
                  className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-base mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Multi-Placement Ad Unit (320x50) */}
            <div className="w-full flex justify-center mt-6">
              <AdBanner
                adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
                slotType="multiPlacement"
                width={320}
                height={50}
                label={true}
                className="bg-white shadow-2xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
