import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { updateMetaTags, getSiteOrigin } from '../utils/seo';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Sparkles, Tag, Shield } from 'lucide-react';
import { AdBanner, AD_KEYS } from '../components/AdBanner';

interface BlogProps {
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
  onSelectPost: (slug: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const Blog: React.FC<BlogProps> = ({
  onNavigateHome,
  onNavigate,
  onSelectPost,
  onSelectTool
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const origin = getSiteOrigin();

  useEffect(() => {
    updateMetaTags({
      title: 'Zynovexa Blog & Tutorials — Complete Guides for Free Online Tools',
      description: 'Step-by-step tutorials, tips, and guides for Zynovexa free online tools. Learn how to use our online PDF tool, PDF editor, image resizer, calculators, and developer utilities.',
      keywords: [
        'Zynovexa blog',
        'online PDF tool tutorial',
        'PDF editor guide',
        'free pdf editor tips',
        'free online image resizer guide',
        'online calculator free tutorials',
        'how to use zynovexa tools'
      ],
      canonicalPath: '/blog',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Blog & Tool Guides', url: `${origin}/blog` }
      ]
    });
  }, [origin]);

  const categories = [
    { id: 'all', name: 'All Guides' },
    { id: 'pdf-tools', name: 'PDF Tools' },
    { id: 'image-tools', name: 'Image Tools' },
    { id: 'calculator-tools', name: 'Calculators' },
    { id: 'sports-cricket', name: 'Cricket & Sports' },
    { id: 'developer-tools', name: 'Developer Tools' },
    { id: 'privacy', name: 'Privacy & Tech' }
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q)) ||
        post.content.toolGuides.some((tg) => tg.toolName.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 mb-6 gap-2" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Blog</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Zynovexa Knowledge Hub & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tool Tutorials, Guides & Best Practices
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            In-depth instructions and insider tips on how to get the most out of Zynovexa free online tools—from our online PDF tool and PDF editor to image compression and loan calculators.
          </p>
        </div>

        {/* Top Ad Unit */}
        <div className="flex justify-center mb-8">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs rounded-md"
          />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. PDF editor, resize image, cricket strike rate)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-xs text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col group"
              >
                {/* Visual Header Banner */}
                <div className={`h-36 sm:h-40 bg-gradient-to-br ${post.coverGradient} p-5 flex flex-col justify-between text-white relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-xs text-[11px] font-semibold tracking-wide uppercase">
                      {post.categoryName}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/90">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      <button
                        onClick={() => onSelectPost(post.slug)}
                        className="text-left cursor-pointer focus:outline-none"
                      >
                        {post.title}
                      </button>
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Keywords Tag Cloud */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.keywords.slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                        >
                          <Tag className="w-2.5 h-2.5 text-slate-400" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Tools CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectPost(post.slug)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/btn cursor-pointer"
                    >
                      Read Full Guide
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {post.relatedToolIds && post.relatedToolIds.length > 0 && (
                      <button
                        onClick={() => onSelectTool(post.relatedToolIds[0])}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                        title="Try tool now"
                      >
                        Try Tool
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 mb-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No articles found</h3>
            <p className="text-sm text-slate-500 mb-4">
              We couldn't find any guides matching your query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Show all guides
            </button>
          </div>
        )}

        {/* Mid Ad Banner */}
        <div className="flex justify-center mb-10">
          <AdBanner
            adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
            slotType="multiPlacement"
            width={320}
            height={50}
            label={true}
            className="bg-white shadow-2xs rounded-md"
          />
        </div>

        {/* FAQ Link CTA */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900">Have a quick question about our tools?</h3>
            <p className="text-sm text-slate-600">
              Check our Frequently Asked Questions (FAQ) for instant answers regarding privacy, limits, and supported formats.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/faq')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Visit FAQ Section
          </button>
        </div>
      </div>
    </div>
  );
};
