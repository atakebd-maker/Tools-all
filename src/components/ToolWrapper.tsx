import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { AdBanner, AD_KEYS } from './AdBanner';
import { ToolItem } from '../data/tools';
import { ComprehensiveToolGuide } from './ComprehensiveToolGuide';
import { getToolGuide } from '../data/toolGuides';
import { ToolFaqAccordion } from './ToolFaqAccordion';

interface ToolWrapperProps {
  toolId?: string;
  name: string;
  categoryName: string;
  categorySlug: string;
  description: string;
  instructions?: string[];
  limitations?: string[];
  faqs?: { q: string; a: string }[];
  onNavigateCategory: () => void;
  onNavigateHome: () => void;
  onNavigateFaq?: () => void;
  children: React.ReactNode;
  relatedTools?: { id: string; name: string; description: string; onSelect: () => void }[];
  toolItem?: ToolItem;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({
  toolId,
  name,
  categoryName,
  categorySlug,
  description,
  instructions,
  limitations,
  faqs,
  onNavigateCategory,
  onNavigateHome,
  onNavigateFaq,
  children,
  relatedTools,
  toolItem
}) => {
  const guide = toolItem
    ? getToolGuide(toolItem)
    : getToolGuide({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category: categorySlug,
        description,
        keywords: [name.toLowerCase()],
        component: () => null,
        instructions: instructions || [],
        limitations: limitations || [],
        faqs: faqs || []
      });

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

      {/* Tool Top Banner (320x50) - Opens at top of each tool */}
      <div className="w-full flex justify-center my-3 overflow-hidden">
        <div className="max-w-full overflow-x-auto flex justify-center">
          <AdBanner
            adKey={AD_KEYS.TOOL_HEADER_AND_MID}
            slotType="toolTop"
            width={320}
            height={50}
            label={true}
            wrapperClassName="!my-0 origin-center"
            className="bg-white shadow-2xs rounded-md"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{name}</h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Browser Processing
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Free & Private
          </span>
          <a
            href="#tool-usage-guide"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            Detailed Guide & Steps
          </a>
        </div>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">{description}</p>
      </div>

      {/* Primary Tool Interactive Interface Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
        {children}
      </div>

      {/* Tool Middle Ad Banner (320x50) - Inside middle space */}
      <div className="w-full flex justify-center my-6 overflow-hidden">
        <div className="max-w-full overflow-x-auto flex justify-center">
          <AdBanner
            adKey={AD_KEYS.TOOL_HEADER_AND_MID}
            slotType="toolMiddle"
            width={320}
            height={50}
            label={true}
            wrapperClassName="!my-0 origin-center"
            className="bg-white shadow-2xs rounded-md"
          />
        </div>
      </div>

      {/* Privacy Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-8 flex items-start gap-3.5">
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

      {/* Comprehensive Dedicated Tool Usage Guide */}
      <ComprehensiveToolGuide guide={guide} categoryName={categoryName} />

      {/* Dedicated Tool-Specific FAQ Section with + and - Toggles */}
      <ToolFaqAccordion
        toolId={toolId || toolItem?.id || guide.id}
        toolName={name}
        categoryName={categoryName}
        faqs={guide.faqs}
        onNavigateFaq={onNavigateFaq}
      />

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
