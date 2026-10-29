import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { Menu, X, ChevronDown, Search, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 sm:h-18">
          {/* Brand Logo - Slightly enlarged with seamless background blending */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1 px-1 transition-transform hover:opacity-90 cursor-pointer"
            aria-label="Zynovexa Home"
          >
            <img
              src="/assets/aistudio/image_9c2f50e3.png"
              alt="Zynovexa"
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[300px] object-contain mix-blend-multiply"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/all-tools')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/all-tools' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Tools
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPath.startsWith('/categories') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCategoriesOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Select Category
                    </div>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav(`/categories/${cat.slug}`)}
                        className="w-full text-left px-3.5 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center justify-between group transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => handleNav('/blog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath.startsWith('/blog') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNav('/faq')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/faq' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/about' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/contact' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Search & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch || (() => handleNav('/all-tools'))}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search tools...</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath === '/' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/all-tools')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath === '/all-tools' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => handleNav('/blog')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath.startsWith('/blog') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            Blog & Tool Guides
          </button>
          <button
            onClick={() => handleNav('/faq')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath === '/faq' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            FAQ
          </button>

          <div className="pt-2 pb-1">
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </div>
            <div className="grid grid-cols-1 gap-0.5 mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav(`/categories/${cat.slug}`)}
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-2 space-y-1">
            <button
              onClick={() => handleNav('/about')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              About
            </button>
            <button
              onClick={() => handleNav('/privacy')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Contact
            </button>
            <button
              onClick={() => handleNav('/terms')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
