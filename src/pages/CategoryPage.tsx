import React from 'react';
import { CATEGORIES, Category } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
  onNavigateCategory: (slug: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  onNavigateHome,
  onNavigateAllTools,
  onNavigateCategory,
  onSelectTool
}) => {
  const category = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];
  const categoryTools = TOOLS.filter((t) => t.category === category.id);
  const otherCategories = CATEGORIES.filter((c) => c.id !== category.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'All Tools', onClick: onNavigateAllTools },
          { label: category.name }
        ]}
      />

      {/* Category Hero */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {categoryTools.length} {categoryTools.length === 1 ? 'Tool' : 'Tools'} Available
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {category.name}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Category Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Tools in {category.name}
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            {categoryTools.length} implemented
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              categoryName={category.name}
              isPopular={tool.popular}
              onSelect={() => onSelectTool(tool.id)}
            />
          ))}
        </div>
      </div>

      {/* Explore other categories */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Explore Other Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigateCategory(c.slug)}
              className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer"
            >
              <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                {c.name}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {TOOLS.filter((t) => t.category === c.id).length} tools
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
