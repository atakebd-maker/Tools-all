import React, { useState, useMemo, useEffect } from 'react';
import { FAQS, FAQ_CATEGORIES, FaqItem } from '../data/faqData';
import { updateMetaTags, getSiteOrigin } from '../utils/seo';
import { Search, HelpCircle, Plus, Minus, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { AdBanner, AD_KEYS } from '../components/AdBanner';

interface FaqProps {
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
  onNavigate: (path: string) => void;
}

export const Faq: React.FC<FaqProps> = ({ onNavigateHome, onNavigateAllTools, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const origin = getSiteOrigin();

  useEffect(() => {
    // Generate FAQPage JSON-LD
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    updateMetaTags({
      title: 'Frequently Asked Questions (FAQ) — Free Online Tools | Zynovexa',
      description: 'Find answers to common questions about Zynovexa free online tools, online PDF tool, PDF editor, image resizer, calculators, and 100% client-side privacy.',
      keywords: [
        'Zynovexa FAQ',
        'free online tools FAQ',
        'online PDF tool questions',
        'PDF editor free FAQ',
        'how to use zynovexa',
        'is zynovexa safe',
        'zynovexa free tools'
      ],
      canonicalPath: '/faq',
      faqLd: faqSchema,
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Frequently Asked Questions (FAQ)', url: `${origin}/faq` }
      ]
    });
  }, [origin]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 mb-6 gap-2" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-medium">FAQ</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Zynovexa Help & Support Center
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Zynovexa free online browser tools, our online PDF tool and PDF editor, image resizer, calculators, and our zero-upload privacy architecture.
          </p>
        </div>

        {/* Top Ad Unit */}
        <div className="flex justify-center mb-8">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs rounded-md"
          />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords (e.g., PDF editor, image resizer, privacy, EMI)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-xs text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3 mb-12">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${
                      isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 font-bold transition-all duration-200 ${
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
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                      {faq.keywords && faq.keywords.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5 pt-2">
                          {faq.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 mb-12">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 mb-1">No matching questions found</h3>
            <p className="text-sm text-slate-500 mb-4">
              Try searching with different terms like "PDF", "Resizer", or "Privacy".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Mid Page Ad */}
        <div className="flex justify-center mb-10">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs rounded-md"
          />
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Still have a question or need a tool?</h3>
              <p className="text-blue-100 text-sm max-w-md leading-relaxed">
                We are constantly expanding Zynovexa based on user feedback. Let us know if you need assistance or want to suggest a new tool.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-xs cursor-pointer"
              >
                Contact Support
              </button>
              <button
                onClick={() => onNavigate('/blog')}
                className="px-5 py-2.5 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 text-white font-semibold text-sm transition-colors border border-white/20 cursor-pointer"
              >
                Read Tool Guides
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900 block mb-0.5">
              The Zynovexa 100% Privacy Guarantee
            </span>
            All file processing, conversions, and calculations are computed locally inside your browser memory. No data is stored, collected, or transmitted to any server.
          </div>
        </div>
      </div>
    </div>
  );
};
