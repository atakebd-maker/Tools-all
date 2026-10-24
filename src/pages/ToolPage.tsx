import React, { useEffect } from 'react';
import { TOOLS, ToolItem } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { ToolWrapper } from '../components/ToolWrapper';
import { applyToolSeo } from '../utils/seo';

interface ToolPageProps {
  toolSlug: string;
  onNavigateHome: () => void;
  onNavigateCategory: (categorySlug: string) => void;
  onSelectTool: (toolSlug: string) => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({
  toolSlug,
  onNavigateHome,
  onNavigateCategory,
  onSelectTool
}) => {
  const tool = TOOLS.find((t) => t.slug === toolSlug || t.id === toolSlug);
  const category = CATEGORIES.find((c) => c.id === tool?.category) || CATEGORIES[0];

  useEffect(() => {
    if (tool) {
      applyToolSeo(tool, category.name);
    }
  }, [tool, category]);

  if (!tool) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Tool Not Found</h2>
        <p className="text-slate-500 text-sm">The tool you are looking for does not exist.</p>
        <button
          onClick={onNavigateHome}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const ToolComponent = tool.component;

  // Related tools in same category
  const relatedTools = TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  )
    .slice(0, 3)
    .map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      onSelect: () => onSelectTool(t.slug)
    }));

  return (
    <ToolWrapper
      name={tool.name}
      categoryName={category.name}
      categorySlug={category.slug}
      description={tool.description}
      instructions={tool.instructions}
      limitations={tool.limitations}
      faqs={tool.faqs}
      onNavigateCategory={() => onNavigateCategory(category.slug)}
      onNavigateHome={onNavigateHome}
      relatedTools={relatedTools}
    >
      <ToolComponent />
    </ToolWrapper>
  );
};
