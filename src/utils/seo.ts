import { Category, CATEGORIES } from '../data/categories';
import { ToolItem } from '../data/tools';
import { getToolGuide } from '../data/toolGuides';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any>;
  faqLd?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

export function getSiteOrigin(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return 'https://zynovexa.vercel.app';
}

/**
 * Updates or injects the BreadcrumbList Schema.org structured data in index.html <head>.
 * This targets <script id="breadcrumb-ldjson"> for high search-engine visibility.
 */
export function updateBreadcrumbLdJson(breadcrumbs?: BreadcrumbItem[]) {
  if (typeof document === 'undefined') return;

  const origin = getSiteOrigin();
  let scriptEl = document.getElementById('breadcrumb-ldjson') as HTMLScriptElement | null;

  if (!breadcrumbs || breadcrumbs.length === 0) {
    if (scriptEl) {
      scriptEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${origin}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'All Tools',
            'item': `${origin}/all-tools`
          }
        ]
      }, null, 2);
    }
    return;
  }

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'breadcrumb-ldjson';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const itemListElement = breadcrumbs.map((crumb, idx) => {
    const fullUrl = crumb.url.startsWith('http')
      ? crumb.url
      : `${origin}${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`;
    return {
      '@type': 'ListItem',
      'position': idx + 1,
      'name': crumb.name,
      'item': fullUrl
    };
  });

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };

  scriptEl.textContent = JSON.stringify(breadcrumbListSchema, null, 2);
}

/**
 * Dynamically updates document title, meta descriptions, OpenGraph tags,
 * Twitter cards, canonical link, and Schema.org JSON-LD.
 */
export function updateMetaTags(options: SeoOptions) {
  if (typeof document === 'undefined') return;

  const { title, description, keywords, canonicalPath, ogType = 'website', jsonLd, breadcrumbs } = options;

  // 1. Update Document Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(nameAttr, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Primary Meta Tags
  setMeta('name', 'description', description);
  if (keywords && keywords.length > 0) {
    setMeta('name', 'keywords', keywords.join(', '));
  }

  // 4. OpenGraph Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:site_name', 'Zynovexa');
  setMeta('property', 'og:locale', 'en_US');

  const origin = getSiteOrigin();
  const fullUrl = canonicalPath ? `${origin}${canonicalPath}` : (typeof window !== 'undefined' ? window.location.href : origin);
  setMeta('property', 'og:url', fullUrl);

  // USA Target Geolocation & Language Directives
  setMeta('name', 'geo.region', 'US');
  setMeta('name', 'geo.placename', 'United States');
  setMeta('name', 'geo.position', '39.8283;-98.5795');
  setMeta('name', 'ICBM', '39.8283, -98.5795');
  setMeta('name', 'coverage', 'United States');

  // 5. Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  // 6. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // 6b. Alternate Hreflang Tags (US & Global English)
  const setHreflang = (hreflang: string, url: string) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  };
  setHreflang('en-US', fullUrl);
  setHreflang('en', fullUrl);
  setHreflang('x-default', fullUrl);

  // 7. Schema.org JSON-LD Structured Data
  let scriptLd = document.getElementById('dynamic-seo-ldjson') as HTMLScriptElement | null;
  if (jsonLd) {
    if (!scriptLd) {
      scriptLd = document.createElement('script');
      scriptLd.id = 'dynamic-seo-ldjson';
      scriptLd.type = 'application/ld+json';
      document.head.appendChild(scriptLd);
    }
    scriptLd.textContent = JSON.stringify(jsonLd);
  } else if (scriptLd) {
    scriptLd.remove();
  }

  // 8. Dynamic FAQPage Structured Data in <head>
  let scriptFaq = document.getElementById('dynamic-faq-ldjson') as HTMLScriptElement | null;
  if (options.faqLd) {
    if (!scriptFaq) {
      scriptFaq = document.createElement('script');
      scriptFaq.id = 'dynamic-faq-ldjson';
      scriptFaq.type = 'application/ld+json';
      document.head.appendChild(scriptFaq);
    }
    scriptFaq.textContent = JSON.stringify(options.faqLd);
  } else if (scriptFaq) {
    scriptFaq.remove();
  }

  // 9. BreadcrumbList Structured Data in <head>
  if (breadcrumbs) {
    updateBreadcrumbLdJson(breadcrumbs);
  }
}

/**
 * Builds search-engine optimized title, description, keywords, and JSON-LD for any category.
 * Matches user's exact requested pattern: "Zynovexa - Free Online [Category] Tools Not Sign In Only Free"
 */
