# Zynovexa - All-in-One Online Tools & Automation Platform

A modern, responsive, SEO-friendly multi-category online tools website combining **Google Gemini AI-powered tools** and **high-performance browser-native tools**.

---

## 🚀 Key Highlights

- **Server-Side Google Gemini AI Integration**: Official `@google/genai` TypeScript SDK using `gemini-3.8-flash`. API keys are securely stored server-side in environment variables and never exposed to the client.
- **100% Client-Side Privacy for Files**: All non-AI utilities (PDF manipulation, image editing, text formatting, hashing) run locally inside the user's browser using HTML5 Canvas, Web Cryptography, and `pdf-lib`. No files are uploaded to external servers.
- **Full SEO & Structured Data**: Search-engine-friendly URLs, meta titles (45-60 chars), meta descriptions (140-160 chars), semantic H1/H2 hierarchy, XML sitemap (`/sitemap.xml`), and `robots.txt`.
- **Responsive Modern Design**: Built with Tailwind CSS, clean white theme with `#2563EB` primary brand color, desktop-only skyscraper advertisement rails, mobile-first responsive layout, and accessible UI controls.

---

## 🛠️ Implemented Tools Catalog

### 1. AI-Powered Tools (Requires Server `GEMINI_API_KEY`)

#### AI Writing Tools (`/categories/ai-writing`)
1. **AI Writer** (`/tools/ai-writer`): General multi-tone article, paragraph, and creative prose writer.
2. **AI Blog Post Writer** (`/tools/ai-blog-writer`): SEO-optimized blog posts with H2/H3 headings and key takeaways.
3. **AI Essay Writer** (`/tools/ai-essay-writer`): Argumentative, expository, and analytical essays with thesis arguments.
4. **AI Story Generator** (`/tools/ai-story-generator`): Fiction stories across sci-fi, fantasy, mystery, and thriller genres.
5. **AI Email Writer** (`/tools/ai-email-writer`): Business inquiries, cold outreach, and client follow-ups with subject line options.
6. **AI Paraphraser** (`/tools/ai-paraphraser`): Rephrasing tool with Standard, Formal, Concise, and Creative modes.
7. **AI Text Summarizer** (`/tools/ai-text-summarizer`): Bulleted takeaways, executive TL;DRs, and structured document breakdowns.
8. **AI Grammar Checker** (`/tools/ai-grammar-checker`): Proofreader correcting syntax, spelling, punctuation, and wording.
9. **AI Translator** (`/tools/ai-translator`): Context-aware multilingual translation across 40+ global languages.
10. **AI Caption Generator** (`/tools/ai-caption-generator`): Social media captions for Instagram, TikTok, LinkedIn, and Facebook.
11. **AI Product Description Generator** (`/tools/ai-product-description`): High-converting eCommerce product copy.
12. **AI SEO Meta Generator** (`/tools/ai-seo-meta-generator`): Strict-character-limit SEO title tags and meta descriptions.
13. **AI Business Name Generator** (`/tools/ai-business-name-generator`): Brandable company, startup, and domain name ideas.
14. **AI YouTube Description Generator** (`/tools/ai-youtube-description`): Search-optimized video descriptions with timestamp templates.
15. **AI Hashtag Generator** (`/tools/ai-hashtag-generator`): Tiered hashtags (High, Medium, Niche) for social media reach.

#### AI Developer Tools (`/categories/ai-developer`)
16. **AI Code Generator** (`/tools/ai-code-generator`): Clean, commented code in TypeScript, Python, Go, Rust, Java, and C++.
17. **AI Code Explainer** (`/tools/ai-code-explainer`): Line-by-line breakdown and Big-O complexity analysis.
18. **AI Code Debugger** (`/tools/ai-code-debugger`): Root-cause analysis, bug fixing, and prevention advice.
19. **AI HTML Generator** (`/tools/ai-html-generator`): Semantic, accessible HTML5 elements with ARIA roles.
20. **AI CSS Generator** (`/tools/ai-css-generator`): Modern CSS rules and Tailwind CSS utility classes.
21. **AI JavaScript Generator** (`/tools/ai-javascript-generator`): ES6+ scripts, DOM event handlers, and async fetchers.
22. **AI Regex Generator** (`/tools/ai-regex-generator`): Regular expression patterns with flags, token breakdown, and test strings.
23. **AI SQL Generator** (`/tools/ai-sql-generator`): Optimized SQL queries for PostgreSQL, MySQL, and SQLite.
24. **AI JSON Generator** (`/tools/ai-json-generator`): Realistic mock JSON datasets and API response fixtures.
25. **AI Programming Tutor** (`/tools/ai-programming-tutor`): Interactive computer science and algorithms mentor.

