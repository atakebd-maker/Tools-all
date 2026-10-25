import React from 'react';
import { AiToolTemplate } from '../../components/AiToolTemplate';

// 1. AI Writer
export const AiWriter: React.FC = () => (
  <AiToolTemplate
    toolName="AI General Writer"
    tagline="Generate high-quality articles, paragraphs, outlines, or creative text on any topic."
    systemInstruction="You are a versatile, professional AI writer. Write well-structured, engaging, original content based on the user's instructions and tone."
    inputLabel="Topic or Prompt"
    inputPlaceholder="e.g. Write an article about the future of renewable energy and battery storage..."
    customFields={[
      {
        id: 'tone',
        label: 'Tone',
        type: 'select',
        options: [
          { label: 'Professional & Informative', value: 'professional and informative' },
          { label: 'Casual & Conversational', value: 'casual and conversational' },
          { label: 'Persuasive & Engaging', value: 'persuasive and engaging' },
          { label: 'Creative & Storytelling', value: 'creative and storytelling' },
          { label: 'Academic & Formal', value: 'academic and formal' }
        ]
      },
      {
        id: 'length',
        label: 'Desired Length',
        type: 'select',
        options: [
          { label: 'Medium (~300-500 words)', value: 'medium length (~300-500 words)' },
          { label: 'Short (~150-250 words)', value: 'short (~150-250 words)' },
          { label: 'Detailed (~600-1000 words)', value: 'comprehensive and detailed (~600-1000 words)' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write a ${fields.length || 'medium length'} piece in a ${fields.tone || 'professional'} tone about the following topic:\n\n${input}`}
  />
);

// 2. AI Blog Writer
export const AiBlogWriter: React.FC = () => (
  <AiToolTemplate
    toolName="AI Blog Post Writer"
    tagline="Create comprehensive, SEO-optimized blog posts complete with catchy headlines, subheadings, and key takeaways."
    systemInstruction="You are an expert content marketer and blog writer. Produce engaging, reader-friendly blog posts with clear headings (H2, H3), bullet points, and an actionable conclusion."
    inputLabel="Blog Topic / Keyword Focus"
    inputPlaceholder="e.g. 7 actionable strategies to boost website conversion rates in 2026..."
    customFields={[
      {
        id: 'audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'e.g. Small business owners, junior developers'
      },
      {
        id: 'tone',
        label: 'Writing Style',
        type: 'select',
        options: [
          { label: 'Engaging & Actionable', value: 'engaging, practical, and actionable' },
          { label: 'Authoritative & In-depth', value: 'authoritative, research-driven, and comprehensive' },
          { label: 'Beginner-Friendly', value: 'beginner-friendly and approachable' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write an SEO-friendly blog post on:\n"${input}"\nTarget Audience: ${fields.audience || 'General audience'}\nWriting Style: ${fields.tone || 'Engaging'}`}
  />
);

// 3. AI Essay Writer
export const AiEssayWriter: React.FC = () => (
  <AiToolTemplate
    toolName="AI Essay Writer"
    tagline="Craft structured essays with thesis statements, body arguments, counterpoints, and references."
    systemInstruction="You are an academic essayist. Write well-structured essays with an introduction containing a clear thesis statement, substantiated body paragraphs, analytical counterarguments, and a logical conclusion."
    inputLabel="Essay Topic / Prompt"
    inputPlaceholder="e.g. The ethical implications of artificial intelligence in healthcare..."
    customFields={[
      {
        id: 'type',
        label: 'Essay Type',
        type: 'select',
        options: [
          { label: 'Argumentative', value: 'argumentative essay' },
          { label: 'Expository', value: 'expository essay' },
          { label: 'Persuasive', value: 'persuasive essay' },
          { label: 'Analytical', value: 'analytical essay' },
          { label: 'Narrative', value: 'narrative essay' }
        ]
      },
      {
        id: 'level',
        label: 'Academic Level',
        type: 'select',
        options: [
          { label: 'College / University', value: 'college undergraduate level' },
          { label: 'High School', value: 'high school level' },
          { label: 'Postgraduate / Scholarly', value: 'scholarly graduate level' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write a ${fields.type || 'argumentative essay'} suitable for a ${fields.level || 'college'} level on the topic:\n\n${input}`}
  />
);

// 4. AI Story Generator
export const AiStoryGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Story Generator"
    tagline="Generate creative stories, plots, and narratives across fantasy, sci-fi, thriller, and mystery."
    systemInstruction="You are an imaginative fiction author. Write captivating stories with vivid imagery, authentic dialogue, character development, and narrative tension."
    inputLabel="Story Concept or Premise"
    inputPlaceholder="e.g. A deep-space lighthouse keeper receives an anomaly transmission from an unknown quadrant..."
    customFields={[
      {
        id: 'genre',
        label: 'Genre',
        type: 'select',
        options: [
          { label: 'Science Fiction', value: 'Science Fiction' },
          { label: 'Fantasy & Adventure', value: 'Fantasy' },
          { label: 'Mystery & Detective', value: 'Mystery' },
          { label: 'Psychological Thriller', value: 'Thriller' },
          { label: 'Drama & Realism', value: 'Contemporary Drama' }
        ]
      },
      {
        id: 'pacing',
        label: 'Pacing',
        type: 'select',
        options: [
          { label: 'Fast & Action-Packed', value: 'fast-paced and thrilling' },
          { label: 'Atmospheric & Deep', value: 'atmospheric, slow-burn, and character-driven' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write an original ${fields.genre || 'fiction'} story that is ${fields.pacing || 'compelling'} based on this premise:\n\n${input}`}
  />
);

// 5. AI Email Writer
export const AiEmailWriter: React.FC = () => (
  <AiToolTemplate
    toolName="AI Email Writer"
    tagline="Compose professional emails, follow-ups, outreach proposals, and customer responses in seconds."
    systemInstruction="You are an executive communications specialist. Compose clear, polite, and effective emails with appropriate subject lines, greetings, and calls to action."
    inputLabel="Email Purpose & Key Points"
    inputPlaceholder="e.g. Requesting a 15-minute product demo next Tuesday with John Doe..."
    customFields={[
      {
        id: 'scenario',
        label: 'Email Type',
        type: 'select',
        options: [
          { label: 'Professional Business Inquiry', value: 'professional business inquiry' },
          { label: 'Client Follow-Up', value: 'courteous client follow-up' },
          { label: 'Cold Sales Outreach', value: 'high-converting cold outreach' },
          { label: 'Customer Support Reply', value: 'empathic customer service response' },
          { label: 'Internal Team Update', value: 'concise team/project update' }
        ]
      },
      {
        id: 'tone',
        label: 'Tone',
        type: 'select',
        options: [
          { label: 'Polite & Professional', value: 'polite, crisp, and professional' },
          { label: 'Warm & Friendly', value: 'warm, welcoming, and friendly' },
          { label: 'Direct & Urgent', value: 'direct, concise, and time-sensitive' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write a ${fields.scenario || 'business'} email in a ${fields.tone || 'professional'} tone covering these details:\n\n${input}\n\nPlease include 2-3 suitable Subject Line alternatives.`}
  />
);

// 6. AI Paraphraser
export const AiParaphraser: React.FC = () => (
  <AiToolTemplate
    toolName="AI Paraphraser"
    tagline="Rewrite and rephrase sentences, paragraphs, or articles while preserving original meaning."
    systemInstruction="You are a professional linguistic editor. Paraphrase the user's text to improve clarity, vocabulary, and flow without altering the original factual meaning."
    inputLabel="Original Text to Paraphrase"
    inputPlaceholder="Paste the sentences or paragraph you wish to rephrase..."
    customFields={[
      {
        id: 'mode',
        label: 'Paraphrase Mode',
        type: 'select',
        options: [
          { label: 'Standard (Clear & Natural)', value: 'clear and natural' },
          { label: 'Formal & Professional', value: 'formal academic and corporate' },
          { label: 'Fluent & Concise', value: 'concise, eliminating fluff' },
          { label: 'Creative & Expressive', value: 'creative with rich vocabulary' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Paraphrase the following text in a ${fields.mode || 'standard'} manner, maintaining original meaning:\n\n"${input}"`}
  />
);

// 7. AI Text Summarizer
export const AiTextSummarizer: React.FC = () => (
  <AiToolTemplate
    toolName="AI Text Summarizer"
    tagline="Condense long articles, research papers, reports, or transcripts into key takeaways."
    systemInstruction="You are an executive summary specialist. Analyze the input text and extract the core thesis, main arguments, key facts, and conclusion."
    inputLabel="Text to Summarize"
    inputPlaceholder="Paste your text, article, or document here..."
    customFields={[
      {
        id: 'format',
        label: 'Summary Format',
        type: 'select',
        options: [
          { label: 'Bullet Points (Key Takeaways)', value: 'bulleted list of 5-7 key takeaways' },
          { label: 'Executive TL;DR Paragraph', value: 'concise executive summary paragraph' },
          { label: 'Structured Breakdown', value: 'structured section-by-section breakdown' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Summarize the following text as a ${fields.format || 'bulleted list'}:\n\n${input}`}
  />
);

// 8. AI Grammar Checker
export const AiGrammarChecker: React.FC = () => (
  <AiToolTemplate
    toolName="AI Grammar & Spell Checker"
    tagline="Detect and correct grammatical errors, punctuation flaws, awkward phrasing, and typos."
    systemInstruction="You are a meticulous copy editor. Review the text for spelling, grammar, punctuation, and phrasing issues. Provide the corrected version first, followed by a brief bulleted breakdown of the changes made."
    inputLabel="Text to Check"
    inputPlaceholder="Paste text with grammatical errors or draft writing here..."
    buildPrompt={(input) => `Proofread and correct the following text. Provide:\n1) Fully Corrected Version\n2) Summary of Corrections Made (spelling, grammar, punctuation, syntax)\n\nOriginal Text:\n"${input}"`}
  />
);

// 9. AI Translator
export const AiTranslator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Polyglot Translator"
    tagline="Accurate, context-aware translations across 40+ global languages."
    systemInstruction="You are an expert native translator. Translate the text accurately while preserving idiomatic expressions, nuance, context, and tone."
    inputLabel="Text to Translate"
    inputPlaceholder="Enter text to translate..."
    customFields={[
      {
        id: 'targetLang',
        label: 'Target Language',
        type: 'select',
        options: [
          { label: 'Spanish (Español)', value: 'Spanish' },
          { label: 'French (Français)', value: 'French' },
          { label: 'German (Deutsch)', value: 'German' },
          { label: 'Bengali (বাংলা)', value: 'Bengali' },
          { label: 'Hindi (हिन्दी)', value: 'Hindi' },
          { label: 'Arabic (العربية)', value: 'Arabic' },
          { label: 'Japanese (日本語)', value: 'Japanese' },
          { label: 'Chinese (Simplified)', value: 'Simplified Chinese' },
          { label: 'Portuguese (Português)', value: 'Portuguese' },
          { label: 'Russian (Русский)', value: 'Russian' },
          { label: 'Italian (Italiano)', value: 'Italian' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Translate the following text into ${fields.targetLang || 'Spanish'}. Provide the native translation followed by phonetic pronunciation if applicable:\n\n"${input}"`}
  />
);

// 10. AI Caption Generator
export const AiCaptionGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Social Media Caption Generator"
    tagline="Create engaging, viral captions for Instagram, TikTok, LinkedIn, and Facebook."
    systemInstruction="You are a social media growth strategist. Generate 3-5 punchy, high-engagement captions with relevant emojis and call-to-actions."
    inputLabel="Post Theme / Photo Description"
    inputPlaceholder="e.g. Announcing our new eco-friendly water bottle launch with outdoor mountain shots..."
    customFields={[
      {
        id: 'platform',
        label: 'Target Platform',
        type: 'select',
        options: [
          { label: 'Instagram', value: 'Instagram' },
          { label: 'LinkedIn', value: 'LinkedIn' },
          { label: 'TikTok', value: 'TikTok' },
          { label: 'Twitter / X', value: 'Twitter/X' },
          { label: 'Facebook', value: 'Facebook' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Generate 4 distinct caption variations for ${fields.platform || 'Instagram'} based on this topic:\n"${input}"\nInclude hook, body copy, CTA, and 3-5 hashtags per option.`}
  />
);

// 11. AI Product Description Generator
export const AiProductDescription: React.FC = () => (
  <AiToolTemplate
    toolName="AI Product Description Generator"
    tagline="Generate persuasive eCommerce product copy that highlights benefits, features, and drives sales."
    systemInstruction="You are an eCommerce copywriter specializing in Shopify, Amazon, and DTC stores. Write compelling product descriptions emphasizing buyer benefits and sensory language."
    inputLabel="Product Name & Key Features"
    inputPlaceholder="e.g. Ergonomic Memory Foam Pillow with cooling gel layer, breathable bamboo cover, hypoallergenic..."
    customFields={[
      {
        id: 'tone',
        label: 'Brand Tone',
        type: 'select',
        options: [
          { label: 'Luxury & Premium', value: 'luxury, refined, and premium' },
          { label: 'Punchy & Modern', value: 'punchy, energetic, and lifestyle-oriented' },
          { label: 'Technical & Practical', value: 'practical, feature-focused, and trust-building' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write a high-converting eCommerce product description in a ${fields.tone || 'modern'} tone for:\n\n${input}\n\nInclude: Catchy Headline, Engaging Story/Intro, Key Bulleted Benefits, Technical Specs, and Call to Action.`}
  />
);

// 12. AI SEO Meta Generator
export const AiSeoMetaGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI SEO Meta Generator"
    tagline="Generate high-CTR SEO page titles (under 60 chars) and meta descriptions (under 160 chars)."
    systemInstruction="You are an expert SEO specialist. Generate 3 sets of Title tags (under 60 characters) and Meta Descriptions (between 140-160 characters) with relevant keywords and high click-through intent."
    inputLabel="Page Topic & Target Keywords"
    inputPlaceholder="e.g. Online mortgage calculator for first-time home buyers with amortization schedule..."
    buildPrompt={(input) => `Generate 3 optimized SEO Title Tag and Meta Description pairs for:\n"${input}"\nEnsure title length is strictly 45-60 characters and description length is 140-160 characters.`}
  />
);

// 13. AI Business Name Generator
export const AiBusinessNameGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Business Name Generator"
    tagline="Brainstorm unique, brandable, and memorable company, startup, or domain names."
    systemInstruction="You are a brand naming consultant. Brainstorm 15 distinct, catchy, modern business names categorized by style (Modern/Invented, Compound words, Descriptive, and Minimalist)."
    inputLabel="Business Idea & Industry"
    inputPlaceholder="e.g. AI-driven cybersecurity SaaS platform for remote teams..."
    buildPrompt={(input) => `Generate 15 creative, brandable business names for this concept:\n"${input}"\nFor each name, provide: Name, Pronunciation, Brand Vibe, and a one-sentence rationale.`}
  />
);

// 14. AI YouTube Description Generator
export const AiYouTubeDescription: React.FC = () => (
  <AiToolTemplate
    toolName="AI YouTube Description Generator"
    tagline="Write SEO-rich video descriptions with timestamps placeholders, affiliate links area, and social links."
    systemInstruction="You are a YouTube growth consultant. Produce SEO-optimized YouTube video descriptions with strong search keywords, video summary, timestamp templates, and calls-to-action."
    inputLabel="Video Title & Main Content"
    inputPlaceholder="e.g. 10 Git Commands Every Senior Developer Uses in 2026..."
    buildPrompt={(input) => `Write a comprehensive, SEO-friendly YouTube video description for:\n"${input}"\nInclude: 2-sentence hook with target keywords, full summary, Chapters/Timestamps template, Resources & Links section, and relevant hashtags.`}
  />
);

// 15. AI Hashtag Generator
export const AiHashtagGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Hashtag Generator"
    tagline="Generate relevant, trending hashtags categorized by reach (High, Medium, and Niche)."
    systemInstruction="You are a social media SEO specialist. Generate 25-30 relevant hashtags for the given topic, grouped by High Competition (broad), Medium Reach (targeted), and Low Competition (niche)."
    inputLabel="Topic or Niche"
    inputPlaceholder="e.g. Sustainable fashion, vintage streetwear, ethical lifestyle..."
    buildPrompt={(input) => `Generate 25-30 optimized hashtags for:\n"${input}"\nGroup them into:\n1. High-Volume Reach (Popular)\n2. Medium-Volume Reach (Targeted)\n3. Niche & Community Tags (High Engagement)`}
  />
);