export function applyCategorySeo(category: Category, toolCount: number = 0) {
  const origin = getSiteOrigin();
  const title = category.seoTitle || `Zynovexa - Free Online ${category.name} Not Sign In Only Free`;
  const description = category.metaDescription || `100% free online ${category.name.toLowerCase()} without sign in or registration. Fast, secure, and runs directly in your browser with complete privacy.`;

  const keywords = category.keywords && category.keywords.length > 0
    ? category.keywords
    : [
        `free online ${category.name.toLowerCase()}`,
        `${category.name.toLowerCase()} not sign in`,
        `${category.name.toLowerCase()} only free`,
        'free online tools no sign up',
        'zynovexa tools'
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': typeof window !== 'undefined' ? window.location.href : `${origin}/categories/${category.slug}`,
    'numberOfItems': toolCount,
    'inLanguage': 'en-US',
    'areaServed': {
      '@type': 'Country',
      'name': 'United States'
    },
    'audience': {
      '@type': 'Audience',
      'geographicArea': {
        '@type': 'Country',
        'name': 'United States'
      }
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Zynovexa',
      'url': origin
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: `${origin}/` },
    { name: 'All Tools', url: `${origin}/all-tools` },
    { name: category.name, url: `${origin}/categories/${category.slug}` }
  ];

  updateMetaTags({
    title,
    description,
    keywords,
    canonicalPath: `/categories/${category.slug}`,
    jsonLd,
    breadcrumbs
  });
}

/**
 * Helper to ensure the meta description does not exceed 158-160 characters
 * while staying grammatically intact.
 */
function clampDescription(text: string, maxLen = 158): string {
  if (text.length <= maxLen) return text;
  const sub = text.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(' ');
  const clean = lastSpace > 120 ? sub.slice(0, lastSpace) : sub;
  return clean.endsWith('.') ? clean : clean + '.';
}

/**
 * Generates an optimized, search-friendly meta description for any tool.
 * Loaded with high-intent keywords (online PDF tool, free PDF editor, online calculator,
 * image resizer, instant formulas, client-side privacy, no sign in) targeting Google 1st-page rankings.
 */
export function buildToolSearchMetaDescription(tool: ToolItem, categoryName?: string): string {
  const name = tool.name;
  const cat = (categoryName || tool.category || '').toLowerCase();
  const lowerName = name.toLowerCase();

  // If tool has explicit custom metaDescription with high quality length
  if (tool.metaDescription && tool.metaDescription.length >= 120 && tool.metaDescription.length <= 165) {
    return clampDescription(tool.metaDescription);
  }

  // 1. PDF Tools (Keywords: online PDF tool, free PDF editor, merge/split PDF online)
  if (cat.includes('pdf') || lowerName.includes('pdf')) {
    return clampDescription(
      `Free online ${name} on Zynovexa. Fast, private online PDF tool & free PDF editor for instant document editing with zero file uploads and no sign in required.`
    );
  }

  // 2. Image Tools (Keywords: free online image resizer, image compressor, photo editor)
  if (cat.includes('image') || cat.includes('photo') || lowerName.includes('image') || lowerName.includes('resizer') || lowerName.includes('crop') || lowerName.includes('compress')) {
    return clampDescription(
      `Free online ${name} on Zynovexa. Fast image resizer, compressor & converter with HD preview, no watermark, and 100% private client-side browser processing.`
    );
  }

  // 3. Calculator & Mathematics (Keywords: free online calculator, calculation formulas, instant results)
  if (cat.includes('calculator') || cat.includes('math') || lowerName.includes('calculator')) {
    return clampDescription(
      `Free online ${name} on Zynovexa. Fast, accurate online calculator with instant formulas, step-by-step breakdown & no sign up. 100% private in your browser.`
    );
  }

  // 4. Sports & Cricket (Keywords: free cricket calculator, strike rate, run rate calculator)
  if (cat.includes('cricket') || cat.includes('sport')) {
    return clampDescription(
      `Free online ${name} for cricket & sports on Zynovexa. Calculate run rates, batting averages, and match stats instantly with live formulas and no account needed.`
    );
  }

  // 5. Developer & Coding (Keywords: free developer utility, code formatter, encoder decoder)
  if (cat.includes('developer') || cat.includes('code') || cat.includes('encoder') || cat.includes('json') || cat.includes('jwt') || cat.includes('hash')) {
    return clampDescription(
      `Free online ${name} developer utility on Zynovexa. Fast syntax validation, formatting, and conversion directly in your browser with zero data sent to servers.`
    );
  }

  // 6. Text & Writing (Keywords: word counter online, free text tool, diff checker)
  if (cat.includes('text') || cat.includes('word') || lowerName.includes('counter') || lowerName.includes('diff')) {
    return clampDescription(
      `Free online ${name} text utility on Zynovexa. Real-time character counts, text formatting, and analysis in your web browser with complete privacy & no login.`
    );
  }

  // 7. Converters (Keywords: free unit converter online, metric and imperial conversion)
  if (cat.includes('converter') || lowerName.includes('converter')) {
    return clampDescription(
      `Free online ${name} on Zynovexa. Accurate unit converter with live calculation formulas, metric and imperial conversions, and zero registration needed.`
    );
  }

  // 8. General fallback with high-ranking keywords
  return clampDescription(
    `Free online ${name} tool on Zynovexa. 100% free, fast browser utility with instant accurate results, local client-side privacy, and zero sign up or file uploads.`
  );
}

