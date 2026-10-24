import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { CategoryCard } from '../components/CategoryCard';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { AdBanner, AD_KEYS } from '../components/AdBanner';
import {
  ShieldCheck,
  Zap,
  Lock,
  Download,
  Smartphone,
  HardDrive,
  ArrowRight,
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Popular tools selection
  const popularTools = TOOLS.filter((t) => t.popular);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/all-tools?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('/all-tools');
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold border border-blue-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>100% Client-Side Privacy • No Files Uploaded</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Free Online Tools for <span className="text-blue-600">Everyday Tasks</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Resize images, manage PDF files, calculate numbers, convert units, format code, and use powerful browser-based tools — all in one place.
          </p>

          {/* Hero Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search for a tool (e.g. image resizer, pdf merger, word counter)..."
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-blue-600/20 text-sm whitespace-nowrap cursor-pointer"
                >
                  Search Tools
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/all-tools')}
                  className="flex-1 sm:flex-none px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Explore All
                </button>
              </div>
            </div>
          </form>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Completely Free to Use
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Account or Login Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Server Uploads
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No API Keys Needed
            </span>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Most Used Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Everyday Tools
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/all-tools')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group cursor-pointer self-start sm:self-auto"
          >
            <span>View all {TOOLS.length} tools</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {popularTools.map((tool) => {
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
      </section>

      {/* Browse Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Comprehensive Toolkit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse All Tool Categories
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Every category contains real, browser-native tools with instant local calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                toolCount={count}
                onSelect={() => onNavigate(`/categories/${cat.slug}`)}
              />
            );
          })}
        </div>
      </section>

      {/* Sponsored Ad Unit (300x250) - Cleanly integrated */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center py-2">
        <AdBanner
          adKey={AD_KEYS.CONTENT_RECTANGLE}
          width={300}
          height={250}
          label={true}
          className="bg-white shadow-2xs"
        />
      </section>

      {/* Why Choose Zynovexa Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Use Zynovexa?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Designed from the ground up for speed, privacy, and browser-native convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Privacy-Conscious</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Files and texts are processed locally in your browser. Nothing is sent to a backend or external service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No Account or Keys</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                No sign-up barriers, passwords, or secret API keys required. Open any tool and get your work done immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mobile & Desktop Ready</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every tool is responsive and optimized for touchscreens on phones, tablets, and desktop workstations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Instant Downloads</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Export processed files, PDFs, images, and text files directly to your device storage with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Are all the tools on Zynovexa free?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Yes, 100% of the tools are completely free to use with no hidden fees, subscriptions, or feature paywalls.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Are my files or images uploaded to a remote server?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No. Zynovexa operates entirely on the client side. Your images, PDF documents, text, and files are manipulated locally using your browser's HTML5 Canvas, Web Cryptography, and local Web APIs.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Do I need to sign up or create an account?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No registration or account creation is required. You can jump directly into any tool whenever you need it.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Which web browsers are supported?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              All modern standards-compliant web browsers are fully supported, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and mobile browser equivalents on iOS and Android.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Why do very large files sometimes take a few moments to process?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Because all image and PDF decoding is performed directly on your device rather than a cloud server farm, very large files (e.g. 50+ megapixel photos or hundreds of PDF pages) rely on your device's local CPU and RAM.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
