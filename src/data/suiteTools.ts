import React from 'react';
import { ToolItem } from './tools';

// QR Code Tools
import {
  UniversalQrGenerator,
  WifiQrGenerator,
  UrlQrGenerator,
  PlainTextQrGenerator,
  EmailQrGenerator,
  PhoneQrGenerator,
  SmsQrGenerator,
  ContactCardQrGenerator,
  WhatsAppQrGenerator,
  LocationQrGenerator,
  CalendarEventQrGenerator,
  PaymentQrGenerator,
  SocialProfileQrGenerator
} from '../tools/qr/QrCodeTools';

// Barcode & Product Code Tools
import {
  BarcodeGenerator,
  Code128BarcodeGenerator,
  Code39BarcodeGenerator,
  Ean13BarcodeGenerator,
  Ean8BarcodeGenerator,
  UpcABarcodeGenerator,
  ItfBarcodeGenerator,
  ProductSkuGenerator,
  RandomProductCodeGenerator,
  BatchProductCodeGenerator
} from '../tools/barcode/BarcodeTools';

// SEO & Keyword Tools
import {
  SeoKeywordSlugGenerator,
  UrlSlugGenerator,
  SeoMetaTagGenerator,
  MetaDescriptionGenerator,
  MetaKeywordsGenerator,
  RobotsTxtGenerator,
  XmlSitemapGenerator,
  UtmLinkGenerator,
  SeoTitleGenerator,
  KeywordListFormatter,
  KeywordDeduplicationTool,
  KeywordCaseConverter,
  KeywordSeparatorConverter,
  KeywordToCsvGenerator,
  KeywordToJsonGenerator
} from '../tools/seo/SeoKeywordTools';

// Text Encoders & Decoders
import {
  UrlEncoderDecoder as TextUrlEncoder,
  Base64EncoderDecoder,
  HtmlEntityEncoderDecoder,
  BinaryToTextConverter,
  TextToBinaryConverter,
  HexEncoderDecoder,
  AsciiConverter,
  UnicodeCodePointConverter,
  Utf8ByteConverter,
  JsonEscapeTool,
  TextToHtmlConverter,
  Rot13EncoderDecoder,
  MorseCodeEncoderDecoder,
  LineBreakConverter
} from '../tools/encoders/TextEncodersDecoders';

// Security & Cryptography Tools
import {
  SecurePasswordGenerator,
  RandomNumberGenerator,
  RandomStringGenerator,
  UuidV4Generator,
  Sha1HashGenerator,
  Sha256HashGenerator,
  Sha384HashGenerator,
  Sha512HashGenerator,
  DemoOtpGenerator,
  RandomUsernameGenerator,
  RandomHexColorGenerator
} from '../tools/security/SecurityRandomTools';

// Bank Card & Payment Utilities
import {
  CardFormatValidator,
  LuhnChecksumCalculator,
  PaymentInfoQrGenerator,
  DemoPaymentRefGenerator
} from '../tools/payment/PaymentUtilities';

// Developer & Code Generators
import {
  HtmlBoilerplateGenerator,
  HtmlTableGenerator,
  CssButtonGenerator,
  CssGradientGenerator,
  CssBoxShadowGenerator,
  CssBorderRadiusGenerator,
  CssFlexboxGenerator,
  JsonToCsvConverter,
  CsvToJsonConverter,
  RegexTester as SafeRegexTester,
  SqlTemplateGenerator
} from '../tools/developer/DevCodeGenerators';

// Business & Marketing Tools
import {
  CouponCodeGenerator,
  PromoCodeGenerator,
  InvoiceNumberGenerator,
  AffiliateLinkBuilder
} from '../tools/marketing/BusinessMarketingTools';

