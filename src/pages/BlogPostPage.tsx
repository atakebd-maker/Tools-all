import React, { useEffect } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { updateMetaTags, getSiteOrigin } from '../utils/seo';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Tag,
  Share2,
  ExternalLink
} from 'lucide-react';
import { AdBanner, AD_KEYS } from '../components/AdBanner';

interface BlogPostPageProps {
  postSlug: string;
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onSelectPost: (slug: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  postSlug,
  onNavigateHome,
  onNavigateBlog,
  onSelectPost,
  onSelectTool
}) => {
  const post = BLOG_POSTS.find((p) => p.slug === postSlug);
  const origin = getSiteOrigin();

  useEffect(() => {
    if (!post) return;

    // Structured Data: BlogPosting & Breadcrumbs
    const blogPostingLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription,
      'datePublished': post.date,
      'dateModified': post.date,
      'author': {
        '@type': 'Organization',
        'name': post.author,
        'url': origin
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Zynovexa',
        'url': origin,
        'logo': `${origin}/assets/aistudio/image_9c2f50e3.png`
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${origin}/blog/${post.slug}`
      },
      'keywords': post.keywords.join(', ')
    };

    const faqLd = post.content.faqs && post.content.faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': post.content.faqs.map((f) => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a
        }
      }))
    } : undefined;

    updateMetaTags({
      title: post.seoTitle,
      description: post.metaDescription,
      keywords: post.keywords,
      canonicalPath: `/blog/${post.slug}`,
      ogType: 'article',
      jsonLd: blogPostingLd,
      faqLd,
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Blog', url: `${origin}/blog` },
        { name: post.title, url: `${origin}/blog/${post.slug}` }
      ]
    });
  }, [post, origin]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-500 text-sm">The guide you are looking for does not exist or has been moved.</p>
        <button
          onClick={onNavigateBlog}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 mb-6 gap-2 flex-wrap" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={onNavigateBlog} className="hover:text-blue-600 transition-colors cursor-pointer">
            Blog
          </button>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {post.categoryName}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              By {post.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
            {post.excerpt}
          </p>

          {/* Keywords Cloud */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {post.keywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                {kw}
              </span>
            ))}
          </div>
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

        {/* Main Content Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-xs space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Introduction & Overview
            </h2>
            <p>{post.content.intro}</p>
          </section>

          {/* Why Zynovexa Advantage */}
          <section className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-base sm:text-lg">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              The Zynovexa Advantage: 100% Client-Side Processing
            </div>
            <p className="text-sm sm:text-base text-blue-950/90 leading-relaxed">
              {post.content.whyZynovexa}
            </p>
          </section>

          {/* Tool Guides Step-by-Step */}
          <section className="space-y-8 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Step-by-Step Instructions: How to Use Each Tool
            </h2>

            <div className="space-y-6">
              {post.content.toolGuides.map((tg, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {idx + 1}. {tg.toolName}
                    </h3>
                    <button
                      onClick={() => onSelectTool(tg.toolId)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
                    >
                      <span>Open Tool</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600">
                    {tg.description}
                  </p>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Step-by-Step Walkthrough:
                    </h4>
                    <ol className="space-y-2">
                      {tg.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Pro Tip: </strong>
                      {tg.proTip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page Ad */}
          <div className="flex justify-center my-6">
            <AdBanner
              adKey={AD_KEYS.MULTI_PLACEMENT_BANNER}
              slotType="multiPlacement"
              width={320}
              height={50}
              label={true}
              className="bg-white shadow-2xs rounded-md"
            />
          </div>

          {/* Pro Tips */}
          {post.content.tips && post.content.tips.length > 0 && (
            <section className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Best Practices & Expert Advice
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {post.content.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Topic FAQs */}
          {post.content.faqs && post.content.faqs.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                Frequently Asked Questions About This Topic
              </h2>
              <div className="space-y-3">
                {post.content.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-1.5">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Conclusion
            </h2>
            <p>{post.content.conclusion}</p>
          </section>
        </div>

        {/* Related Tools Interactive Box */}
        {post.relatedToolIds && post.relatedToolIds.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Featured Tools in this Guide
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedToolIds.map((toolId) => (
                <button
                  key={toolId}
                  onClick={() => onSelectTool(toolId)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch {toolId.replace(/-/g, ' ')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Other Related Articles */}
        {otherPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Read Next: Recommended Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onSelectPost(p.slug)}
                  className="text-left bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
                    {p.categoryName}
                  </span>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base mt-1 mb-2 line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {p.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog Action */}
        <div className="text-center">
          <button
            onClick={onNavigateBlog}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Guides & Tutorials
          </button>
        </div>
      </div>
    </article>
  );
};
