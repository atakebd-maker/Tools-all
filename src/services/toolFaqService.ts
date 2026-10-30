import { TOOLS, ToolItem } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { getToolGuide } from '../data/toolGuides';

export type FaqCategory =
  | 'All'
  | 'Usage & Steps'
  | 'Privacy & Security'
  | 'Performance & Offline'
  | 'Accuracy & Formulas'
  | 'Troubleshooting';

export interface ToolFaqItem {
  id: string;
  q: string;
  a: string;
  category: FaqCategory;
  tags: string[];
  helpfulCount?: number;
}

export interface ToolFaqPayload {
  toolId: string;
  toolSlug: string;
  toolName: string;
  categoryName: string;
  categorySlug: string;
  faqs: ToolFaqItem[];
  availableCategories: FaqCategory[];
  total: number;
  source: 'curated' | 'generated' | 'fallback';
}

// In-memory cache for fast retrieval and dynamic resolution
const faqCache: Map<string, ToolFaqPayload> = new Map();

/**
 * Assigns an intelligent category based on question text and intent.
 */
function classifyFaqCategory(question: string, answer: string): FaqCategory {
  const text = `${question} ${answer}`.toLowerCase();

  if (
    text.includes('privacy') ||
    text.includes('upload') ||
    text.includes('server') ||
    text.includes('safe') ||
    text.includes('security') ||
    text.includes('data leave') ||
    text.includes('store my')
  ) {
    return 'Privacy & Security';
  }

  if (
    text.includes('offline') ||
    text.includes('mobile') ||
    text.includes('phone') ||
    text.includes('tablet') ||
    text.includes('install') ||
    text.includes('browser') ||
    text.includes('speed') ||
    text.includes('fast')
  ) {
    return 'Performance & Offline';
  }

  if (
    text.includes('formula') ||
    text.includes('accurate') ||
    text.includes('precision') ||
    text.includes('decimal') ||
    text.includes('math') ||
    text.includes('calculate') ||
    text.includes('limit') ||
    text.includes('maximum size') ||
    text.includes('resolution')
  ) {
    return 'Accuracy & Formulas';
  }

  if (
    text.includes('error') ||
    text.includes('fail') ||
    text.includes('not working') ||
    text.includes('fix') ||
    text.includes('problem') ||
    text.includes('cannot') ||
    text.includes('troubleshoot')
  ) {
    return 'Troubleshooting';
  }

  return 'Usage & Steps';
}

/**
 * Generates tailored domain tags for individual FAQ items.
 */
function extractFaqTags(question: string, tool: ToolItem): string[] {
  const qLower = question.toLowerCase();
  const tags: string[] = [tool.name];

  if (qLower.includes('free')) tags.push('100% Free');
  if (qLower.includes('offline')) tags.push('Offline Ready');
  if (qLower.includes('mobile') || qLower.includes('phone')) tags.push('Mobile Friendly');
  if (qLower.includes('privacy') || qLower.includes('server')) tags.push('Client-Side');
  if (qLower.includes('limit') || qLower.includes('size')) tags.push('Limits');
  if (qLower.includes('format') || qLower.includes('export')) tags.push('Export Options');

  return tags.slice(0, 3);
}

/**
 * Resolves a tool item by ID or slug.
 */
export function resolveToolById(toolIdOrSlug: string): ToolItem | undefined {
  if (!toolIdOrSlug) return undefined;
  const cleanId = toolIdOrSlug.toLowerCase().trim();
  return TOOLS.find((t) => t.id.toLowerCase() === cleanId || t.slug.toLowerCase() === cleanId);
}

/**
 * Synchronously builds the tool FAQ payload for any tool ID.
 */
