import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Filter, ArrowUpDown, X, Sparkles, FolderOpen } from 'lucide-react';

interface AllToolsProps {
  initialSearch?: string;
  onNavigateHome: () => void;
  onSelectTool: (toolId: string) => void;
}

export const AllTools: React.FC<AllToolsProps> = ({
  initialSearch = '',
  onNavigateHome,
  onSelectTool
}) => {
  const [query, setQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'az' | 'za'>('popular');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      // Query search (name, description, keywords, category)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const inName = tool.name.toLowerCase().includes(q);
        const inDesc = tool.description.toLowerCase().includes(q);
        const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));
        const cat = CATEGORIES.find((c) => c.id === tool.category);
        const inCat = cat ? cat.name.toLowerCase().includes(q) : false;
        if (!inName && !inDesc && !inKeywords && !inCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'az') return a.name.localeCompare(b.name);
      if (sortBy === 'za') return b.name.localeCompare(a.name);
      // popular
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [query, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'All Tools' }
        ]}
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          All Online Tools Directory
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Search, filter, and access all {TOOLS.length} privacy-first utilities available in Zynovexa.
        </p>
      </div>

      {/* Search & Filters Controls */}
      <div className="space-y-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Filter by name, keyword, or action (e.g. compress, convert, pdf, emi)..."
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Tools ({TOOLS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
            <span className="text-slate-500 font-semibold uppercase flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="popular">Popular First</option>
              <option value="az">Name (A → Z)</option>
              <option value="za">Name (Z → A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-200 pb-3">
        <span>
          Showing {filteredTools.length} of {TOOLS.length} tools
          {selectedCategory !== 'all' && (
            <span> in {CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
          )}
          {query && <span> matching "{query}"</span>}
        </span>

        {(query || selectedCategory !== 'all' || sortBy !== 'popular') && (
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Tools Grid or Empty State */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTools.map((tool) => {
            const cat = CATEGORIES.find((c) => c.id === tool.category);
            return (
              <ToolCard
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                categoryName={cat?.name || 'Tool'}
                isPopular={tool.popular}
                onSelect={() => onSelectTool(tool.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <FolderOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No tools found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            We couldn't find any tools matching "{query}". Try checking for typos or searching for a broader term.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