export const SUITE_TOOLS: ToolItem[] = [
  // ==========================================
  // 1. QR CODE GENERATORS
  // ==========================================
  {
    id: 'universal-qr-code-generator',
    name: 'Universal QR Code Generator',
    slug: 'universal-qr-code-generator',
    category: 'qr-code-generators',
    popular: true,
    description: 'Generate customizable scannable QR codes for any text, URL, or data with live preview, PNG/SVG download, and color controls.',
    keywords: ['qr code generator', 'make qr code', 'custom qr code', 'free qr maker', 'download qr png svg'],
    component: UniversalQrGenerator,
    instructions: [
      'Enter any URL, text, or data string in the input box.',
      'Customize foreground and background colors to match your branding.',
      'Select resolution and error correction level.',
      'Download as PNG or SVG, or copy the image directly.'
    ],
    limitations: ['Processed 100% locally in your browser. No server storage.'],
    faqs: [
      { q: 'Is there any scan limit?', a: 'No, static QR codes never expire and have unlimited scans.' },
      { q: 'Can I download SVG vector format?', a: 'Yes, click "Download SVG" for infinite resolution print quality.' }
    ]
  },
  {
    id: 'wifi-qr-code-generator',
    name: 'Wi-Fi QR Code Generator',
    slug: 'wifi-qr-code-generator',
    category: 'qr-code-generators',
    popular: true,
    description: 'Create scannable QR codes for guests and customers to join your Wi-Fi network instantly without typing passwords.',
    keywords: ['wifi qr code', 'wifi qr code generator', 'connect to wifi qr', 'guest wifi qr', 'wpa wpa2 qr'],
    component: WifiQrGenerator,
    instructions: [
      'Enter your Wi-Fi Network Name (SSID).',
      'Select security type (WPA/WPA2/WPA3, WEP, or None).',
      'Enter the password and toggle Hidden Network if applicable.',
      'Scan with any smartphone camera to connect immediately.'
    ],
    limitations: ['Wi-Fi credentials are encrypted into the QR pattern locally and never leave your device.'],
    faqs: [
      { q: 'Does this work on both iPhone and Android?', a: 'Yes, both iOS and Android natively connect to Wi-Fi when scanning.' }
    ]
  },
  {
    id: 'url-qr-code-generator',
    name: 'Website URL QR Code Generator',
    slug: 'url-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Convert any website link, landing page, or online store into a high-contrast scannable QR code.',
    keywords: ['url qr code', 'website qr code', 'link qr code generator', 'open link qr code'],
    component: UrlQrGenerator,
    instructions: [
      'Type or paste your complete website URL (e.g., https://zynovexa.com).',
      'Customize colors and resolution.',
      'Download the QR code image for print or digital marketing.'
    ],
    limitations: ['Encodes direct static URLs with no redirects.'],
    faqs: [
      { q: 'Do you track clicks or scan counts?', a: 'No, static QR codes directly open your target destination with zero tracking or intermediaries.' }
    ]
  },
  {
    id: 'text-qr-code-generator',
    name: 'Plain Text QR Code Generator',
    slug: 'text-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Encode plain text, notes, instructions, quotes, or serial strings into a direct scannable QR code.',
    keywords: ['text qr code', 'plain text qr', 'encode message qr', 'note qr code'],
    component: PlainTextQrGenerator,
    instructions: [
      'Paste your message or text.',
      'Preview the generated QR matrix.',
      'Download or copy for your notes or signs.'
    ],
    limitations: ['Supports Unicode characters including Bengali and special symbols.'],
    faqs: [
      { q: 'How much text can fit in a QR code?', a: 'Standard QR codes can store up to 7,089 numeric or 4,296 alphanumeric characters.' }
    ]
  },
  {
    id: 'email-qr-code-generator',
    name: 'Email QR Code Generator',
    slug: 'email-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Generate QR codes that open the user email client with recipient address, subject line, and body prefilled.',
    keywords: ['email qr code', 'mailto qr generator', 'prefilled email qr', 'contact email qr'],
    component: EmailQrGenerator,
    instructions: [
      'Enter target email address.',
      'Optionally fill in default Subject line and Message Body.',
      'Download and print for business brochures or customer support.'
    ],
    limitations: ['Uses standard mailto: URI scheme.'],
    faqs: [
      { q: 'Does scanning automatically send the email?', a: 'No, it opens the user email app with prefilled text so they can review and send.' }
    ]
  },
  {
    id: 'phone-qr-code-generator',
    name: 'Phone Number QR Code Generator',
    slug: 'phone-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Create QR codes that launch phone dialers with your contact phone number ready to call with one tap.',
    keywords: ['phone qr code', 'call qr code', 'dialer qr code', 'phone number qr generator'],
    component: PhoneQrGenerator,
    instructions: [
      'Enter phone number including country code (e.g. +1 555 123 4567).',
      'Download the QR code image.',
      'Place on signage or storefronts for instant customer calls.'
    ],
    limitations: ['Uses standard tel: URI scheme.'],
    faqs: [
      { q: 'Should I include the country code?', a: 'Yes, including international country codes ensures anyone can call seamlessly.' }
    ]
  },
  {
    id: 'sms-qr-code-generator',
    name: 'SMS QR Code Generator',
    slug: 'sms-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Generate QR codes that launch text messaging apps with recipient number and message pre-populated.',
    keywords: ['sms qr code', 'text message qr', 'sms qr generator', 'prefilled text message qr'],
    component: SmsQrGenerator,
    instructions: [
      'Enter phone number and message template.',
      'Download or copy the generated code.',
      'Great for SMS promotions, event RSVP, or support tickets.'
    ],
    limitations: ['Uses standard sms: URI format.'],
    faqs: [
      { q: 'Can users edit the message before sending?', a: 'Yes, the message opens in their default SMS app for user confirmation.' }
    ]
  },
  {
    id: 'vcard-qr-code-generator',
    name: 'Contact Card (vCard) QR Code Generator',
    slug: 'vcard-qr-code-generator',
    category: 'qr-code-generators',
    popular: true,
    description: 'Create scannable vCard QR codes for business cards that instantly add full contact details to phone address books.',
    keywords: ['vcard qr code', 'contact qr code', 'business card qr', 'vcard 3.0 generator', 'digital business card'],
    component: ContactCardQrGenerator,
    instructions: [
      'Fill in your name, organization, job title, phone, email, website, and address.',
      'Customize colors to match your business branding.',
      'Download high-res PNG or vector SVG to place on your physical business cards.'
    ],
    limitations: ['Compliant with standard vCard 3.0 format.'],
    faqs: [
      { q: 'Will scanning save all fields directly to address books?', a: 'Yes, smartphones prompt to "Create New Contact" with all fields populated.' }
    ]
  },
  {
    id: 'whatsapp-qr-code-generator',
    name: 'WhatsApp QR Code Generator',
    slug: 'whatsapp-qr-code-generator',
    category: 'qr-code-generators',
    popular: true,
    description: 'Create direct chat QR codes for WhatsApp with custom welcome messages to connect with customers instantly.',
    keywords: ['whatsapp qr code', 'whatsapp chat qr', 'wa me qr generator', 'click to chat whatsapp'],
    component: WhatsAppQrGenerator,
    instructions: [
      'Enter your phone number in full international format (digits only, e.g. 15551234567).',
      'Optionally enter a pre-filled greeting message.',
      'Download the QR code for posters, websites, and flyers.'
    ],
    limitations: ['Uses official WhatsApp https://wa.me/ deep link architecture.'],
    faqs: [
      { q: 'Does the user need to save my number first?', a: 'No, WhatsApp opens the chat directly without requiring prior contact saving.' }
    ]
  },
  {
    id: 'location-qr-code-generator',
    name: 'Location & Maps QR Code Generator',
    slug: 'location-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Generate QR codes that open Google Maps or Apple Maps with exact latitude and longitude coordinates.',
    keywords: ['location qr code', 'maps qr code', 'geo qr code', 'gps qr code generator', 'coordinates qr'],
    component: LocationQrGenerator,
    instructions: [
      'Enter latitude and longitude coordinates.',
      'Optionally provide a location title or address label.',
      'Download the QR code for event invitations and venue directions.'
    ],
    limitations: ['Uses universal geo: and Google Maps navigational schemes.'],
    faqs: [
      { q: 'How do I find my GPS coordinates?', a: 'Right click on Google Maps or drop a pin to see latitude and longitude.' }
    ]
  },
  {
    id: 'calendar-qr-code-generator',
    name: 'Calendar Event QR Code Generator',
    slug: 'calendar-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Create scannable iCalendar (VEVENT) QR codes that allow users to add meetings, webinars, and events to their calendar in one tap.',
    keywords: ['calendar qr code', 'event qr code', 'vevent qr generator', 'icalendar qr', 'meeting qr code'],
    component: CalendarEventQrGenerator,
    instructions: [
      'Enter event title, start and end dates/times.',
      'Provide location and event description.',
      'Download the QR code for conference schedules, tickets, and invitations.'
    ],
    limitations: ['Generates standard iCalendar VEVENT structure.'],
    faqs: [
      { q: 'Does it support all smartphone calendar apps?', a: 'Yes, Apple Calendar, Google Calendar, and Outlook natively recognize VEVENT QR codes.' }
    ]
  },
  {
    id: 'payment-qr-code-generator',
    name: 'Payment Information QR Code Generator',
    slug: 'payment-qr-code-generator',
    category: 'qr-code-generators',
    description: 'Generate payment detail QR codes for UPI, PayPal.me, SEPA IBAN, or crypto addresses with informative disclaimers.',
    keywords: ['payment qr code', 'upi qr generator', 'paypal qr code', 'sepa iban qr', 'crypto qr code'],
    component: PaymentQrGenerator,
    instructions: [
      'Select payment scheme: UPI, PayPal.me, SEPA IBAN, or Crypto Address.',
      'Enter recipient identifier, optional amount, and note.',
      'Download the QR code for point-of-sale displays or invoices.'
    ],
    limitations: [
      'Notice: This tool only encodes payment destination information into a QR code. It does NOT process or store financial transactions.'
    ],
    faqs: [
      { q: 'Does Zynovexa process or take a cut of payments?', a: 'No, this is purely a client-side visual encoder. Payments are processed by your chosen payment provider.' }
    ]
  },
  {
    id: 'social-profile-qr-generator',
    name: 'Social Media Profile QR Code Generator',
    slug: 'social-profile-qr-generator',
    category: 'qr-code-generators',
    description: 'Create direct profile link QR codes for YouTube, Instagram, X (Twitter), LinkedIn, TikTok, Facebook, and GitHub.',
    keywords: ['social media qr code', 'instagram qr code', 'youtube channel qr', 'linkedin profile qr', 'tiktok qr generator'],
    component: SocialProfileQrGenerator,
    instructions: [
      'Select your social platform.',
      'Enter your username or handle.',
      'Download custom high-contrast QR code.'
    ],
    limitations: ['Encodes direct web profile URLs.'],
    faqs: [
      { q: 'Will this open in the native app?', a: 'Most modern mobile browsers seamlessly deep-link to the installed app.' }
    ]
  },

  // ==========================================
  // 2. BARCODE & PRODUCT CODE GENERATORS
  // ==========================================
  {
    id: 'barcode-generator',
    name: 'Universal Barcode Studio',
    slug: 'barcode-generator',
    category: 'barcode-generators',
    popular: true,
    description: 'Generate high-resolution 1D linear barcodes in Code 128, Code 39, EAN-13, EAN-8, UPC-A, and ITF formats with PNG/SVG downloads.',
    keywords: ['barcode generator', 'create barcode online', 'code 128 barcode', 'ean13 generator', 'upc barcode', 'barcode download'],
    component: BarcodeGenerator,
    instructions: [
      'Select your target barcode symbology (e.g. Code 128, EAN-13, UPC-A).',
      'Enter code value meeting the symbology format requirements.',
      'Customize bar width, height, colors, and human-readable text.',
      'Download as vector SVG for print packaging or high-resolution PNG.'
    ],
    limitations: [
      'Informational notice: Generating a barcode does not register a product with official authorities (such as GS1). Use authorized prefix codes for commercial retail distribution.'
    ],
    faqs: [
      { q: 'Which barcode format is best for retail products?', a: 'EAN-13 is standard internationally; UPC-A is standard in North America.' },
      { q: 'Which format should I use for general internal tracking?', a: 'Code 128 is highly versatile and supports all alphanumeric characters.' }
    ]
  },
  {
    id: 'code128-barcode-generator',
    name: 'Code 128 Barcode Generator',
    slug: 'code128-barcode-generator',
    category: 'barcode-generators',
    description: 'Generate compact, high-density Code 128 barcodes supporting full ASCII text, numbers, and symbols for logistics and inventory.',
    keywords: ['code 128 generator', 'code 128 barcode', 'high density barcode', 'inventory barcode', 'shipping label barcode'],
    component: Code128BarcodeGenerator,
    instructions: [
      'Type any alphanumeric text or inventory number.',
      'Preview real-time barcode rendering.',
      'Download SVG or PNG file.'
    ],
    limitations: ['Standard Code 128 symbology rendered via JsBarcode.'],
    faqs: [
      { q: 'Can Code 128 encode letters and numbers?', a: 'Yes, Code 128 supports uppercase, lowercase, numbers, and punctuation.' }
    ]
  },
  {
    id: 'code39-barcode-generator',
    name: 'Code 39 Barcode Generator',
    slug: 'code39-barcode-generator',
    category: 'barcode-generators',
    description: 'Create standard Code 39 (3 of 9) industrial barcodes widely used in defense, automotive, and manufacturing inventory.',
    keywords: ['code 39 generator', 'code 3 of 9', 'industrial barcode', 'manufacturing barcode'],
    component: Code39BarcodeGenerator,
    instructions: [
      'Enter uppercase letters (A-Z), numbers (0-9), and allowed symbols (- . $ / + % space).',
      'Download formatted barcode.'
    ],
    limitations: ['Only supports uppercase alphanumeric and 7 special characters.'],
    faqs: [
      { q: 'Why is Code 39 still popular?', a: 'It does not require mandatory check digits and is readable by virtually all optical scanners.' }
    ]
  },
  {
    id: 'ean13-barcode-generator',
    name: 'EAN-13 Barcode Generator',
    slug: 'ean13-barcode-generator',
    category: 'barcode-generators',
    popular: true,
    description: 'Generate international 13-digit EAN-13 retail barcodes with automatic Luhn-style check digit calculation and verification.',
    keywords: ['ean13 generator', 'ean-13 barcode', 'retail product barcode', 'isbn barcode', '13 digit barcode'],
    component: Ean13BarcodeGenerator,
    instructions: [
      'Enter 12 digits (the 13th check digit is auto-calculated) or all 13 digits.',
      'Ensure the checksum matches valid retail specifications.',
      'Download vector SVG or PNG.'
    ],
    limitations: [
      'Generating an EAN-13 does not register the product with GS1. Retailers require officially assigned company prefixes.'
    ],
    faqs: [
      { q: 'How is the 13th digit determined?', a: 'Using standard Modulo-10 weighted checksum formula.' }
    ]
  },
  {
    id: 'ean8-barcode-generator',
    name: 'EAN-8 Barcode Generator',
    slug: 'ean8-barcode-generator',
    category: 'barcode-generators',
    description: 'Create compact 8-digit EAN-8 barcodes designed for small retail packages, confectionery, and cosmetics.',
    keywords: ['ean 8 barcode', 'ean8 generator', 'small package barcode', '8 digit barcode'],
    component: Ean8BarcodeGenerator,
    instructions: [
      'Enter 7 digits (8th check digit calculated automatically) or full 8 digits.',
      'Download barcode image.'
    ],
    limitations: ['Requires exactly 7 or 8 numeric digits.'],
    faqs: [
      { q: 'When should EAN-8 be used instead of EAN-13?', a: 'When packaging surface area is too small for a standard 13-digit barcode.' }
    ]
  },
  {
    id: 'upca-barcode-generator',
    name: 'UPC-A Barcode Generator',
    slug: 'upca-barcode-generator',
    category: 'barcode-generators',
    description: 'Generate 12-digit North American Universal Product Code (UPC-A) barcodes for grocery and consumer retail goods.',
    keywords: ['upc barcode generator', 'upc-a generator', '12 digit barcode', 'us retail barcode'],
    component: UpcABarcodeGenerator,
    instructions: [
      'Enter 11 digits (12th check digit auto-calculated) or all 12 digits.',
      'Download formatted SVG or PNG.'
    ],
    limitations: ['Official commercial retail distribution requires GS1 US registration.'],
    faqs: [
      { q: 'What is the relationship between UPC-A and EAN-13?', a: 'A UPC-A barcode can be transformed into an EAN-13 by prepending a leading zero.' }
    ]
  },
  {
    id: 'itf-barcode-generator',
    name: 'ITF (Interleaved 2 of 5) Barcode Generator',
    slug: 'itf-barcode-generator',
    category: 'barcode-generators',
    description: 'Create Interleaved 2 of 5 (ITF) barcodes widely used on corrugated cardboard shipping cartons and warehouse packaging.',
    keywords: ['itf barcode', 'interleaved 2 of 5', 'itf 14 barcode', 'shipping carton barcode'],
    component: ItfBarcodeGenerator,
    instructions: [
      'Enter an even number of numeric digits (e.g. 14 digits for ITF-14).',
      'Download high-contrast barcode for warehouse printing.'
    ],
    limitations: ['Must contain an even number of numeric digits (digits are encoded in pairs).'],
    faqs: [
      { q: 'Why must ITF barcodes have an even number of digits?', a: 'Because pairs of digits are interleaved: odd-positioned digits in bars, even-positioned in spaces.' }
    ]
  },
  {
    id: 'product-sku-generator',
    name: 'Product SKU Generator',
    slug: 'product-sku-generator',
    category: 'barcode-generators',
    popular: true,
    description: 'Generate clean, systematic Stock Keeping Unit (SKU) codes with brand prefix, category code, attributes, and sequential numbers.',
    keywords: ['sku generator', 'stock keeping unit', 'product sku maker', 'inventory sku generator', 'ecommerce sku'],
    component: ProductSkuGenerator,
    instructions: [
      'Enter brand prefix, category code, size/variant, and sequence numbers.',
      'Generate individual SKU or batch sequential inventory codes.',
      'Export results to CSV or copy to clipboard.'
    ],
    limitations: ['Operates 100% locally in browser memory.'],
    faqs: [
      { q: 'What makes a good SKU code?', a: 'A good SKU is human-readable, consistent, short (8-16 chars), and avoids confusing characters (like 0 and O).' }
    ]
  },
  {
    id: 'random-product-code-generator',
    name: 'Random Product Code Generator',
    slug: 'random-product-code-generator',
    category: 'barcode-generators',
    description: 'Generate cryptographically unique product codes, serial numbers, and asset tags with custom character sets and formatting.',
    keywords: ['random product code', 'serial number generator', 'asset tag generator', 'product code maker'],
    component: RandomProductCodeGenerator,
    instructions: [
      'Choose prefix, pattern length, and grouping style.',
      'Generate unique random serial numbers.',
      'Copy codes or export to CSV.'
    ],
    limitations: ['Uses browser crypto.getRandomValues for true randomness.'],
    faqs: [
      { q: 'Can I generate alphanumeric serials?', a: 'Yes, select alphanumeric or uppercase-only character sets.' }
    ]
  },
  {
    id: 'batch-product-code-generator',
    name: 'Batch Product Code Generator',
    slug: 'batch-product-code-generator',
    category: 'barcode-generators',
    description: 'Generate up to 500 unique product codes, serial keys, and inventory labels in bulk with CSV and TXT download.',
    keywords: ['batch product code', 'bulk serial generator', 'bulk product codes', 'batch sku generator'],
    component: BatchProductCodeGenerator,
    instructions: [
      'Select quantity (1 to 500 items).',
      'Configure format, prefix, suffix, and separators.',
      'Click Generate and download CSV or TXT file.'
    ],
    limitations: ['Deduplication guaranteed within each generated batch.'],
    faqs: [
      { q: 'Does this export directly to Excel?', a: 'Yes, download the CSV file to open in Microsoft Excel or Google Sheets.' }
    ]
  },

  // ==========================================
  // 3. KEYWORD & SEO GENERATORS
  // ==========================================
  {
    id: 'seo-keyword-slug-generator',
    name: 'SEO Keyword Slug Generator',
    slug: 'seo-keyword-slug-generator',
    category: 'seo-keyword-generators',
    popular: true,
    description: 'Transform article headlines and target keywords into clean, URL-friendly slugs with stop word removal and case normalization.',
    keywords: ['seo slug generator', 'keyword slug', 'url slug maker', 'clean url slug', 'seo friendly url'],
    component: SeoKeywordSlugGenerator,
    instructions: [
      'Type or paste your page title or keywords.',
      'Toggle options such as removing stop words (the, a, and, etc.) or accents.',
      'Select hyphen (-) or underscore (_) separator.',
      'Copy your clean SEO slug.'
    ],
    limitations: ['Unicode and multilingual transliteration handled locally.'],
    faqs: [
      { q: 'Why remove stop words from slugs?', a: 'Shorter, focused slugs improve readability and keep keyword density prominent in search engine results.' }
    ]
  },
  {
    id: 'url-slug-generator',
    name: 'URL Slug Generator',
    slug: 'url-slug-generator',
    category: 'seo-keyword-generators',
    description: 'Fast, lightweight URL slug generator converting any headline, post title, or phrase into safe lowercase URLs.',
    keywords: ['url slug generator', 'slugify text', 'permalink generator', 'slug creator'],
    component: UrlSlugGenerator,
    instructions: [
      'Enter text to slugify.',
      'Copy the output slug.'
    ],
    limitations: ['Removes special characters and extra spaces.'],
    faqs: [
      { q: 'Does it support numbers?', a: 'Yes, numbers are preserved.' }
    ]
  },
  {
    id: 'seo-meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    slug: 'seo-meta-tag-generator',
    category: 'seo-keyword-generators',
    popular: true,
    description: 'Generate standard HTML SEO meta tags, OpenGraph (Facebook/LinkedIn) tags, and Twitter Cards ready to copy into your website <head>.',
    keywords: ['meta tag generator', 'seo meta tags', 'opengraph generator', 'twitter card tags', 'head meta tags'],
    component: SeoMetaTagGenerator,
    instructions: [
      'Fill in page title, description, canonical URL, and author.',
      'Optionally provide an image URL for social preview cards.',
      'Copy the generated HTML snippet and paste into your <head> section.'
    ],
    limitations: ['Generates standards-compliant W3C and OpenGraph markup.'],
    faqs: [
      { q: 'Where do I place these tags?', a: 'Inside the <head> ... </head> section of your HTML document.' }
    ]
  },
  {
    id: 'meta-description-generator',
    name: 'HTML Meta Description Generator & SERP Preview',
    slug: 'meta-description-generator',
    category: 'seo-keyword-generators',
    description: 'Draft and refine your search engine meta description with real-time character meters, pixel width check, and Google SERP preview.',
    keywords: ['meta description generator', 'meta description counter', 'serp description checker', 'google snippet optimizer'],
    component: MetaDescriptionGenerator,
    instructions: [
      'Type your meta description.',
      'Watch the character counter and progress indicator.',
      'Keep between 120 and 155 characters for optimal Google display.'
    ],
    limitations: ['Google dynamically truncates based on pixel width; character counts serve as best practice.'],
    faqs: [
      { q: 'What happens if my description is too long?', a: 'Google truncates long descriptions with an ellipsis (...).' }
    ]
  },
  {
    id: 'meta-keywords-generator',
    name: 'Meta Keywords Tag Generator',
    slug: 'meta-keywords-generator',
    category: 'seo-keyword-generators',
    description: 'Convert comma-separated or line-separated keyword lists into clean HTML <meta name="keywords"> tags.',
    keywords: ['meta keywords generator', 'keywords tag maker', 'html keywords tag', 'meta keywords html'],
    component: MetaKeywordsGenerator,
    instructions: [
      'Enter keywords separated by commas or lines.',
      'Copy formatted <meta name="keywords" content="..."> tag.'
    ],
    limitations: ['Deduplicates keywords automatically.'],
    faqs: [
      { q: 'Does Google use the meta keywords tag for ranking?', a: 'Google does not use it for primary ranking, but several internal site search engines and regional engines still utilize it.' }
    ]
  },
  {
    id: 'robots-generator-tool',
    name: 'Robots.txt Generator',
    slug: 'robots-generator-tool',
    category: 'seo-keyword-generators',
    popular: true,
    description: 'Generate valid robots.txt exclusion files with custom User-agent rules, allow/disallow paths, crawl delay, and sitemap reference.',
    keywords: ['robots.txt generator', 'create robots.txt', 'search crawler rules', 'googlebot disallow', 'sitemap robots.txt'],
    component: RobotsTxtGenerator,
    instructions: [
      'Enter your sitemap URL.',
      'Specify paths to disallow (e.g. /admin, /cart).',
      'Select preset rules or add custom crawlers.',
      'Download robots.txt and upload to your website root directory.'
    ],
    limitations: ['Generates standard Robots Exclusion Protocol text.'],
    faqs: [
      { q: 'Where must robots.txt be located?', a: 'At the root domain level: https://example.com/robots.txt.' }
    ]
  },
  {
    id: 'xml-sitemap-generator-tool',
    name: 'XML Sitemap Generator',
    slug: 'xml-sitemap-generator-tool',
    category: 'seo-keyword-generators',
    popular: true,
    description: 'Convert a list of page URLs into a valid sitemaps.org XML protocol file with changefreq, priority, and lastmod tags.',
    keywords: ['xml sitemap generator', 'sitemap.xml maker', 'google sitemap creator', 'sitemaps protocol'],
    component: XmlSitemapGenerator,
    instructions: [
      'Paste your list of URLs (one per line).',
      'Select default change frequency (e.g. weekly) and priority.',
      'Download sitemap.xml and submit to Google Search Console.'
    ],
    limitations: ['Generates valid XML formatted strictly to the sitemaps.org schema.'],
    faqs: [
      { q: 'How many URLs can an XML sitemap hold?', a: 'Up to 50,000 URLs or 50MB uncompressed per sitemap file.' }
    ]
  },
  {
    id: 'utm-link-generator',
    name: 'UTM Campaign Link Builder',
    slug: 'utm-link-generator',
    category: 'seo-keyword-generators',
    popular: true,
    description: 'Build Google Analytics UTM campaign tracking URLs with source, medium, campaign name, term, and content parameters.',
    keywords: ['utm builder', 'utm link generator', 'campaign tracking url', 'google analytics utm', 'campaign builder'],
    component: UtmLinkGenerator,
    instructions: [
      'Enter destination website URL.',
      'Enter Campaign Source (e.g. newsletter, facebook), Medium (e.g. email, cpc), and Campaign Name.',
      'Copy the generated tracked URL.'
    ],
    limitations: ['Properly encodes special characters and spaces into URL query parameters.'],
    faqs: [
      { q: 'Are UTM tags visible to website visitors?', a: 'Yes, UTM parameters are visible in the address bar when users click the link.' }
    ]
  },
  {
    id: 'seo-title-generator',
    name: 'SEO Page Title Optimizer',
    slug: 'seo-title-generator',
    category: 'seo-keyword-generators',
    description: 'Craft and test SEO page titles with brand separator presets, pixel width check, and Google SERP preview.',
    keywords: ['seo title generator', 'meta title optimizer', 'title tag length', 'serp title preview'],
    component: SeoTitleGenerator,
    instructions: [
      'Enter primary keyword, secondary modifier, and brand name.',
      'Choose separator (| or - or •).',
      'Monitor length indicator to keep titles between 50 and 60 characters.'
    ],
    limitations: ['Previews desktop Google search snippet format.'],
    faqs: [
      { q: 'What is the optimal title tag length?', a: 'Around 50-60 characters (approx. 580 pixels).' }
    ]
  },
  {
    id: 'keyword-list-formatter',
    name: 'Keyword List Formatter',
    slug: 'keyword-list-formatter',
    category: 'seo-keyword-generators',
    description: 'Format keyword lists with custom prefixes, suffixes, wrappers, commas, quotes, or brackets for Google Ads campaigns.',
    keywords: ['keyword list formatter', 'google ads match types', 'keyword wrapper', 'comma separated keywords'],
    component: KeywordListFormatter,
    instructions: [
      'Paste your keyword list.',
      'Choose match type wrapper: Broad, "Phrase Match", or [Exact Match].',
      'Copy formatted list.'
    ],
    limitations: ['Instant client-side formatting.'],
    faqs: [
      { q: 'Can I format for Google Ads PPC?', a: 'Yes, one-click presets wrap keywords in quotes for phrase match or brackets for exact match.' }
    ]
  },
  {
    id: 'keyword-deduplication-tool',
    name: 'Keyword Deduplication Tool',
    slug: 'keyword-deduplication-tool',
    category: 'seo-keyword-generators',
    description: 'Remove duplicate keywords from your lists while preserving original ordering or sorting alphabetically.',
    keywords: ['keyword deduplication', 'remove duplicate keywords', 'unique keywords list', 'clean keyword list'],
    component: KeywordDeduplicationTool,
    instructions: [
      'Paste your keywords.',
      'Toggle case sensitivity and trim options.',
      'Copy deduplicated list with removal statistics.'
    ],
    limitations: ['Processes entirely in browser memory.'],
    faqs: [
      { q: 'Does it report how many duplicates were removed?', a: 'Yes, displays original count, unique count, and duplicates removed.' }
    ]
  },
  {
    id: 'keyword-case-converter',
    name: 'Keyword Case Converter',
    slug: 'keyword-case-converter',
    category: 'seo-keyword-generators',
    description: 'Batch convert keyword lists to lowercase, Title Case, UPPERCASE, or Sentence case.',
    keywords: ['keyword case converter', 'lowercase keywords', 'title case keywords', 'batch case converter'],
    component: KeywordCaseConverter,
    instructions: [
      'Paste keyword list.',
      'Click desired case conversion button.',
      'Copy processed list.'
    ],
    limitations: ['Instant client-side transformation.'],
    faqs: [
      { q: 'Why lowercase keywords?', a: 'Search engines treat queries case-insensitively; lowercasing standardizes tracking lists.' }
    ]
  },
  {
    id: 'keyword-separator-converter',
    name: 'Keyword Separator Converter',
    slug: 'keyword-separator-converter',
    category: 'seo-keyword-generators',
    description: 'Convert between newlines, commas, tabs, semicolons, and spaces in keyword lists.',
    keywords: ['keyword separator converter', 'comma to newline', 'newline to comma', 'keyword delimiter converter'],
    component: KeywordSeparatorConverter,
    instructions: [
      'Paste keywords with any existing delimiter.',
      'Select source and target delimiters.',
      'Copy converted output.'
    ],
    limitations: ['Cleans extra whitespace automatically.'],
    faqs: [
      { q: 'Can I convert comma-separated keywords into lines?', a: 'Yes, select Comma as source and Newline as target.' }
    ]
  },
  {
    id: 'keyword-to-csv-generator',
    name: 'Keyword to CSV Exporter',
    slug: 'keyword-to-csv-generator',
    category: 'seo-keyword-generators',
    description: 'Transform raw keyword lists into organized, downloadable CSV files with column headers and metadata.',
    keywords: ['keyword to csv', 'export keywords csv', 'keywords spreadsheet', 'keyword list to excel'],
    component: KeywordToCsvGenerator,
    instructions: [
      'Paste keywords.',
      'Specify column header name.',
      'Download valid CSV file.'
    ],
    limitations: ['Escapes commas and quotes correctly according to RFC 4180.'],
    faqs: [
      { q: 'Can this be opened in Excel?', a: 'Yes, standard CSV files open in Excel, Numbers, and Google Sheets.' }
    ]
  },
  {
    id: 'keyword-to-json-generator',
    name: 'Keyword to JSON Exporter',
    slug: 'keyword-to-json-generator',
    category: 'seo-keyword-generators',
    description: 'Convert keyword lists into formatted JSON arrays or key-value object structures for developers and APIs.',
    keywords: ['keyword to json', 'convert keywords to json', 'json array generator', 'keywords string array'],
    component: KeywordToJsonGenerator,
    instructions: [
      'Paste keyword list.',
      'Choose JSON Array (["kw1", "kw2"]) or Object format.',
      'Copy or download .json file.'
    ],
    limitations: ['Outputs valid, indented JSON.'],
    faqs: [
      { q: 'Can I format with 2 or 4 spaces?', a: 'Yes, output is formatted with clean 2-space indentation.' }
    ]
  },

  // ==========================================
  // 4. TEXT ENCODERS & DECODERS
  // ==========================================
  {
    id: 'url-encoder-decoder-tool',
    name: 'URL Percent Encoder & Decoder',
    slug: 'url-encoder-decoder-tool',
    category: 'text-encoders-decoders',
    popular: true,
    description: 'Encode and decode URLs, query parameters, and special characters using standard percent-encoding (%20, %26, etc.).',
    keywords: ['url encoder', 'url decoder', 'percent encoding', 'encodeuricomponent', 'url decode online'],
    component: TextUrlEncoder,
    instructions: [
      'Choose Encode or Decode mode.',
      'Select whether to encode complete URL or component query parameter.',
      'Copy the converted text.'
    ],
    limitations: ['Full UTF-8 support including emoji and international characters.'],
    faqs: [
      { q: 'What is percent-encoding?', a: 'A mechanism for encoding characters in a URI by replacing them with a percent sign followed by two hexadecimal digits.' }
    ]
  },
  {
    id: 'base64-encoder-decoder-tool',
    name: 'Base64 Text Encoder & Decoder',
    slug: 'base64-encoder-decoder-tool',
    category: 'text-encoders-decoders',
    popular: true,
    description: 'Safely encode and decode Base64 text with complete Unicode and Bengali script support, line wrapping, and URL-safe mode.',
    keywords: ['base64 encoder', 'base64 decoder', 'unicode base64', 'url safe base64', 'utf8 base64'],
    component: Base64EncoderDecoder,
    instructions: [
      'Select Encode to Base64 or Decode from Base64.',
      'Paste your text or Base64 string.',
      'Toggle URL-safe mode (- and _) or standard mode (+ and /).',
      'Copy result.'
    ],
    limitations: ['Uses TextEncoder and TextDecoder for 100% accurate Unicode preservation without btoa Latin1 errors.'],
    faqs: [
      { q: 'Does it support Bengali and non-English scripts?', a: 'Yes, full UTF-8 byte conversion ensures zero character corruption.' }
    ]
  },
  {
    id: 'html-entity-encoder-decoder-tool',
    name: 'HTML Entity Encoder & Decoder',
    slug: 'html-entity-encoder-decoder-tool',
    category: 'text-encoders-decoders',
    description: 'Convert characters to HTML entities (&lt;, &gt;, &amp;, &quot;) and numeric entities, or decode entities back to plain text.',
    keywords: ['html entity encoder', 'html entity decoder', 'escape html', 'html special chars', 'unescape html'],
    component: HtmlEntityEncoderDecoder,
    instructions: [
      'Choose Encode or Decode.',
      'Paste your HTML or code snippets.',
      'Copy the safe entity-encoded string.'
    ],
    limitations: ['Supports named entities and numeric decimal/hexadecimal entities.'],
    faqs: [
      { q: 'Why is HTML escaping needed?', a: 'To display raw code on web pages without the browser executing it as active markup.' }
    ]
  },
  {
    id: 'binary-to-text-converter',
    name: 'Binary to Text Converter',
    slug: 'binary-to-text-converter',
    category: 'text-encoders-decoders',
    description: 'Convert binary code (0s and 1s) into readable ASCII and UTF-8 plain text.',
    keywords: ['binary to text', 'binary decoder', 'binary to ascii', '0101 to text', 'decode binary'],
    component: BinaryToTextConverter,
    instructions: [
      'Paste binary digits (separated by spaces or continuous 8-bit bytes).',
      'View and copy the decoded text output.'
    ],
    limitations: ['Interprets standard 8-bit bytes.'],
    faqs: [
      { q: 'Do the binary numbers need spaces between bytes?', a: 'Spaces are supported but not required; bytes are chunked every 8 bits.' }
    ]
  },
  {
    id: 'text-to-binary-converter',
    name: 'Text to Binary Converter',
    slug: 'text-to-binary-converter',
    category: 'text-encoders-decoders',
    description: 'Convert any plain text or message into 8-bit binary numbers (0s and 1s) with customizable delimiters.',
    keywords: ['text to binary', 'binary encoder', 'ascii to binary', 'convert string to binary', 'binary code generator'],
    component: TextToBinaryConverter,
    instructions: [
      'Type or paste plain text.',
      'Choose separator between bytes (space, none, or comma).',
      'Copy the binary stream.'
    ],
    limitations: ['Encodes each character as its 8-bit binary representation.'],
    faqs: [
      { q: 'Can this convert full sentences?', a: 'Yes, every character including punctuation and spaces is converted.' }
    ]
  },
  {
    id: 'hex-encoder-decoder-tool',
    name: 'Hexadecimal (Hex) Encoder & Decoder',
    slug: 'hex-encoder-decoder-tool',
    category: 'text-encoders-decoders',
    description: 'Convert text strings to Hex bytes and decode hexadecimal numbers back to readable text.',
    keywords: ['hex encoder', 'hex decoder', 'text to hex', 'hex to text', 'hexadecimal converter'],
    component: HexEncoderDecoder,
    instructions: [
      'Select Text to Hex or Hex to Text mode.',
      'Toggle space separators and uppercase formatting.',
      'Copy converted hex string.'
    ],
    limitations: ['Standard UTF-8 byte encoding.'],
    faqs: [
      { q: 'What is hexadecimal?', a: 'A base-16 numeral system using digits 0-9 and letters A-F.' }
    ]
  },
  {
    id: 'ascii-converter-tool',
    name: 'ASCII Code Converter',
    slug: 'ascii-converter-tool',
    category: 'text-encoders-decoders',
    description: 'Convert characters to decimal ASCII codes and translate ASCII numbers back to text with an interactive lookup table.',
    keywords: ['ascii converter', 'ascii code table', 'text to ascii', 'ascii numbers to text', 'ascii values'],
    component: AsciiConverter,
    instructions: [
      'Type text to see decimal ASCII values.',
      'Or enter space-separated decimal codes to decode into text.'
    ],
    limitations: ['Standard 7-bit ASCII and extended 8-bit values.'],
    faqs: [
      { q: 'What is the ASCII code for letter A?', a: 'Uppercase "A" is decimal 65; lowercase "a" is 97.' }
    ]
  },
  {
    id: 'unicode-code-point-converter',
    name: 'Unicode Code Point Converter (U+XXXX)',
    slug: 'unicode-code-point-converter',
    category: 'text-encoders-decoders',
    description: 'Inspect exact Unicode code points (U+XXXX) for any character, symbol, emoji, or non-Latin script.',
    keywords: ['unicode converter', 'unicode code point', 'u+xxxx generator', 'emoji unicode checker', 'charcode converter'],
    component: UnicodeCodePointConverter,
    instructions: [
      'Type or paste text or emoji.',
      'View individual characters and their standard U+XXXX code points.',
      'Copy code point notations.'
    ],
    limitations: ['Correctly handles 32-bit surrogate pairs and emojis.'],
    faqs: [
      { q: 'Does it work with Bengali script?', a: 'Yes, Bengali glyphs are mapped to the Bengali Unicode block (U+0980 - U+09FF).' }
    ]
  },
  {
    id: 'utf8-byte-converter',
    name: 'UTF-8 Byte Inspector & Converter',
    slug: 'utf8-byte-converter',
    category: 'text-encoders-decoders',
    description: 'Inspect raw UTF-8 byte streams in hexadecimal and decimal format with total byte length calculation.',
    keywords: ['utf8 byte converter', 'utf-8 inspector', 'byte size calculator', 'raw bytes viewer'],
    component: Utf8ByteConverter,
    instructions: [
      'Enter text or symbols.',
      'Inspect exact byte length and byte values.',
      'Copy byte arrays.'
    ],
    limitations: ['Computed using browser native TextEncoder.'],
    faqs: [
      { q: 'How many bytes does an emoji use in UTF-8?', a: 'Most modern emojis require 4 UTF-8 bytes.' }
    ]
  },
  {
    id: 'json-string-escape-tool',
    name: 'JSON String Escape & Unescape Tool',
    slug: 'json-string-escape-tool',
    category: 'text-encoders-decoders',
    description: 'Escape quotes, newlines, and backslashes for safe embedding in JSON strings, or unescape JSON strings back to raw text.',
    keywords: ['json escape', 'json unescape', 'escape string json', 'json quote escape', 'backslash escape'],
    component: JsonEscapeTool,
    instructions: [
      'Choose Escape or Unescape mode.',
      'Paste your string.',
      'Copy the escaped string ready for JSON payloads.'
    ],
    limitations: ['Handles double quotes, backslashes, tabs, and newlines.'],
    faqs: [
      { q: 'Why is JSON escaping necessary?', a: 'Unescaped newlines and unescaped quotes break JSON parsing.' }
    ]
  },
  {
    id: 'text-to-html-converter',
    name: 'Text to HTML Paragraph Converter',
    slug: 'text-to-html-converter',
    category: 'text-encoders-decoders',
    description: 'Convert plain text articles and notes into structured HTML with <p> paragraph tags, <br> line breaks, and auto-linked URLs.',
    keywords: ['text to html', 'plain text to html', 'text to p tags', 'convert text to markup', 'auto link text'],
    component: TextToHtmlConverter,
    instructions: [
      'Paste plain text notes or articles.',
      'Toggle auto-linking URLs or converting double newlines to <p> tags.',
      'Copy clean HTML code.'
    ],
    limitations: ['Escapes malicious tags before formatting.'],
    faqs: [
      { q: 'Does it wrap paragraphs in <p> tags?', a: 'Yes, double line breaks become clean <p> blocks.' }
    ]
  },
  {
    id: 'rot13-encoder-decoder',
    name: 'ROT13 & Caesar Cipher Tool',
    slug: 'rot13-encoder-decoder',
    category: 'text-encoders-decoders',
    description: 'Encode and decode text using classic ROT13 cipher or custom shift Caesar cipher with real-time slider.',
    keywords: ['rot13 cipher', 'caesar cipher', 'rotate 13', 'substitution cipher', 'crypto puzzle'],
    component: Rot13EncoderDecoder,
    instructions: [
      'Enter text to obfuscate or decode.',
      'Use standard ROT13 (shift of 13) or adjust Caesar shift slider (1 to 25).',
      'Copy the encoded or decoded message.'
    ],
    limitations: ['Letters are rotated cyclically; numbers and punctuation remain unchanged.'],
    faqs: [
      { q: 'Is ROT13 reversible by applying it again?', a: 'Yes, because the English alphabet has 26 letters, applying ROT13 twice restores the original text.' }
    ]
  },
  {
    id: 'morse-code-encoder-decoder',
    name: 'Morse Code Translator with Audio Playback',
    slug: 'morse-code-encoder-decoder',
    category: 'text-encoders-decoders',
    popular: true,
    description: 'Translate text to international Morse code (. and -) and decode Morse back to text, featuring real-time Web Audio API sound playback.',
    keywords: ['morse code translator', 'morse code audio', 'text to morse', 'morse to text', 'sos morse code', 'sound morse'],
    component: MorseCodeEncoderDecoder,
    instructions: [
      'Choose Text to Morse or Morse to Text.',
      'Type your message.',
      'Click "Play Morse Audio" to hear real dits and dahs generated via Web Audio API.',
      'Copy code or text.'
    ],
    limitations: ['International Morse Code standard.'],
    faqs: [
      { q: 'Can I listen to the Morse sound?', a: 'Yes, press the Play button to hear authentic 700Hz tone beeps.' }
    ]
  },
  {
    id: 'line-break-converter',
    name: 'Line Break Converter (LF / CRLF / CR)',
    slug: 'line-break-converter',
    category: 'text-encoders-decoders',
    description: 'Convert line break endings between Unix/Linux/macOS (LF: \\n), Windows (CRLF: \\r\\n), and legacy Mac (CR: \\r).',
    keywords: ['line break converter', 'crlf to lf', 'lf to crlf', 'newline converter', 'unix line endings'],
    component: LineBreakConverter,
    instructions: [
      'Paste your text or script.',
      'Select desired target line ending: LF (Unix/macOS), CRLF (Windows), or CR.',
      'Copy converted text or download.'
    ],
    limitations: ['Normalizes mixed line endings.'],
    faqs: [
      { q: 'Why do Git and linters warn about CRLF?', a: 'Windows uses CRLF while Linux/macOS uses LF, which can cause cross-platform diff noise.' }
    ]
  },

  // ==========================================
  // 5. SECURITY & CRYPTOGRAPHY GENERATORS
  // ==========================================
  {
    id: 'secure-password-generator-tool',
    name: 'Cryptographically Secure Password Generator',
    slug: 'secure-password-generator-tool',
    category: 'security-random-generators',
    popular: true,
    description: 'Generate high-entropy, cryptographically strong passwords using browser window.crypto.getRandomValues with entropy calculation and typo avoidance.',
    keywords: ['secure password generator', 'strong password maker', 'crypto random password', 'password entropy', 'random password'],
    component: SecurePasswordGenerator,
    instructions: [
      'Select password length (8 to 128 characters).',
      'Toggle uppercase, lowercase, digits, and special symbols.',
      'Optionally exclude ambiguous characters (like 1, l, I, 0, O).',
      'Copy your generated secure password.'
    ],
    limitations: ['Generated 100% locally using Web Cryptography API. Never transmitted or saved.'],
    faqs: [
      { q: 'Are these passwords safe from brute force?', a: 'A 16+ character password with symbols offers >90 bits of cryptographic entropy, taking trillions of years to brute force.' }
    ]
  },
  {
    id: 'random-number-generator-tool',
    name: 'Secure Random Number Generator',
    slug: 'random-number-generator-tool',
    category: 'security-random-generators',
    popular: true,
    description: 'Generate cryptographically random numbers within custom ranges, supporting unique batches, decimals, and sorting.',
    keywords: ['random number generator', 'secure random numbers', 'crypto random number', 'random integer', 'lottery number picker'],
    component: RandomNumberGenerator,
    instructions: [
      'Set Min and Max values.',
      'Choose quantity of numbers to generate.',
      'Toggle "Allow Duplicates" or "Sort Numbers".',
      'Click Generate and copy numbers.'
    ],
    limitations: ['Uses window.crypto.getRandomValues for unbiased distribution.'],
    faqs: [
      { q: 'Is this better than Math.random()?', a: 'Yes, Web Crypto is non-deterministic and secure for cryptographic and fair-lottery use cases.' }
    ]
  },
  {
    id: 'random-string-generator-tool',
    name: 'Random String Generator',
    slug: 'random-string-generator-tool',
    category: 'security-random-generators',
    description: 'Generate random alphanumeric strings, secret tokens, API keys, and session identifiers.',
    keywords: ['random string generator', 'random token generator', 'secret key generator', 'api key maker', 'alphanumeric string'],
    component: RandomStringGenerator,
    instructions: [
      'Set string length and choose character set (Alphanumeric, Hexadecimal, Base64 characters).',
      'Generate single or batch strings.',
      'Copy result.'
    ],
    limitations: ['Web Crypto API generation.'],
    faqs: [
      { q: 'Can I generate multiple tokens at once?', a: 'Yes, select your batch quantity.' }
    ]
  },
  {
    id: 'uuid-v4-generator-tool',
    name: 'UUID v4 Generator (RFC 4122)',
    slug: 'uuid-v4-generator-tool',
    category: 'security-random-generators',
    popular: true,
    description: 'Generate standard RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) in bulk with uppercase and hyphen options.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'unique identifier', 'rfc 4122'],
    component: UuidV4Generator,
    instructions: [
      'Select count (up to 100 UUIDs).',
      'Toggle uppercase or remove hyphens.',
      'Copy individual UUID or click Copy All.'
    ],
    limitations: ['Uses native crypto.randomUUID() browser API.'],
    faqs: [
      { q: 'Can two generated UUIDs ever collide?', a: 'The probability of a collision in UUID v4 is approximately 1 in 2^122, practically impossible.' }
    ]
  },
  {
    id: 'sha1-hash-generator',
    name: 'SHA-1 Hash Generator',
    slug: 'sha1-hash-generator',
    category: 'security-random-generators',
    description: 'Calculate 160-bit SHA-1 cryptographic hashes using browser native Web Crypto API for legacy compatibility.',
    keywords: ['sha1 generator', 'sha-1 hash', 'hash sha1', '160 bit hash'],
    component: Sha1HashGenerator,
    instructions: [
      'Enter input text.',
      'Copy generated 40-character hexadecimal SHA-1 digest.'
    ],
    limitations: ['Note: SHA-1 is not recommended for modern password hashing or certificates due to known collision vulnerabilities.'],
    faqs: [
      { q: 'Is SHA-1 still used?', a: 'Mainly in legacy systems and Git commit object addressing.' }
    ]
  },
  {
    id: 'sha256-hash-generator-tool',
    name: 'SHA-256 Hash Generator',
    slug: 'sha256-hash-generator-tool',
    category: 'security-random-generators',
    popular: true,
    description: 'Generate industry-standard 256-bit SHA-256 cryptographic hashes instantly with complete privacy.',
    keywords: ['sha256 hash', 'sha-256 generator', '256 bit hash', 'crypto hash', 'checksum generator'],
    component: Sha256HashGenerator,
    instructions: [
      'Type or paste text.',
      'Review instant 64-character hexadecimal SHA-256 hash.',
      'Copy to clipboard.'
    ],
    limitations: ['Computed locally via window.crypto.subtle.digest.'],
    faqs: [
      { q: 'Can SHA-256 be reversed?', a: 'No, SHA-256 is a one-way cryptographic hash function.' }
    ]
  },
  {
    id: 'sha384-hash-generator',
    name: 'SHA-384 Hash Generator',
    slug: 'sha384-hash-generator',
    category: 'security-random-generators',
    description: 'Compute 384-bit SHA-384 cryptographic digests conforming to FIPS PUB 180-4 standard.',
    keywords: ['sha384 hash', 'sha-384 generator', '384 bit hash', 'sha2 family'],
    component: Sha384HashGenerator,
    instructions: [
      'Enter source text.',
      'Copy 96-character hex hash output.'
    ],
    limitations: ['Standard Web Crypto API.'],
    faqs: [
      { q: 'Where is SHA-384 used?', a: 'Widely used in TLS 1.3 ciphersuites and government-grade security profiles.' }
    ]
  },
  {
    id: 'sha512-hash-generator-tool',
    name: 'SHA-512 Hash Generator',
    slug: 'sha512-hash-generator-tool',
    category: 'security-random-generators',
    popular: true,
    description: 'Generate high-security 512-bit SHA-512 cryptographic hashes with 128-character hexadecimal output.',
    keywords: ['sha512 generator', 'sha-512 hash', '512 bit hash', 'maximum security hash'],
    component: Sha512HashGenerator,
    instructions: [
      'Paste your message or document text.',
      'Copy the 128-character SHA-512 hash.'
    ],
    limitations: ['Computed in browser memory.'],
    faqs: [
      { q: 'What is the hash output length?', a: '512 bits, represented as 128 hexadecimal characters.' }
    ]
  },
  {
    id: 'demo-otp-generator',
    name: 'Demo OTP & 2FA Code Generator',
    slug: 'demo-otp-generator',
    category: 'security-random-generators',
    description: 'Generate simulated 6-digit One-Time Passwords (OTP) with real-time countdown timer for UI testing and demos.',
    keywords: ['otp generator', 'demo 2fa code', 'one time password', 'totp test tool', 'verification code generator'],
    component: DemoOtpGenerator,
    instructions: [
      'Select 6-digit or 8-digit OTP format.',
      'Watch simulated 30-second expiry countdown.',
      'Copy OTP code for form testing and application validation.'
    ],
    limitations: [
      'Notice: This is a simulation generator intended for developer testing, mockups, and demonstrations. It is not connected to a live production authentication server.'
    ],
    faqs: [
      { q: 'Can I use this for testing my registration form UI?', a: 'Yes, perfect for testing OTP input fields without sending real SMS messages.' }
    ]
  },
  {
    id: 'random-username-generator',
    name: 'Random Username Generator',
    slug: 'random-username-generator',
    category: 'security-random-generators',
    description: 'Generate creative, memorable usernames combining adjectives, nouns, and numbers with customizable styles.',
    keywords: ['username generator', 'random username', 'gamertag maker', 'handle generator', 'cool usernames'],
    component: RandomUsernameGenerator,
    instructions: [
      'Select style (Tech, Creative, Gaming, Minimal).',
      'Toggle including random digits.',
      'Click Generate and copy your favorite handle.'
    ],
    limitations: ['Generates unique handle ideas locally.'],
    faqs: [
      { q: 'Are these usernames free to use anywhere?', a: 'Yes, use them for social media, games, or developer accounts.' }
    ]
  },
  {
    id: 'random-hex-color-generator',
    name: 'Random Hex Color Generator',
    slug: 'random-hex-color-generator',
    category: 'security-random-generators',
    description: 'Generate random HEX, RGB, and HSL colors with live visual preview swatches and CSS code snippets.',
    keywords: ['random hex color', 'random color generator', 'hex code generator', 'color inspiration', 'css color maker'],
    component: RandomHexColorGenerator,
    instructions: [
      'Click Generate Color to produce new random color swatches.',
      'Copy HEX (#RRGGBB) or RGB values for your CSS.'
    ],
    limitations: ['Generates across the full 24-bit sRGB color spectrum.'],
    faqs: [
      { q: 'Can I generate multiple colors at once?', a: 'Yes, generate full 5-color aesthetic palettes with one click.' }
    ]
  },

  // ==========================================
  // 6. BANK CARD & PAYMENT UTILITIES
  // ==========================================
  {
    id: 'card-format-validator',
    name: 'Bank Card Format Validator (Luhn Algorithm)',
    slug: 'card-format-validator',
    category: 'payment-utilities',
    popular: true,
    description: 'Check bank card number formatting, length, and Luhn Modulo-10 checksum validity client-side with major network detection.',
    keywords: ['card format validator', 'luhn algorithm validator', 'card number format check', 'test credit card number', 'visa mastercard format'],
    component: CardFormatValidator,
    instructions: [
      'Enter card number to check formatting.',
      'Inspect detected brand (Visa, Mastercard, Amex, Discover, RuPay).',
      'Review Luhn algorithm checksum status.'
    ],
    limitations: [
      'STRICT DISCLAIMER: This tool only validates mathematical structure and formatting via the public Luhn algorithm. It does NOT verify account active status, funds, expiration, or cardholder identity, and does NOT store or transmit card numbers.'
    ],
    faqs: [
      { q: 'Is my card number sent to any server?', a: 'Never. The Luhn calculation runs entirely inside your browser JavaScript.' },
      { q: 'Does a valid Luhn score mean the card can be charged?', a: 'No, Luhn only confirms mathematical syntax; only authorized payment processors can verify real accounts.' }
    ]
  },
  {
    id: 'luhn-checksum-calculator',
    name: 'Luhn Checksum Calculator (ISO/IEC 7812)',
    slug: 'luhn-checksum-calculator',
    category: 'payment-utilities',
    description: 'Calculate the mandatory ISO/IEC 7812 Modulo-10 check digit for identification, account, and card numbers.',
    keywords: ['luhn checksum calculator', 'modulo 10 check digit', 'luhn check digit calculator', 'iso 7812 check digit'],
    component: LuhnChecksumCalculator,
    instructions: [
      'Enter account or payload number without check digit.',
      'The calculator computes the exact check digit needed to make the sequence valid.',
      'Review the step-by-step arithmetic breakdown.'
    ],
    limitations: ['Educational and developer validation tool for standard Modulo-10.'],
    faqs: [
      { q: 'Where is the Luhn algorithm used?', a: 'In credit card numbers, IMEI phone identifiers, national ID systems, and tracking codes.' }
    ]
  },
  {
    id: 'payment-info-qr-generator',
    name: 'Payment Information QR Code Generator',
    slug: 'payment-info-qr-generator',
    category: 'payment-utilities',
    description: 'Create payment information QR codes for UPI, PayPal, and crypto wallets with amount and note formatting.',
    keywords: ['payment info qr', 'upi payment qr', 'paypal me qr', 'crypto address qr'],
    component: PaymentInfoQrGenerator,
    instructions: [
      'Choose payment type (UPI, PayPal, Bitcoin, Ethereum).',
      'Enter handle or address and optional amount.',
      'Download high-contrast QR code.'
    ],
    limitations: [
      'Disclaimer: Encodes static payment address data only. Does not execute or verify money transfers.'
    ],
    faqs: [
      { q: 'Can I add an invoice reference note?', a: 'Yes, transaction notes are encoded into compatible URI formats.' }
    ]
  },
  {
    id: 'demo-payment-reference-generator',
    name: 'Demo Payment Reference Generator',
    slug: 'demo-payment-reference-generator',
    category: 'payment-utilities',
    description: 'Generate standardized, human-readable payment reference numbers, invoice hashes, and transaction tracking IDs for billing mockups.',
    keywords: ['payment reference generator', 'transaction id maker', 'invoice reference generator', 'billing reference code'],
    component: DemoPaymentRefGenerator,
    instructions: [
      'Select reference style (ISO 11649 RF Creditor Reference, Sequential, or Alphanumeric Hash).',
      'Generate formatted reference numbers.',
      'Copy codes for invoice templates and UI testing.'
    ],
    limitations: ['Intended for billing mockups, test environments, and prototype systems.'],
    faqs: [
      { q: 'What is an ISO 11649 RF Creditor Reference?', a: 'An international standard reference format starting with RF followed by 2 check digits and account data.' }
    ]
  },

  // ==========================================
  // 7. DEVELOPER & CODE GENERATORS
  // ==========================================
  {
    id: 'html-boilerplate-generator',
    name: 'HTML5 Boilerplate Generator',
    slug: 'html-boilerplate-generator',
    category: 'developer-generators',
    popular: true,
    description: 'Generate modern HTML5 starter templates with viewport settings, SEO meta tags, OpenGraph cards, Tailwind CSS CDN, and Google Fonts.',
    keywords: ['html boilerplate generator', 'html5 template', 'starter html code', 'html skeleton generator', 'web page boilerplate'],
    component: HtmlBoilerplateGenerator,
    instructions: [
      'Configure page title, meta description, and CSS/JS framework toggles.',
      'Choose whether to include Tailwind CSS, Google Fonts, or responsive viewport meta.',
      'Copy the clean HTML5 starter template or download index.html.'
    ],
    limitations: ['Produces valid W3C semantic HTML5.'],
    faqs: [
      { q: 'Can I include modern Tailwind CSS?', a: 'Yes, toggle the Tailwind CDN option to include it automatically.' }
    ]
  },
  {
    id: 'html-table-generator',
    name: 'HTML Table Generator',
    slug: 'html-table-generator',
    category: 'developer-generators',
    popular: true,
    description: 'Visual table builder generating clean, accessible HTML table code with live preview, borders, striped rows, and CSV import.',
    keywords: ['html table generator', 'create html table', 'table code maker', 'html table builder', 'css table styling'],
    component: HtmlTableGenerator,
    instructions: [
      'Set number of rows and columns.',
      'Edit cell data directly in the visual table editor.',
      'Toggle styled borders, striped alternating rows, or hover effects.',
      'Copy generated HTML code.'
    ],
    limitations: ['Generates clean semantic <table>, <thead>, <tbody> markup.'],
    faqs: [
      { q: 'Are generated tables responsive?', a: 'Yes, options wrap the table in an overflow-x-auto container.' }
    ]
  },
  {
    id: 'css-button-generator',
    name: 'CSS Button Generator & Visual Studio',
    slug: 'css-button-generator',
    category: 'developer-generators',
    popular: true,
    description: 'Design beautiful modern CSS buttons visually with gradients, shadows, border radiuses, hover animations, and copy ready-to-use CSS/Tailwind.',
    keywords: ['css button generator', 'button designer', 'css button styling', 'tailwind button maker', 'interactive button generator'],
    component: CssButtonGenerator,
    instructions: [
      'Adjust padding, font size, background color, gradient, and border radius.',
      'Configure box shadows and hover elevation effects.',
      'Test interactive hover and active states in the live preview.',
      'Copy pure CSS or Tailwind CSS utility classes.'
    ],
    limitations: ['Modern CSS compatible with all current browsers.'],
    faqs: [
      { q: 'Can I get Tailwind CSS classes?', a: 'Yes, switch the code export tab to Tailwind mode.' }
    ]
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    slug: 'css-gradient-generator',
    category: 'developer-generators',
    popular: true,
    description: 'Create linear and radial CSS gradients with multi-stop color pickers, angle rotation, presets, and instant CSS copy.',
    keywords: ['css gradient generator', 'linear gradient', 'radial gradient', 'gradient maker', 'css background gradient'],
    component: CssGradientGenerator,
    instructions: [
      'Select Linear or Radial gradient mode.',
      'Adjust direction angle (0° to 360°).',
      'Add or adjust color stop positions.',
      'Copy the CSS background-image property.'
    ],
    limitations: ['Outputs standard CSS3 gradient syntax.'],
    faqs: [
      { q: 'Are presets available?', a: 'Yes, choose from popular modern UI color blends.' }
    ]
  },
  {
    id: 'css-box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    slug: 'css-box-shadow-generator',
    category: 'developer-generators',
    description: 'Design layered CSS box shadows with horizontal/vertical offsets, blur radius, spread, opacity, and inset shadows.',
    keywords: ['css box shadow generator', 'box shadow maker', 'css drop shadow', 'soft ui shadow', 'elevation generator'],
    component: CssBoxShadowGenerator,
    instructions: [
      'Adjust X-offset, Y-offset, blur, and spread sliders.',
      'Pick shadow color and opacity.',
      'Toggle inset inner shadow if desired.',
      'Copy CSS code.'
    ],
    limitations: ['Outputs clean box-shadow declarations.'],
    faqs: [
      { q: 'Can I create subtle modern shadows?', a: 'Yes, presets include subtle cards, elevated modals, and floating buttons.' }
    ]
  },
  {
    id: 'css-border-radius-generator',
    name: 'CSS Border Radius Generator',
    slug: 'css-border-radius-generator',
    category: 'developer-generators',
    description: 'Visually sculpt individual top-left, top-right, bottom-right, and bottom-left border radiuses with live preview.',
    keywords: ['css border radius generator', 'rounded corners maker', 'border radius preview', 'blob shape css'],
    component: CssBorderRadiusGenerator,
    instructions: [
      'Adjust overall or individual corner radius sliders.',
      'Preview shape morphing live.',
      'Copy border-radius CSS property.'
    ],
    limitations: ['Full CSS border-radius specification support.'],
    faqs: [
      { q: 'Can I create pill-shaped buttons?', a: 'Yes, set high corner radius to achieve fully rounded pill shapes.' }
    ]
  },
  {
    id: 'css-flexbox-generator',
    name: 'CSS Flexbox Playground & Code Generator',
    slug: 'css-flexbox-generator',
    category: 'developer-generators',
    popular: true,
    description: 'Interactive visual flexbox playground to master flex-direction, justify-content, align-items, flex-wrap, and gap with instant CSS output.',
    keywords: ['css flexbox generator', 'flexbox playground', 'flexbox layout maker', 'justify-content preview', 'flex builder'],
    component: CssFlexboxGenerator,
    instructions: [
      'Toggle flex direction (row, column, reverse).',
      'Adjust justify-content (center, space-between, space-around, etc.).',
      'Adjust align-items and flex wrap.',
      'Copy clean CSS container and item styles.'
    ],
    limitations: ['Provides real-time interactive HTML/CSS flex rendering.'],
    faqs: [
      { q: 'Can I add or remove items in the preview?', a: 'Yes, use the + and - buttons to test how different child counts behave.' }
    ]
  },
  {
    id: 'json-to-csv-converter',
    name: 'JSON to CSV Converter',
    slug: 'json-to-csv-converter',
    category: 'developer-generators',
    popular: true,
    description: 'Convert JSON arrays and objects into downloadable CSV spreadsheet files with automatic header extraction and quote escaping.',
    keywords: ['json to csv', 'convert json to csv', 'json to excel', 'export json as csv', 'parse json table'],
    component: JsonToCsvConverter,
    instructions: [
      'Paste your JSON array of objects.',
      'Review parsed data in the live table preview.',
      'Download CSV file or copy to clipboard.'
    ],
    limitations: ['Processes data 100% in local browser memory.'],
    faqs: [
      { q: 'Does it support nested objects?', a: 'Nested keys are flattened or stringified cleanly.' }
    ]
  },
  {
    id: 'csv-to-json-converter',
    name: 'CSV to JSON Converter',
    slug: 'csv-to-json-converter',
    category: 'developer-generators',
    popular: true,
    description: 'Convert CSV spreadsheets into clean, structured JSON arrays with automatic type detection (numbers, booleans, strings).',
    keywords: ['csv to json', 'convert csv to json', 'csv parser', 'spreadsheet to json array', 'csv to json online'],
    component: CsvToJsonConverter,
    instructions: [
      'Paste CSV text or upload a .csv file.',
      'Select whether first line contains column headers.',
      'Copy formatted JSON or download .json file.'
    ],
    limitations: ['Compliant with RFC 4180 CSV specifications.'],
    faqs: [
      { q: 'Are numbers automatically converted to JSON numbers?', a: 'Yes, numeric cells are parsed into true numbers rather than strings.' }
    ]
  },
  {
    id: 'safe-regex-tester',
    name: 'Regular Expression (Regex) Tester',
    slug: 'safe-regex-tester',
    category: 'developer-generators',
    popular: true,
    description: 'Test JavaScript regular expressions safely with match highlighting, capture groups, flag toggles, and common regex presets.',
    keywords: ['regex tester', 'regular expression tester', 'test regex online', 'regex matcher', 'regex pattern builder'],
    component: SafeRegexTester,
    instructions: [
      'Enter your regex pattern and select flags (g, i, m, s).',
      'Paste test text to view match highlights in real time.',
      'Explore common regex presets (email, URL, IP address, phone number).'
    ],
    limitations: ['Executes native ECMAScript RegExp with execution safeguards.'],
    faqs: [
      { q: 'Can I test capture groups?', a: 'Yes, extracted capture groups are listed in the match inspector table.' }
    ]
  },
  {
    id: 'sql-template-generator',
    name: 'SQL Query Template Generator',
    slug: 'sql-template-generator',
    category: 'developer-generators',
    description: 'Generate standardized SQL templates for SELECT, INSERT, UPDATE, DELETE, and CREATE TABLE across MySQL, PostgreSQL, and SQLite.',
    keywords: ['sql query generator', 'sql template builder', 'create table generator', 'select query builder', 'sql syntax helper'],
    component: SqlTemplateGenerator,
    instructions: [
      'Select query type: SELECT, INSERT, UPDATE, DELETE, or CREATE TABLE.',
      'Specify table name and column definitions.',
      'Copy formatted SQL query.'
    ],
    limitations: ['Generates clean ANSI SQL compatible across relational databases.'],
    faqs: [
      { q: 'Can I format with uppercase SQL keywords?', a: 'Yes, keywords are formatted in standard uppercase conventions.' }
    ]
  },

  // ==========================================
  // 8. BUSINESS & MARKETING TOOLS
  // ==========================================
  {
    id: 'coupon-code-generator',
    name: 'Coupon Code Generator',
    slug: 'coupon-code-generator',
    category: 'business-marketing-generators',
    popular: true,
    description: 'Generate bulk promotional coupon codes with custom prefixes, patterns, character sets, and CSV export for Shopify, WooCommerce, and e-commerce stores.',
    keywords: ['coupon code generator', 'promo coupon maker', 'bulk discount codes', 'shopify coupon generator', 'ecommerce voucher maker'],
    component: CouponCodeGenerator,
    instructions: [
      'Enter prefix (e.g. SUMMER-, SAVE20-), length, and quantity (up to 500).',
      'Select character set (Uppercase Alphanumeric, Numbers Only, Letters Only).',
      'Click Generate and download your CSV or TXT file.'
    ],
    limitations: ['Deduplication guaranteed across the entire generated batch.'],
    faqs: [
      { q: 'Can I upload these directly to Shopify or WooCommerce?', a: 'Yes, download the CSV file to import into your store discount engine.' }
    ]
  },
  {
    id: 'promo-code-generator',
    name: 'Promotional Voucher Code Generator',
    slug: 'promo-code-generator',
    category: 'business-marketing-generators',
    description: 'Create memorable promotional vouchers and event discount codes with readable word patterns.',
    keywords: ['promo code generator', 'voucher code maker', 'marketing code generator', 'gift code generator'],
    component: PromoCodeGenerator,
    instructions: [
      'Choose prefix and length.',
      'Generate promotional vouchers.',
      'Copy to clipboard or export.'
    ],
    limitations: ['Avoids confusing characters like 0/O and 1/I.'],
    faqs: [
      { q: 'Are these codes easy for customers to type?', a: 'Yes, ambiguous characters are excluded for user convenience.' }
    ]
  },
  {
    id: 'invoice-number-generator',
    name: 'Invoice Number Generator',
    slug: 'invoice-number-generator',
    category: 'business-marketing-generators',
    description: 'Generate standardized, sequential invoice numbers with year/month stamps, prefix padding, and batch generation.',
    keywords: ['invoice number generator', 'sequential invoice numbering', 'billing number format', 'invoice sequence maker'],
    component: InvoiceNumberGenerator,
    instructions: [
      'Choose prefix (e.g. INV-), date format (YYYYMM), starting number, and padding length (e.g. 4 digits: 0001).',
      'Generate individual or sequential batches.',
      'Copy or export to CSV.'
    ],
    limitations: ['Standard accounting sequential formatting.'],
    faqs: [
      { q: 'Why is zero-padding recommended?', a: 'Padding numbers (e.g. INV-2025-0042) ensures files sort chronologically in digital accounting archives.' }
    ]
  },
  {
    id: 'affiliate-link-builder',
    name: 'Affiliate Marketing Link Builder',
    slug: 'affiliate-link-builder',
    category: 'business-marketing-generators',
    description: 'Construct trackable affiliate marketing URLs with affiliate IDs, referral tags, and campaign identifiers.',
    keywords: ['affiliate link builder', 'referral link generator', 'affiliate url creator', 'tracking link maker'],
    component: AffiliateLinkBuilder,
    instructions: [
      'Enter base merchant product or landing page URL.',
      'Enter affiliate parameter name (e.g. ref, tag, aff) and your partner ID.',
      'Copy the ready-to-share tracking URL.'
    ],
    limitations: ['Preserves existing URL hash fragments and query strings safely.'],
    faqs: [
      { q: 'Does it handle URLs that already have question marks?', a: 'Yes, it appends parameters with & if query strings already exist.' }
    ]
  }
];
