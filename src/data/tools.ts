import React from 'react';

// Image Tools
import { ImageResizer } from '../tools/image/ImageResizer';
import { ImageCompressor } from '../tools/image/ImageCompressor';
import { ImageFormatConverter } from '../tools/image/ImageFormatConverter';
import { ImageCropper } from '../tools/image/ImageCropper';
import { ImageFilters } from '../tools/image/ImageFilters';
import { ImageWatermark } from '../tools/image/ImageWatermark';
import { ImageColorPicker } from '../tools/image/ImageColorPicker';
import { Base64Image } from '../tools/image/Base64Image';

// PDF Tools
import { PdfMerger } from '../tools/pdf/PdfMerger';
import { ImagesToPdf } from '../tools/pdf/ImagesToPdf';
import { PdfSplitter } from '../tools/pdf/PdfSplitter';
import { PdfRotator } from '../tools/pdf/PdfRotator';
import { TextToPdf } from '../tools/pdf/TextToPdf';

// Text Tools
import { WordCounter } from '../tools/text/WordCounter';
import { TextDiff } from '../tools/text/TextDiff';
import { FindReplace } from '../tools/text/FindReplace';
import { TextBinaryHex } from '../tools/text/TextBinaryHex';
import { LoremIpsum } from '../tools/text/LoremIpsum';

// Calculator Tools
import { ScientificCalculator } from '../tools/calculators/ScientificCalculator';
import { PercentageCalculator } from '../tools/calculators/PercentageCalculator';
import { LoanEmiCalculator } from '../tools/calculators/LoanEmiCalculator';
import { BmiCalculator } from '../tools/calculators/BmiCalculator';
import { AgeCalculator } from '../tools/calculators/AgeCalculator';
import { TipCalculator } from '../tools/calculators/TipCalculator';

// Unit Converters
import { UniversalUnitConverter } from '../tools/converters/UniversalUnitConverter';

// Developer Tools
import { JsonFormatter } from '../tools/developer/JsonFormatter';
import { JwtDecoder } from '../tools/developer/JwtDecoder';
import { UuidGenerator } from '../tools/developer/UuidGenerator';
import { HashGenerator } from '../tools/developer/HashGenerator';
import { Base64Tool } from '../tools/developer/Base64Tool';
import { UrlEncoderDecoder } from '../tools/developer/UrlEncoderDecoder';
import { TimestampConverter } from '../tools/developer/TimestampConverter';
import { RegexTester } from '../tools/developer/RegexTester';
import { HtmlPreviewer } from '../tools/developer/HtmlPreviewer';
import { CssGenerators } from '../tools/developer/CssGenerators';

// SEO Tools
import { SerpPreview } from '../tools/seo/SerpPreview';
import { RobotsGenerator } from '../tools/seo/RobotsGenerator';
import { SitemapGenerator } from '../tools/seo/SitemapGenerator';

// Color & Design
import { ColorPicker } from '../tools/design/ColorPicker';
import { ContrastChecker } from '../tools/design/ContrastChecker';

// Social Media Tools
import { SocialImageResizer } from '../tools/social/SocialImageResizer';
import { SocialCaptionCounter } from '../tools/social/SocialCaptionCounter';

// Date & Time Tools
import { WorldClockStopwatch } from '../tools/datetime/WorldClockStopwatch';
import { PomodoroTimer } from '../tools/datetime/PomodoroTimer';

// Random Generators
import { PasswordGenerator } from '../tools/random/PasswordGenerator';
import { RandomPicker } from '../tools/random/RandomPicker';

// File Tools
import { ZipCreator } from '../tools/files/ZipCreator';
import { ZipExtractor } from '../tools/files/ZipExtractor';
import { FileChecksum } from '../tools/files/FileChecksum';
import { CsvViewer } from '../tools/files/CsvViewer';

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  keywords: string[];
  popular?: boolean;
  component: React.ComponentType<any>;
  instructions: string[];
  limitations: string[];
  faqs: { q: string; a: string }[];
  seoTitle?: string;
  metaDescription?: string;
}

