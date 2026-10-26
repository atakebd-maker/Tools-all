import React from 'react';
import { ToolItem } from './tools';

// Text Transform Tools
import {
  CaseConverter,
  CharacterCounter,
  RemoveExtraSpaces,
  RemoveDuplicateLines,
  TextReverser,
  SortLines,
  TextToSlug
} from '../tools/text/TextTransformTools';

// Image Tools
import {
  ImageRotator,
  ImageFlipper,
  ImagePreviewTool,
  ImageDimensionChecker
} from '../tools/image/ImageUtilities';

// Calculators
import {
  BasicCalculator,
  DateDifferenceCalculator,
  TimeCalculator,
  DiscountCalculator,
  GstCalculator,
  AverageCalculator,
  RatioCalculator,
  CompoundInterestCalculator,
  TemperatureConverter
} from '../tools/calculators/FinancialAndMathCalculators';

// Developer & Webmaster Tools
import {
  HtmlEncoderDecoder,
  CssFormatter,
  HtmlMinifier,
  UrlParser,
  HexRgbConverter,
  XmlFormatter
} from '../tools/developer/WebmasterCodeTools';

// PDF Tools
import {
  PdfInfoViewer,
  PdfPageExtractor,
  PdfPageDeleter
} from '../tools/pdf/PdfAdvancedTools';

