import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Minus,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import {
  ToolFaqPayload,
  ToolFaqItem,
  FaqCategory,
  fetchToolFaqsById,
  getToolFaqsById
} from '../services/toolFaqService';

export interface ToolFaqAccordionProps {
  toolId?: string;
  toolName?: string;
  categoryName?: string;
  faqs?: { q: string; a: string }[];
  onNavigateFaq?: () => void;
  defaultExpandedIndex?: number | null;
  allowSearch?: boolean;
  className?: string;
}

export const ToolFaqAccordion: React.FC<ToolFaqAccordionProps> = ({
  toolId,
  toolName: initialToolName,
  categoryName: initialCategoryName,
  faqs: fallbackFaqs,
  onNavigateFaq,
  defaultExpandedIndex = 0,
  allowSearch = true,
  className = ''
}) => {
  // State for dynamic fetching
  const [loading, setLoading] = useState<boolean>(true);
  const [payload, setPayload] = useState<ToolFaqPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  // User interaction states
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});

  // 1. Dynamic Fetching based on toolId (or fallback)
  useEffect(() => {
    let isMounted = true;

    async function loadFaqs() {
      setLoading(true);
      setError(null);

      try {
        if (toolId) {
          // Asynchronously fetch tool FAQs specifically mapped to this tool ID
          const result = await fetchToolFaqsById(toolId, 50);
          if (isMounted) {
            setPayload(result);
            // Default first question open for immediate preview
            if (defaultExpandedIndex !== null && result.faqs.length > defaultExpandedIndex) {
              setOpenItems({ [result.faqs[defaultExpandedIndex].id]: true });
            } else {
              setOpenItems({});
            }
          }
        } else if (fallbackFaqs && fallbackFaqs.length > 0) {
          // Construct payload from fallback props
          const syntheticItems: ToolFaqItem[] = fallbackFaqs.map((f, i) => ({
            id: `static-faq-${i}`,
            q: f.q,
            a: f.a,
            category: 'Usage & Steps',
            tags: [initialToolName || 'Tool'],
            helpfulCount: 15 + i
          }));

          const fallbackPayload: ToolFaqPayload = {
            toolId: 'custom-tool',
            toolSlug: 'custom-tool',
            toolName: initialToolName || 'Tool',
            categoryName: initialCategoryName || 'Utilities',
            categorySlug: 'utilities',
            faqs: syntheticItems,
            availableCategories: ['All', 'Usage & Steps'],
            total: syntheticItems.length,
            source: 'fallback'
          };

          if (isMounted) {
            setPayload(fallbackPayload);
            if (defaultExpandedIndex !== null && syntheticItems.length > defaultExpandedIndex) {
              setOpenItems({ [syntheticItems[defaultExpandedIndex].id]: true });
            }
          }
        } else {
          // Attempt sync lookup from toolName if toolId is missing
          const resolved = getToolFaqsById(initialToolName?.toLowerCase().replace(/\s+/g, '-') || 'general');
          if (isMounted) {
            setPayload(resolved);
            if (defaultExpandedIndex !== null && resolved.faqs.length > 0) {
              setOpenItems({ [resolved.faqs[0].id]: true });
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load questions for this tool at the moment.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFaqs();

    return () => {
      isMounted = false;
    };
  }, [toolId, initialToolName, fallbackFaqs, defaultExpandedIndex]);

  // 2. Synchronize Schema.org FAQPage structured data into head for search engines
  useEffect(() => {
    if (!payload || payload.faqs.length === 0) return;

    const faqLdJson = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: payload.faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    };

    let scriptTag = document.getElementById('tool-accordion-faq-ldjson') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'tool-accordion-faq-ldjson';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqLdJson);

    return () => {
      const el = document.getElementById('tool-accordion-faq-ldjson');
      if (el) el.remove();
    };
  }, [payload]);

  // Toggle single item
  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand all items
  const expandAll = () => {
    if (!filteredFaqs) return;
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  // Collapse all items
  const collapseAll = () => {
    setOpenItems({});
  };

  // 1-Click Copy Answer to Clipboard
  const handleCopyAnswer = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  // Helpful feedback handler
  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackGiven((prev) => ({ ...prev, [id]: type }));
  };

  // Filter questions by search query and category tab
  const filteredFaqs = useMemo(() => {
    if (!payload) return [];
    return payload.faqs.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const qLower = item.q.toLowerCase();
      const aLower = item.a.toLowerCase();
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !searchLower || qLower.includes(searchLower) || aLower.includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [payload, activeCategory, searchQuery]);

  const displayName = payload?.toolName || initialToolName || 'Tool';
  const totalFaqs = payload?.total || 0;
  const allFilteredOpen =
    filteredFaqs.length > 0 && filteredFaqs.every((f) => !!openItems[f.id]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 mb-8 animate-pulse ${className}`}>
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-blue-100 rounded-full" />
            <div className="h-6 w-64 bg-slate-200 rounded-md" />
            <div className="h-3 w-80 bg-slate-100 rounded-md" />
          </div>
          <div className="h-8 w-24 bg-slate-100 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-16 bg-slate-50 border border-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error State Fallback
  if (error || !payload || payload.faqs.length === 0) {
    return null;
  }

  return (
    <div
      id="tool-faq-accordion"
      className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-8 mb-8 transition-all ${className}`}
    >
      {/* Header with Title & Metadata Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              <HelpCircle className="w-3.5 h-3.5" />
              Tool-Specific Q&A
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              <Layers className="w-3 h-3 text-slate-500" />
              {totalFaqs} Verified Questions
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions About {displayName}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click any question or the{' '}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mx-1">
              +
            </span>{' '}
            button to expand the answer, helpful tips, and formulas:
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 flex-wrap">
          <button
            type="button"
            onClick={allFilteredOpen ? collapseAll : expandAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer select-none"
            title={allFilteredOpen ? 'Collapse all visible questions' : 'Expand all visible questions'}
          >
            {allFilteredOpen ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expand All</span>
              </>
            )}
          </button>

          {onNavigateFaq && (
            <button
              type="button"
              onClick={onNavigateFaq}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <span>All Platform FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Interactive Search & Category Filter Bar */}
      {allowSearch && (
        <div className="space-y-3 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search questions about ${displayName} (e.g. offline, free, limits)...`}
                className="w-full pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Reset Filter */}
            {(searchQuery || activeCategory !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills (if multiple categories available) */}
          {payload.availableCategories.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 text-xs font-medium mr-1 shrink-0">Filter:</span>
              {payload.availableCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Accordion Questions List */}
      {filteredFaqs.length === 0 ? (
        <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-600">
            No questions found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Clear filters to show all questions
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const feedback = feedbackGiven[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                {/* Accordion Header / Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl select-none"
                  aria-expanded={isOpen}
                  aria-controls={`answer-${faq.id}`}
                  id={`question-${faq.id}`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      {faq.category && faq.category !== 'All' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm sm:text-base font-semibold leading-snug transition-colors block ${
                        isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Distinct, User-Friendly + / - Toggle Button */}
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 font-bold ${
                      isOpen
                        ? 'bg-blue-600 text-white shadow-xs rotate-180'
                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:scale-105'
                    }`}
                    aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {/* Collapsible Answer Body */}
                {isOpen && (
                  <div
                    id={`answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`question-${faq.id}`}
                    className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 border-t border-blue-100/70 text-slate-700 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    <p className="text-xs sm:text-sm leading-relaxed mb-3">{faq.a}</p>

                    {/* Answer Tools Bar (Copy Answer & Helpful Feedback) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      {/* Copy Answer */}
                      <button
                        type="button"
                        onClick={() => handleCopyAnswer(faq.id, `${faq.q}\n\n${faq.a}`)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Copy question and answer to clipboard"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>

                      {/* Helpful Feedback */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Helpful?</span>
                        {feedback ? (
                          <span className="text-emerald-600 font-semibold text-[11px]">
                            Thanks for your feedback!
                          </span>
                        ) : (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleFeedback(faq.id, 'up')}
                              className="p-1 rounded-md hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                              title="Yes, this was helpful"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFeedback(faq.id, 'down')}
                              className="p-1 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="No, this was not helpful"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Assurance Banner */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>All calculations and processes for {displayName} run 100% locally in your browser.</span>
        </span>

        {onNavigateFaq && (
          <button
            type="button"
            onClick={onNavigateFaq}
            className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            <span>Need more help? Visit Zynovexa FAQ Center</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

// Also export as EnhancedToolFaqAccordion for explicit naming
export const EnhancedToolFaqAccordion = ToolFaqAccordion;
