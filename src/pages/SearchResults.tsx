import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS, ToolItem } from '../data/tools';
import { HighlightText } from '../components/HighlightText';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdBanner, AD_KEYS } from '../components/AdBanner';
import { applySearchSeo } from '../utils/seo';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  Tag,
  FolderOpen,
  ArrowUpDown,
  SearchX,
  Compass,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

interface SearchResultsProps {
  query: string;
  onUpdateQuery: (newQuery: string) => void;
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
  onNavigateCategory: (categorySlug: string) => void;
  onSelectTool: (toolIdOrSlug: string) => void;
}

const POPULAR_SEARCH_SUGGESTIONS = [
  'PDF Merger',
  'Image Resizer',
  'Age Calculator',
  'Word Counter',
  'JSON Formatter',
  'QR Code',
  'Loan EMI',
  'Password Generator',
  'Unit Converter',
  'Text Diff',
  'Base64',
  'Image Compressor'
];

type SortOption = 'relevance' | 'az' | 'za' | 'popular';

export const SearchResults: React.FC<SearchResultsProps> = ({
  query: externalQuery,
  onUpdateQuery,
  onNavigateHome,
  onNavigateAllTools,
  onNavigateCategory,
  onSelectTool
}) => {
  const [localInput, setLocalInput] = useState<string>(externalQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when external query prop changes (e.g. browser back/forward)
  useEffect(() => {
    setLocalInput(externalQuery);
  }, [externalQuery]);

  // Sync debounced search updates to URL query parameter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localInput !== externalQuery) {
        onUpdateQuery(localInput);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [localInput, externalQuery, onUpdateQuery]);

  // Clean active query string
  const activeQuery = localInput.trim();

  // Helper to calculate relevance score for ranking
  const getToolRelevanceScore = (tool: ToolItem, q: string, terms: string[]): number => {
    let score = 0;
    const lowerName = tool.name.toLowerCase();
    const lowerDesc = tool.description.toLowerCase();
    const cat = CATEGORIES.find((c) => c.id === tool.category);
    const catName = cat ? cat.name.toLowerCase() : '';
    const lowerQ = q.toLowerCase();

    // 1. Exact full query matches
    if (lowerName === lowerQ) score += 100;
    else if (lowerName.startsWith(lowerQ)) score += 60;
    else if (lowerName.includes(lowerQ)) score += 40;

    // 2. Keyword exact / token matches
    for (const kw of tool.keywords) {
      const lowerKw = kw.toLowerCase();
      if (lowerKw === lowerQ) score += 50;
      else if (lowerKw.includes(lowerQ)) score += 25;
      for (const term of terms) {
        if (lowerKw.includes(term)) score += 10;
      }
    }

    // 3. Category match
    if (catName.includes(lowerQ)) score += 20;

    // 4. Description match
    if (lowerDesc.includes(lowerQ)) score += 15;

    // 5. Individual terms matches across name & desc
    for (const term of terms) {
      if (lowerName.includes(term)) score += 15;
      if (lowerDesc.includes(term)) score += 5;
    }

    // 6. Tiebreaker bonus for popular tools
    if (tool.popular) score += 3;

    return score;
  };

  // Find which keywords specifically matched the search terms
  const getMatchedKeywords = (tool: ToolItem, terms: string[]): string[] => {
    if (terms.length === 0) return [];
    const matched: string[] = [];
    for (const kw of tool.keywords) {
      const lowerKw = kw.toLowerCase();
      if (terms.some((term) => lowerKw.includes(term))) {
        matched.push(kw);
      }
    }
    return matched.slice(0, 3); // Limit to top 3 matched tags
  };

  // Filter and sort tools
  const { filteredTools, categoryCounts, totalMatchesAcrossCategories } = useMemo(() => {
    const terms = activeQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);

    // 1. Find all tools matching query regardless of category filter
    const queryMatchedTools = TOOLS.map((tool) => {
      if (terms.length === 0) {
        return { tool, score: tool.popular ? 10 : 0, matchedKeywords: [] };
      }

      const lowerName = tool.name.toLowerCase();
      const lowerDesc = tool.description.toLowerCase();
      const lowerKeywords = tool.keywords.map((k) => k.toLowerCase());
      const cat = CATEGORIES.find((c) => c.id === tool.category);
      const lowerCatName = cat ? cat.name.toLowerCase() : '';

      // Check if all tokens match anywhere or any token matches prominently
      const matchesAllTokens = terms.every((t) =>
        lowerName.includes(t) ||
        lowerDesc.includes(t) ||
        lowerKeywords.some((k) => k.includes(t)) ||
        lowerCatName.includes(t)
      );

      const matchesAnyToken = terms.some((t) =>
        lowerName.includes(t) ||
        lowerKeywords.some((k) => k.includes(t)) ||
        lowerCatName.includes(t)
      );

      if (!matchesAllTokens && !matchesAnyToken) {
        return null;
      }

      const score = getToolRelevanceScore(tool, activeQuery, terms);
      const matchedKeywords = getMatchedKeywords(tool, terms);

      return { tool, score, matchedKeywords };
    }).filter(Boolean) as { tool: ToolItem; score: number; matchedKeywords: string[] }[];

    // 2. Count matches per category
    const catCounts: Record<string, number> = { all: queryMatchedTools.length };
    CATEGORIES.forEach((cat) => {
      catCounts[cat.id] = queryMatchedTools.filter((item) => item.tool.category === cat.id).length;
    });

    // 3. Apply category filter
    let result = queryMatchedTools;
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.tool.category === selectedCategory);
    }

    // 4. Sort results
    result.sort((a, b) => {
      if (sortBy === 'relevance' && activeQuery) {
        return b.score - a.score || a.tool.name.localeCompare(b.tool.name);
      }
      if (sortBy === 'az') {
        return a.tool.name.localeCompare(b.tool.name);
      }
      if (sortBy === 'za') {
        return b.tool.name.localeCompare(a.tool.name);
      }
      if (sortBy === 'popular') {
        if (a.tool.popular && !b.tool.popular) return -1;
        if (!a.tool.popular && b.tool.popular) return 1;
        return a.tool.name.localeCompare(b.tool.name);
      }
      return b.score - a.score;
    });

    return {
      filteredTools: result,
      categoryCounts: catCounts,
      totalMatchesAcrossCategories: queryMatchedTools.length
    };
  }, [activeQuery, selectedCategory, sortBy]);

  // Update dynamic SEO for search page
  useEffect(() => {
    applySearchSeo(activeQuery, filteredTools.length);
  }, [activeQuery, filteredTools.length]);

  const handleClearSearch = () => {
    setLocalInput('');
    onUpdateQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setLocalInput(suggestion);
    onUpdateQuery(suggestion);
    setSelectedCategory('all');
  };

  // Popular fallback tools when zero results
  const fallbackPopularTools = useMemo(() => {
    return TOOLS.filter((t) => t.popular).slice(0, 6);
  }, []);

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Search Header Area */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'All Tools', onClick: onNavigateAllTools },
              { label: 'Search Results' }
            ]}
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Tool Search</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {activeQuery ? (
                <>
                  Search Results for <span className="text-blue-600">"{activeQuery}"</span>
                </>
              ) : (
                <>Search All Online Tools</>
              )}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Instantly find, filter, and launch any of our 200+ client-side tools with zero registration and zero file uploads.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Search tools by name, action, or keyword (e.g. pdf, image resizer, calculator, emi)..."
              autoFocus
              className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 focus:border-blue-600 rounded-2xl text-slate-900 placeholder:text-slate-400 text-base focus:outline-none shadow-sm transition-all"
            />
            {localInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Clear search query"
                aria-label="Clear search query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Popular Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              Popular Searches:
            </span>
            {POPULAR_SEARCH_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  activeQuery.toLowerCase() === item.toLowerCase()
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls Bar: Category Pills & Sort Dropdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Results Counter & Filter summary */}
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                {filteredTools.length}
              </span>
              <span>{filteredTools.length === 1 ? 'tool found' : 'tools found'}</span>
              {activeQuery && (
                <span className="text-slate-400">
                  matching <strong className="text-slate-900">"{activeQuery}"</strong>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 ml-2"
                >
                  <span>Category filter active</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs sm:text-sm">
              <label htmlFor="sort-select" className="text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort tools by"
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {activeQuery && <option value="relevance">Best Match (Relevance)</option>}
                <option value="popular">Most Popular</option>
                <option value="az">Name (A → Z)</option>
                <option value="za">Name (Z → A)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Horizontal scrollable) */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>All Categories</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {totalMatchesAcrossCategories}
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              // Dim categories with 0 matches when searching
              if (activeQuery && count === 0) return null;

              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(({ tool, matchedKeywords }) => {
              const category = CATEGORIES.find((c) => c.id === tool.category);
              const categoryName = category ? category.name : tool.category;

              return (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool.slug || tool.id)}
                  className="group relative bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Card Header: Category & Popular Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (category) {
                            onNavigateCategory(category.slug);
                          }
                        }}
                        className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <HighlightText text={categoryName} query={activeQuery} />
                      </button>

                      {tool.popular && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Tool Name with Search Term Highlighting */}
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between gap-1 leading-snug">
                      <HighlightText
                        text={tool.name}
                        query={activeQuery}
                        highlightClassName="bg-amber-100 text-amber-950 font-bold px-1 rounded-xs"
                      />
                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </h2>

                    {/* Tool Description with Search Term Highlighting */}
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      <HighlightText
                        text={tool.description}
                        query={activeQuery}
                        highlightClassName="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded-xs"
                      />
                    </p>

                    {/* Matched Keywords Chips (Shows why tool matched query) */}
                    {activeQuery && matchedKeywords.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-0.5">
                          <Tag className="w-3 h-3 text-slate-400" />
                          Match:
                        </span>
                        {matchedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50/70 text-blue-800 border border-blue-100"
                          >
                            <HighlightText
                              text={kw}
                              query={activeQuery}
                              highlightClassName="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded-xs"
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-normal">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      100% Free • Client-Side
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Open Tool
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Results State */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-xs max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <SearchX className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                No tools found matching "{activeQuery}"
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                We couldn't find any tool with that name or keyword. Try one of the suggestions below or check out our popular tools.
              </p>
            </div>

            {/* Helpful Search Tips */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-lg mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-900 block">Suggestions to improve search:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>Check for typos or misspellings (e.g. "pdf", "calculator", "compress")</li>
                <li>Use broader terms instead of specific names</li>
                <li>Browse by tool category using the directory menu</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
              >
                Clear Search & View All
              </button>
              <button
                type="button"
                onClick={onNavigateAllTools}
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Browse All 200+ Tools Directory
              </button>
            </div>

            {/* Popular Fallback Suggestions */}
            <div className="pt-8 border-t border-slate-200 text-left space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Popular Tools You Might Like
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {fallbackPopularTools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => onSelectTool(tool.slug || tool.id)}
                    className="p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-semibold text-xs text-slate-900 group-hover:text-blue-600 truncate">
                      {tool.name}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {tool.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ad Banner for monetization */}
        <div className="flex justify-center pt-6">
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
  );
};
