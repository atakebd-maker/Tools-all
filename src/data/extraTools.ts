import React from 'react';
import { ToolItem } from './tools';

// AI Writing Tools
import {
  AiWriter,
  AiBlogWriter,
  AiEssayWriter,
  AiStoryGenerator,
  AiEmailWriter,
  AiParaphraser,
  AiTextSummarizer,
  AiGrammarChecker,
  AiTranslator,
  AiCaptionGenerator,
  AiProductDescription,
  AiSeoMetaGenerator,
  AiBusinessNameGenerator,
  AiYouTubeDescription,
  AiHashtagGenerator
} from '../tools/ai/AiWritingTools';

// AI Developer Tools
import {
  AiCodeGenerator,
  AiCodeExplainer,
  AiCodeDebugger,
  AiHtmlGenerator,
  AiCssGenerator,
  AiJavaScriptGenerator,
  AiRegexGenerator,
  AiSqlGenerator,
  AiJsonGenerator,
  AiProgrammingTutor
} from '../tools/ai/AiDeveloperTools';

// AI Education Tools
import {
  AiChatbot,
  AiQuizGenerator,
  AiMcqGenerator,
  AiFlashcardGenerator,
  AiStudyPlanGenerator,
  AiInterviewQuestions,
  AiHomeworkExplainer,
  AiVocabularyExplainer
} from '../tools/ai/AiEducationTools';

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
  // --- AI WRITING TOOLS ---
  {
    id: 'ai-writer',
    name: 'AI Writer',
    slug: 'ai-writer',
    category: 'ai-writing',
    popular: true,
    description: 'Generate high-quality articles, essays, creative prose, and structured content with Google Gemini AI.',
    keywords: ['ai writer', 'ai content generator', 'gemini ai writer', 'automated article writing', 'free ai writer'],
    component: AiWriter,
    instructions: [
      'Enter your prompt, title, or topic in the input box.',
      'Select your preferred tone and desired length.',
      'Click "Generate" to create comprehensive content with Google Gemini.',
      'Copy the generated text with one click.'
    ],
    limitations: [
      'Requires an internet connection for real-time Gemini processing.',
      'Please verify facts and references before publishing.'
    ],
    faqs: [
      { q: 'Is this AI writer free?', a: 'Yes, it connects directly through our secure Google Gemini server endpoint without requiring an account.' },
      { q: 'Can I choose the writing tone?', a: 'Yes, choose from Professional, Casual, Persuasive, Creative, or Academic.' }
    ]
  },
  {
    id: 'ai-blog-writer',
    name: 'AI Blog Post Writer',
    slug: 'ai-blog-writer',
    category: 'ai-writing',
    popular: true,
    description: 'Write complete, SEO-optimized blog posts with catchy headlines, subheadings, bullet points, and key takeaways.',
    keywords: ['ai blog writer', 'blog post generator', 'seo blog writer', 'content marketing ai', 'gemini blog writer'],
    component: AiBlogWriter,
    instructions: [
      'Enter your target keyword or blog post title.',
      'Specify your audience and writing style.',
      'Click "Generate" to receive a fully formatted blog post.'
    ],
    limitations: [
      'Content is generated based on instructions and should be personalized to your brand voice.'
    ],
    faqs: [
      { q: 'Does it format headings?', a: 'Yes, it outputs clear H2 and H3 subheadings with actionable takeaways.' }
    ]
  },
  {
    id: 'ai-essay-writer',
    name: 'AI Essay Writer',
    slug: 'ai-essay-writer',
    category: 'ai-writing',
    description: 'Create well-researched essays with clear thesis statements, body arguments, counterpoints, and conclusions.',
    keywords: ['ai essay writer', 'essay generator', 'argumentative essay ai', 'college essay helper', 'academic essay ai'],
    component: AiEssayWriter,
    instructions: [
      'Enter your essay question, topic, or thesis prompt.',
      'Select essay type (Argumentative, Expository, Analytical) and academic level.',
      'Click "Generate" to review the structured essay draft.'
    ],
    limitations: [
      'Intended as a study and research outlining aid.'
    ],
    faqs: [
      { q: 'What essay formats are supported?', a: 'Argumentative, Expository, Persuasive, Analytical, and Narrative essays.' }
    ]
  },
  {
    id: 'ai-story-generator',
    name: 'AI Story Generator',
    slug: 'ai-story-generator',
    category: 'ai-writing',
    description: 'Generate imaginative stories across sci-fi, fantasy, mystery, and thriller genres with rich character dialogue.',
    keywords: ['ai story generator', 'fiction story generator', 'creative writing ai', 'ai story writer', 'gemini plot generator'],
    component: AiStoryGenerator,
    instructions: [
      'Describe your story premise, characters, or opening scene.',
      'Select a genre and narrative pacing.',
      'Click "Generate" to read your original story.'
    ],
    limitations: [
      'Generates creative fiction based on user prompts.'
    ],
    faqs: [
      { q: 'Can I write stories in any genre?', a: 'Yes, select from Sci-Fi, Fantasy, Mystery, Thriller, or Drama.' }
    ]
  },
  {
    id: 'ai-email-writer',
    name: 'AI Email Writer',
    slug: 'ai-email-writer',
    category: 'ai-writing',
    popular: true,
    description: 'Draft professional business emails, client follow-ups, outreach proposals, and support responses in seconds.',
    keywords: ['ai email writer', 'email generator', 'business email ai', 'cold email generator', 'follow up email ai'],
    component: AiEmailWriter,
    instructions: [
      'Provide key bullet points or context of the email you want to send.',
      'Choose the scenario and tone.',
      'Click "Generate" to get multiple subject line options and a polished email body.'
    ],
    limitations: [
      'Review recipient names and dates before sending.'
    ],
    faqs: [
      { q: 'Does it suggest subject lines?', a: 'Yes, it provides 2-3 high-open-rate subject lines for every email.' }
    ]
  },
  {
    id: 'ai-paraphraser',
    name: 'AI Paraphraser',
    slug: 'ai-paraphraser',
    category: 'ai-writing',
    description: 'Rewrite and rephrase sentences, paragraphs, or articles to improve fluency, clarity, and tone.',
    keywords: ['ai paraphraser', 'sentence rewriter', 'paraphrasing tool online', 'article rewriter', 'text rephrase ai'],
    component: AiParaphraser,
    instructions: [
      'Paste your original text in the input box.',
      'Select your desired paraphrasing mode (Standard, Formal, Concise, Creative).',
      'Click "Generate" to view the rewritten version.'
    ],
    limitations: [
      'Preserves original meaning while enhancing sentence structure.'
    ],
    faqs: [
      { q: 'Does it change facts?', a: 'No, it restructures syntax and replaces vocabulary while keeping factual details intact.' }
    ]
  },
  {
    id: 'ai-text-summarizer',
    name: 'AI Text Summarizer',
    slug: 'ai-text-summarizer',
    category: 'ai-writing',
    description: 'Condense long articles, reports, transcripts, or research papers into concise bullet points or executive summaries.',
    keywords: ['ai text summarizer', 'summarize article', 'tldr generator', 'bullet point summarizer', 'executive summary ai'],
    component: AiTextSummarizer,
    instructions: [
      'Paste any article or document text.',
      'Choose summary format (Bullet Points, Executive TL;DR, or Structured).',
      'Click "Generate" to get the key takeaways.'
    ],
    limitations: [
      'Input text can be up to 32,000 characters.'
    ],
    faqs: [
      { q: 'Can it summarize PDFs or long reports?', a: 'Yes, paste the text into the input area.' }
    ]
  },
  {
    id: 'ai-grammar-checker',
    name: 'AI Grammar Checker',
    slug: 'ai-grammar-checker',
    category: 'ai-writing',
    popular: true,
    description: 'Detect and correct grammatical errors, punctuation flaws, spelling typos, and awkward phrasing.',
    keywords: ['ai grammar checker', 'proofreader online', 'spell check ai', 'fix grammar online', 'punctuation checker'],
    component: AiGrammarChecker,
    instructions: [
      'Paste text with potential typos or grammatical errors.',
      'Click "Generate" to view the fully corrected copy and an itemized list of changes.'
    ],
    limitations: [
      'Examines grammar, spelling, and readability.'
    ],
    faqs: [
      { q: 'Will it explain the errors?', a: 'Yes, it provides both the corrected text and a bulleted list of improvements made.' }
    ]
  },
  {
    id: 'ai-translator',
    name: 'AI Translator',
    slug: 'ai-translator',
    category: 'ai-writing',
    description: 'Context-aware multilingual translation across 40+ global languages preserving tone and cultural idioms.',
    keywords: ['ai translator', 'gemini language translator', 'translate text online', 'accurate translation ai', 'multilingual translator'],
    component: AiTranslator,
    instructions: [
      'Enter text in any language.',
      'Choose the target language (Spanish, French, German, Bengali, Hindi, Arabic, Japanese, etc.).',
      'Click "Generate" for an accurate translation.'
    ],
    limitations: [
      'Preserves conversational tone and idiomatic context.'
    ],
    faqs: [
      { q: 'Which languages are supported?', a: 'Over 40 major languages including Spanish, French, German, Bengali, Hindi, Japanese, and Chinese.' }
    ]
  },
  {
    id: 'ai-caption-generator',
    name: 'AI Caption Generator',
    slug: 'ai-caption-generator',
    category: 'ai-writing',
    description: 'Generate viral, engaging captions for Instagram, TikTok, LinkedIn, Twitter/X, and Facebook.',
    keywords: ['ai caption generator', 'instagram caption generator', 'tiktok captions', 'social media captions ai', 'viral caption maker'],
    component: AiCaptionGenerator,
    instructions: [
      'Enter your photo description or post topic.',
      'Select your platform.',
      'Click "Generate" for multiple caption variations with emojis and hashtags.'
    ],
    limitations: [
      'Includes hooks, body text, call-to-actions, and hashtags.'
    ],
    faqs: [
      { q: 'Does it include hashtags?', a: 'Yes, each caption option includes relevant hashtags.' }
    ]
  },
  {
    id: 'ai-product-description',
    name: 'AI Product Description Generator',
    slug: 'ai-product-description',
    category: 'ai-writing',
    description: 'Generate persuasive eCommerce product copy with benefits, technical specs, and high-converting CTAs.',
    keywords: ['product description generator', 'ecommerce copy ai', 'shopify product description', 'amazon listing copy', 'product marketing ai'],
    component: AiProductDescription,
    instructions: [
      'Enter the product name and key bullet features.',
      'Choose the brand tone.',
      'Click "Generate" to receive ready-to-use eCommerce copy.'
    ],
    limitations: [
      'Outputs headline, story intro, bulleted benefits, and CTA.'
    ],
    faqs: [
      { q: 'Is it suitable for Shopify or Amazon?', a: 'Yes, the formatting is optimized for online product listings.' }
    ]
  },
  {
    id: 'ai-seo-meta-generator',
    name: 'AI SEO Meta Generator',
    slug: 'ai-seo-meta-generator',
    category: 'ai-writing',
    description: 'Generate high-CTR SEO page titles (under 60 characters) and meta descriptions (140-160 characters).',
    keywords: ['seo meta generator', 'meta title generator', 'meta description generator', 'seo title tags ai', 'serp title generator'],
    component: AiSeoMetaGenerator,
    instructions: [
      'Enter your page topic and target primary keywords.',
      'Click "Generate" to receive 3 optimized title and meta description sets.'
    ],
    limitations: [
      'Follows Google search snippet character guidelines.'
    ],
    faqs: [
      { q: 'Does it respect character limits?', a: 'Yes, titles are 45-60 characters and descriptions are 140-160 characters.' }
    ]
  },
  {
    id: 'ai-business-name-generator',
    name: 'AI Business Name Generator',
    slug: 'ai-business-name-generator',
    category: 'ai-writing',
    description: 'Brainstorm creative, modern, brandable business and startup names with brand rationales.',
    keywords: ['business name generator', 'company name ideas', 'startup name generator', 'brand name generator', 'domain name brainstorm'],
    component: AiBusinessNameGenerator,
    instructions: [
      'Describe your business concept, target industry, or mission.',
      'Click "Generate" to get 15 unique brand name ideas with rationales.'
    ],
    limitations: [
      'Remember to check trademark and domain availability before launch.'
    ],
    faqs: [
      { q: 'What types of names does it generate?', a: 'Invented words, compound phrases, descriptive names, and minimalist labels.' }
    ]
  },
  {
    id: 'ai-youtube-description',
    name: 'AI YouTube Description Generator',
    slug: 'ai-youtube-description',
    category: 'ai-writing',
    description: 'Generate SEO-optimized YouTube video descriptions with timestamps template and social links section.',
    keywords: ['youtube description generator', 'youtube seo ai', 'video description maker', 'youtube tags description', 'youtube marketing ai'],
    component: AiYouTubeDescription,
    instructions: [
      'Enter your video title and main content topics.',
      'Click "Generate" for an SEO-packed description template.'
    ],
    limitations: [
      'Includes chapter timestamp placeholders and resource links area.'
    ],
    faqs: [
      { q: 'Will this help ranking on YouTube?', a: 'Yes, it embeds high-intent search keywords naturally into the description.' }
    ]
  },
  {
    id: 'ai-hashtag-generator',
    name: 'AI Hashtag Generator',
    slug: 'ai-hashtag-generator',
    category: 'ai-writing',
    description: 'Generate 25-30 trending, targeted hashtags grouped by reach (High-Volume, Medium, and Niche).',
    keywords: ['hashtag generator', 'instagram hashtags ai', 'tiktok hashtags', 'trending hashtags', 'social media tags'],
    component: AiHashtagGenerator,
    instructions: [
      'Enter your topic, niche, or photo concept.',
      'Click "Generate" to get tiered hashtags for maximum organic reach.'
    ],
    limitations: [
      'Categorized into popular, medium, and niche reach.'
    ],
    faqs: [
      { q: 'How many hashtags does it create?', a: 'Between 25 and 30 hashtags grouped by competition tier.' }
    ]
  },

  // --- AI DEVELOPER TOOLS ---
  {
    id: 'ai-code-generator',
    name: 'AI Code Generator',
    slug: 'ai-code-generator',
    category: 'ai-developer',
    popular: true,
    description: 'Generate robust, typed functions, classes, and scripts in TypeScript, Python, JavaScript, Go, Rust, and more.',
    keywords: ['ai code generator', 'code generator online', 'generate typescript code', 'python code generator', 'gemini code ai'],
    component: AiCodeGenerator,
    instructions: [
      'Describe the programming task in detail.',
      'Select your target language (TypeScript, Python, JavaScript, Go, etc.).',
      'Click "Generate" and copy the resulting code.'
    ],
    limitations: [
      'Generated code should always be reviewed and tested in your development environment.'
    ],
    faqs: [
      { q: 'Which programming languages are supported?', a: 'TypeScript, JavaScript, Python, Go, Rust, Java, C++, C#, PHP, and SQL.' }
    ]
  },
  {
    id: 'ai-code-explainer',
    name: 'AI Code Explainer',
    slug: 'ai-code-explainer',
    category: 'ai-developer',
    description: 'Understand legacy code, complex algorithms, or unfamiliar syntax with line-by-line breakdowns.',
    keywords: ['ai code explainer', 'code walkthrough', 'understand code ai', 'explain algorithm online', 'code documentation ai'],
    component: AiCodeExplainer,
    instructions: [
      'Paste your code snippet.',
      'Choose explanation depth.',
      'Click "Generate" to see the architectural overview and line-by-line walkthrough.'
    ],
    limitations: [
      'Explains logic, time complexity, and edge cases.'
    ],
    faqs: [
      { q: 'Does it calculate Big-O complexity?', a: 'Yes, it provides time and space complexity evaluations.' }
    ]
  },
  {
    id: 'ai-code-debugger',
    name: 'AI Code Debugger',
    slug: 'ai-code-debugger',
    category: 'ai-developer',
    popular: true,
    description: 'Diagnose runtime errors, stack traces, logic bugs, race conditions, and get fixed code.',
    keywords: ['ai code debugger', 'fix code bug online', 'diagnose exception', 'debug javascript', 'python debugger ai'],
    component: AiCodeDebugger,
    instructions: [
      'Paste your buggy code and any error message or stack trace.',
      'Click "Generate" for root cause analysis and the corrected snippet.'
    ],
    limitations: [
      'Explains why the bug happened and how to prevent it.'
    ],
    faqs: [
      { q: 'Can it debug syntax and runtime errors?', a: 'Yes, provide the error message for fastest root-cause identification.' }
    ]
  },
  {
    id: 'ai-html-generator',
    name: 'AI HTML Generator',
    slug: 'ai-html-generator',
    category: 'ai-developer',
    description: 'Create modern, semantic, accessible HTML5 elements with appropriate ARIA attributes.',
    keywords: ['ai html generator', 'html component generator', 'semantic html generator', 'accessible html ai', 'pricing table html'],
    component: AiHtmlGenerator,
    instructions: [
      'Describe the HTML component, form, table, or layout you need.',
      'Click "Generate" to copy valid semantic HTML5.'
    ],
    limitations: [
      'Outputs semantic markup with accessibility best practices.'
    ],
    faqs: [
      { q: 'Are ARIA attributes included?', a: 'Yes, forms and interactive components include proper ARIA roles and labels.' }
    ]
  },
  {
    id: 'ai-css-generator',
    name: 'AI CSS Generator',
    slug: 'ai-css-generator',
    category: 'ai-developer',
    description: 'Generate pure CSS or Tailwind CSS utility classes for modern layouts, gradients, animations, and cards.',
    keywords: ['ai css generator', 'tailwind css generator', 'css styles ai', 'glassmorphism css', 'flexbox grid generator'],
    component: AiCssGenerator,
    instructions: [
      'Describe your UI design requirement or component style.',
      'Select CSS flavor (Pure Modern CSS, Tailwind CSS, or SCSS).',
      'Click "Generate" to receive clean styles.'
    ],
    limitations: [
      'Outputs standard CSS3 or Tailwind CSS utilities.'
    ],
    faqs: [
      { q: 'Can it generate Tailwind CSS classes?', a: 'Yes, choose Tailwind CSS in the flavor selector.' }
    ]
  },
  {
    id: 'ai-javascript-generator',
    name: 'AI JavaScript Generator',
    slug: 'ai-javascript-generator',
    category: 'ai-developer',
    description: 'Generate modern ES6+ scripts, DOM event handlers, async API fetchers, and utilities.',
    keywords: ['ai javascript generator', 'es6 code generator', 'vanilla js generator', 'async await javascript ai', 'dom manipulation code'],
    component: AiJavaScriptGenerator,
    instructions: [
      'Specify what JavaScript behavior or utility you need.',
      'Click "Generate" to copy clean ES6+ code.'
    ],
    limitations: [
      'Uses modern standards: async/await, arrow functions, destructuring.'
    ],
    faqs: [
      { q: 'Does it include usage examples?', a: 'Yes, it provides code along with an execution example.' }
    ]
  },
  {
    id: 'ai-regex-generator',
    name: 'AI Regex Generator',
    slug: 'ai-regex-generator',
    category: 'ai-developer',
    description: 'Generate regular expressions with regex flags, token explanations, and test cases.',
    keywords: ['ai regex generator', 'regular expression maker', 'regex pattern generator', 'regex explainer', 'test regex ai'],
    component: AiRegexGenerator,
    instructions: [
      'Describe the string format or validation requirement.',
      'Click "Generate" to receive the pattern, token breakdown, and test examples.'
    ],
    limitations: [
      'Provides pattern, explanation, and positive/negative test cases.'
    ],
    faqs: [
      { q: 'Does it explain each regex token?', a: 'Yes, it explains groups, quantifiers, and boundary assertions.' }
    ]
  },
  {
    id: 'ai-sql-generator',
    name: 'AI SQL Generator',
    slug: 'ai-sql-generator',
    category: 'ai-developer',
    popular: true,
    description: 'Generate complex SQL queries, JOINs, aggregations, CTEs, and schema migrations across PostgreSQL, MySQL, and SQLite.',
    keywords: ['ai sql generator', 'sql query maker', 'text to sql', 'postgresql query generator', 'mysql query ai'],
    component: AiSqlGenerator,
    instructions: [
      'Describe the query requirement or table schema.',
      'Choose your SQL dialect (PostgreSQL, MySQL, SQLite, T-SQL).',
      'Click "Generate" for optimized SQL.'
    ],
    limitations: [
      'Optimized with index recommendations.'
    ],
    faqs: [
      { q: 'Which SQL dialects are supported?', a: 'PostgreSQL, MySQL, SQLite, Microsoft SQL Server, and Oracle.' }
    ]
  },
  {
    id: 'ai-json-generator',
    name: 'AI JSON Generator',
    slug: 'ai-json-generator',
    category: 'ai-developer',
    description: 'Generate realistic mock JSON datasets, API response fixtures, and nested data schemas.',
    keywords: ['ai json generator', 'mock json generator', 'api fixture generator', 'fake data json', 'json schema generator'],
    component: AiJsonGenerator,
    instructions: [
      'Describe your JSON data schema or sample entity attributes.',
      'Click "Generate" to get valid, properly formatted JSON.'
    ],
    limitations: [
      'Outputs valid RFC 8259 JSON.'
    ],
    faqs: [
      { q: 'Is the output valid JSON?', a: 'Yes, formatted and ready to parse with JSON.parse().' }
    ]
  },
  {
    id: 'ai-programming-tutor',
    name: 'AI Programming Tutor',
    slug: 'ai-programming-tutor',
    category: 'ai-developer',
    description: 'Interactive computer science tutor for algorithms, data structures, and engineering design patterns.',
    keywords: ['ai programming tutor', 'learn coding ai', 'computer science tutor', 'algorithm tutor', 'software architecture tutor'],
    component: AiProgrammingTutor,
    instructions: [
      'Enter any programming concept, data structure, or problem.',
      'Click "Generate" for an intuitive explanation with code examples and practice problems.'
    ],
    limitations: [
      'Pedagogical tutor with analogies and practice challenges.'
    ],
    faqs: [
      { q: 'Is this suitable for beginners?', a: 'Yes, it breaks down complex concepts into accessible steps.' }
    ]
  },

  // --- AI CHAT & EDUCATION ---
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    slug: 'ai-chatbot',
    category: 'ai-education',
    popular: true,
    description: 'Interactive conversational AI assistant powered by Google Gemini 2.5 Flash for Q&A, brainstorming, and problem solving.',
    keywords: ['ai chatbot', 'gemini chatbot free', 'chat with ai', 'conversational ai', 'free ai assistant'],
    component: AiChatbot,
    instructions: [
      'Type your question or message in the chat input.',
      'Press Enter or click "Send" to converse with the AI assistant.',
      'Continue the multi-turn conversation or click "Clear Chat" to reset.'
    ],
    limitations: [
      'Conversational memory is maintained in the current browser session.'
    ],
    faqs: [
      { q: 'Does this chatbot require a login?', a: 'No, it works instantly without registration or sign-in.' }
    ]
  },
  {
    id: 'ai-quiz-generator',
    name: 'AI Quiz Generator',
    slug: 'ai-quiz-generator',
    category: 'ai-education',
    description: 'Generate comprehensive quizzes with question prompts, multiple difficulty levels, and full answer keys.',
    keywords: ['ai quiz generator', 'quiz maker ai', 'test generator online', 'classroom quiz creator', 'study quiz ai'],
    component: AiQuizGenerator,
    instructions: [
      'Enter your quiz topic or syllabus section.',
      'Select number of questions (5, 10, or 15) and difficulty.',
      'Click "Generate" to review the questions and answer key.'
    ],
    limitations: [
      'Provides questions first, followed by a separate answer explanation key.'
    ],
    faqs: [
      { q: 'Can teachers use this for exams?', a: 'Yes, it generates diverse questions with accurate explanations.' }
    ]
  },
  {
    id: 'ai-mcq-generator',
    name: 'AI Multiple Choice (MCQ) Generator',
    slug: 'ai-mcq-generator',
    category: 'ai-education',
    description: 'Generate standard 4-option MCQs with plausible distractors, correct answers, and pedagogical rationales.',
    keywords: ['ai mcq generator', 'multiple choice question generator', 'mcq maker online', 'exam mcq creator', 'test question generator'],
    component: AiMcqGenerator,
    instructions: [
      'Specify the subject or textbook chapter.',
      'Select the quantity of questions.',
      'Click "Generate" for 4-option MCQs with explanations.'
    ],
    limitations: [
      'Includes options A, B, C, D with rationales.'
    ],
    faqs: [
      { q: 'Are distractors realistic?', a: 'Yes, distractors are designed to test common misconceptions.' }
    ]
  },
  {
    id: 'ai-flashcard-generator',
    name: 'AI Flashcard Generator',
    slug: 'ai-flashcard-generator',
    category: 'ai-education',
    description: 'Create active-recall flashcard decks (Front / Back) optimized for spaced repetition studying.',
    keywords: ['ai flashcard generator', 'flashcard maker ai', 'anki flashcards generator', 'study cards ai', 'active recall generator'],
    component: AiFlashcardGenerator,
    instructions: [
      'Enter your study topic or paste study notes.',
      'Choose the card count.',
      'Click "Generate" to receive formatted flashcards.'
    ],
    limitations: [
      'Bite-sized prompts on Front, concise answers on Back.'
    ],
    faqs: [
      { q: 'Can I copy these into Anki or Quizlet?', a: 'Yes, the Front/Back format is easy to copy and import.' }
    ]
  },
  {
    id: 'ai-study-plan-generator',
    name: 'AI Study Plan Generator',
    slug: 'ai-study-plan-generator',
    category: 'ai-education',
    description: 'Build structured, personalized study schedules with weekly milestones for exams and certifications.',
    keywords: ['ai study plan generator', 'study schedule maker', 'exam timetable ai', 'personalized learning plan', 'curriculum generator'],
    component: AiStudyPlanGenerator,
    instructions: [
      'Enter your target exam or skill.',
      'Select your timeline and available daily study hours.',
      'Click "Generate" for a structured day-by-day plan.'
    ],
    limitations: [
      'Includes syllabus breakdown, review milestones, and practice days.'
    ],
    faqs: [
      { q: 'Can I specify custom daily hours?', a: 'Yes, choose from 1 hour, 2 hours, or 4+ hours per day.' }
    ]
  },
  {
    id: 'ai-interview-questions',
    name: 'AI Interview Questions & Answers',
    slug: 'ai-interview-questions',
    category: 'ai-education',
    description: 'Practice role-specific technical, behavioral, and situational job interview questions with STAR answers.',
    keywords: ['ai interview questions', 'interview prep ai', 'star method interview', 'technical interview questions', 'mock interview prep'],
    component: AiInterviewQuestions,
    instructions: [
      'Enter your target job title and industry.',
      'Select question focus (Technical, Behavioral, or Mixed).',
      'Click "Generate" to review realistic questions with high-scoring answers.'
    ],
    limitations: [
      'Includes interviewer evaluation criteria and STAR model answers.'
    ],
    faqs: [
      { q: 'What is the STAR method?', a: 'Situation, Task, Action, and Result — the gold standard for behavioral interviews.' }
    ]
  },
  {
    id: 'ai-homework-explainer',
    name: 'AI Homework Explainer',
    slug: 'ai-homework-explainer',
    category: 'ai-education',
    description: 'Get step-by-step explanations, formulas, and verified solutions for math and science homework problems.',
    keywords: ['ai homework explainer', 'homework solver', 'math problem explainer', 'physics tutor ai', 'step by step homework helper'],
    component: AiHomeworkExplainer,
    instructions: [
      'Paste your homework question or math/physics problem.',
      'Click "Generate" for the methodical step-by-step walkthrough.'
    ],
    limitations: [
      'Breaks down given facts, formulas, calculations, and units.'
    ],
    faqs: [
      { q: 'Does it show all calculation steps?', a: 'Yes, it provides the formula and each mathematical step clearly.' }
    ]
  },
  {
    id: 'ai-vocabulary-explainer',
    name: 'AI Vocabulary Explainer',
    slug: 'ai-vocabulary-explainer',
    category: 'ai-education',
    description: 'Explore word definitions, etymology, root origins, subtle synonym differences, and contextual sentences.',
    keywords: ['ai vocabulary explainer', 'dictionary ai', 'etymology lookup', 'word definitions ai', 'synonym nuance explainer'],
    component: AiVocabularyExplainer,
    instructions: [
      'Enter any word or phrase.',
      'Click "Generate" for an in-depth lexicographical breakdown.'
    ],
    limitations: [
      'Covers definitions, origins, synonyms/antonyms, and real example sentences.'
    ],
    faqs: [
      { q: 'Does it explain origins?', a: 'Yes, it traces Latin, Greek, or Germanic etymological roots.' }
    ]
  },

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
