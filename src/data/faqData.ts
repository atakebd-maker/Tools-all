export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pdf' | 'image' | 'calculator' | 'developer' | 'privacy';
  keywords: string[];
}

export const FAQ_CATEGORIES = [
  { id: 'all', name: 'All Questions' },
  { id: 'general', name: 'General & Zynovexa' },
  { id: 'pdf', name: 'PDF Tools & Editor' },
  { id: 'image', name: 'Image Tools & Resizer' },
  { id: 'calculator', name: 'Calculators & Math' },
  { id: 'developer', name: 'Developer & Code Tools' },
  { id: 'privacy', name: 'Privacy & Security' }
];

export const FAQS: FaqItem[] = [
  // --- GENERAL & BRAND ZYNOVEXA ---
  {
    id: 'what-is-zynovexa',
    category: 'general',
    question: 'What is Zynovexa and why is it free?',
    answer: 'Zynovexa (https://zynovexa.vercel.app/) is an all-in-one platform of 200+ free online browser utilities, converters, calculators, PDF editors, image optimizers, and developer tools. All tools execute directly in your web browser using HTML5 Canvas, Web Cryptography, and Web APIs without sending files to remote servers. Zynovexa is 100% free with no subscription, no daily usage limits, and no credit card requirement.',
    keywords: ['Zynovexa', 'what is zynovexa', 'zynovexa online tools', 'free browser utilities', 'free tools platform']
  },
  {
    id: 'do-i-need-account-zynovexa',
    category: 'general',
    question: 'Do I need to sign up, log in, or install an app to use Zynovexa?',
    answer: 'No registration, login, or installation is needed. You can use every tool on Zynovexa immediately upon opening the page on desktop or mobile. We never ask for an email address, password, or account verification.',
    keywords: ['no sign in', 'free online tools without login', 'no account required', 'zynovexa free']
  },
  {
    id: 'is-zynovexa-mobile-friendly',
    category: 'general',
    question: 'Can I use Zynovexa tools on my smartphone or tablet?',
    answer: 'Yes! Zynovexa is fully responsive and mobile-optimized. You can edit PDFs, resize images, run cricket calculations, generate QR codes, and use scientific calculators smoothly on iOS Safari, Android Chrome, and any modern mobile browser.',
    keywords: ['mobile tools', 'smartphone pdf editor', 'mobile image resizer', 'responsive online tools']
  },
  {
    id: 'how-to-find-tools-on-zynovexa',
    category: 'general',
    question: 'How do I quickly find the tool I need on Zynovexa?',
    answer: 'You can use the instant global search bar on the Zynovexa homepage or the All Tools directory page. Additionally, all 200+ tools are neatly organized into 22 intuitive categories such as PDF Tools, Image Tools, Calculator Tools, Developer Utilities, and Sports & Cricket.',
    keywords: ['search tools', 'zynovexa directory', 'find online tool', 'tool categories']
  },

  // --- PDF TOOLS & EDITOR ---
  {
    id: 'pdf-tools-free-editor',
    category: 'pdf',
    question: 'How do I use Zynovexa as a free online PDF tool and PDF editor?',
    answer: 'Zynovexa provides a complete suite of online PDF tools including PDF Merger, PDF Splitter, PDF Rotator, Images to PDF Converter, and Text to PDF Generator. Simply upload your PDF or images into the tool, configure your settings (such as page order, rotation angle, or page ranges), and click process. Your new PDF is generated in milliseconds directly in your browser with zero watermarks.',
    keywords: ['online PDF tool', 'PDF editor', 'free pdf editor', 'merge pdf online', 'pdf splitter free', 'zynovexa pdf tools']
  },
  {
    id: 'are-pdf-files-uploaded-to-server',
    category: 'pdf',
    question: 'Are my confidential PDF documents uploaded to any remote server or stored anywhere?',
    answer: 'No! Unlike traditional PDF websites that upload your confidential contracts and bank statements to cloud servers, Zynovexa processes PDF files locally on your computer or mobile device using WebAssembly and client-side pdf-lib. Your documents never touch our servers and remain 100% private to you.',
    keywords: ['private pdf editor', 'safe online pdf tool', 'client-side pdf processing', 'secure pdf merger']
  },
  {
    id: 'convert-jpg-png-to-pdf-free',
    category: 'pdf',
    question: 'How can I convert multiple JPG or PNG images into a single PDF document?',
    answer: 'Use the Zynovexa Images to PDF tool. Click "Upload Images" to select your pictures (JPG, PNG, WebP), rearrange the order if needed, choose your desired page orientation (Portrait or Landscape) and margins, and click "Generate PDF". Your multi-page PDF document will be created and downloaded instantly without sign-in.',
    keywords: ['image to pdf converter', 'jpg to pdf online', 'png to pdf free', 'create pdf from photos']
  },
  {
    id: 'split-large-pdf-pages',
    category: 'pdf',
    question: 'How do I extract specific pages or split a large PDF file into separate documents?',
    answer: 'With the Zynovexa PDF Splitter, select your PDF file, enter the page ranges you want to extract (e.g., "1-3, 5, 8-10"), and click "Split PDF". The tool extracts the exact pages you requested and downloads them immediately as separate PDF files or a bundled package.',
    keywords: ['split pdf free', 'extract pdf pages', 'separate pdf pages online', 'free pdf editor tool']
  },

  // --- IMAGE TOOLS & RESIZER ---
  {
    id: 'how-to-resize-images-online-free',
    category: 'image',
    question: 'How do I resize an image in pixels or percentage without losing aspect ratio?',
    answer: 'Open the Zynovexa Image Resizer tool, drag and drop your image, select your desired unit (Pixels or Percent), and enter the new width or height. Keep the "Lock Aspect Ratio" toggle turned on to ensure the image does not stretch or distort. Finally, choose your target format (PNG, JPG, WebP) and click "Apply & Resize" to download.',
    keywords: ['free online image resizer', 'resize picture online', 'change image dimensions', 'photo scale free', 'zynovexa image tools']
  },
  {
    id: 'how-to-compress-images-without-quality-loss',
    category: 'image',
    question: 'How does the Zynovexa Image Compressor reduce file size up to 85%?',
    answer: 'The Zynovexa Image Compressor utilizes HTML5 Canvas compression algorithms to remove redundant image metadata and apply optimized lossy or lossless compression. You can drag the quality slider in real time to see the compressed file size and visual preview before downloading.',
    keywords: ['image compressor online', 'shrink image size', 'compress jpg png webp', 'reduce photo mb']
  },
  {
    id: 'convert-image-formats-free',
    category: 'image',
    question: 'Can I convert HEIC, WebP, or PNG images to JPG for free?',
    answer: 'Yes! The Zynovexa Image Format Converter lets you convert between PNG, JPG, WebP, GIF, and SVG with a single click. It also offers transparency handling when converting transparent PNGs into standard JPG backgrounds.',
    keywords: ['convert image format', 'webp to jpg', 'png to jpg free', 'image format converter online']
  },

  // --- CALCULATORS & MATH ---
  {
    id: 'types-of-free-calculators-available',
    category: 'calculator',
    question: 'What types of online calculators are available on Zynovexa?',
    answer: 'Zynovexa features over 60 dedicated calculators including Scientific Calculator, Loan EMI Calculator, Percentage Calculator, Compound Interest Calculator, GST & Sales Tax Calculator, Discount Calculator, Age Calculator, and specialized sports calculators like Cricket Strike Rate, Bowling Average, and Required Run Rate Calculator.',
    keywords: ['online calculator free', 'scientific calculator online', 'loan emi calculator', 'percentage calculator', 'cricket calculator']
  },
  {
    id: 'how-to-calculate-loan-emi',
    category: 'calculator',
    question: 'How do I calculate monthly EMI, total interest, and loan amortization?',
    answer: 'Navigate to the Zynovexa Loan EMI Calculator, enter your loan principal amount, annual interest rate (%), and loan tenure (in months or years). The tool instantly calculates your exact monthly payment, total interest payable, total payment amount, and provides a breakdown chart.',
    keywords: ['loan emi calculator free', 'home loan emi', 'car loan calculator', 'monthly interest calculator']
  },
  {
    id: 'cricket-strike-rate-run-rate-calculator',
    category: 'calculator',
    question: 'How do I calculate Cricket Batting Strike Rate and Required Run Rate?',
    answer: 'Zynovexa includes specialized Cricket Calculators. Enter runs scored and balls faced in the Strike Rate Calculator to get the exact strike rate. For run chase scenarios, enter target score, current runs, total overs, and overs bowled in the Required Run Rate Calculator to see the exact runs per over needed to win.',
    keywords: ['cricket strike rate calculator', 'required run rate calculator', 'cricket bowling average', 'cricket run chase']
  },

  // --- DEVELOPER & CODE TOOLS ---
  {
    id: 'developer-tools-on-zynovexa',
    category: 'developer',
    question: 'What developer and web utility tools does Zynovexa offer?',
    answer: 'Developers can use JSON Formatter & Validator, Base64 Encoder/Decoder, URL Encoder/Decoder, Hash Generator (MD5, SHA-256), HTML/CSS/JS Minifier & Beautifier, QR Code Generator with custom logos, Barcode Generator, and RegEx Tester—all running instantly in-browser.',
    keywords: ['developer tools online', 'json formatter validator', 'base64 encoder decoder', 'qr code generator free']
  },
  {
    id: 'generate-custom-qr-codes-free',
    category: 'developer',
    question: 'Can I generate customized QR codes for URLs, WiFi, and contact vCards?',
    answer: 'Yes! The Zynovexa QR Code Generator enables you to create high-resolution QR codes for websites, plain text, WiFi network logins, emails, and phone numbers. You can customize foreground and background colors, adjust error correction levels, and download vector SVG or PNG images for print.',
    keywords: ['qr code generator free', 'custom qr code online', 'wifi qr code', 'download qr code png']
  },

  // --- PRIVACY & SECURITY ---
  {
    id: 'is-zynovexa-safe-and-private',
    category: 'privacy',
    question: 'Is Zynovexa safe and private for sensitive personal and company data?',
    answer: 'Yes, Zynovexa is engineered with a strict 100% Client-Side Architecture. All file processing, cryptographic hashing, text manipulation, and calculations occur entirely within your browser memory (V8 engine). No text, file, or image is transmitted across the internet to our servers. Once you close the tab, all in-memory data is purged.',
    keywords: ['is zynovexa safe', 'private browser tools', 'zero data collection', 'gdpr compliant online tools']
  },
  {
    id: 'does-zynovexa-track-or-store-cookies',
    category: 'privacy',
    question: 'Does Zynovexa track my browsing activity or sell personal data?',
    answer: 'No. Zynovexa does not sell, trade, or monetize personal data. We do not require accounts, we do not store personal profiles, and we strictly enforce user privacy as our foundational guarantee.',
    keywords: ['no tracking', 'zynovexa privacy guarantee', 'safe online tools']
  }
];
