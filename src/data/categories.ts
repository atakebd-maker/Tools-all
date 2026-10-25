export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'ai-writing',
    name: 'AI Writing Tools',
    slug: 'ai-writing',
    description: 'Generate blog posts, essays, stories, emails, summaries, and copy powered by Google Gemini AI.',
    icon: 'Sparkles',
    color: 'text-violet-600 bg-violet-50 border-violet-200',
    seoTitle: 'Zynovexa - Free AI Writing Tools with Google Gemini',
    metaDescription: 'Free online AI writing tools powered by Google Gemini. Write blog posts, essays, emails, social captions, summaries, and product copy instantly.',
    keywords: [
      'free ai writer online',
      'google gemini writing tools',
      'ai essay writer free',
      'ai blog generator',
      'ai email writer',
      'zynovexa ai tools'
    ]
  },
  {
    id: 'ai-developer',
    name: 'AI Developer Tools',
    slug: 'ai-developer',
    description: 'Intelligent code generation, bug fixing, SQL query building, regex generator, and syntax explanation.',
    icon: 'Code2',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    seoTitle: 'Zynovexa - Free AI Developer Tools & Code Generator',
    metaDescription: 'Free AI code generator, debugger, SQL builder, regex tester, and programming tutor powered by Google Gemini.',
    keywords: [
      'ai code generator online',
      'ai sql generator free',
      'ai code debugger',
      'ai regex generator',
      'programming tutor ai'
    ]
  },
  {
    id: 'ai-education',
    name: 'AI Chat & Education',
    slug: 'ai-education',
    description: 'Interactive AI assistant, quiz maker, flashcard generator, study planner, and interview question prep.',
    icon: 'GraduationCap',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    seoTitle: 'Zynovexa - Free AI Education & Interactive Learning Tools',
    metaDescription: 'Free AI learning tools powered by Gemini. Generate quizzes, active-recall flashcards, personalized study schedules, and interview questions.',
    keywords: [
      'ai quiz generator online',
      'ai flashcards free',
      'ai study plan generator',
      'ai chatbot free',
      'interview prep ai'
    ]
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Compress, resize, convert, crop, rotate, filter, and modify images with complete local privacy.',
    icon: 'Image',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    seoTitle: 'Zynovexa - Free Online Image Tools Not Sign In Only Free',
    metaDescription: '100% free online image tools without sign in. Resize, compress, convert PNG/JPG/WebP, crop, and apply filters locally in your browser with zero file uploads.',
    keywords: [
      'free online image tools',
      'image tools not sign in',
      'free photo tools no account',
      'image resizer online free',
      'image compressor no sign in',
      'convert image free',
      'zynovexa image tools'
    ]
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Merge, split, rotate, convert, and inspect PDF files client-side without uploading to any server.',
    icon: 'FileText',
    color: 'text-red-600 bg-red-50 border-red-200',
    seoTitle: 'Zynovexa - Free Online PDF Tools Not Sign In Only Free',
    metaDescription: '100% free online PDF tools without sign in or registration. Merge, split, rotate, convert images to PDF, and inspect PDF files safely in your browser.',
    keywords: [
      'free online pdf tools',
      'pdf tools not sign in',
      'free pdf merger no sign up',
      'split pdf free online',
      'rotate pdf no account',
      'images to pdf free',
      'zynovexa pdf tools'
    ]
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count words, manipulate text casing, clean whitespaces, sort lines, and convert formats.',
    icon: 'Type',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    seoTitle: 'Zynovexa - Free Online Text Tools Not Sign In Only Free',
    metaDescription: '100% free online text and writing tools without sign in. Accurate word counter, text diff comparison, case converter, find and replace, and lorem ipsum generator.',
    keywords: [
      'free online text tools',
      'text tools not sign in',
      'word counter free online',
      'text diff checker no sign in',
      'case converter free',
      'lorem ipsum generator free',
      'zynovexa text tools'
    ]
  },
  {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    slug: 'calculator-tools',
    description: 'Accurate calculations for finance, percentages, BMI, interest, loans, geometry, and daily math.',
    icon: 'Calculator',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    seoTitle: 'Zynovexa - Free Online Calculator Tools Not Sign In Only Free',
    metaDescription: '100% free online calculators without sign in. Scientific calculator, loan EMI calculator, percentage, BMI, age, and tip calculations with instant accurate results.',
    keywords: [
      'free online calculator tools',
      'calculator tools not sign in',
      'free loan emi calculator',
      'scientific calculator online free',
      'percentage calculator no sign in',
      'bmi calculator free',
      'zynovexa calculators'
    ]
  },
  {
    id: 'unit-converters',
    name: 'Unit Converters',
    slug: 'unit-converters',
    description: 'Instant conversion between length, weight, temperature, data storage, volume, speed, and time.',
    icon: 'ArrowLeftRight',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    seoTitle: 'Zynovexa - Free Online Unit Converters Not Sign In Only Free',
    metaDescription: '100% free online unit conversion tools without sign in. Convert length, weight, temperature, data storage, volume, speed, and digital units instantly.',
    keywords: [
      'free online unit converters',
      'unit converter not sign in',
      'convert units online free',
      'metric to imperial converter free',
      'data storage converter no sign in',
      'zynovexa unit converters'
    ]
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Format JSON, decode JWT, test regex patterns, generate UUIDs, encode Base64, and compute hashes.',
    icon: 'Code2',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    seoTitle: 'Zynovexa - Free Online Developer Tools Not Sign In Only Free',
    metaDescription: '100% free online developer utilities without sign in. JSON formatter and validator, JWT token decoder, UUID generator, SHA/MD5 hash, regex tester, and CSS tools.',
    keywords: [
      'free online developer tools',
      'developer tools not sign in',
      'free json formatter online',
      'jwt decoder no sign in',
      'uuid generator free',
      'regex tester online free',
      'base64 encoder decoder',
      'zynovexa dev tools'
    ]
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    slug: 'seo-tools',
    description: 'Generate meta tags, robots.txt, sitemaps, inspect SERP snippets, and check keyword density.',
    icon: 'Search',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    seoTitle: 'Zynovexa - Free Online SEO Tools Not Sign In Only Free',
    metaDescription: '100% free online SEO and webmaster tools without sign in. Generate robots.txt, XML sitemaps, preview Google SERP snippets, and optimize meta tags easily.',
    keywords: [
      'free online seo tools',
      'seo tools not sign in',
      'serp preview generator free',
      'robots txt generator no sign in',
      'xml sitemap generator free',
      'meta tag generator online',
      'zynovexa seo tools'
    ]
  },
  {
    id: 'color-design-tools',
    name: 'Color & Design Tools',
    slug: 'color-design-tools',
    description: 'Pick colors, generate harmonic palettes, test WCAG contrast ratios, and create CSS styles.',
    icon: 'Palette',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    seoTitle: 'Zynovexa - Free Online Color & Design Tools Not Sign In Only Free',
    metaDescription: '100% free online color and design tools without sign in. Color picker with HEX/RGB/HSL conversion, WCAG accessibility contrast checker, and palette generator.',
    keywords: [
      'free online color tools',
      'color tools not sign in',
      'online color picker free',
      'wcag contrast checker no sign in',
      'hex to rgb converter free',
      'color palette generator free',
      'zynovexa color tools'
    ]
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    slug: 'social-media-tools',
    description: 'Resize assets for YouTube, Instagram, X/Twitter, Facebook, LinkedIn, and format post captions.',
    icon: 'Share2',
    color: 'text-pink-600 bg-pink-50 border-pink-200',
    seoTitle: 'Zynovexa - Free Online Social Media Tools Not Sign In Only Free',
    metaDescription: '100% free online social media tools without sign in. Resize images for Instagram, YouTube, X/Twitter, Facebook, and LinkedIn with real-time character counting.',
    keywords: [
      'free online social media tools',
      'social media tools not sign in',
      'instagram image resizer free',
      'youtube banner resizer online',
      'social caption counter free',
      'zynovexa social tools'
    ]
  },
  {
    id: 'date-time-tools',
    name: 'Date & Time Tools',
    slug: 'date-time-tools',
    description: 'Stopwatch, Pomodoro focus timer, countdowns, age calculator, working days, and time zones.',
    icon: 'Clock',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    seoTitle: 'Zynovexa - Free Online Date & Time Tools Not Sign In Only Free',
    metaDescription: '100% free online date and time utilities without sign in. Digital stopwatch with lap timer, Pomodoro focus timer, world clock, and age calculator.',
    keywords: [
      'free online date time tools',
      'date time tools not sign in',
      'online stopwatch free no sign in',
      'pomodoro timer online free',
      'world clock free',
      'age calculator free',
      'zynovexa time tools'
    ]
  },
  {
    id: 'random-generators',
    name: 'Random Generators',
    slug: 'random-generators',
    description: 'Generate secure passwords, numbers, random choices, names, flip coins, and roll dice.',
    icon: 'Shuffle',
    color: 'text-violet-600 bg-violet-50 border-violet-200',
    seoTitle: 'Zynovexa - Free Online Random Generators Not Sign In Only Free',
    metaDescription: '100% free online random generator tools without sign in. Strong password generator, random choice picker, number picker, coin flipper, and dice roller.',
    keywords: [
      'free online random generators',
      'random generators not sign in',
      'strong password generator free',
      'random picker wheel no sign in',
      'random number generator online free',
      'zynovexa random tools'
    ]
  },
  {
    id: 'file-tools',
    name: 'File Tools',
    slug: 'file-tools',
    description: 'Create and extract ZIP archives, view CSV files, compute checksums, and convert file formats.',
    icon: 'FolderArchive',
    color: 'text-slate-700 bg-slate-100 border-slate-200',
    seoTitle: 'Zynovexa - Free Online File & Archive Tools Not Sign In Only Free',
    metaDescription: '100% free online file and archive tools without sign in. Create ZIP files, extract ZIP archives, view CSV spreadsheets, and compute MD5/SHA256 checksums locally.',
    keywords: [
      'free online file tools',
      'file tools not sign in',
      'create zip online free',
      'unzip online without account',
      'csv viewer free online',
      'file checksum hash free',
      'zynovexa file tools'
    ]
  }
];
