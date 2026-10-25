import React from 'react';
import {
  Image,
  FileText,
  Type,
  Calculator,
  ArrowLeftRight,
  Code2,
  Search,
  Palette,
  Share2,
  Clock,
  Shuffle,
  FolderArchive,
  ArrowRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
  toolCount: number;
  onSelect: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  toolCount,
  onSelect
}) => {
  const getIcon = (name: string) => {
    const props = { className: 'w-6 h-6' };
    switch (name) {
      case 'Sparkles': return <Sparkles {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Image': return <Image {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Type': return <Type {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'ArrowLeftRight': return <ArrowLeftRight {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Share2': return <Share2 {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'Shuffle': return <Shuffle {...props} />;
      case 'FolderArchive': return <FolderArchive {...props} />;
      default: return <FileText {...props} />;
    }
  };

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${category.color}`}>
            {getIcon(category.icon)}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
        <span>Explore category</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