/**
 * Builds search-engine optimized title, description, keywords, and JSON-LD for any individual tool.
 * Follows the high-intent query format: "Zynovexa - Free Online [Tool Name] Not Sign In Only Free"
 * Dynamically provides 3-tier BreadcrumbList and FAQPage structured data from the comprehensive guide.
 */
export function applyToolSeo(tool: ToolItem, categoryName?: string, categorySlug?: string) {
  const origin = getSiteOrigin();
  const cat = CATEGORIES.find((c) => c.id === tool.category || c.slug === categorySlug);
  const resolvedCatName = categoryName || cat?.name || 'Utilities';
  const resolvedCatSlug = categorySlug || cat?.slug || tool.category || 'utilities';

  const guide = getToolGuide(tool);
  const title = tool.seoTitle || guide.seoContent.title || `Zynovexa - Free Online ${tool.name} Not Sign In Only Free`;
  const description = buildToolSearchMetaDescription(tool, resolvedCatName);

  const keywords = Array.from(new Set([
    ...(tool.keywords || []),
    ...(guide.seoContent.secondaryKeywords || []),
    ...(guide.seoContent.longTailKeywords || []),
    `free online ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} not sign in`,
    `${tool.name.toLowerCase()} only free`,
    `free online tools USA`,
    `online ${tool.name.toLowerCase()} US`,
    'no sign up required',
    'zynovexa'
  ]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': `${tool.name} - Zynovexa`,
    'applicationCategory': resolvedCatName,
    'operatingSystem': 'All modern web browsers (Windows, Mac, iOS, Android, Linux)',
    'inLanguage': 'en-US',
    'description': description,
    'url': typeof window !== 'undefined' ? window.location.href : `${origin}/tools/${tool.slug}`,
    'areaServed': {
      '@type': 'Country',
      'name': 'United States'
    },
    'audience': {
      '@type': 'Audience',
      'geographicArea': {
        '@type': 'Country',
        'name': 'United States'
      }
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'browserRequirements': 'Requires JavaScript. Operates 100% client-side with zero file uploads.'
  };

  const faqLd = guide.faqs && guide.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': guide.faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  } : undefined;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: `${origin}/` },
    { name: resolvedCatName, url: `${origin}/categories/${resolvedCatSlug}` },
    { name: tool.name, url: `${origin}/tools/${tool.slug}` }
  ];

  updateMetaTags({
    title,
    description,
    keywords,
    canonicalPath: `/tools/${tool.slug}`,
    jsonLd,
    faqLd,
    breadcrumbs
  });
}

/**
 * Updates SEO meta tags for static pages (Home, All Tools, About, Privacy, etc.)
 * with appropriate BreadcrumbList structured data.
 */
export function applyStaticPageSeo(path: string) {
  const origin = getSiteOrigin();

  switch (path) {
    case '/':
    case '':
      updateMetaTags({
        title: 'Zynovexa — All-in-One Online Tools & Free Calculators',
        description: 'Zynovexa is an all-in-one free online tools platform with 100+ calculators, image tools, PDF utilities, converters, and developer tools in the United States and worldwide. 100% free, private, and browser-based.',
        keywords: [
          'Zynovexa',
          'zynovexa tools',
          'free online tools USA',
          'online calculators US',
          'free pdf editor online',
          'zynovexa online tools',
          'zynovexa calculators',
          'free online tools',
          'free calculators online',
          '100% free browser tools'
        ],
        canonicalPath: '/',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Zynovexa',
          'alternateName': ['Zynovexa Tools', 'Zynovexa Online Tools', 'Zynovexa Platform', 'zynovexa.vercel.app'],
          'url': `${origin}/`,
          'inLanguage': 'en-US',
          'audience': {
            '@type': 'Audience',
            'geographicArea': {
              '@type': 'Country',
              'name': 'United States'
            }
          },
          'description': 'Free online browser tools with zero sign in or file uploads in the United States.',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${origin}/all-tools?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'All Tools', url: `${origin}/all-tools` }
        ]
      });
      break;

    case '/all-tools':
      updateMetaTags({
        title: 'Zynovexa - Free Online All Tools Directory Not Sign In Only Free',
        description: 'Browse all 100+ free online browser utilities on Zynovexa in the United States. Fast image editors, PDF mergers, code formatters, and math calculators with no account required.',
        keywords: [
          'free online tools USA',
          'free online tools directory',
          'all tools not sign in',
          'web utilities free list US',
          'free online software no sign in',
          'zynovexa'
        ],
        canonicalPath: '/all-tools',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'All Tools', url: `${origin}/all-tools` }
        ]
      });
      break;

    case '/about':
      updateMetaTags({
        title: 'About Us - Free Online Browser Utilities | Zynovexa',
        description: 'Learn about Zynovexa: our mission to provide lightning-fast, 100% free, private web tools running entirely in client browsers without sign in or tracking.',
        keywords: ['about zynovexa', 'free online browser tools', 'client side web tools privacy'],
        canonicalPath: '/about',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'About Us', url: `${origin}/about` }
        ]
      });
      break;

    case '/privacy':
      updateMetaTags({
        title: 'Privacy Policy - 100% Client-Side Privacy | Zynovexa',
        description: 'Read the Zynovexa Privacy Policy. We process all images, PDFs, text, and files 100% client-side in your browser. No files are ever uploaded or stored.',
        keywords: ['zynovexa privacy policy', 'client side privacy', 'zero data collection web tools'],
        canonicalPath: '/privacy',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Privacy Policy', url: `${origin}/privacy` }
        ]
      });
      break;

    case '/terms':
      updateMetaTags({
        title: 'Terms of Service - Free Online Tools | Zynovexa',
        description: 'Review the terms and conditions for using Zynovexa free online browser tools. Free for personal and commercial usage with zero sign up required.',
        keywords: ['zynovexa terms of service', 'free tools usage terms'],
        canonicalPath: '/terms',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Terms of Service', url: `${origin}/terms` }
        ]
      });
      break;

    case '/contact':
      updateMetaTags({
        title: 'Contact Us & Tool Suggestions | Zynovexa',
        description: 'Get in touch with the Zynovexa team. Send feedback, report a bug, or request a new free online browser tool.',
        keywords: ['contact zynovexa', 'request online tool', 'zynovexa support'],
        canonicalPath: '/contact',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Contact Us', url: `${origin}/contact` }
        ]
      });
      break;

    case '/disclaimer':
      updateMetaTags({
        title: 'Disclaimer - Informational Purposes | Zynovexa',
        description: 'Review the disclaimer for Zynovexa calculators and utilities. Results are calculated locally for informational purposes.',
        keywords: ['zynovexa disclaimer', 'calculator disclaimer'],
        canonicalPath: '/disclaimer',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Disclaimer', url: `${origin}/disclaimer` }
        ]
      });
      break;

    case '/faq':
      updateMetaTags({
        title: 'Frequently Asked Questions (FAQ) — Free Online Tools | Zynovexa',
        description: 'Find answers to common questions about Zynovexa free online tools, online PDF tool, PDF editor, image resizer, calculators, and 100% client-side privacy.',
        keywords: [
          'Zynovexa FAQ',
          'free online tools FAQ',
          'online PDF tool questions',
          'PDF editor free FAQ',
          'how to use zynovexa',
          'is zynovexa safe',
          'zynovexa free tools'
        ],
        canonicalPath: '/faq',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Frequently Asked Questions (FAQ)', url: `${origin}/faq` }
        ]
      });
      break;

    case '/blog':
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
      break;

    default:
      updateMetaTags({
        title: 'Page Not Found - Zynovexa',
        description: 'The requested page or tool could not be found on Zynovexa.',
        canonicalPath: path,
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` }
        ]
      });
      break;
  }
}

