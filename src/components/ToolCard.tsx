import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  categoryName: string;
  isPopular?: boolean;
  onSelect: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  name,
  description,
  categoryName,
  isPopular,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className="group relative bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer h-full"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
            {categoryName}
          </span>
          {isPopular && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Popular
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors flex items-center justify-between">
          <span>{name}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
        <span>Open tool</span>
        <span>→</span>
      </div>
    </div>
  );
};