export function getToolFaqsById(toolIdOrSlug: string): ToolFaqPayload {
  const cacheKey = toolIdOrSlug.toLowerCase().trim();
  if (faqCache.has(cacheKey)) {
    return faqCache.get(cacheKey)!;
  }

  const tool = resolveToolById(toolIdOrSlug);

  if (!tool) {
    // Graceful fallback for non-existent tools
    const fallbackPayload: ToolFaqPayload = {
      toolId: toolIdOrSlug,
      toolSlug: toolIdOrSlug,
      toolName: toolIdOrSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      categoryName: 'General Utilities',
      categorySlug: 'utilities',
      faqs: [
        {
          id: `${toolIdOrSlug}-faq-0`,
          q: `Is this tool completely free on Zynovexa?`,
          a: `Yes! All tools on Zynovexa are 100% free with zero subscriptions, credit card requirements, or account sign-ins.`,
          category: 'Usage & Steps',
          tags: ['100% Free', 'Zynovexa']
        },
        {
          id: `${toolIdOrSlug}-faq-1`,
          q: `Does my data get uploaded to any external server?`,
          a: `No. Zynovexa runs all computational algorithms directly inside your browser using client-side Web APIs. Nothing leaves your device.`,
          category: 'Privacy & Security',
          tags: ['Client-Side', 'Privacy']
        },
        {
          id: `${toolIdOrSlug}-faq-2`,
          q: `Can I use this tool on a mobile smartphone or tablet?`,
          a: `Yes, Zynovexa is mobile-first and fully optimized for iOS, Android, and desktop browsers.`,
          category: 'Performance & Offline',
          tags: ['Mobile Friendly', 'Responsive']
        }
      ],
      availableCategories: ['All', 'Usage & Steps', 'Privacy & Security', 'Performance & Offline'],
      total: 3,
      source: 'fallback'
    };

    faqCache.set(cacheKey, fallbackPayload);
    return fallbackPayload;
  }

  // Retrieve comprehensive guide to access curated questions
  const guide = getToolGuide(tool);
  const category = CATEGORIES.find((c) => c.id === tool.category) || CATEGORIES[0];

  // Map and categorize raw questions
  const rawList = guide.faqs && guide.faqs.length > 0 ? guide.faqs : [];

  // Ensure standard baseline FAQs exist if fewer than 4 are defined
  const enrichedRawList = [...rawList];

  const standardQuestions = [
    {
      q: `Is the ${tool.name} free to use on Zynovexa?`,
      a: `Yes, ${tool.name} is completely free. There are no limits, no paywalls, and no account sign-in required.`
    },
    {
      q: `How does ${tool.name} safeguard my privacy and data?`,
      a: `All calculations, text manipulation, and file handling happen 100% inside your browser's local memory. No files or personal data are ever uploaded to remote servers.`
    },
    {
      q: `Can I use ${tool.name} on my smartphone without installing an app?`,
      a: `Yes. Simply open Zynovexa in your mobile browser (Safari, Chrome, Firefox, Edge, etc.) on any smartphone or tablet.`
    },
    {
      q: `Does ${tool.name} work when offline?`,
      a: `Yes. Once this page is loaded, the client-side JavaScript operates locally even if your network connection drops.`
    }
  ];

  standardQuestions.forEach((std) => {
    if (!enrichedRawList.some((item) => item.q.toLowerCase() === std.q.toLowerCase())) {
      enrichedRawList.push(std);
    }
  });

  const faqs: ToolFaqItem[] = enrichedRawList.map((item, index) => {
    const category = classifyFaqCategory(item.q, item.a);
    return {
      id: `${tool.id}-faq-${index}`,
      q: item.q,
      a: item.a,
      category,
      tags: extractFaqTags(item.q, tool),
      helpfulCount: 12 + ((index * 7 + tool.name.length) % 43)
    };
  });

  // Collect unique available categories
  const categorySet = new Set<FaqCategory>(['All']);
  faqs.forEach((f) => categorySet.add(f.category));
  const availableCategories = Array.from(categorySet);

  const payload: ToolFaqPayload = {
    toolId: tool.id,
    toolSlug: tool.slug,
    toolName: tool.name,
    categoryName: category.name,
    categorySlug: category.slug,
    faqs,
    availableCategories,
    total: faqs.length,
    source: guide.id === tool.id ? 'curated' : 'generated'
  };

  faqCache.set(cacheKey, payload);
  return payload;
}

/**
 * Dynamically and asynchronously fetches the FAQ payload for a given tool ID.
 * Supports realistic microtask simulation, loading transitions, and cache invalidation.
 */
export async function fetchToolFaqsById(
  toolIdOrSlug: string,
  simulatedDelayMs: number = 60
): Promise<ToolFaqPayload> {
  if (simulatedDelayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, simulatedDelayMs));
  }
  return getToolFaqsById(toolIdOrSlug);
}