export const EXTRA_TOOLS: ToolItem[] = [
  // --- TEXT TOOLS ---
  {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    category: 'text-tools',
    popular: true,
    description: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    keywords: ['case converter', 'uppercase converter', 'title case online', 'camelcase generator', 'snake case converter'],
    component: CaseConverter,
    instructions: [
      'Type or paste your text in the input box.',
      'Click any case conversion button.',
      'Copy the converted text immediately.'
    ],
    limitations: ['Operates 100% locally in your browser.'],
    faqs: [{ q: 'Is there a limit on text length?', a: 'No, it handles large paragraphs effortlessly.' }]
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    slug: 'character-counter',
    category: 'text-tools',
    description: 'Real-time character counter showing total characters, spaces, letters, digits, special symbols, and UTF-8 bytes.',
    keywords: ['character counter', 'letter counter', 'count characters online', 'char count tool', 'byte counter'],
    component: CharacterCounter,
    instructions: [
      'Paste or type text into the editor.',
      'Review instant live character metrics in the statistics cards above.'
    ],
    limitations: ['Computes live as you type without server communication.'],
    faqs: [{ q: 'Does it calculate bytes?', a: 'Yes, it computes exact UTF-8 byte size.' }]
  },
  {
    id: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    slug: 'remove-extra-spaces',
    category: 'text-tools',
    description: 'Clean up text by removing consecutive spaces, leading/trailing whitespace, and redundant blank lines.',
    keywords: ['remove extra spaces', 'clean whitespace', 'remove double spaces', 'text space remover', 'trim text'],
    component: RemoveExtraSpaces,
    instructions: [
      'Paste your messy text in the input area.',
      'Extra spaces and blank lines are automatically removed in the output box.'
    ],
    limitations: ['Preserves intentional single spaces and paragraph breaks.'],
    faqs: [{ q: 'Does it remove leading spaces?', a: 'Yes, trims line starts and ends.' }]
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    category: 'text-tools',
    description: 'Deduplicate lists, URLs, emails, or data rows, retaining original item ordering.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines online', 'remove duplicates text', 'unique items finder'],
    component: RemoveDuplicateLines,
    instructions: [
      'Paste your list of lines or items.',
      'Toggle case sensitivity if needed.',
      'Copy your clean list of unique lines.'
    ],
    limitations: ['De-duplicates based on complete lines.'],
    faqs: [{ q: 'Does it preserve original order?', a: 'Yes, the first occurrence of each line is preserved.' }]
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    slug: 'text-reverser',
    category: 'text-tools',
    description: 'Reverse characters, flip word order, or invert lines of text with instant preview.',
    keywords: ['text reverser', 'reverse text online', 'reverse string', 'reverse words', 'flip text'],
    component: TextReverser,
    instructions: [
      'Type or paste text into the input.',
      'Choose whether to reverse characters, words, or lines.'
    ],
    limitations: ['Instant client-side reversal.'],
    faqs: [{ q: 'Can it reverse words without reversing letters?', a: 'Yes, select "Reverse Words".' }]
  },
  {
    id: 'sort-lines',
    name: 'Sort Lines',
    slug: 'sort-lines',
    category: 'text-tools',
    description: 'Sort lines alphabetically (A-Z, Z-A), numerically (1-9), or by line length.',
    keywords: ['sort lines', 'alphabetize list', 'sort text online', 'sort numbers list', 'order lines'],
    component: SortLines,
    instructions: [
      'Paste your lines of text.',
      'Select your sorting criteria (A-Z, Z-A, Numeric, or Length).'
    ],
    limitations: ['Processes sorting locally in memory.'],
    faqs: [{ q: 'Can it sort numbers correctly?', a: 'Yes, select "Numeric" to sort by mathematical value.' }]
  },
  {
    id: 'text-to-slug',
    name: 'Text to Slug',
    slug: 'text-to-slug',
    category: 'text-tools',
    description: 'Convert article titles and headlines into URL-friendly slugs with hyphen or underscore separators.',
    keywords: ['text to slug', 'url slug generator', 'slugify text', 'clean url generator', 'seo slug maker'],
    component: TextToSlug,
    instructions: [
      'Enter an article title or phrase.',
      'Select hyphen (-) or underscore (_) separator.',
      'Copy the normalized, URL-safe slug.'
    ],
    limitations: ['Removes accents and special symbols.'],
    faqs: [{ q: 'Does it handle accents and symbols?', a: 'Yes, characters like é and ñ are normalized to e and n.' }]
  },

  // --- IMAGE TOOLS ---
  {
    id: 'image-rotator',
    name: 'Image Rotator',
    slug: 'image-rotator',
    category: 'image-tools',
    description: 'Rotate images 90°, 180°, or 270° clockwise with instant canvas download.',
    keywords: ['image rotator', 'rotate image online', 'rotate photo 90 degrees', 'turn image', 'free image rotation'],
    component: ImageRotator,
    instructions: [
      'Upload a PNG, JPG, or WebP photo.',
      'Click Rotate 90° or Rotate 180° to adjust orientation.',
      'Download your rotated image.'
    ],
    limitations: ['Processed locally with HTML5 Canvas.'],
    faqs: [{ q: 'Is my photo uploaded to a server?', a: 'No, all rotation happens inside your browser.' }]
  },
  {
    id: 'image-flipper',
    name: 'Image Flipper',
    slug: 'image-flipper',
    category: 'image-tools',
    description: 'Mirror flip images horizontally or vertically with real-time preview and instant download.',
    keywords: ['image flipper', 'flip image horizontal', 'mirror image online', 'flip photo vertical', 'reverse image orientation'],
    component: ImageFlipper,
    instructions: [
      'Upload your image.',
      'Toggle Horizontal (Mirror) or Vertical flip.',
      'Click Download Flipped to save.'
    ],
    limitations: ['Preserves original image dimensions.'],
    faqs: [{ q: 'Can I flip both horizontally and vertically?', a: 'Yes, toggle both options simultaneously.' }]
  },
  {
    id: 'image-preview-tool',
    name: 'Image Preview & Dimension Inspector',
    slug: 'image-preview-tool',
    category: 'image-tools',
    description: 'Inspect exact pixel dimensions, aspect ratio, file size, and MIME type of any image file.',
    keywords: ['image preview tool', 'image dimension checker', 'check image resolution', 'photo inspector', 'aspect ratio checker'],
    component: ImagePreviewTool,
    instructions: [
      'Select any image file.',
      'View width, height, aspect ratio, file size, and image preview.'
    ],
    limitations: ['Supports all browser-supported image formats.'],
    faqs: [{ q: 'Does it compute aspect ratios?', a: 'Yes, displays exact ratio values like 16:9 or 1:1.' }]
  },

  // --- CALCULATORS ---
  {
    id: 'basic-calculator',
    name: 'Basic Calculator',
    slug: 'basic-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Simple, responsive 4-function pocket calculator with percentage and memory controls.',
    keywords: ['basic calculator', 'simple calculator online', 'pocket calculator', 'math calculator', 'addition subtraction tool'],
    component: BasicCalculator,
    instructions: [
      'Click the buttons or type values.',
      'Press = to compute the result.'
    ],
    limitations: ['Standard floating point arithmetic.'],
    faqs: [{ q: 'Can I use keyboard shortcuts?', a: 'Yes, you can click on-screen buttons or enter numbers.' }]
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    category: 'calculator-tools',
    description: 'Calculate exact elapsed time between two dates in days, weeks, months, and years.',
    keywords: ['date difference calculator', 'days between dates', 'time difference calculator', 'how many days between', 'date duration'],
    component: DateDifferenceCalculator,
    instructions: [
      'Select Start Date and End Date.',
      'View total days, weeks, months, and years difference.'
    ],
    limitations: ['Accounts for leap years and month durations.'],
    faqs: [{ q: 'Can I calculate past and future dates?', a: 'Yes, computes absolute duration between any two dates.' }]
  },
  {
    id: 'time-calculator',
    name: 'Time Calculator',
    slug: 'time-calculator',
    category: 'calculator-tools',
    description: 'Add or subtract hours and minutes with decimal conversion.',
    keywords: ['time calculator', 'add hours minutes', 'subtract time', 'hours calculator', 'work hours calculator'],
    component: TimeCalculator,
    instructions: [
      'Enter hours and minutes for both periods.',
      'Choose Add (+) or Subtract (-).',
      'View total combined hours and minutes.'
    ],
    limitations: ['Converts to both hours/minutes and decimal hours.'],
    faqs: [{ q: 'Can this be used for timesheets?', a: 'Yes, decimal hours are provided for payroll calculation.' }]
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category: 'calculator-tools',
    description: 'Calculate sale savings, promotional discounts, and final checkout prices instantly.',
    keywords: ['discount calculator', 'sale calculator', 'percentage off calculator', 'shopping discount', 'savings calculator'],
    component: DiscountCalculator,
    instructions: [
      'Enter original product price.',
      'Enter discount percentage (e.g. 25%).',
      'View your savings and the final price.'
    ],
    limitations: ['Standard percentage formula calculation.'],
    faqs: [{ q: 'Does it show total savings?', a: 'Yes, displays exact dollar savings and final price.' }]
  },
  {
    id: 'gst-calculator',
    name: 'GST / VAT Calculator',
    slug: 'gst-calculator',
    category: 'calculator-tools',
    description: 'Calculate GST/VAT inclusive or exclusive amounts with standard 5%, 12%, 18%, and 28% tax slabs.',
    keywords: ['gst calculator', 'vat calculator', 'sales tax calculator', 'gst inclusive', 'gst exclusive'],
    component: GstCalculator,
    instructions: [
      'Choose whether to Add GST (exclusive) or Extract GST (inclusive).',
      'Enter base or invoice amount and choose tax rate slab.'
    ],
    limitations: ['General tax estimation tool.'],
    faqs: [{ q: 'What is the difference between GST inclusive and exclusive?', a: 'Exclusive adds tax to base amount; inclusive calculates how much tax was already embedded.' }]
  },
  {
    id: 'average-calculator',
    name: 'Average Calculator',
    slug: 'average-calculator',
    category: 'calculator-tools',
    description: 'Calculate mean (average), median, sum, and range from any list of numbers.',
    keywords: ['average calculator', 'mean median mode', 'find average online', 'calculate mean', 'statistics calculator'],
    component: AverageCalculator,
    instructions: [
      'Enter numbers separated by commas or spaces.',
      'Review mean, median, sum, and range instantly.'
    ],
    limitations: ['Supports negative numbers and decimal values.'],
    faqs: [{ q: 'How is median calculated?', a: 'For odd counts, the middle value is selected; for even counts, the two middle values are averaged.' }]
  },
  {
    id: 'ratio-calculator',
    name: 'Ratio Calculator',
    slug: 'ratio-calculator',
    category: 'calculator-tools',
    description: 'Solve proportions (A : B = C : D) and calculate missing scale dimensions.',
    keywords: ['ratio calculator', 'proportion solver', 'aspect ratio calculator', 'solve ratio', 'scale factor calculator'],
    component: RatioCalculator,
    instructions: [
      'Enter values for A, B, and C.',
      'The calculator solves for missing value D in proportion.'
    ],
    limitations: ['Useful for scaling designs, photography, recipes, and geometry.'],
    faqs: [{ q: 'Can it solve image scaling?', a: 'Yes, enter original width/height and target width to get the proportional height.' }]
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    category: 'calculator-tools',
    description: 'Calculate future investment growth with monthly, quarterly, or annual compounding interest.',
    keywords: ['compound interest calculator', 'investment calculator', 'future value calculator', 'savings interest', 'compound growth'],
    component: CompoundInterestCalculator,
    instructions: [
      'Enter initial deposit, annual interest rate, duration in years, and compounding frequency.',
      'View future portfolio value and total interest earned.'
    ],
    limitations: ['Estimates based on compound interest formula A = P(1 + r/n)^(nt).'],
    faqs: [{ q: 'Which compounding frequencies are supported?', a: 'Monthly, Quarterly, Annually, and Daily.' }]
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    slug: 'temperature-converter',
    category: 'calculator-tools',
    description: 'Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) with instant formula display.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter', 'convert temp online'],
    component: TemperatureConverter,
    instructions: [
      'Enter a temperature value.',
      'Select starting unit (°C, °F, or K).',
      'View converted values in all standard units.'
    ],
    limitations: ['Uses absolute temperature conversions.'],
    faqs: [{ q: 'What is absolute zero?', a: 'Absolute zero is 0 K, equivalent to -273.15 °C or -459.67 °F.' }]
  },

  // --- DEVELOPER & WEBMASTER TOOLS ---
  {
    id: 'html-encoder-decoder',
    name: 'HTML Entity Encoder & Decoder',
    slug: 'html-encoder-decoder',
    category: 'developer-tools',
    description: 'Encode special characters into HTML entities (&amp;, &lt;, &gt;) and decode entities back to plain text.',
    keywords: ['html encoder', 'html decoder', 'html entity encode', 'escape html entities', 'encode html online'],
    component: HtmlEncoderDecoder,
    instructions: [
      'Choose HTML Entity Encode or Decode.',
      'Paste your markup in the input box and copy the safe encoded output.'
    ],
    limitations: ['Prevents XSS when rendering user strings in HTML.'],
    faqs: [{ q: 'Why encode HTML entities?', a: 'To safely display code snippets without executing them as browser tags.' }]
  },
  {
    id: 'css-formatter',
    name: 'CSS Formatter & Minifier',
    slug: 'css-formatter',
    category: 'developer-tools',
    description: 'Beautify unformatted CSS stylesheets or minify CSS to reduce bandwidth and load times.',
    keywords: ['css formatter', 'beautify css', 'css minifier', 'compress css', 'clean css code'],
    component: CssFormatter,
    instructions: [
      'Choose Beautify or Minify mode.',
      'Paste your CSS in the input area and copy the processed result.'
    ],
    limitations: ['Strips comments and whitespace in Minify mode.'],
    faqs: [{ q: 'Does minifying break styles?', a: 'No, it only removes redundant spaces, comments, and line breaks.' }]
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    slug: 'html-minifier',
    category: 'developer-tools',
    description: 'Minify HTML documents by stripping comments and redundant whitespace for faster page rendering.',
    keywords: ['html minifier', 'compress html', 'minify html online', 'reduce html file size', 'clean html markup'],
    component: HtmlMinifier,
    instructions: [
      'Paste your HTML document.',
      'Copy the minified HTML code.'
    ],
    limitations: ['Collapses unnecessary spaces between tags.'],
    faqs: [{ q: 'Does it remove HTML comments?', a: 'Yes, strips <!-- comments -->.' }]
  },
  {
    id: 'url-parser',
    name: 'URL Parser & Query Inspector',
    slug: 'url-parser',
    category: 'developer-tools',
    description: 'Parse URL protocol, host, port, path, hash, and inspect all query string parameters in a clean table.',
    keywords: ['url parser', 'query parameter parser', 'parse url online', 'url query string inspector', 'url breakdown'],
    component: UrlParser,
    instructions: [
      'Paste a full URL (including https://).',
      'Inspect protocol, domain, path, and individual search parameters.'
    ],
    limitations: ['Uses standard browser URL parsing API.'],
    faqs: [{ q: 'Can it decode UTM tracking parameters?', a: 'Yes, it breaks down all query keys and values.' }]
  },
  {
    id: 'hex-to-rgb-converter',
    name: 'HEX to RGB Converter',
    slug: 'hex-to-rgb-converter',
    category: 'developer-tools',
    description: 'Bidirectional color converter between HEX codes and RGB channels with live preview swatch.',
    keywords: ['hex to rgb', 'rgb to hex', 'color converter online', 'hex code converter', 'rgb color picker'],
    component: HexRgbConverter,
    instructions: [
      'Enter a 6-character HEX code (e.g. #2563EB) or adjust the R, G, B channel inputs (0-255).',
      'The values sync bidirectionally in real time.'
    ],
    limitations: ['Supports standard 24-bit sRGB gamut.'],
    faqs: [{ q: 'Can I copy the RGB format?', a: 'Yes, formatted as rgb(R, G, B).' }]
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    slug: 'xml-formatter',
    category: 'developer-tools',
    description: 'Beautify, indent, and format XML and SVG documents for readable structure and syntax inspection.',
    keywords: ['xml formatter', 'beautify xml', 'format xml online', 'indent xml', 'xml viewer'],
    component: XmlFormatter,
    instructions: [
      'Paste unformatted XML or SVG text.',
      'Copy the neatly indented XML output.'
    ],
    limitations: ['Validates opening and closing tag pairs.'],
    faqs: [{ q: 'Does it work with SVG files?', a: 'Yes, SVG is XML-based and formats cleanly.' }]
  },

  // --- PDF TOOLS ---
  {
    id: 'pdf-info-viewer',
    name: 'PDF Information Viewer & Page Counter',
    slug: 'pdf-info-viewer',
    category: 'pdf-tools',
    popular: true,
    description: 'Inspect PDF metadata including total page count, author, creation date, producer, and file size locally.',
    keywords: ['pdf info viewer', 'pdf page counter', 'inspect pdf metadata', 'check pdf page count', 'pdf properties viewer'],
    component: PdfInfoViewer,
    instructions: [
      'Select any PDF file from your device.',
      'The browser extracts total page count, author, title, and document metadata.'
    ],
    limitations: ['Reads metadata locally without uploading the PDF.'],
    faqs: [{ q: 'Can it read password-protected PDFs?', a: 'Encrypted PDFs require unlocking before metadata can be read.' }]
  },
  {
    id: 'pdf-page-extractor',
    name: 'Extract PDF Pages',
    slug: 'pdf-page-extractor',
    category: 'pdf-tools',
    description: 'Extract individual pages or custom page ranges from a PDF and download a new standalone document.',
    keywords: ['extract pdf pages', 'split pdf pages', 'extract pages from pdf', 'save pdf pages', 'pdf extractor online'],
    component: PdfPageExtractor,
    instructions: [
      'Upload a PDF document.',
      'Specify page numbers or ranges to extract (e.g. 1, 3-5).',
      'Click "Extract & Download PDF".'
    ],
    limitations: ['Generates a pristine new PDF containing only the specified pages.'],
    faqs: [{ q: 'Can I extract non-consecutive pages?', a: 'Yes, enter comma-separated numbers like 1, 4, 7.' }]
  },
  {
    id: 'pdf-page-deleter',
    name: 'Delete PDF Pages',
    slug: 'pdf-page-deleter',
    category: 'pdf-tools',
    description: 'Remove unwanted pages from a PDF document and download the trimmed result with zero quality loss.',
    keywords: ['delete pdf pages', 'remove pages from pdf', 'cut pdf pages', 'delete page pdf online', 'trim pdf'],
    component: PdfPageDeleter,
    instructions: [
      'Upload your PDF file.',
      'Enter the page numbers you wish to remove (e.g. 2, 5).',
      'Click "Delete Pages & Download".'
    ],
    limitations: ['Preserves remaining page orientation, text, and vector quality.'],
    faqs: [{ q: 'Will the remaining pages keep their quality?', a: 'Yes, pages are copied without re-compression.' }]
  }
];
