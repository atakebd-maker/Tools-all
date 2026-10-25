import React from 'react';
import { AiToolTemplate } from '../../components/AiToolTemplate';

// 1. AI Code Generator
export const AiCodeGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Code Generator"
    tagline="Generate clean, well-commented functions, classes, or scripts in any language."
    systemInstruction="You are a senior principal software engineer. Generate robust, production-ready, typed code with edge-case handling and inline comments. Provide code with concise explanations."
    inputLabel="What should the code do?"
    inputPlaceholder="e.g. Write a TypeScript debounce function with immediate execution option and cancellation..."
    isCodeOutput={true}
    codeLanguage="typescript"
    customFields={[
      {
        id: 'language',
        label: 'Programming Language',
        type: 'select',
        options: [
          { label: 'TypeScript', value: 'TypeScript' },
          { label: 'JavaScript (Node / Browser)', value: 'JavaScript' },
          { label: 'Python 3', value: 'Python 3' },
          { label: 'Go', value: 'Go' },
          { label: 'Rust', value: 'Rust' },
          { label: 'Java', value: 'Java' },
          { label: 'C++', value: 'C++' },
          { label: 'C# / .NET', value: 'C#' },
          { label: 'PHP', value: 'PHP' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write clean, efficient ${fields.language || 'TypeScript'} code to accomplish the following task:\n\n${input}\n\nInclude unit test examples if appropriate.`}
  />
);

// 2. AI Code Explainer
export const AiCodeExplainer: React.FC = () => (
  <AiToolTemplate
    toolName="AI Code Explainer"
    tagline="Understand complex algorithms, legacy scripts, or unfamiliar syntax step-by-step."
    systemInstruction="You are a patient programming educator. Break down the code into high-level overview, step-by-step logic walkthrough, time/space complexity, and best practices."
    inputLabel="Paste Code to Explain"
    inputPlaceholder="Paste your code snippet here..."
    customFields={[
      {
        id: 'depth',
        label: 'Explanation Depth',
        type: 'select',
        options: [
          { label: 'Clear & Detailed (Line-by-line)', value: 'detailed line-by-line' },
          { label: 'High-Level Overview', value: 'high-level architectural summary' },
          { label: 'For Beginners (Simple Analogies)', value: 'beginner-friendly with simple analogies' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Explain the following code snippet in a ${fields.depth || 'clear and detailed'} manner:\n\n\`\`\`\n${input}\n\`\`\``}
  />
);

// 3. AI Code Debugger
export const AiCodeDebugger: React.FC = () => (
  <AiToolTemplate
    toolName="AI Code Debugger & Bug Fixer"
    tagline="Diagnose exceptions, stack traces, logic bugs, race conditions, and get fixed code."
    systemInstruction="You are a senior debugging specialist. Pinpoint the root cause of the error or bug, provide the corrected code snippet, and explain why the bug occurred."
    inputLabel="Buggy Code & Error Description"
    inputPlaceholder="Paste your code along with any error message, unexpected behavior, or stack trace..."
    isCodeOutput={true}
    codeLanguage="debugged-code"
    buildPrompt={(input) => `Analyze and fix the bug in this code:\n\n${input}\n\nProvide:\n1. Root Cause Analysis\n2. Fixed Code\n3. Prevention Tips`}
  />
);

// 4. AI HTML Generator
export const AiHtmlGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI HTML Component Generator"
    tagline="Create accessible, semantic HTML5 markup for cards, forms, tables, navbars, and layouts."
    systemInstruction="You are a front-end specialist. Generate modern, semantic, accessible HTML5 elements with appropriate ARIA attributes, semantic tags (nav, main, section, article), and standard markup."
    inputLabel="Describe HTML Component / Layout"
    inputPlaceholder="e.g. Accessible pricing table with 3 tiers (Basic, Pro, Enterprise), feature checklists, and toggle..."
    isCodeOutput={true}
    codeLanguage="html"
    buildPrompt={(input) => `Generate semantic, accessible HTML5 markup for:\n\n${input}\n\nEnsure valid tags and ARIA labels where needed.`}
  />
);

// 5. AI CSS Generator
export const AiCssGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI CSS & Styling Generator"
    tagline="Generate pure CSS or Tailwind CSS rules for layouts, glassmorphism, animations, and gradients."
    systemInstruction="You are a UI styling specialist. Generate modern, performant CSS or Tailwind CSS classes. Prefer Flexbox/Grid, CSS custom properties, and smooth transitions."
    inputLabel="Styling Requirement or Component"
    inputPlaceholder="e.g. Responsive modern card with subtle border glow on hover, rounded corners, and smooth elevation..."
    isCodeOutput={true}
    codeLanguage="css"
    customFields={[
      {
        id: 'format',
        label: 'CSS Flavor',
        type: 'select',
        options: [
          { label: 'Modern Pure CSS', value: 'standard modern CSS' },
          { label: 'Tailwind CSS Classes', value: 'Tailwind CSS utility classes' },
          { label: 'SCSS / SASS', value: 'SCSS format' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Generate ${fields.format || 'standard modern CSS'} for the following UI specification:\n\n${input}`}
  />
);

// 6. AI JavaScript Generator
export const AiJavaScriptGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI JavaScript Generator"
    tagline="Generate modern ES6+ scripts, DOM manipulation, async fetchers, and utilities."
    systemInstruction="You are a senior JavaScript developer. Generate clean, efficient, modern ES6+ JavaScript code. Use async/await, arrow functions, destructuring, and proper error handling."
    inputLabel="JavaScript Requirement"
    inputPlaceholder="e.g. Client-side CSV file parser that converts rows to JSON objects and handles quoted commas..."
    isCodeOutput={true}
    codeLanguage="javascript"
    buildPrompt={(input) => `Write modern ES6+ JavaScript to achieve this:\n\n${input}\n\nProvide the code and a usage example.`}
  />
);

// 7. AI Regex Generator
export const AiRegexGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Regex Generator & Explainer"
    tagline="Generate regular expressions with regex flags, breakdown, test strings, and edge cases."
    systemInstruction="You are a regular expressions master. Generate the precise regex pattern, specify flags (g, i, m), explain each group/token, and provide sample matching and non-matching strings."
    inputLabel="What should the regex match or validate?"
    inputPlaceholder="e.g. Strong password with at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special symbol..."
    isCodeOutput={true}
    codeLanguage="regex"
    buildPrompt={(input) => `Generate a regular expression for:\n"${input}"\nProvide: Pattern, Flags, Token-by-Token Explanation, and 3 Matching vs 3 Non-Matching examples.`}
  />
);

// 8. AI SQL Generator
export const AiSqlGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI SQL Query Generator"
    tagline="Generate complex SQL queries, JOINs, aggregations, CTEs, and schema migrations."
    systemInstruction="You are an expert database architect. Generate optimized, secure SQL queries with proper indexing advice, handling NULLs and SQL injection prevention."
    inputLabel="Describe the Query or Table Structure"
    inputPlaceholder="e.g. Find top 5 customers with highest total order values in 2025, joining orders and customers tables..."
    isCodeOutput={true}
    codeLanguage="sql"
    customFields={[
      {
        id: 'dialect',
        label: 'SQL Dialect',
        type: 'select',
        options: [
          { label: 'PostgreSQL', value: 'PostgreSQL' },
          { label: 'MySQL', value: 'MySQL' },
          { label: 'SQLite', value: 'SQLite' },
          { label: 'SQL Server (T-SQL)', value: 'T-SQL' },
          { label: 'Oracle SQL', value: 'Oracle' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Write an optimized ${fields.dialect || 'PostgreSQL'} query for:\n\n${input}\n\nExplain the logic and indexing considerations.`}
  />
);

// 9. AI JSON Generator
export const AiJsonGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Mock JSON Data Generator"
    tagline="Generate realistic mock JSON datasets, schemas, API response payloads, and test fixtures."
    systemInstruction="You are an API design engineer. Generate realistic, valid JSON data with consistent types, ids, timestamps, and realistic attributes based on the user's schema."
    inputLabel="JSON Schema or Requirements"
    inputPlaceholder="e.g. Array of 5 eCommerce products with id, title, price, inStock, tags array, and rating object..."
    isCodeOutput={true}
    codeLanguage="json"
    buildPrompt={(input) => `Generate realistic, valid JSON for this specification:\n\n${input}\n\nReturn ONLY valid JSON with no trailing comments.`}
  />
);

// 10. AI Programming Tutor
export const AiProgrammingTutor: React.FC = () => (
  <AiToolTemplate
    toolName="AI Programming Tutor"
    tagline="Interactive CS and programming tutor for concepts, algorithms, data structures, and best practices."
    systemInstruction="You are a renowned computer science professor and mentor. Teach programming concepts using Socratic questioning, real-world analogies, clean diagrams (ASCII), and code examples."
    inputLabel="What concept or topic do you want to learn?"
    inputPlaceholder="e.g. How does garbage collection work in V8, and how does mark-and-sweep prevent memory leaks?"
    buildPrompt={(input) => `Teach me about this computer science topic in an engaging, easy-to-understand way with examples and practice challenges:\n\n"${input}"`}
  />
);
