import React, { useState } from 'react';
import { AiToolTemplate } from '../../components/AiToolTemplate';
import { callGeminiApi } from '../../utils/geminiClient';
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from 'lucide-react';

// 1. AI Chatbot (Interactive multi-turn conversation interface)
export const AiChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI assistant powered by Google Gemini. Ask me any question, brainstorm ideas, request explanations, or solve problems together!'
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setError(null);

    const updatedMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build conversation context
      const promptContext = updatedMessages
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n\n');

      const responseText = await callGeminiApi({
        prompt: promptContext,
        systemInstruction: 'You are an intelligent, helpful, objective, and friendly AI assistant. Give clear, well-structured, insightful responses.',
        temperature: 0.7
      });

      setMessages((prev) => [...prev, { role: 'assistant', text: responseText }]);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to AI assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Conversation reset. How can I assist you today?'
      }
    ]);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 p-3.5 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-950">AI General Assistant</h3>
            <p className="text-xs text-blue-700">Powered by Google Gemini 2.5 Flash</p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="h-96 overflow-y-auto p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`max-w-[85%] text-xs sm:text-sm p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pl-10">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span>AI is thinking...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Input box */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or type a message..."
          disabled={isLoading}
          className="flex-1 text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all font-semibold flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};

// 2. AI Quiz Generator
export const AiQuizGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Quiz Generator"
    tagline="Generate comprehensive quizzes with questions, answers, scoring criteria, and explanations."
    systemInstruction="You are an assessment and educational test specialist. Generate engaging quizzes with diverse question formats (multiple-choice, short answer, true/false) and provide an answer key with thorough explanations."
    inputLabel="Quiz Subject / Topic"
    inputPlaceholder="e.g. World War II European Theater major battles and geopolitics..."
    customFields={[
      {
        id: 'questionsCount',
        label: 'Number of Questions',
        type: 'select',
        options: [
          { label: '5 Questions', value: '5 questions' },
          { label: '10 Questions', value: '10 questions' },
          { label: '15 Questions', value: '15 questions' }
        ]
      },
      {
        id: 'difficulty',
        label: 'Difficulty Level',
        type: 'select',
        options: [
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Beginner / Fundamental', value: 'beginner-friendly' },
          { label: 'Advanced / Expert', value: 'advanced challenging' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Create a ${fields.difficulty || 'intermediate'} quiz containing ${fields.questionsCount || '5 questions'} on the topic of:\n"${input}"\nInclude the questions first, then provide a separate Answer Key section with explanations.`}
  />
);

// 3. AI MCQ Generator
export const AiMcqGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Multiple Choice Question (MCQ) Generator"
    tagline="Generate standard 4-option MCQs with plausible distractors, correct answers, and rationales."
    systemInstruction="You are a psychometrics and exam design specialist. Create well-crafted multiple-choice questions with 4 distinct options (A, B, C, D). Avoid obvious negative clues or trick questions."
    inputLabel="MCQ Topic or Syllabus Unit"
    inputPlaceholder="e.g. Human circulatory system, heart chambers, and blood pressure regulation..."
    customFields={[
      {
        id: 'count',
        label: 'Quantity',
        type: 'select',
        options: [
          { label: '5 MCQs', value: '5 multiple choice questions' },
          { label: '10 MCQs', value: '10 multiple choice questions' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Generate ${fields.count || '5 MCQs'} on this topic:\n"${input}"\nFor each question provide: Question text, Options (A, B, C, D), Correct Answer, and a brief explanation of why the answer is correct.`}
  />
);

// 4. AI Flashcard Generator
export const AiFlashcardGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Flashcard Generator"
    tagline="Create study flashcard decks (Front / Back) optimized for active recall and spaced repetition."
    systemInstruction="You are an active-recall learning specialist. Generate bite-sized flashcards with clear prompts/terms on the Front and concise, memorable answers on the Back."
    inputLabel="Study Topic or Text"
    inputPlaceholder="e.g. Organic Chemistry functional groups and their reaction mechanisms..."
    customFields={[
      {
        id: 'count',
        label: 'Card Count',
        type: 'select',
        options: [
          { label: '8 Flashcards', value: '8 cards' },
          { label: '12 Flashcards', value: '12 cards' },
          { label: '16 Flashcards', value: '16 cards' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Generate ${fields.count || '8 flashcards'} for active recall on this topic:\n"${input}"\nFormat each card clearly:\n[Card #]\nFront: [Question or Term]\nBack: [Concise Definition or Answer]`}
  />
);

// 5. AI Study Plan Generator
export const AiStudyPlanGenerator: React.FC = () => (
  <AiToolTemplate
    toolName="AI Personalized Study Plan Generator"
    tagline="Build day-by-day or week-by-week structured curriculum for exams, certifications, or skills."
    systemInstruction="You are an academic advisor. Create a realistic, structured study schedule divided into phases, milestones, daily time blocks, and revision intervals."
    inputLabel="Target Exam, Certification, or Skill"
    inputPlaceholder="e.g. Preparing for AWS Certified Solutions Architect Associate exam..."
    customFields={[
      {
        id: 'duration',
        label: 'Available Timeline',
        type: 'select',
        options: [
          { label: '4 Weeks (1 Month Intensive)', value: '4 weeks intensive' },
          { label: '2 Weeks (Sprint)', value: '2 weeks crash course' },
          { label: '8 Weeks (Balanced)', value: '8 weeks balanced' },
          { label: '12 Weeks (Comprehensive)', value: '12 weeks comprehensive' }
        ]
      },
      {
        id: 'dailyHours',
        label: 'Hours Per Day',
        type: 'select',
        options: [
          { label: '2 Hours / Day', value: '2 hours per day' },
          { label: '1 Hour / Day', value: '1 hour per day' },
          { label: '4+ Hours / Day', value: '4 or more hours per day' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Design a realistic ${fields.duration || '4-week'} study plan dedicating ${fields.dailyHours || '2 hours daily'} for:\n"${input}"\nInclude syllabus breakdown, weekly milestones, resource recommendations, and review days.`}
  />
);

// 6. AI Interview Questions
export const AiInterviewQuestions: React.FC = () => (
  <AiToolTemplate
    toolName="AI Job Interview Question & Answer Prep"
    tagline="Practice role-specific behavioral, situational, and technical interview questions with model answers."
    systemInstruction="You are an executive hiring manager and interview coach. Generate high-probability interview questions, what the interviewer is assessing, and sample STAR (Situation, Task, Action, Result) model answers."
    inputLabel="Target Job Role & Industry"
    inputPlaceholder="e.g. Senior Frontend Engineer at a Fintech company..."
    customFields={[
      {
        id: 'type',
        label: 'Question Focus',
        type: 'select',
        options: [
          { label: 'Mixed (Technical + Behavioral)', value: 'technical and behavioral questions' },
          { label: 'Technical & System Architecture', value: 'deep technical architecture questions' },
          { label: 'Behavioral & Leadership (STAR)', value: 'behavioral and leadership STAR questions' }
        ]
      }
    ]}
    buildPrompt={(input, fields) => `Generate 5 realistic interview questions for the role:\n"${input}"\nFocus on: ${fields.type || 'technical and behavioral'}.\nFor each question provide:\n1. The Question\n2. What the Interviewer is Evaluating\n3. High-Scoring STAR Model Answer`}
  />
);

// 7. AI Homework Explainer
export const AiHomeworkExplainer: React.FC = () => (
  <AiToolTemplate
    toolName="AI Homework Problem Explainer"
    tagline="Understand homework questions and science/math concepts with step-by-step guidance."
    systemInstruction="You are an encouraging, pedagogical homework tutor. Walk through problem solving methodically, stating the underlying principle, the formula, the calculation steps, and a sanity check."
    inputLabel="Paste Homework Question or Problem"
    inputPlaceholder="e.g. A 1500 kg car accelerates from 0 to 60 mph in 5 seconds. What is the average force exerted on the vehicle?"
    buildPrompt={(input) => `Explain and solve this homework problem step-by-step:\n\n${input}\n\nClearly show:\n- Given Information\n- Applicable Concept/Formula\n- Step-by-Step Solution\n- Final Answer & Unit`}
  />
);

// 8. AI Vocabulary Explainer
export const AiVocabularyExplainer: React.FC = () => (
  <AiToolTemplate
    toolName="AI Vocabulary & Etymology Explainer"
    tagline="Deep-dive into word definitions, pronunciations, origins, roots, synonyms, and contextual sentences."
    systemInstruction="You are a lexicographer and linguist. Explain words in depth: part of speech, exact definition, etymology/roots, nuances vs close synonyms, and 3 example sentences in varied contexts."
    inputLabel="Word or Phrase to Explore"
    inputPlaceholder="e.g. Ephemeral, Ubiquitous, Sonder, Idiosyncratic..."
    buildPrompt={(input) => `Provide a rich lexicographical breakdown of the word:\n"${input}"\nInclude:\n- Pronunciation & Part of Speech\n- Simple & Advanced Definitions\n- Etymology (Origin & Roots)\n- Synonyms & Antonyms (with nuanced differences)\n- 3 Diverse Example Sentences`}
  />
);
