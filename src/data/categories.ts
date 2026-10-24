export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Compress, resize, convert, crop, rotate, filter, and modify images with complete local privacy.',
    icon: 'Image',
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Merge, split, rotate, convert, and inspect PDF files client-side without uploading to any server.',
    icon: 'FileText',
    color: 'text-red-600 bg-red-50 border-red-200'
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count words, manipulate text casing, clean whitespaces, sort lines, and convert formats.',
    icon: 'Type',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    slug: 'calculator-tools',
    description: 'Accurate calculations for finance, percentages, BMI, interest, loans, geometry, and daily math.',
    icon: 'Calculator',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    id: 'unit-converters',
    name: 'Unit Converters',
    slug: 'unit-converters',
    description: 'Instant conversion between length, weight, temperature, data storage, volume, speed, and time.',
    icon: 'ArrowLeftRight',
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Format JSON, decode JWT, test regex patterns, generate UUIDs, encode Base64, and compute hashes.',
    icon: 'Code2',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    slug: 'seo-tools',
    description: 'Generate meta tags, robots.txt, sitemaps, inspect SERP snippets, and check keyword density.',
    icon: 'Search',
    color: 'text-teal-600 bg-teal-50 border-teal-200'
  },
  {
    id: 'color-design-tools',
    name: 'Color & Design Tools',
    slug: 'color-design-tools',
    description: 'Pick colors, generate harmonic palettes, test WCAG contrast ratios, and create CSS styles.',
    icon: 'Palette',
    color: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    slug: 'social-media-tools',
    description: 'Resize assets for YouTube, Instagram, X/Twitter, Facebook, LinkedIn, and format post captions.',
    icon: 'Share2',
    color: 'text-pink-600 bg-pink-50 border-pink-200'
  },
  {
    id: 'date-time-tools',
    name: 'Date & Time Tools',
    slug: 'date-time-tools',
    description: 'Stopwatch, Pomodoro focus timer, countdowns, age calculator, working days, and time zones.',
    icon: 'Clock',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    id: 'random-generators',
    name: 'Random Generators',
    slug: 'random-generators',
    description: 'Generate secure passwords, numbers, random choices, names, flip coins, and roll dice.',
    icon: 'Shuffle',
    color: 'text-violet-600 bg-violet-50 border-violet-200'
  },
  {
    id: 'file-tools',
    name: 'File Tools',
    slug: 'file-tools',
    description: 'Create and extract ZIP archives, view CSV files, compute checksums, and convert file formats.',
    icon: 'FolderArchive',
    color: 'text-slate-700 bg-slate-100 border-slate-200'
  }
];