const BASE_TOOLS: ToolItem[] = [
  // --- IMAGE TOOLS ---
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    category: 'image-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Image Resizer Not Sign In Only Free',
    metaDescription: '100% free online image resizer without sign in. Change dimensions in pixels or percentages while preserving aspect ratios with zero server uploads.',
    description: 'Resize image dimensions in pixels or percentages while preserving aspect ratios and format.',
    keywords: ['resize image', 'photo scale', 'reduce resolution', 'aspect ratio', 'dimension changer', 'free image resizer no sign in'],
    component: ImageResizer,
    instructions: [
      'Click or drag an image into the upload box.',
      'Enter new width and height or toggle aspect ratio locking.',
      'Select output format (PNG, JPG, WebP) and quality level.',
      'Click "Apply & Resize" and download your processed image.'
    ],
    limitations: [
      'Processed using client-side HTML5 Canvas.',
      'Very large images (>50MB) may depend on available device memory.'
    ],
    faqs: [
      { q: 'Is my picture uploaded to any server?', a: 'No, resizing executes completely inside your browser.' },
      { q: 'Can I keep transparent backgrounds?', a: 'Yes, select PNG or WebP as the output format.' }
    ]
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'image-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Image Compressor Not Sign In Only Free',
    metaDescription: '100% free online image compressor without sign in. Compress JPG, PNG, and WebP images by up to 85% with instant visual preview and zero quality loss.',
    description: 'Reduce image file size significantly with real-time quality slider and visual comparison.',
    keywords: ['compress image', 'shrink jpg', 'reduce mb', 'optimize photo', 'lossy compression', 'free image compressor no sign in'],
    component: ImageCompressor,
    instructions: [
      'Select an image from your computer or phone.',
      'Adjust the quality slider to balance clarity and file savings.',
      'Review original vs compressed size in the live preview.',
      'Click download to save the lightweight image.'
    ],
    limitations: [
      'WebP and JPEG offer the highest file reduction ratios.',
      'PNG files will be compressed losslessly or re-encoded.'
    ],
    faqs: [
      { q: 'How much space can I save?', a: 'Typical JPEG and WebP photos can be reduced by 50% to 85% with minimal visible loss.' }
    ]
  },
  {
    id: 'image-converter',
    name: 'Image Format Converter',
    slug: 'image-converter',
    category: 'image-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Image Converter Not Sign In Only Free',
    metaDescription: '100% free online image format converter without sign in. Convert images between JPG, PNG, and WebP instantly with zero data uploads to any server.',
    description: 'Convert images between JPG, PNG, and WebP with customizable background colors for transparency.',
    keywords: ['convert jpg to png', 'png to jpg', 'webp converter', 'photo format', 'transparent background', 'free image converter online'],
    component: ImageFormatConverter,
    instructions: [
      'Select an image to convert.',
      'Pick your target output format: PNG, JPG, or WebP.',
      'When converting transparent images to JPG, choose a replacement background color.',
      'Click "Convert Format" and download.'
    ],
    limitations: [
      'JPEG does not support transparency; a background color fills transparent areas.'
    ],
    faqs: [
      { q: 'Why is WebP recommended?', a: 'WebP provides 25-35% smaller file sizes than comparable JPEGs at similar quality.' }
    ]
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    slug: 'image-cropper',
    category: 'image-tools',
    description: 'Crop images with preset aspect ratios (1:1, 16:9, 4:3) and custom offsets.',
    keywords: ['crop photo', 'cut image', 'square crop', 'aspect ratio', 'trim picture'],
    component: ImageCropper,
    instructions: [
      'Upload the picture you want to crop.',
      'Select a preset ratio (1:1 Square, 16:9, 4:3) or adjust dimensions freely.',
      'Use sliders to position the crop frame over your target subject.',
      'Click "Apply Crop" and download.'
    ],
    limitations: [
      'Cropping is executed at native pixel resolution without downscaling.'
    ],
    faqs: [
      { q: 'Can I crop square photos for avatars?', a: 'Yes, click the 1:1 ratio button.' }
    ]
  },
  {
    id: 'image-filters',
    name: 'Image Filters & Rotator',
    slug: 'image-filters',
    category: 'image-tools',
    description: 'Rotate 90°, flip horizontally or vertically, adjust brightness, contrast, blur, grayscale, and borders.',
    keywords: ['rotate image', 'flip photo', 'mirror image', 'brightness adjuster', 'grayscale filter', 'blur image'],
    component: ImageFilters,
    instructions: [
      'Select an image to edit.',
      'Use the rotation and flip buttons to orient the image.',
      'Adjust brightness, contrast, blur, and grayscale sliders.',
      'Optionally add borders and download the result.'
    ],
    limitations: [
      'All pixel rendering runs through native Canvas 2D filters.'
    ],
    faqs: [
      { q: 'Can I reset adjustments?', a: 'Yes, click "Reset Adjustments" to return sliders to defaults.' }
    ]
  },
  {
    id: 'image-watermark',
    name: 'Image Watermark Adder',
    slug: 'image-watermark',
    category: 'image-tools',
    description: 'Add text watermarks, copyright stamps, or diagonal tiled labels to protect your images.',
    keywords: ['watermark photo', 'copyright stamp', 'text watermark', 'protect image', 'diagonal watermark'],
    component: ImageWatermark,
    instructions: [
      'Upload the image to watermark.',
      'Enter your copyright or brand text.',
      'Choose position (corners, center, or tiled repeating).',
      'Adjust font size, opacity, and color, then download.'
    ],
    limitations: [
      'Embeds text into the output image pixels.'
    ],
    faqs: [
      { q: 'Can the watermark be easily removed?', a: 'Because the pixels are flattened into the image, it is permanently merged.' }
    ]
  },
  {
    id: 'image-color-picker',
    name: 'Image Color Picker',
    slug: 'image-color-picker',
    category: 'image-tools',
    description: 'Inspect exact pixel colors by clicking anywhere on an uploaded image to get HEX, RGB, and HSL.',
    keywords: ['eyedropper', 'pick color from image', 'image hex code', 'pixel color', 'color sampler'],
    component: ImageColorPicker,
    instructions: [
      'Upload any graphic, screenshot, or photo.',
      'Hover over the image and click the exact pixel you want to sample.',
      'Copy the resulting HEX, RGB, or HSL color codes with 1 click.'
    ],
    limitations: [
      'Samples raw decoded pixel values without browser display profile color shifts.'
    ],
    faqs: [
      { q: 'Does it keep a history?', a: 'Yes, recent color samples are stored in the session history strip.' }
    ]
  },
  {
    id: 'base64-image',
    name: 'Image to Base64 Converter',
    slug: 'base64-image',
    category: 'image-tools',
    description: 'Convert image files to Base64 Data URI strings for HTML/CSS embedding, or decode Base64 back to image.',
    keywords: ['image to base64', 'base64 to image', 'data uri generator', 'inline image css'],
    component: Base64Image,
    instructions: [
      'Choose "Image to Base64" or "Base64 to Image" mode.',
      'Drop your file or paste your raw base64 string.',
      'Copy the data URI or download the decoded image file.'
    ],
    limitations: [
      'Base64 strings are ~33% larger in string byte length than raw binary files.'
    ],
    faqs: [
      { q: 'Where are Data URIs used?', a: 'They are commonly embedded in CSS, emails, and single-file web pages.' }
    ]
  },

  // --- PDF TOOLS ---
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    slug: 'pdf-merger',
    category: 'pdf-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online PDF Merger Not Sign In Only Free',
    metaDescription: '100% free online PDF merger without sign in or registration. Combine multiple PDF files into one clean document with 100% client-side privacy.',
    description: 'Combine multiple PDF documents into a single organized file in your chosen order.',
    keywords: ['merge pdf', 'combine pdfs', 'join pdf documents', 'pdf binder', 'concatenate pdf', 'free pdf merger not sign in', 'merge pdf free online'],
    component: PdfMerger,
    instructions: [
      'Select two or more PDF files from your device.',
      'Use the Up and Down arrows to arrange documents in desired order.',
      'Click "Merge PDF Files" to assemble them.',
      'Download your combined PDF document.'
    ],
    limitations: [
      'Files are merged locally using pdf-lib.',
      'Password-encrypted PDFs must be unlocked before merging.'
    ],
    faqs: [
      { q: 'Are my confidential PDFs safe?', a: 'Yes. Files never leave your browser or get sent to any server.' }
    ]
  },
  {
    id: 'images-to-pdf',
    name: 'Images to PDF Converter',
    slug: 'images-to-pdf',
    category: 'pdf-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Images to PDF Converter Not Sign In Only Free',
    metaDescription: '100% free online JPG & PNG to PDF converter without sign in. Convert images into a single multi-page PDF document locally without uploading files.',
    description: 'Convert JPG, PNG, and WebP images into a single multi-page PDF with custom page size and orientation.',
    keywords: ['jpg to pdf', 'png to pdf', 'convert photo to pdf', 'multi page pdf', 'image document', 'free images to pdf no sign in'],
    component: ImagesToPdf,
    instructions: [
      'Upload one or more photos or scans.',
      'Select page format (A4, US Letter, or Fit to Image).',
      'Set portrait or landscape orientation and page margin.',
      'Click "Generate PDF" and download.'
    ],
    limitations: [
      'Supports standard web image formats (PNG, JPEG, WebP).'
    ],
    faqs: [
      { q: 'Can I reorder pages?', a: 'Yes, use the arrow buttons to move pages up or down before generating.' }
    ]
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter & Page Extractor',
    slug: 'pdf-splitter',
    category: 'pdf-tools',
    seoTitle: 'Zynovexa - Free Online PDF Splitter Not Sign In Only Free',
    metaDescription: '100% free online PDF splitter and page extractor without sign in. Extract custom page ranges or remove unwanted pages directly in your browser.',
    description: 'Extract specific pages or delete unwanted pages from a PDF document into a new PDF.',
    keywords: ['split pdf', 'extract pdf pages', 'remove pages from pdf', 'cut pdf document', 'free pdf splitter online'],
    component: PdfSplitter,
    instructions: [
      'Upload your PDF file.',
      'Choose "Extract Selected Pages" or "Delete Pages".',
      'Enter page numbers or ranges (e.g. "1, 3-5").',
      'Click process and download your updated PDF.'
    ],
    limitations: [
      'Cannot alter password-locked PDFs.'
    ],
    faqs: [
      { q: 'Can I extract non-consecutive pages?', a: 'Yes, separate single pages and ranges with commas (e.g. 1, 4, 7-10).' }
    ]
  },
  {
    id: 'pdf-rotator',
    name: 'PDF Page Rotator',
    slug: 'pdf-rotator',
    category: 'pdf-tools',
    seoTitle: 'Zynovexa - Free Online PDF Page Rotator Not Sign In Only Free',
    metaDescription: '100% free online PDF page rotator without sign in. Permanently rotate PDF pages by 90, 180, or 270 degrees locally without account registration.',
    description: 'Permanently rotate PDF pages by 90°, 180°, or 270° across all pages or custom ranges.',
    keywords: ['rotate pdf', 'turn pdf pages', 'fix upside down pdf', 'pdf orientation', 'free pdf rotator no sign in'],
    component: PdfRotator,
    instructions: [
      'Select your PDF document.',
      'Pick the rotation angle (+90°, +180°, +270°).',
      'Choose to apply to all pages or enter a specific page range.',
      'Click "Apply Rotation" and download.'
    ],
    limitations: [
      'Rotates the underlying PDF viewport coordinate space.'
    ],
    faqs: [
      { q: 'Does this permanently save the rotation?', a: 'Yes, the downloaded PDF will open in the correct orientation in any viewer.' }
    ]
  },
  {
    id: 'text-to-pdf',
    name: 'Text to PDF Converter',
    slug: 'text-to-pdf',
    category: 'pdf-tools',
    seoTitle: 'Zynovexa - Free Online Text to PDF Converter Not Sign In Only Free',
    metaDescription: '100% free online text to PDF converter without sign in. Turn plain text notes and documents into formatted PDF files instantly with zero data collection.',
    description: 'Convert plain text, notes, or articles into a clean, formatted multi-page PDF document.',
    keywords: ['text to pdf', 'convert txt to pdf', 'generate pdf from text', 'notes to pdf', 'free text to pdf online'],
    component: TextToPdf,
    instructions: [
      'Enter document title and paste your text.',
      'Choose font size.',
      'Click "Generate PDF" to compile formatted pages.',
      'Download your PDF document.'
    ],
    limitations: [
      'Generates clean standard Helvetica font typography.'
    ],
    faqs: [
      { q: 'Does it wrap text across multiple pages automatically?', a: 'Yes, text lines wrap and page breaks are calculated cleanly.' }
    ]
  },

  // --- TEXT TOOLS ---
  {
    id: 'word-counter',
    name: 'Word Counter & Text Analyzer',
    slug: 'word-counter',
    category: 'text-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Word Counter Not Sign In Only Free',
    metaDescription: '100% free online word counter and text analyzer without sign in. Calculate word count, characters, sentences, paragraphs, and reading time instantly in your browser.',
    description: 'Count words, characters, sentences, paragraphs, reading time, speaking time, and keyword density.',
    keywords: ['word counter', 'character counter', 'reading time', 'keyword frequency', 'text analysis', 'free word counter no sign in'],
    component: WordCounter,
    instructions: [
      'Type or paste your text into the box.',
      'Review live statistics across word count, reading time, and character limits.',
      'Use quick buttons to transform case or clean extra spaces.',
      'Copy or download the text.'
    ],
    limitations: [
      'Accurately parses Unicode characters, spaces, and punctuations.'
    ],
    faqs: [
      { q: 'How is reading time calculated?', a: 'Based on an average adult silent reading speed of 200 words per minute.' }
    ]
  },
  {
    id: 'text-diff',
    name: 'Text Difference Checker',
    slug: 'text-diff',
    category: 'text-tools',
    description: 'Compare two text snippets side-by-side to highlight added, deleted, and changed lines.',
    keywords: ['text diff', 'compare text', 'difference checker', 'line diff', 'diff viewer'],
    component: TextDiff,
    instructions: [
      'Paste original text in the left box.',
      'Paste revised or modified text in the right box.',
      'Inspect the colored comparison below showing additions, deletions, and line changes.'
    ],
    limitations: [
      'Performs line-by-line alignment comparison.'
    ],
    faqs: [
      { q: 'Can I compare code snippets?', a: 'Yes, it works effectively with plain text, code, or data lists.' }
    ]
  },
  {
    id: 'find-and-replace',
    name: 'Find and Replace',
    slug: 'find-and-replace',
    category: 'text-tools',
    description: 'Quickly search and replace words, phrases, or regular expressions with occurrence counting.',
    keywords: ['find and replace', 'search replace text', 'regex replace', 'batch replace words'],
    component: FindReplace,
    instructions: [
      'Enter the search string and replacement string.',
      'Toggle case sensitivity or regex if needed.',
      'Click "Replace All Occurrences".'
    ],
    limitations: [
      'Executes entirely within client memory.'
    ],
    faqs: [
      { q: 'Can I use regex patterns?', a: 'Yes, check "Use Regular Expressions" to match advanced patterns.' }
    ]
  },
  {
    id: 'text-binary-hex',
    name: 'Text to Binary & Hex Converter',
    slug: 'text-binary-hex',
    category: 'text-tools',
    description: 'Convert between plain text, binary code (0s and 1s), and hexadecimal byte strings.',
    keywords: ['text to binary', 'binary to text', 'text to hex', 'hex to text', 'ascii converter'],
    component: TextBinaryHex,
    instructions: [
      'Select conversion mode (e.g. Text → Binary).',
      'Input your source data.',
      'View and copy the formatted encoded output.'
    ],
    limitations: [
      'Standard UTF-8 character encoding.'
    ],
    faqs: [
      { q: 'Can I convert binary back to plain English?', a: 'Yes, select "Binary → Text" mode.' }
    ]
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum',
    category: 'text-tools',
    description: 'Generate customizable dummy placeholder text by paragraphs, sentences, or word counts.',
    keywords: ['lorem ipsum', 'dummy text', 'placeholder text', 'lipsum generator'],
    component: LoremIpsum,
    instructions: [
      'Choose count and unit (paragraphs, sentences, or words).',
      'Toggle "Start with Lorem ipsum" or HTML <p> tags.',
      'Copy the generated placeholder text.'
    ],
    limitations: [
      'Uses local classical Latin vocabulary.'
    ],
    faqs: [
      { q: 'Is it completely free for commercial design work?', a: 'Yes, Lorem Ipsum is public domain placeholder copy.' }
    ]
  },

  // --- CALCULATOR TOOLS ---
  {
    id: 'scientific-calculator',
    name: 'Scientific & Basic Calculator',
    slug: 'scientific-calculator',
    category: 'calculator-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Scientific Calculator Not Sign In Only Free',
    metaDescription: '100% free online scientific calculator without sign in or registration. Calculate trigonometry, logarithms, square roots, and math equations with complete privacy.',
    description: 'Full scientific calculator supporting trigonometry, logarithms, powers, factorials, and standard math.',
    keywords: ['scientific calculator', 'math calculator', 'sin cos tan', 'log calculator', 'online calculator', 'free scientific calculator no sign in'],
    component: ScientificCalculator,
    instructions: [
      'Click keypad buttons or type equations.',
      'Use scientific functions (sin, cos, log, ln, sqrt, powers).',
      'Press "=" to compute results.'
    ],
    limitations: [
      'Calculations use standard 64-bit IEEE double precision.'
    ],
    faqs: [
      { q: 'Can I clear my entry?', a: 'Press "C" to clear or backspace to delete the last digit.' }
    ]
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'calculator-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Percentage Calculator Not Sign In Only Free',
    metaDescription: '100% free online percentage calculator without sign in. Calculate percentage increase, decrease, discounts, and differences instantly in your browser.',
    description: 'Calculate percentage values, proportions, and percentage increase or decrease instantly.',
    keywords: ['percentage calculator', 'percent increase', 'percent decrease', 'discount math', 'percent of', 'free percentage calculator no sign in'],
    component: PercentageCalculator,
    instructions: [
      'Select one of three calculation formulas.',
      'Enter your numeric values.',
      'The exact percentage and change are computed instantly.'
    ],
    limitations: [
      'Division by zero is handled safely with informative empty states.'
    ],
    faqs: [
      { q: 'How do I calculate percent change?', a: 'Use Section 3: Percentage Increase or Decrease from X to Y.' }
    ]
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan & EMI Calculator',
    slug: 'loan-emi-calculator',
    category: 'calculator-tools',
    seoTitle: 'Zynovexa - Free Online Loan EMI Calculator Not Sign In Only Free',
    metaDescription: '100% free online loan EMI calculator without sign in. Compute monthly EMI payments, total interest payable, and amortization schedule with zero sign up.',
    description: 'Calculate monthly loan EMI payments, total interest payable, and principal-to-interest ratios.',
    keywords: ['emi calculator', 'loan calculator', 'mortgage payment', 'interest calculator', 'car loan emi', 'free emi calculator no sign in'],
    component: LoanEmiCalculator,
    instructions: [
      'Enter loan principal amount.',
      'Set annual interest rate percentage.',
      'Adjust loan duration in years.',
      'Inspect monthly payment and visual amortization ratio.'
    ],
    limitations: [
      'Calculations assume a standard fixed monthly reducing balance amortization schedule.'
    ],
    faqs: [
      { q: 'Does this include taxes or insurance fees?', a: 'This computes pure loan principal and interest.' }
    ]
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Health Calculator',
    slug: 'bmi-calculator',
    category: 'calculator-tools',
    description: 'Calculate Body Mass Index (BMI) using metric or imperial units with standard health classifications.',
    keywords: ['bmi calculator', 'body mass index', 'ideal weight', 'healthy weight range'],
    component: BmiCalculator,
    instructions: [
      'Switch between Metric (cm/kg) or Imperial (ft/in/lbs).',
      'Enter your height and weight.',
      'Review your BMI score, category, and health guidelines.'
    ],
    limitations: [
      'Results are estimates and do not constitute clinical medical diagnoses.'
    ],
    faqs: [
      { q: 'What is a normal BMI range?', a: 'Standard guidelines define 18.5 to 24.9 as a normal weight range.' }
    ]
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator & Birthday Countdown',
    slug: 'age-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate exact chronological age in years, months, days, hours, and days until next birthday.',
    keywords: ['age calculator', 'how old am i', 'birthday countdown', 'days lived', 'date of birth'],
    component: AgeCalculator,
    instructions: [
      'Select your birth date.',
      'Optionally change the target date to calculate age at a specific milestone.',
      'View your exact age and birthday countdown.'
    ],
    limitations: [
      'Accounts accurately for leap years and varying month lengths.'
    ],
    faqs: [
      { q: 'Can I check age on a future date?', a: 'Yes, modify "Age as of Date".' }
    ]
  },
  {
    id: 'tip-calculator',
    name: 'Tip & Split Bill Calculator',
    slug: 'tip-calculator',
    category: 'calculator-tools',
    description: 'Calculate restaurant tips and split totals equally among friends or dining party members.',
    keywords: ['tip calculator', 'split bill', 'restaurant tip', 'bill splitter', 'gratuity calculator'],
    component: TipCalculator,
    instructions: [
      'Enter total bill amount.',
      'Select a tip percentage (10%, 15%, 18%, 20%, 25%) or adjust slider.',
      'Set number of people splitting the bill.',
      'View tip total and amount per person.'
    ],
    limitations: [
      'Splits total bill and gratuity equally.'
    ],
    faqs: [
      { q: 'Can I split between 1 person?', a: 'Yes, it displays total bill and individual tip.' }
    ]
  },

  // --- UNIT CONVERTERS ---
  {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    slug: 'unit-converter',
    category: 'unit-converters',
    popular: true,
    seoTitle: 'Zynovexa - Free Online Unit Converter Not Sign In Only Free',
    metaDescription: '100% free online unit converter without sign in. Convert length, weight, temperature, data storage, and volume instantly with complete accuracy.',
    description: 'Convert between units of length, weight, temperature, data storage, volume, speed, and time.',
    keywords: ['unit converter', 'metric to imperial', 'length converter', 'kg to lbs', 'celsius to fahrenheit', 'free unit converter no sign in'],
    component: UniversalUnitConverter,
    instructions: [
      'Select unit category (Length, Weight, Temp, Data, Volume, etc.).',
      'Choose source and target units.',
      'Enter value for immediate bidirectional calculation.'
    ],
    limitations: [
      'Uses international standard conversion constants.'
    ],
    faqs: [
      { q: 'How does temperature conversion work?', a: 'It calculates exact formulas: (°C × 9/5) + 32 = °F.' }
    ]
  },

  // --- DEVELOPER TOOLS ---
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    category: 'developer-tools',
    popular: true,
    seoTitle: 'Zynovexa - Free Online JSON Formatter Not Sign In Only Free',
    metaDescription: '100% free online JSON formatter and validator without sign in. Format, beautify, minify, and inspect JSON with syntax error detection.',
    description: 'Format, beautify, minify, and validate JSON data with syntax error detection and download.',
    keywords: ['json formatter', 'beautify json', 'json validator', 'minify json', 'json prettifier', 'free json formatter no sign in'],
    component: JsonFormatter,
    instructions: [
      'Paste your raw JSON into the editor.',
      'Click "Format (2 Spaces)" or "Format (4 Spaces)" to beautify.',
      'Use "Minify" to strip whitespaces.',
      'Copy formatted output or download as .json file.'
    ],
    limitations: [
      'Syntax errors provide descriptive location hints.'
    ],
    faqs: [
      { q: 'Is my JSON uploaded to external APIs?', a: 'No, all JSON parsing occurs in browser memory.' }
    ]
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Token Decoder',
    slug: 'jwt-decoder',
    category: 'developer-tools',
    description: 'Decode JSON Web Tokens (JWT) into readable Header and Payload claims with expiration check.',
    keywords: ['jwt decoder', 'decode jwt', 'json web token', 'jwt claims', 'jwt inspect'],
    component: JwtDecoder,
    instructions: [
      'Paste an encoded JWT string.',
      'Review decoded algorithm header, claims payload, and expiration timestamp.',
      'Copy individual segments.'
    ],
    limitations: [
      'Notice: Client-side decoding does not verify cryptographic signatures.'
    ],
    faqs: [
      { q: 'Does this verify the JWT signature?', a: 'No, verifying signatures requires your server secret key.' }
    ]
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    slug: 'uuid-generator',
    category: 'developer-tools',
    description: 'Generate cryptographically random RFC 4122 version 4 UUIDs (single or bulk batch).',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'v4 uuid', 'unique identifier'],
    component: UuidGenerator,
    instructions: [
      'Choose quantity of UUIDs to generate (up to 100).',
      'Toggle hyphens or uppercase letters.',
      'Copy single IDs or click "Copy All".'
    ],
    limitations: [
      'Compliant with RFC 4122 Version 4 standards.'
    ],
    faqs: [
      { q: 'Are these UUIDs unique?', a: 'Yes, collision probability in UUID v4 is negligible (1 in 2^122).' }
    ]
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator (SHA-256 / SHA-512)',
    slug: 'hash-generator',
    category: 'developer-tools',
    description: 'Generate cryptographic SHA-1, SHA-256, SHA-384, and SHA-512 hashes using browser Web Crypto.',
    keywords: ['sha256 generator', 'sha512', 'hash text', 'crypto hash', 'checksum generator'],
    component: HashGenerator,
    instructions: [
      'Type or paste text into the input field.',
      'Hashes are calculated instantaneously across 4 algorithms.',
      'Click copy next to any hash value.'
    ],
    limitations: [
      'Powered by native window.crypto.subtle.'
    ],
    faqs: [
      { q: 'Can hashes be decrypted?', a: 'No, cryptographic hashes are one-way mathematical functions.' }
    ]
  },
  {
    id: 'base64-tool',
    name: 'Base64 Text Encoder & Decoder',
    slug: 'base64-tool',
    category: 'developer-tools',
    description: 'Encode and decode plain text or Unicode strings to/from standard and URL-safe Base64.',
    keywords: ['base64 encoder', 'base64 decoder', 'url safe base64', 'utf8 base64'],
    component: Base64Tool,
    instructions: [
      'Choose "Encode to Base64" or "Decode from Base64".',
      'Optionally toggle URL-Safe mode.',
      'Enter input and copy the result.'
    ],
    limitations: [
      'Full UTF-8 character encoding support.'
    ],
    faqs: [
      { q: 'Is Base64 considered encryption?', a: 'No, Base64 is an encoding method for data transmission, not encryption.' }
    ]
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder',
    slug: 'url-encoder-decoder',
    category: 'developer-tools',
    description: 'Encode or decode special characters in URLs and query strings with percent-encoding.',
    keywords: ['url encode', 'url decode', 'uricomponent', 'percent encoding'],
    component: UrlEncoderDecoder,
    instructions: [
      'Select Encode or Decode mode.',
      'Paste your URL or parameter string.',
      'Copy the converted output.'
    ],
    limitations: [
      'Supports encodeURIComponent and standard encodeURI.'
    ],
    faqs: [
      { q: 'Why is URL encoding necessary?', a: 'To transmit spaces, ampersands, and unicode safely in web addresses.' }
    ]
  },
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    slug: 'timestamp-converter',
    category: 'developer-tools',
    description: 'Convert Unix epoch timestamps to human readable dates (UTC and Local) and dates to timestamp.',
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'epoch time', 'seconds to date'],
    component: TimestampConverter,
    instructions: [
      'Paste a timestamp to convert to date, or pick a date to get the Unix epoch.',
      'Inspect UTC, local time, and relative duration.'
    ],
    limitations: [
      'Auto-detects 10-digit (seconds) and 13-digit (milliseconds) timestamps.'
    ],
    faqs: [
      { q: 'What is Unix Epoch?', a: 'The number of seconds that have elapsed since January 1, 1970 00:00:00 UTC.' }
    ]
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Matcher',
    slug: 'regex-tester',
    category: 'developer-tools',
    description: 'Test JavaScript regular expressions with flags, live match counting, and group extraction.',
    keywords: ['regex tester', 'regular expression', 'test regex', 'regex matcher'],
    component: RegexTester,
    instructions: [
      'Enter regex pattern without slashes.',
      'Toggle flags (g, i, m, s).',
      'Type or paste your test text to see instant matches.'
    ],
    limitations: [
      'Executes standard ECMAScript JavaScript RegExp engine.'
    ],
    faqs: [
      { q: 'What does the "g" flag mean?', a: 'Global search: finds all matches rather than stopping at the first.' }
    ]
  },
  {
    id: 'html-previewer',
    name: 'Sandboxed HTML Previewer',
    slug: 'html-previewer',
    category: 'developer-tools',
    description: 'Live code previewer for HTML, CSS, and JavaScript inside a secure sandboxed iframe.',
    keywords: ['html preview', 'live html editor', 'test html', 'sandboxed iframe'],
    component: HtmlPreviewer,
    instructions: [
      'Edit HTML, CSS, and inline scripts in the left editor.',
      'Watch changes render in real time in the sandboxed preview window.'
    ],
    limitations: [
      'Rendered in a restricted iframe preventing parent page access.'
    ],
    faqs: [
      { q: 'Is it safe to test untrusted HTML?', a: 'The iframe sandbox prevents script access to parent cookies or origin.' }
    ]
  },
  {
    id: 'css-generators',
    name: 'CSS Box Shadow & Gradient Generator',
    slug: 'css-generators',
    category: 'developer-tools',
    description: 'Visual CSS generators for Box Shadows, Gradients, and Border Radius with copyable code.',
    keywords: ['css box shadow', 'css gradient', 'css border radius', 'css code generator'],
    component: CssGenerators,
    instructions: [
      'Select Shadow, Gradient, or Radius tab.',
      'Adjust sliders and color pickers.',
      'Click "Copy CSS" to paste into your stylesheet.'
    ],
    limitations: [
      'Outputs clean, modern CSS3 property declarations.'
    ],
    faqs: [
      { q: 'Are these styles cross-browser compatible?', a: 'Yes, standard modern CSS properties are supported across all modern browsers.' }
    ]
  },

  // --- SEO TOOLS ---
  {
    id: 'serp-preview',
    name: 'Google SERP Snippet Preview',
    slug: 'serp-preview',
    category: 'seo-tools',
    description: 'Preview how your web page title, URL, and meta description will appear in Google desktop and mobile search.',
    keywords: ['serp preview', 'google search preview', 'meta title length', 'meta description checker', 'seo snippet'],
    component: SerpPreview,
    instructions: [
      'Enter your page title and target URL.',
      'Type your meta description.',
      'Monitor length meters to avoid Google truncation.',
      'Switch between desktop and mobile previews.'
    ],
    limitations: [
      'Character length recommendations are guidelines; Google displays based on pixel width.'
    ],
    faqs: [
      { q: 'What is the ideal meta description length?', a: 'Between 120 and 160 characters for optimal visibility without truncation.' }
    ]
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    category: 'seo-tools',
    description: 'Generate valid robots.txt files for search engine crawlers with custom allow/disallow paths and sitemap.',
    keywords: ['robots.txt generator', 'crawler directives', 'disallow path', 'googlebot rules'],
    component: RobotsGenerator,
    instructions: [
      'Specify sitemap URL and any private paths to disallow.',
      'Configure crawl delay if necessary.',
      'Copy the output or download robots.txt.'
    ],
    limitations: [
      'Generates standard robots exclusion protocol directives.'
    ],
    faqs: [
      { q: 'Where do I place robots.txt?', a: 'In the root directory of your website (e.g. yourdomain.com/robots.txt).' }
    ]
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    slug: 'sitemap-generator',
    category: 'seo-tools',
    description: 'Convert a list of website URLs into a valid sitemaps.org XML file for Google and Bing search consoles.',
    keywords: ['xml sitemap generator', 'sitemap creator', 'search console sitemap', 'urlset xml'],
    component: SitemapGenerator,
    instructions: [
      'Paste your website URLs (one per line).',
      'Select change frequency and priority.',
      'Download your generated sitemap.xml file.'
    ],
    limitations: [
      'Generates sitemaps strictly from the URLs you provide.'
    ],
    faqs: [
      { q: 'How do I submit this to Google?', a: 'Upload to your website root and submit the URL in Google Search Console.' }
    ]
  },

  // --- COLOR & DESIGN TOOLS ---
  {
    id: 'color-picker',
    name: 'Color Picker & Palette Generator',
    slug: 'color-picker',
    category: 'color-design-tools',
    popular: true,
    description: 'Pick colors, view HEX, RGB, and HSL formats, and generate complementary, analogous, and triadic palettes.',
    keywords: ['color picker', 'hex color', 'color palette generator', 'triadic colors', 'analogous colors'],
    component: ColorPicker,
    instructions: [
      'Use the color picker or enter a HEX code.',
      'Copy formatted codes for CSS.',
      'Explore harmonic palettes below.'
    ],
    limitations: [
      'Supports all standard CSS color spaces.'
    ],
    faqs: [
      { q: 'Can I randomize colors?', a: 'Click the refresh button to generate inspiring random color ideas.' }
    ]
  },
  {
    id: 'contrast-checker',
    name: 'WCAG Color Contrast Checker',
    slug: 'contrast-checker',
    category: 'color-design-tools',
    description: 'Calculate contrast ratios between text and background colors according to WCAG 2.1 AA/AAA accessibility standards.',
    keywords: ['contrast checker', 'wcag contrast', 'color accessibility', 'a11y contrast ratio'],
    component: ContrastChecker,
    instructions: [
      'Pick text color and background color.',
      'Inspect the computed contrast ratio.',
      'Verify AA and AAA compliance for normal and large text.'
    ],
    limitations: [
      'Computes relative luminance in accordance with WCAG 2.1 formulas.'
    ],
    faqs: [
      { q: 'What is the minimum WCAG AA ratio?', a: '4.5:1 for normal text and 3:1 for large text (18pt or bold 14pt).' }
    ]
  },

  // --- SOCIAL MEDIA TOOLS ---
  {
    id: 'social-image-resizer',
    name: 'Social Media Image Resizer',
    slug: 'social-image-resizer',
    category: 'social-media-tools',
    description: 'Resize graphics to exact dimensions for YouTube Thumbnails, Instagram Posts, Stories, X, Facebook, and LinkedIn.',
    keywords: ['youtube thumbnail resizer', 'instagram post size', 'facebook cover resizer', 'social media image size'],
    component: SocialImageResizer,
    instructions: [
      'Upload an image.',
      'Select a preset (e.g. YouTube Thumbnail 1280x720, Instagram Post 1080x1080).',
      'Choose Cover or Contain fit mode.',
      'Download your formatted image.'
    ],
    limitations: [
      'High-resolution output matches platform specifications.'
    ],
    faqs: [
      { q: 'Does it crop my picture?', a: 'Select "Contain" if you want to keep the full image with clean letterbox borders.' }
    ]
  },
  {
    id: 'social-caption-counter',
    name: 'Social Media Caption Counter',
    slug: 'social-caption-counter',
    category: 'social-media-tools',
    description: 'Track character counts against real limits for X/Twitter, Instagram, TikTok, LinkedIn, and YouTube descriptions.',
    keywords: ['caption character counter', 'twitter character count', 'instagram caption limit', 'hashtag counter'],
    component: SocialCaptionCounter,
    instructions: [
      'Write or paste your caption.',
      'Watch platform limit progress bars update in real time.',
      'Inspect hashtag and word counts, then copy.'
    ],
    limitations: [
      'Tracks official character limits across 8 social platforms.'
    ],
    faqs: [
      { q: 'What is the limit for an X post?', a: '280 characters for standard non-premium accounts.' }
    ]
  },

  // --- DATE & TIME TOOLS ---
  {
    id: 'world-clock-stopwatch',
    name: 'World Clock & Stopwatch',
    slug: 'world-clock-stopwatch',
    category: 'date-time-tools',
    description: 'Live global digital clock across major world time zones plus a precision stopwatch with lap tracking.',
    keywords: ['world clock', 'stopwatch', 'lap timer', 'time zone clock', 'digital clock'],
    component: WorldClockStopwatch,
    instructions: [
      'Switch between World Clock and Stopwatch tabs.',
      'Inspect live time in UTC, New York, London, Tokyo, and Sydney.',
      'Use the stopwatch to track splits and laps.'
    ],
    limitations: [
      'Synchronized with device clock and Intl time zone databases.'
    ],
    faqs: [
      { q: 'Does the stopwatch record laps?', a: 'Yes, click "Lap" while running to record split times.' }
    ]
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Focus Timer',
    slug: 'pomodoro-timer',
    category: 'date-time-tools',
    description: 'Stay productive with the Pomodoro technique: 25-minute focus intervals and 5-minute restorative breaks.',
    keywords: ['pomodoro timer', 'focus timer', 'productivity timer', 'study timer', 'work timer'],
    component: PomodoroTimer,
    instructions: [
      'Select Pomodoro (25m), Short Break (5m), or Long Break (15m).',
      'Click "Start Focus" to begin countdown.',
      'A sound chime plays upon cycle completion.'
    ],
    limitations: [
      'Uses Web Audio API for browser chimes.'
    ],
    faqs: [
      { q: 'Will the timer keep running if I switch tabs?', a: 'Yes, interval tracking runs in your browser tab.' }
    ]
  },

  // --- RANDOM GENERATORS ---
  {
    id: 'password-generator',
    name: 'Random Password Generator',
    slug: 'password-generator',
    category: 'random-generators',
    popular: true,
    description: 'Generate cryptographically secure random passwords with customizable length, symbols, and strength score.',
    keywords: ['password generator', 'secure password', 'strong password', 'crypto random', 'random pin'],
    component: PasswordGenerator,
    instructions: [
      'Adjust length slider (6 to 64 characters).',
      'Toggle uppercase, lowercase, numbers, or symbols.',
      'Check "Exclude similar characters" to prevent typos.',
      'Copy your new strong password.'
    ],
    limitations: [
      'Uses browser window.crypto.getRandomValues for cryptographic strength.'
    ],
    faqs: [
      { q: 'Are generated passwords saved anywhere?', a: 'Never. Passwords exist only in temporary component state until you copy them.' }
    ]
  },
  {
    id: 'random-picker',
    name: 'Random Number, Coin & Dice Picker',
    slug: 'random-picker',
    category: 'random-generators',
    description: 'Generate random numbers, flip simulated coins, roll polyhedral dice, or pick random choices from custom lists.',
    keywords: ['random number generator', 'coin flip', 'dice roll', 'random choice', 'picker wheel'],
    component: RandomPicker,
    instructions: [
      'Choose tool mode: Random Number, Coin, Dice, or List.',
      'Configure ranges or enter options.',
      'Click to generate unbiased random outcomes.'
    ],
    limitations: [
      'Fair, unbiased pseudorandom generation.'
    ],
    faqs: [
      { q: 'Can I pick multiple unique numbers?', a: 'Yes, specify your count and leave duplicates disallowed.' }
    ]
  },

  // --- FILE TOOLS ---
  {
    id: 'zip-creator',
    name: 'ZIP Archive Creator',
    slug: 'zip-creator',
    category: 'file-tools',
    description: 'Compress and package multiple documents, images, and files into a single downloadable .zip file.',
    keywords: ['zip creator', 'make zip file', 'compress files to zip', 'zip maker', 'archive creator'],
    component: ZipCreator,
    instructions: [
      'Select or drop files into the creator.',
      'Specify an archive name (e.g. "my-files.zip").',
      'Click "Create ZIP File" and download your archive.'
    ],
    limitations: [
      'Compressed locally using JSZip with standard Deflate algorithm.'
    ],
    faqs: [
      { q: 'Are files sent over the internet?', a: 'No, compression runs 100% inside your browser.' }
    ]
  },
  {
    id: 'zip-extractor',
    name: 'ZIP File Extractor',
    slug: 'zip-extractor',
    category: 'file-tools',
    description: 'Open, inspect, and extract individual files from a .zip archive directly in the browser.',
    keywords: ['unzip online', 'extract zip', 'open zip file', 'zip viewer', 'read zip archive'],
    component: ZipExtractor,
    instructions: [
      'Upload any standard .zip archive.',
      'Browse the directory contents and file sizes.',
      'Click "Extract" next to any file to download it individually.'
    ],
    limitations: [
      'Supports standard Deflate-compressed ZIP archives.'
    ],
    faqs: [
      { q: 'Can it open password-protected ZIPs?', a: 'Encrypted or password-locked archives are not supported for local safety.' }
    ]
  },
  {
    id: 'file-checksum',
    name: 'File Checksum Calculator',
    slug: 'file-checksum',
    category: 'file-tools',
    description: 'Calculate cryptographic SHA-256 and SHA-512 checksums for any local file to verify file integrity.',
    keywords: ['file checksum', 'sha256 file', 'verify file integrity', 'hash file', 'file hash checker'],
    component: FileChecksum,
    instructions: [
      'Select any file from your computer.',
      'The browser calculates SHA-256 and SHA-512 hashes using streaming cryptography.',
      'Copy the checksum to compare against software distribution hashes.'
    ],
    limitations: [
      'Computes hashes locally without uploading files.'
    ],
    faqs: [
      { q: 'Why do software downloads provide checksums?', a: 'To verify that a downloaded file was not corrupted or tampered with in transit.' }
    ]
  },
  {
    id: 'csv-viewer',
    name: 'CSV Viewer & JSON Exporter',
    slug: 'csv-viewer',
    category: 'file-tools',
    description: 'Upload and inspect CSV spreadsheets in an interactive sortable table, with keyword search and JSON export.',
    keywords: ['csv viewer', 'csv to json', 'read csv online', 'csv table view', 'parse csv'],
    component: CsvViewer,
    instructions: [
      'Upload a .csv file or review the sample table.',
      'Filter rows using the search box.',
      'Click "Export to JSON" to download the data as JSON.'
    ],
    limitations: [
      'Parses standard comma-separated tabular data.'
    ],
    faqs: [
      { q: 'Can I export to JSON?', a: 'Yes, click "Export to JSON" to get a clean structured JSON file.' }
    ]
  }
];

import { EXTRA_TOOLS } from './extraTools';

export const TOOLS: ToolItem[] = [...EXTRA_TOOLS, ...BASE_TOOLS];