#### AI Chat & Education (`/categories/ai-education`)
26. **AI Chatbot** (`/tools/ai-chatbot`): Interactive multi-turn conversational AI assistant.
27. **AI Quiz Generator** (`/tools/ai-quiz-generator`): Multi-level quizzes with questions and full answer keys.
28. **AI MCQ Generator** (`/tools/ai-mcq-generator`): 4-option multiple-choice questions with rationales.
29. **AI Flashcard Generator** (`/tools/ai-flashcard-generator`): Active-recall Front/Back study flashcards.
30. **AI Study Plan Generator** (`/tools/ai-study-plan-generator`): Structured day-by-day exam and certification schedules.
31. **AI Interview Questions** (`/tools/ai-interview-questions`): Role-specific interview prep with STAR model answers.
32. **AI Homework Explainer** (`/tools/ai-homework-explainer`): Step-by-step math and science problem solving.
33. **AI Vocabulary Explainer** (`/tools/ai-vocabulary-explainer`): Etymology, nuanced definitions, and contextual sentences.

---

### 2. Browser-Native Tools (100% Free • No API Required)

#### Text Processing Tools
34. **Word Counter** (`/tools/word-counter`): Words, characters, reading time, keyword density.
35. **Character Counter** (`/tools/character-counter`): Exact letter, digit, symbol, and UTF-8 byte breakdown.
36. **Case Converter** (`/tools/case-converter`): UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case.
37. **Remove Extra Spaces** (`/tools/remove-extra-spaces`): Clean whitespace, trailing spaces, and blank lines.
38. **Remove Duplicate Lines** (`/tools/remove-duplicate-lines`): Unique items finder with case-sensitivity option.
39. **Text Reverser** (`/tools/text-reverser`): Reverse characters, flip words, or reverse lines.
40. **Sort Lines** (`/tools/sort-lines`): A-Z, Z-A, numerical, and length-based line sorting.
41. **Find and Replace** (`/tools/find-replace`): Multi-pattern replacement with case-match and regex support.
42. **Text to Slug** (`/tools/text-to-slug`): SEO-friendly URL slug generator with accent normalization.
43. **URL Encoder and Decoder** (`/tools/url-encoder-decoder`): Percent-encoding for query strings.
44. **Base64 Encoder and Decoder** (`/tools/base64-tool`): Standard Base64 text and binary conversion.
45. **Text Diff Checker** (`/tools/text-diff`): Visual side-by-side comparison of text differences.
46. **Lorem Ipsum Generator** (`/tools/lorem-ipsum`): Placeholder paragraphs, sentences, and words.

#### Image Processing Tools
47. **Image Resizer** (`/tools/image-resizer`): Custom pixel dimensions, percentage scaling, aspect ratio locking.
48. **Image Cropper** (`/tools/image-cropper`): Interactive visual cropping with preset ratios (1:1, 16:9, 4:3).
49. **Image Compressor** (`/tools/image-compressor`): Lossy compression with quality control and live size estimation.
50. **Image Format Converter** (`/tools/image-format-converter`): Convert between PNG, JPEG, and WebP.
51. **Image Rotator** (`/tools/image-rotator`): 90°, 180°, and 270° orientation rotation.
52. **Image Flipper** (`/tools/image-flipper`): Horizontal mirror and vertical flip.
53. **Image Preview & Inspector** (`/tools/image-preview-tool`): Pixel dimensions, aspect ratio, MIME type, and file size.
54. **Image Filters** (`/tools/image-filters`): Grayscale, sepia, blur, contrast, brightness, invert.
55. **Image Watermark** (`/tools/image-watermark`): Overlay text watermarks with opacity and position controls.
56. **Image Color Picker** (`/tools/image-color-picker`): Eyedropper tool to pick pixel colors from photos.

#### Calculators & Financial Tools
57. **Basic Calculator** (`/tools/basic-calculator`): Pocket 4-function memory calculator.
58. **Scientific Calculator** (`/tools/scientific-calculator`): Trigonometric (sin/cos/tan), logarithmic, exponential functions.
59. **Percentage Calculator** (`/tools/percentage-calculator`): Percentage of number, percentage change, increase/decrease.
60. **Loan EMI Calculator** (`/tools/loan-calculator`): Monthly payments, total interest, and amortization schedule.
61. **Compound Interest Calculator** (`/tools/compound-interest-calculator`): Monthly, quarterly, and annual compound growth.
62. **BMI Calculator** (`/tools/bmi-calculator`): Body Mass Index and health category indicator.
63. **Age Calculator** (`/tools/age-calculator`): Exact age in years, months, days, hours, and minutes.
64. **Date Difference Calculator** (`/tools/date-difference-calculator`): Duration between two dates in days, weeks, months.
65. **Time Calculator** (`/tools/time-calculator`): Add and subtract hours, minutes, and decimal hours.
66. **Discount Calculator** (`/tools/discount-calculator`): Savings and final price on retail sales.
67. **GST / VAT Calculator** (`/tools/gst-calculator`): Exclusive (add tax) and inclusive (extract tax) calculations.
68. **Average Calculator** (`/tools/average-calculator`): Mean, median, sum, and range.
69. **Ratio Calculator** (`/tools/ratio-calculator`): Solve A:B = C:D proportions and scale dimensions.
70. **Universal Unit Converter** (`/tools/universal-unit-converter`): Length, weight, volume, digital data, speed, time.
71. **Temperature Converter** (`/tools/temperature-converter`): Celsius, Fahrenheit, and Kelvin conversions.
72. **Tip Calculator** (`/tools/tip-calculator`): Restaurant bill splitting and custom gratuity.

