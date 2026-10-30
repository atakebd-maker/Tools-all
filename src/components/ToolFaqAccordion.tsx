import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface ToolFaqAccordionProps {
  toolName: string;
  faqs: { q: string; a: string }[];
  onNavigateFaq?: () => void;
}

export const ToolFaqAccordion: React.FC<ToolFaqAccordionProps> = ({
  toolName,
  faqs,
  onNavigateFaq
}) => {
  // Keep first FAQ open by default for immediate discoverability
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  if (!faqs || faqs.length === 0) return null;

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Tool Questions & Answers
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions About {toolName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click any question with the <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mx-1">+</span> symbol to reveal its answer and usage tips:
          </p>
        </div>

        {onNavigateFaq && (
          <button
            onClick={onNavigateFaq}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>All Website FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Accordion Questions */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = !!openItems[idx];
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-blue-300 bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                  isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {faq.q}
                </span>

                {/* + / - toggle icon circle button */}
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 font-bold ${
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

              {/* Collapsible Answer */}
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-blue-100/60 animate-in fade-in duration-150">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Tip */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          All calculations and file processing occur 100% locally on your device with complete privacy.
        </span>
        {onNavigateFaq && (
          <button
            onClick={onNavigateFaq}
            className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Have a question about Zynovexa? Read Platform FAQ &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
