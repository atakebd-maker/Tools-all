import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { Menu, X, ChevronDown, Search, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
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
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[300px] object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white/95 dark:p-1 dark:rounded-lg"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/all-tools')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/all-tools'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              All Tools
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPath.startsWith('/categories')
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
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
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Select Category
                    </div>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav(`/categories/${cat.slug}`)}
                        className="w-full text-left px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/70 flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => handleNav('/blog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath.startsWith('/blog')
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNav('/faq')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/faq'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/about'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/contact'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Search, Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch || (() => handleNav('/search'))}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Search tools...</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Theme Switcher Bar */}
          <div className="pb-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
                <span className="font-semibold">Appearance</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
              </span>
            </button>
          </div>

          <button
            onClick={() => handleNav('/search')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 cursor-pointer ${
              currentPath === '/search'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40'
            }`}
          >
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Search Tools</span>
          </button>
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium cursor-pointer ${
              currentPath === '/'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/all-tools')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium cursor-pointer ${
              currentPath === '/all-tools'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => handleNav('/blog')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium cursor-pointer ${
              currentPath.startsWith('/blog')
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Blog & Tool Guides
          </button>
          <button
            onClick={() => handleNav('/faq')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium cursor-pointer ${
              currentPath === '/faq'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            FAQ
          </button>

          <div className="pt-2 pb-1">
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Categories
            </div>
            <div className="grid grid-cols-1 gap-0.5 mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav(`/categories/${cat.slug}`)}
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-2 space-y-1">
            <button
              onClick={() => handleNav('/about')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNav('/privacy')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => handleNav('/terms')}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
