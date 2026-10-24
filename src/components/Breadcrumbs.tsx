import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-500 mb-6 flex-wrap">
      <a
        href="/"
        onClick={(e) => {
          if (items[0]?.onClick) {
            e.preventDefault();
            items[0].onClick();
          }
        }}
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </a>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {item.onClick || item.href ? (
            <button
              onClick={item.onClick}
              className="hover:text-blue-600 font-medium transition-colors cursor-pointer text-left"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
