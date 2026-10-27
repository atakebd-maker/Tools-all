import { Category } from '../data/categories';
import { ToolItem } from '../data/tools';

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

/**
 * Dynamically updates document title, meta descriptions, OpenGraph tags,
 * Twitter cards, canonical link, and Schema.org JSON-LD.
 */
export function updateMetaTags(options: SeoOptions) {
  if (typeof document === 'undefined') return;

  const { title, description, keywords, canonicalPath, ogType = 'website', jsonLd } = options;

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

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zynovexa.com';
  const fullUrl = canonicalPath ? `${origin}${canonicalPath}` : (typeof window !== 'undefined' ? window.location.href : origin);
  setMeta('property', 'og:url', fullUrl);

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
}

/**
 * Builds search-engine optimized title, description, keywords, and JSON-LD for any category.
 * Matches user's exact requested pattern: "Zynovexa - Free Online [Category] Tools Not Sign In Only Free"
 */
export function applyCategorySeo(category: Category, toolCount: number = 0) {
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
    'url': typeof window !== 'undefined' ? window.location.href : `https://zynovexa.com/categories/${category.slug}`,
    'numberOfItems': toolCount,
    'publisher': {
      '@type': 'Organization',
      'name': 'Zynovexa',
      'url': 'https://zynovexa.com'
    }
  };

  updateMetaTags({
    title,
    description,
    keywords,
    canonicalPath: `/categories/${category.slug}`,
    jsonLd
  });
}

/**
 * Builds search-engine optimized title, description, keywords, and JSON-LD for any individual tool.
 * Follows the high-intent query format: "Zynovexa - Free Online [Tool Name] Not Sign In Only Free"
 */
export function applyToolSeo(tool: ToolItem, categoryName: string = 'Utilities') {
  const title = tool.seoTitle || `Zynovexa - Free Online ${tool.name} Not Sign In Only Free`;
  const description = tool.metaDescription || `100% free online ${tool.name.toLowerCase()} tool without sign in or registration. Run securely in your browser with zero file uploads on Zynovexa.`;

  const keywords = [
    ...(tool.keywords || []),
    `free online ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} not sign in`,
    `${tool.name.toLowerCase()} only free`,
    'no sign up required',
    'zynovexa'
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': `${tool.name} - Zynovexa`,
    'applicationCategory': categoryName,
    'operatingSystem': 'All modern web browsers (Windows, Mac, iOS, Android, Linux)',
    'description': description,
    'url': typeof window !== 'undefined' ? window.location.href : `https://zynovexa.com/tools/${tool.slug}`,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'browserRequirements': 'Requires JavaScript. Operates 100% client-side with zero file uploads.'
  };

  updateMetaTags({
    title,
    description,
    keywords,
    canonicalPath: `/tools/${tool.slug}`,
    jsonLd
  });
}

/**
 * Updates SEO meta tags for static pages (Home, All Tools, About, Privacy, etc.)
 */
export function applyStaticPageSeo(path: string) {
  switch (path) {
    case '/':
    case '':
      updateMetaTags({
        title: 'Zynovexa — All-in-One Online Tools & Free Calculators',
        description: 'Zynovexa is an all-in-one free online tools platform with 100+ calculators, image tools, PDF utilities, converters, and developer tools. 100% free, private, and browser-based.',
        keywords: [
          'Zynovexa',
          'zynovexa tools',
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
          'alternateName': ['Zynovexa Tools', 'Zynovexa Online Tools', 'Zynovexa Platform'],
          'url': 'https://zynovexa.com/',
          'description': 'Free online browser tools with zero sign in or file uploads.',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://zynovexa.com/all-tools?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }
      });
      break;

    case '/all-tools':
      updateMetaTags({
        title: 'Zynovexa - Free Online All Tools Directory Not Sign In Only Free',
        description: 'Browse all 50+ free online browser utilities on Zynovexa. Fast image editors, PDF mergers, code formatters, and math calculators with no account required.',
        keywords: [
          'free online tools directory',
          'all tools not sign in',
          'web utilities free list',
          'free online software no sign in',
          'zynovexa'
        ],
        canonicalPath: '/all-tools'
      });
      break;

    case '/about':
      updateMetaTags({
        title: 'About Us - Free Online Browser Utilities | Zynovexa',
        description: 'Learn about Zynovexa: our mission to provide lightning-fast, 100% free, private web tools running entirely in client browsers without sign in or tracking.',
        keywords: ['about zynovexa', 'free online browser tools', 'client side web tools privacy'],
        canonicalPath: '/about'
      });
      break;

    case '/privacy':
      updateMetaTags({
        title: 'Privacy Policy - 100% Client-Side Privacy | Zynovexa',
        description: 'Read the Zynovexa Privacy Policy. We process all images, PDFs, text, and files 100% client-side in your browser. No files are ever uploaded or stored.',
        keywords: ['zynovexa privacy policy', 'client side privacy', 'zero data collection web tools'],
        canonicalPath: '/privacy'
      });
      break;

    case '/terms':
      updateMetaTags({
        title: 'Terms of Service - Free Online Tools | Zynovexa',
        description: 'Review the terms and conditions for using Zynovexa free online browser tools. Free for personal and commercial usage with zero sign up required.',
        keywords: ['zynovexa terms of service', 'free tools usage terms'],
        canonicalPath: '/terms'
      });
      break;

    case '/contact':
      updateMetaTags({
        title: 'Contact Us & Tool Suggestions | Zynovexa',
        description: 'Get in touch with the Zynovexa team. Send feedback, report a bug, or request a new free online browser tool.',
        keywords: ['contact zynovexa', 'request online tool', 'zynovexa support'],
        canonicalPath: '/contact'
      });
      break;

    default:
      updateMetaTags({
        title: 'Page Not Found - Zynovexa',
        description: 'The requested page or tool could not be found on Zynovexa.',
        canonicalPath: path
      });
      break;
  }
}
