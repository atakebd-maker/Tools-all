import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS, ToolItem } from '../data/tools';
import { BLOG_POSTS } from '../data/blogPosts';
import { CategoryCard } from '../components/CategoryCard';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { AdBanner, AD_KEYS } from '../components/AdBanner';
import { getRecentTools, clearRecentTools } from '../utils/recentTools';
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
  CheckCircle2,
  BookOpen,
  Clock,
  Calendar,
  Plus,
  Minus,
  History,
  Trash2,
  ArrowUpRight
} from 'lucide-react';

export const HOME_FAQS = [
  {
    q: 'What is Zynovexa and why is it free?',
    a: 'Zynovexa is a complete, 100% free online tools platform with 200+ calculators, online PDF tools, PDF editors, image resizers, and developer utilities. All tools process data locally in your browser with zero subscriptions and no account needed.'
  },
  {
    q: 'How do I use Zynovexa as a free online PDF tool and PDF editor?',
    a: 'Simply choose any PDF tool (like PDF Merger, PDF Splitter, or Images to PDF), upload your document, configure your desired page ranges or rotations, and download the finished file instantly. It functions as a complete free PDF editor without uploading documents to remote servers.'
  },
  {
    q: 'Are my files, PDFs, or photos uploaded to any remote server?',
    a: 'No. Zynovexa operates entirely on the client side. Your images, PDF documents, text, and files are manipulated locally using your browser\'s HTML5 Canvas, Web Cryptography, and local Web APIs. Nothing is uploaded to any remote server.'
  },
  {
    q: 'Can I resize and compress images without losing quality?',
    a: 'Yes! The Zynovexa free online image resizer and image compressor let you scale pixel dimensions and shrink file sizes by up to 85% with real-time visual comparisons and zero loss in perceptual clarity.'
  },
  {
    q: 'Do I need to sign up or create an account?',
    a: 'No registration or account creation is required. You can use every tool immediately without providing an email, password, or credit card.'
  },
  {
    q: 'Which web browsers and devices are supported?',
    a: 'All modern standards-compliant web browsers are fully supported, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and mobile browser equivalents on iOS and Android.'
  }
];

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [recentToolsList, setRecentToolsList] = useState<ToolItem[]>([]);

  useEffect(() => {
    // Initial fetch from localStorage
    setRecentToolsList(getRecentTools());

    const handleRecentChange = () => {
      setRecentToolsList(getRecentTools());
    };

    window.addEventListener('zynovexa_recent_tools_changed', handleRecentChange);
    window.addEventListener('storage', handleRecentChange);
    return () => {
      window.removeEventListener('zynovexa_recent_tools_changed', handleRecentChange);
      window.removeEventListener('storage', handleRecentChange);
    };
  }, []);

  const handleClearRecentTools = () => {
    clearRecentTools();
    setRecentToolsList([]);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  const popularTools = TOOLS.filter((t) => t.popular);
  // Recently added tools
  const recentTools = TOOLS.filter((t) => !t.popular).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('/search');
    }
  };

  // Inject & synchronize Schema.org FAQPage JSON-LD structured data in document.head
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    };

    let scriptTag = document.getElementById('home-faq-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'home-faq-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const el = document.getElementById('home-faq-jsonld');
      if (el) el.remove();
    };
  }, []);

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
            <span className="text-blue-600">Zynovexa</span> — All-in-One Free Online Tools & Calculators
          </h1>

          <p className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome to <strong>Zynovexa</strong> — your fast, private, and 100% free browser platform with 100+ calculators, image tools, PDF utilities, converters, and developer tools with zero registration.
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

        {/* Multi-Placement Ad Banner (320x50) */}
        <div className="flex justify-center mt-6">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs"
          />
        </div>
      </section>

      {/* Recently Used Tools Section (Tracks the last 5 tools interacted with) */}
      {recentToolsList.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/60 rounded-2xl border border-blue-200/90 p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-blue-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                  <History className="w-4 h-4 text-blue-600" />
                  <span>Quick Access • Last {recentToolsList.length} Used</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Recently Used
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Jump right back into the tools you've recently interacted with on Zynovexa.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={handleClearRecentTools}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 bg-white transition-colors cursor-pointer shadow-2xs"
                  title="Clear recent tools history from this browser"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentToolsList.map((tool, index) => {
                const cat = CATEGORIES.find((c) => c.id === tool.category);
                return (
                  <div
                    key={tool.id}
                    onClick={() => onSelectTool(tool.id)}
                    className="group relative bg-white rounded-xl border border-blue-100 p-4 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {cat?.name || 'Tool'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {index === 0 ? 'Latest' : `#${index + 1}`}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                      <span>Launch Tool</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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

      {/* Recently Added Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>New Additions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recently Added Tools
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/all-tools')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group cursor-pointer self-start sm:self-auto"
          >
            <span>Explore all tools</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {recentTools.map((tool) => {
            const cat = CATEGORIES.find((c) => c.id === tool.category);
            return (
              <ToolCard
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                categoryName={cat?.name || 'Tool'}
                isPopular={false}
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

        {/* Multi-Placement Ad Banner (320x50) */}
        <div className="flex justify-center mt-8">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs"
          />
        </div>
      </section>

      {/* Featured Tutorials & Tool Guides (Blog Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Tutorials & Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master Your Tools with Zynovexa Guides
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Learn how to edit PDFs without subscription fees, resize photos without quality loss, and perform complex math calculations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Explore All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div className={`h-28 bg-gradient-to-br ${post.coverGradient} p-4 flex items-start justify-between text-white`}>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/25 uppercase tracking-wide">
                  {post.categoryName}
                </span>
                <span className="text-xs text-white/90 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base line-clamp-2">
                    <button
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="text-left cursor-pointer focus:outline-none"
                    >
                      {post.title}
                    </button>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </button>
                  {post.relatedToolIds && post.relatedToolIds.length > 0 && (
                    <button
                      onClick={() => onSelectTool(post.relatedToolIds[0])}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Try Tool
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        {/* JSON-LD FAQ Schema Markup Component Output for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: HOME_FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a
                }
              }))
            })
          }}
        />

        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Answers to common questions about Zynovexa online PDF tool, image resizer, calculators, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = !!openFaqs[index];
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-blue-300 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg flex-1 pr-2">
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                      isOpen
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                    title={isOpen ? 'Click to collapse' : 'Click to show answer'}
                  >
                    {isOpen ? <Minus className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('/faq')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-2xs cursor-pointer"
          >
            <span>View All Frequently Asked Questions (FAQ)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
