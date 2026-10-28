export interface TroubleshootingItem {
  problem: string;
  cause: string;
  solution: string;
}

export interface PracticalExample {
  title: string;
  input: string;
  options?: string;
  output: string;
  explanation: string;
}

export interface ToolGuide {
  id: string;
  name: string;
  subtitle: string;
  whatItDoes: {
    summary: string;
    targetAudience: string;
    problemsSolved: string[];
    expectedResult: string;
  };
  features: string[];
  beforeYouStart: string[];
  stepByStep: string[];
  example: PracticalExample;
  bestResultsTips: string[];
  troubleshooting: TroubleshootingItem[];
  faqs: { q: string; a: string }[];
  seoContent: {
    title: string;
    metaDescription: string;
    h1: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    longTailKeywords: string[];
  };
}
