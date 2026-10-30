import React, { useState } from 'react';
import { ToolGuide } from '../data/toolGuides/types';
import {
  BookOpen,
  ListOrdered,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Copy,
  Check,
  Plus,
  Minus
} from 'lucide-react';

interface ComprehensiveToolGuideProps {
  guide: ToolGuide;
  categoryName: string;
}

type GuideTab = 'overview' | 'steps' | 'example' | 'tips' | 'troubleshooting' | 'faqs';

export const ComprehensiveToolGuide: React.FC<ComprehensiveToolGuideProps> = ({
  guide,
  categoryName
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('steps');
  const [copiedExample, setCopiedExample] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyExample = () => {
    if (guide.example?.input) {
      navigator.clipboard.writeText(guide.example.input);
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  const tabs: { id: GuideTab; label: string; icon: React.ReactNode }[] = [
    { id: 'steps', label: 'Step-by-Step Guide', icon: <ListOrdered className="w-4 h-4" /> },
    { id: 'overview', label: 'Overview & Features', icon: <Info className="w-4 h-4" /> },
    { id: 'example', label: 'Worked Example', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'tips', label: 'Tips for Better Results', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'troubleshooting', label: 'Common Problems', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <div id="tool-usage-guide" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-10 transition-all">
      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/60 p-6 sm:p-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive User Guide
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              {categoryName}
            </span>
          </div>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            100% Client-Side Privacy
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How to Use {guide.name}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl leading-relaxed">
          {guide.subtitle}
        </p>
      </div>

      {/* Navigation Tabs (Mobile-Friendly Horizontal Scroll) */}
      <div className="flex items-center gap-1.5 p-2 sm:p-3 bg-slate-50/80 border-b border-slate-200 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: STEP-BY-STEP INSTRUCTIONS */}
        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Step-by-Step Usage Instructions</h3>
            </div>
            <p className="text-sm text-slate-600">
              Follow these simple numbered steps to complete your task directly in your browser:
            </p>

            <ol className="space-y-4">
              {guide.stepByStep.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/60 border border-slate-100">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 text-sm text-slate-700 leading-relaxed font-medium">
                    {step}
                  </div>
                </li>
              ))}
            </ol>

            {/* Quick Before You Start Reminder */}
            {guide.beforeYouStart && guide.beforeYouStart.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Before You Start
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-blue-800">
                  {guide.beforeYouStart.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: OVERVIEW & FEATURES */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">What Does {guide.name} Do?</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {guide.whatItDoes.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Who Benefits from This Tool?
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {guide.whatItDoes.targetAudience}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Expected Result
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {guide.whatItDoes.expectedResult}
                </p>
              </div>
            </div>

            {/* Problems Solved */}
            {guide.whatItDoes.problemsSolved && (
              <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="text-sm font-bold text-emerald-900 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Problems This Tool Solves
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-800">
                  {guide.whatItDoes.problemsSolved.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Features */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Verified Features & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guide.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORKED EXAMPLE */}
        {activeTab === 'example' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">{guide.example.title}</h3>
            </div>
            <p className="text-sm text-slate-600">
              Here is a realistic, practical demonstration showing sample inputs and expected outputs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample Input */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-sans font-semibold text-xs uppercase tracking-wider">
                    Sample Input
                  </span>
                  <button
                    onClick={handleCopyExample}
                    className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    {copiedExample ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedExample ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="whitespace-pre-wrap break-all">{guide.example.input}</div>
                {guide.example.options && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-sans">
                    <span className="font-semibold text-slate-300">Settings:</span> {guide.example.options}
                  </div>
                )}
              </div>

              {/* Expected Output */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm">
                <div className="pb-2 mb-2 border-b border-blue-200/80 text-blue-900 font-semibold text-xs uppercase tracking-wider">
                  Expected Output
                </div>
                <div className="font-mono text-blue-950 whitespace-pre-wrap break-all font-medium">
                  {guide.example.output}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                How It Works
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {guide.example.explanation}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: TIPS FOR BETTER RESULTS */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">How to Get the Best Results</h3>
            </div>
            <p className="text-sm text-slate-600">
              Apply these expert best practices to ensure fast, accurate, and error-free results:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guide.bestResultsTips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TROUBLESHOOTING */}
        {activeTab === 'troubleshooting' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-slate-900">Common Problems & Solutions</h3>
            </div>
            <p className="text-sm text-slate-600">
              Quickly troubleshoot unexpected issues or validation messages:
            </p>

            <div className="space-y-3.5">
              {guide.troubleshooting.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 shrink-0">
                      Issue
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.problem}</h4>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 pl-1">
                    <span className="font-semibold text-slate-700">Cause:</span> {item.cause}
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 font-medium pl-2.5">
                    <span className="font-bold text-emerald-900">Solution:</span> {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
            </div>
            <p className="text-sm text-slate-600">
              Clear answers to the most common questions about {guide.name}:
            </p>

            <div className="space-y-3">
              {guide.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? 'border-blue-300 bg-blue-50/20 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className={`transition-colors ${isOpen ? 'text-blue-700' : 'group-hover:text-blue-600'}`}>
                        {faq.q}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                          isOpen
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                        }`}
                        aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/60 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer / SEO Keywords Badge Bar */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          Primary Keyword: <strong className="text-slate-800">{guide.seoContent.primaryKeyword}</strong>
        </span>
        <a
          href="#top"
          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to Tool Interface &uarr;
        </a>
      </div>
    </div>
  );
};