#### Developer & Webmaster Tools
73. **JSON Formatter & Validator** (`/tools/json-formatter`): Indent, validate, and minify JSON data.
74. **HTML Entity Encoder & Decoder** (`/tools/html-encoder-decoder`): Safely escape HTML characters.
75. **CSS Formatter & Minifier** (`/tools/css-formatter`): Beautify styles or minify CSS stylesheets.
76. **HTML Minifier** (`/tools/html-minifier`): Strip comments and redundant whitespace.
77. **URL Parser** (`/tools/url-parser`): Inspect protocol, host, path, and query parameters table.
78. **HEX to RGB Converter** (`/tools/hex-to-rgb-converter`): Bidirectional HEX and RGB color conversion.
79. **XML Formatter** (`/tools/xml-formatter`): Indent and format XML and SVG documents.
80. **UUID Generator** (`/tools/uuid-generator`): Generate cryptographically secure v4 UUIDs.
81. **JWT Decoder** (`/tools/jwt-decoder`): Decode JWT header and payload claims client-side.
82. **Hash Generator** (`/tools/hash-generator`): Compute SHA-1, SHA-256, SHA-384, SHA-512 hashes.
83. **Regex Tester** (`/tools/regex-tester`): Test regular expressions with live highlight matches.
84. **HTML Previewer** (`/tools/html-previewer`): Live HTML, CSS, and JS sandboxed sandbox.
85. **Password Generator** (`/tools/password-generator`): Strong random passwords with entropy score.
86. **Robots.txt Generator** (`/tools/robots-generator`): Generate custom search-engine crawl directives.
87. **Sitemap Generator** (`/tools/sitemap-generator`): Generate valid XML sitemaps for websites.
88. **SERP Preview Tool** (`/tools/serp-preview`): Google search results snippet simulator.

#### PDF Tools
89. **Merge PDF** (`/tools/pdf-merger`): Combine multiple PDF documents into a single document.
90. **Split PDF** (`/tools/pdf-splitter`): Split multi-page PDFs into individual pages.
91. **Rotate PDF Pages** (`/tools/pdf-rotator`): Rotate individual pages or entire documents.
92. **Extract PDF Pages** (`/tools/pdf-page-extractor`): Extract specific pages and download a new PDF.
93. **Delete PDF Pages** (`/tools/pdf-page-deleter`): Remove unwanted pages and download clean PDF.
94. **Images to PDF** (`/tools/images-to-pdf`): Convert JPG and PNG images into a PDF document.
95. **Text to PDF** (`/tools/text-to-pdf`): Convert plain text into a downloadable PDF document.
96. **PDF Info Viewer & Page Counter** (`/tools/pdf-info-viewer`): Inspect page count, author, and metadata.

---

## 🔒 Gemini API Security & Architecture

1. **Server-Side API Proxy**:
   - The frontend never connects directly to Gemini with an API key.
   - All AI requests pass through `POST /api/gemini` in `server.ts`.
2. **Environment Variable Storage**:
   - `GEMINI_API_KEY` is loaded from process environment or `.env`.
   - Never committed to source control or bundled into the client build.
3. **Safety & Rate Limiting**:
   - Input strings are validated with character limits (up to 32,000 characters).
   - Generates loading states and handles API quota/rate limits with retry options.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd zynovexa
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Guide

### Option 1: Google Cloud Run (Recommended for AI Studio)
The project includes a ready-to-use full-stack Express server (`server.ts`):
```bash
# Build production bundle
npm run build

# Start production server
npm start
```
Make sure to set the `GEMINI_API_KEY` environment variable in the Cloud Run service configuration.

### Option 2: Render / Railway / Heroku
1. Connect your repository.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. In the Environment Variables settings, add `GEMINI_API_KEY=<your-key>`.

### Option 3: Docker Deployment
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📄 License
MIT License. Built for performance, security, and privacy.
