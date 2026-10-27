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
  },
  {
    id: 'qr-code-generators',
    name: 'QR Code Generators',
    slug: 'qr-code-generators',
    description: 'Generate customizable scannable QR codes for Wi-Fi, URLs, plain text, contacts, emails, WhatsApp, and events.',
    icon: 'QrCode',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    seoTitle: 'Zynovexa - Free Online QR Code Generators Not Sign In Only Free',
    metaDescription: '100% free online QR code generators without sign in. Generate custom QR codes for Wi-Fi, URLs, vCards, SMS, emails, WhatsApp, and locations with PNG & SVG downloads.',
    keywords: [
      'qr code generator',
      'wifi qr code',
      'url qr code',
      'vcard qr generator',
      'whatsapp qr code',
      'free qr code no sign in'
    ]
  },
  {
    id: 'barcode-generators',
    name: 'Barcode & Product Codes',
    slug: 'barcode-generators',
    description: 'Generate Code 128, Code 39, EAN-13, UPC-A, ITF barcodes, product SKUs, and batch product codes.',
    icon: 'Barcode',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    seoTitle: 'Zynovexa - Free Online Barcode & Product Code Generators Not Sign In',
    metaDescription: '100% free online barcode generator. Create Code 128, EAN-13, Code 39, UPC-A, ITF barcodes, and batch product SKUs with SVG & PNG downloads and CSV export.',
    keywords: [
      'barcode generator',
      'code 128 generator',
      'ean 13 barcode',
      'upc generator',
      'sku generator',
      'batch barcode generator'
    ]
  },
  {
    id: 'seo-keyword-generators',
    name: 'Keyword & SEO Generators',
    slug: 'seo-keyword-generators',
    description: 'Generate SEO slugs, meta tags, SERP snippets, robots.txt, XML sitemaps, UTM links, and format keyword lists.',
    icon: 'Search',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    seoTitle: 'Zynovexa - Free Online Keyword & SEO Generators Not Sign In Only Free',
    metaDescription: '100% free online SEO & keyword generators. Generate URL slugs, robots.txt, sitemaps, UTM tracking links, meta tags, and clean keyword lists locally.',
    keywords: [
      'seo keyword slug generator',
      'robots txt generator',
      'xml sitemap generator',
      'utm builder',
      'meta tag generator',
      'keyword deduplication'
    ]
  },
  {
    id: 'text-encoders-decoders',
    name: 'Text Encoders & Decoders',
    slug: 'text-encoders-decoders',
    description: 'Encode and decode Base64, URL percent-encoding, HTML entities, Binary, Hex, ASCII, Unicode, ROT13, and Morse code.',
    icon: 'Binary',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    seoTitle: 'Zynovexa - Free Online Text Encoders & Decoders Not Sign In Only Free',
    metaDescription: '100% free online encoders and decoders. Convert Base64, URL percent encoding, HTML entities, Binary, Hex, ASCII, Unicode, ROT13, and Morse code with audio.',
    keywords: [
      'url encoder decoder',
      'base64 encode decode',
      'html entity encoder',
      'binary to text',
      'hex encoder decoder',
      'morse code translator'
    ]
  },
  {
    id: 'security-random-generators',
    name: 'Security & Cryptography',
    slug: 'security-random-generators',
    description: 'Generate cryptographically strong passwords, random numbers, strings, UUID v4, SHA hashes, and test OTP codes.',
    icon: 'Shield',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    seoTitle: 'Zynovexa - Free Online Security & Hash Generators Not Sign In Only Free',
    metaDescription: '100% free client-side security tools. Cryptographic password generator, SHA-256/SHA-512 hashes, UUID v4, random strings, and demo OTP codes with complete privacy.',
    keywords: [
      'secure password generator',
      'uuid v4 generator',
      'sha256 hash generator',
      'sha512 generator',
      'random string generator',
      'demo otp generator'
    ]
  },
  {
    id: 'payment-utilities',
    name: 'Card & Payment Utilities',
    slug: 'payment-utilities',
    description: 'Validate bank card formats using the Luhn algorithm, calculate check digits, and generate payment information QR codes.',
    icon: 'CreditCard',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    seoTitle: 'Zynovexa - Free Online Payment & Luhn Checksum Utilities Not Sign In',
    metaDescription: '100% free client-side card format validation with Luhn algorithm, ISO/IEC 7812 check digit calculator, and payment information QR code generator. Zero backend storage.',
    keywords: [
      'card format validator',
      'luhn algorithm calculator',
      'luhn check digit',
      'payment info qr generator',
      'demo payment reference'
    ]
  },
  {
    id: 'developer-generators',
    name: 'Developer & Code Generators',
    slug: 'developer-generators',
    description: 'Generate HTML boilerplates, HTML tables, CSS buttons, gradients, box shadows, flexbox layouts, and convert JSON to CSV.',
    icon: 'Code2',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    seoTitle: 'Zynovexa - Free Online Developer & Code Generators Not Sign In Only Free',
    metaDescription: '100% free online developer generators. HTML boilerplate, HTML table, CSS button generator, CSS gradient & shadow builder, JSON to CSV converter, and regex tester.',
    keywords: [
      'html boilerplate generator',
      'html table generator',
      'css button generator',
      'css gradient generator',
      'json to csv converter',
      'regex tester online'
    ]
  },
  {
    id: 'business-marketing-generators',
    name: 'Business & Marketing Tools',
    slug: 'business-marketing-generators',
    description: 'Generate e-commerce coupon codes, promo codes, sequential invoice numbers, and trackable affiliate marketing links.',
    icon: 'Tag',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    seoTitle: 'Zynovexa - Free Online Business & Marketing Code Generators Not Sign In',
    metaDescription: '100% free online business & marketing tools. Generate bulk coupon codes, promo codes, invoice numbers, and affiliate tracking URLs with CSV/TXT export.',
    keywords: [
      'coupon code generator',
      'promo code generator',
      'invoice number generator',
      'affiliate link builder',
      'bulk discount codes'
    ]
  },
  {
    id: 'sports-cricket-calculators',
    name: 'Sports & Cricket Calculators',
    slug: 'sports-cricket-calculators',
    description: 'Calculate cricket batting averages with not-outs, strike rate, bowling average, economy rates, and run chase equations.',
    icon: 'Trophy',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    seoTitle: 'Zynovexa - Free Online Cricket & Sports Calculators Not Sign In',
    metaDescription: '100% free online cricket calculators without sign in. Calculate batting average, bowling strike rate, economy rate, required run rate, and run chases directly in your browser.',
    keywords: [
      'cricket batting average calculator',
      'cricket strike rate calculator',
      'bowling economy rate calculator',
      'required run rate calculator',
      'run chase calculator',
      'zynovexa cricket tools'
    ]
  },
  {
    id: 'health-fitness-calculators',
    name: 'Health & Fitness Calculators',
    slug: 'health-fitness-calculators',
    description: 'Calculate BMI, Mifflin-St Jeor BMR, Daily Caloric Expenditure (TDEE), ideal body weight, and daily water hydration.',
    icon: 'Activity',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    seoTitle: 'Zynovexa - Free Online Health & Fitness Calculators Not Sign In',
    metaDescription: '100% free online health calculators without sign in. Accurate BMI, BMR, daily calorie needs, ideal weight comparison, and water intake estimator with total privacy.',
    keywords: [
      'bmi calculator free',
      'bmr calculator',
      'daily calorie calculator',
      'ideal weight estimator',
      'water intake calculator',
      'zynovexa health tools'
    ]
  }
];

