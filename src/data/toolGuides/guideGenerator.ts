import { ToolItem } from '../tools';
import { ToolGuide } from './types';
import { MATH_GUIDES } from './mathGuides';
import { CRICKET_GUIDES } from './cricketGuides';

/**
 * Generates or retrieves a comprehensive, dedicated usage guide for any tool on Zynovexa.
 * Guarantees 100% coverage across all 206 tools with zero missing sections.
 */
export function getToolGuide(tool: ToolItem): ToolGuide {
  // 1. Check explicit curated guides first
  if (MATH_GUIDES[tool.id] || MATH_GUIDES[tool.slug]) {
    return MATH_GUIDES[tool.id] || MATH_GUIDES[tool.slug];
  }
  if (CRICKET_GUIDES[tool.id] || CRICKET_GUIDES[tool.slug]) {
    return CRICKET_GUIDES[tool.id] || CRICKET_GUIDES[tool.slug];
  }

  // 2. Generate dedicated domain-specific guide tailored to the tool
  return buildDomainSpecificGuide(tool);
}

function buildDomainSpecificGuide(tool: ToolItem): ToolGuide {
  const name = tool.name;
  const cat = tool.category;
  const desc = tool.description;
  const lowerName = name.toLowerCase();

  // Determine Subtitle & Domain Category
  let subtitle = `${name} — 100% free browser tool running client-side with complete privacy`;
  let targetAudience = 'Professionals, students, digital creators, and everyday web users';
  let expectedResult = `Processed, verified ${lowerName} output with instant copy and download options.`;
  let beforeYouStart = ['Have your source data or input values ready.', 'No accounts, API keys, or subscriptions required.'];
  let exampleInput = 'Sample data input';
  let exampleOutput = 'Formatted and verified output';
  let exampleExplanation = `The tool processes the input values locally and generates the verified ${lowerName} result.`;

  // Customize based on category & tool name
  if (cat.includes('calculator') || cat.includes('sports-cricket')) {
    subtitle = `Instant, accurate ${lowerName} with step-by-step formulas and zero server latency`;
    targetAudience = 'Students, athletes, coaches, accountants, shoppers, and financial planners';
    expectedResult = 'Precise numerical calculation results with breakdown formulas and units.';
    beforeYouStart = [
      'Have your numeric measurements or values ready.',
      'Check if specific units (metrics or imperial) are required.'
    ];
    exampleInput = 'Value 1 = 100, Value 2 = 25';
    exampleOutput = 'Computed Result = 125.00';
    exampleExplanation = `Applies the mathematical formula directly to the input numbers to produce the exact result.`;
  } else if (cat.includes('image')) {
    subtitle = `Fast, private client-side ${lowerName} without uploading files to remote servers`;
    targetAudience = 'Graphic designers, photographers, web developers, content creators, and social media managers';
    expectedResult = 'Optimized, modified image file ready for immediate download in PNG, JPG, or WebP.';
    beforeYouStart = [
      'Select a compatible image file from your device (JPG, PNG, WebP, SVG, or GIF).',
      'Decide on your desired target dimensions, compression level, or visual format.'
    ];
    exampleInput = 'Upload a photo (1920x1080 px, 2.4 MB)';
    exampleOutput = 'Optimized output file ready for download';
    exampleExplanation = 'Processes pixel data locally using HTML5 Canvas Web APIs without uploading your personal photos.';
  } else if (cat.includes('pdf')) {
    subtitle = `Secure, client-side ${lowerName} running entirely in your browser memory`;
    targetAudience = 'Office workers, students, legal professionals, and anyone handling private documents';
    expectedResult = 'Standard compliant PDF document compiled and ready for local saving.';
    beforeYouStart = [
      'Have your PDF documents or text/images saved on your computer or phone.',
      'Ensure the PDF file is not password-encrypted before processing.'
    ];
    exampleInput = 'Select 1 or more PDF files from your device';
    exampleOutput = 'Processed PDF document generated in browser RAM';
    exampleExplanation = 'Parses PDF binary streams client-side and compiles the new document without external server transfers.';
  } else if (cat.includes('developer') || cat.includes('code') || cat.includes('encoder')) {
    subtitle = `High-performance ${lowerName} for developers, sysadmins, and QA engineers`;
    targetAudience = 'Frontend developers, backend engineers, DevOps, security analysts, and computer science students';
    expectedResult = 'Clean, syntax-highlighted, or encoded/decoded code output with 1-click clipboard copying.';
    beforeYouStart = [
      'Have your raw code snippet, JSON string, token, or text string ready to paste.',
      'Verify that formatting characters or escape sequences are intact.'
    ];
    exampleInput = '{"status": "ok", "items": [1, 2, 3]}';
    exampleOutput = 'Formatted and validated output';
    exampleExplanation = 'Evaluates input syntax, performs parsing or transformation algorithms, and outputs compliant code.';
  } else if (cat.includes('qr') || cat.includes('barcode')) {
    subtitle = `Generate high-resolution, scannable ${lowerName} graphics instantly`;
    targetAudience = 'Retailers, event organizers, marketers, restaurant owners, and educators';
    expectedResult = 'High-contrast, scannable QR/barcode vector or raster image ready to download or print.';
    beforeYouStart = [
      'Know the URL, WiFi credentials, plain text, or product code you want to encode.',
      'Ensure the encoded text does not exceed standard barcode symbology limits.'
    ];
    exampleInput = 'https://zynovexa.com';
    exampleOutput = 'Scannable barcode/QR graphic with download button';
    exampleExplanation = 'Encodes input text into optical machine-readable pattern compliant with ISO standards.';
  } else if (cat.includes('seo') || cat.includes('keyword')) {
    subtitle = `Optimize your web presence and search metadata with ${lowerName}`;
    targetAudience = 'SEO specialists, digital marketers, bloggers, webmasters, and eCommerce store owners';
    expectedResult = 'Clean, search-engine compliant tags, slugs, or keyword lists.';
    beforeYouStart = [
      'Have your page title, keywords, or target URLs drafted.',
      'Identify your target search queries and audience.'
    ];
    exampleInput = 'Online Free Tools 2026';
    exampleOutput = 'online-free-tools-2026';
    exampleExplanation = 'Strips punctuation, normalizes spacing, and formats metadata following search engine best practices.';
  } else if (cat.includes('text')) {
    subtitle = `Streamline your content editing and text manipulation with ${lowerName}`;
    targetAudience = 'Writers, editors, copywriters, students, and transcriptionists';
    expectedResult = 'Transformed, counted, or formatted text ready to copy with one click.';
    beforeYouStart = [
      'Paste or type the text you want to analyze or transform.'
    ];
    exampleInput = 'The quick brown fox jumps over the lazy dog.';
    exampleOutput = 'Processed text output';
    exampleExplanation = 'Runs string transformation algorithms locally with zero delays.';
  }

  // Build step-by-step instructions from existing instructions or defaults
  const stepByStep = (tool.instructions && tool.instructions.length >= 3)
    ? [
        `Navigate to the ${name} page on Zynovexa.`,
        ...tool.instructions,
        'Click the Copy or Download button to save your finished output.',
        'Use the Reset or Clear button whenever you wish to start a new task.'
      ]
    : [
        `Open the ${name} interface on Zynovexa.`,
        'Locate the primary input field or file drop zone at the top of the card.',
        'Enter your values, paste your text, or select your input file.',
        'Adjust any available settings, options, or conversion parameters as needed.',
        'Click the primary action button to process your request.',
        'Review the generated result displayed in the output panel.',
        'Click the Copy or Download button to save your output locally.'
      ];

  // Features list
  const features = [
    `100% Client-Side Processing: Executes entirely inside your web browser without sending data to external servers.`,
    `Zero Sign-Up Required: Fully accessible immediately without registration, logins, or email verification.`,
    `Instant Live Output: Computes results in real-time with zero queue times or server latency.`,
    `Responsive Mobile Design: Optimized for seamless use on smartphones, tablets, laptops, and 4K desktop screens.`,
    `Convenient Export Options: One-click clipboard copying and direct file downloads.`
  ];

  // Practical Troubleshooting
  const troubleshooting = [
    {
      problem: 'The tool is not displaying any result',
      cause: 'Required input fields may be blank, or input values are out of acceptable range.',
      solution: 'Ensure all mandatory input fields are filled with valid data, then click the primary action button.'
    },
    {
      problem: 'Invalid format or syntax error message appears',
      cause: 'The entered text or uploaded file does not match the expected structure.',
      solution: 'Check for extra spaces, non-numeric characters in numeric fields, or unsupported file formats.'
    },
    {
      problem: 'Download button does not trigger a file save',
      cause: 'Your browser may be blocking automatic file downloads or popups.',
      solution: 'Check your browser download permissions or try right-clicking the download button and selecting "Save Link As".'
    },
    {
      problem: 'Performance slows down on mobile devices',
      cause: 'Very large inputs or massive image files may exceed mobile memory capacity.',
      solution: 'Try processing moderately sized inputs or close background browser tabs to free up device RAM.'
    }
  ];

  // Pro Tips for Best Results
  const bestResultsTips = [
    'Double-check your input values before calculating or converting to prevent unintended mistakes.',
    'Use keyboard shortcuts like Ctrl+C / Cmd+C or the built-in 1-click Copy button for fast workflow.',
    'Bookmark this page on your browser toolbar for quick one-click access whenever you need it.',
    'This tool runs offline once loaded, making it ideal for travel and low-connectivity environments.'
  ];

  // Build 6 Verified FAQs
  const faqs = [
    {
      q: `Is ${name} free to use?`,
      a: `Yes, ${name} is 100% free with unlimited usage. There are no subscriptions, paywalls, or hidden costs.`
    },
    {
      q: `Do I need to create an account or sign in?`,
      a: `No sign in or registration is required. You can use this tool immediately upon visiting the page.`
    },
    {
      q: `Is my personal data or file uploaded to a server?`,
      a: `No. All operations run 100% client-side in your web browser using HTML5 Canvas, Web Cryptography, and standard JavaScript APIs. Your data never leaves your device.`
    },
    {
      q: `Does this tool work on mobile phones and tablets?`,
      a: `Yes, Zynovexa is mobile-first and fully responsive across all modern iOS, iPadOS, Android, Windows, and Mac browsers.`
    },
    {
      q: `Can I use this tool offline?`,
      a: `Yes. Once the page has loaded in your browser cache, the computation algorithms operate without an active internet connection.`
    },
    {
      q: `How do I copy or export my results?`,
      a: `Use the built-in "Copy" or "Download" buttons located directly beneath the output display for immediate export.`
    }
  ];

  // Append any tool-specific FAQs from definition if present
  if (tool.faqs && tool.faqs.length > 0) {
    tool.faqs.forEach(f => {
      if (!faqs.some(existing => existing.q.toLowerCase() === f.q.toLowerCase())) {
        faqs.unshift(f);
      }
    });
  }

  // SEO Content
  const primaryKeyword = tool.keywords?.[0] || `${lowerName} online`;
  const secondaryKeywords = tool.keywords || [
    `free ${lowerName}`,
    `${lowerName} no sign in`,
    `client side ${lowerName}`,
    'zynovexa tools'
  ];

  return {
    id: tool.id,
    name: tool.name,
    subtitle,
    whatItDoes: {
      summary: desc || `Perform instant, reliable ${lowerName} directly in your browser.`,
      targetAudience,
      problemsSolved: [
        `Eliminates the need for paid software installations or bulky desktop programs.`,
        `Guarantees data privacy by keeping all processing localized to your device.`
      ],
      expectedResult
    },
    features,
    beforeYouStart,
    stepByStep,
    example: {
      title: `${name} Practical Example`,
      input: exampleInput,
      options: 'Default standard parameters',
      output: exampleOutput,
      explanation: exampleExplanation
    },
    bestResultsTips,
    troubleshooting,
    faqs: faqs.slice(0, 7),
    seoContent: {
      title: tool.seoTitle || `Free ${name} Online — No Sign In Required | Zynovexa`,
      metaDescription: tool.metaDescription || (
        cat.includes('pdf') || lowerName.includes('pdf')
          ? `Free online ${name} on Zynovexa. Fast, private online PDF tool & free PDF editor for instant document editing with zero file uploads and no sign in required.`
          : cat.includes('image') || cat.includes('photo') || lowerName.includes('image') || lowerName.includes('resizer')
          ? `Free online ${name} on Zynovexa. Fast image resizer, compressor & converter with HD preview, no watermark, and 100% private client-side browser processing.`
          : cat.includes('calculator') || cat.includes('math') || lowerName.includes('calculator')
          ? `Free online ${name} on Zynovexa. Fast, accurate online calculator with instant formulas, step-by-step breakdown & no sign up. 100% private in your browser.`
          : `Free online ${name} tool on Zynovexa. 100% free, fast browser utility with instant accurate results, local client-side privacy, and zero sign up or file uploads.`
      ).slice(0, 160),
      h1: tool.name,
      primaryKeyword,
      secondaryKeywords,
      longTailKeywords: [
        `free ${lowerName} with steps`,
        `how to use ${lowerName} online`,
        `best client side ${lowerName} tool`
      ]
    }
  };
}
