import React, { useState } from 'react';
import { callGeminiApi } from '../utils/geminiClient';
import { Sparkles, Copy, Check, Trash2, RotateCcw, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  defaultValue?: string;
  options?: SelectOption[];
  rows?: number;
  description?: string;
  required?: boolean;
}

interface AiToolTemplateProps {
  toolName: string;
  tagline: string;
  systemInstruction: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputDescription?: string;
  defaultInput?: string;
  customFields?: CustomField[];
  isCodeOutput?: boolean;
  codeLanguage?: string;
  buildPrompt: (mainInput: string, fieldValues: Record<string, string>) => string;
}

export const AiToolTemplate: React.FC<AiToolTemplateProps> = ({
  toolName,
  tagline,
  systemInstruction,
  inputLabel = 'Your Input',
  inputPlaceholder = 'Enter your details or topic here...',
  inputDescription,
  defaultInput = '',
  customFields = [],
  isCodeOutput = false,
  codeLanguage = 'plaintext',
  buildPrompt
}) => {
  const [mainInput, setMainInput] = useState<string>(defaultInput);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    customFields.forEach((field) => {
      initial[field.id] = field.defaultValue || (field.options?.[0]?.value ?? '');
    });
    return initial;
  });

  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFieldChange = (id: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    if (!mainInput.trim()) {
      setError('Please provide input before generating.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fullPrompt = buildPrompt(mainInput.trim(), fieldValues);
      const result = await callGeminiApi({
        prompt: fullPrompt,
        systemInstruction,
        temperature: 0.7
      });
      setOutput(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate output. Please check your network or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleClear = () => {
    setMainInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-blue-900">{toolName}</h2>
          <p className="text-xs text-blue-700 mt-0.5">{tagline}</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-4">
        {/* Custom Configuration Fields (e.g., Tone, Language, Format) */}
        {customFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {customFields.map((field) => (
              <div key={field.id} className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    rows={field.rows || 2}
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                ) : (
                  <input
                    type="text"
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                )}
                {field.description && (
                  <p className="text-[11px] text-slate-400">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main Text Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              {inputLabel} <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {mainInput.length} characters
            </span>
          </div>
          <textarea
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            placeholder={inputPlaceholder}
            rows={5}
            className="w-full text-sm p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white placeholder:text-slate-400 font-sans"
          />
          {inputDescription && (
            <p className="text-xs text-slate-500">{inputDescription}</p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !mainInput.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>

            {output && (
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            )}
          </div>

          <button
            onClick={handleClear}
            className="px-3 py-2 text-slate-500 hover:text-red-600 font-medium text-xs rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Input</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-xs">Request Failed</h3>
            <p className="text-xs mt-0.5">{error}</p>
            <button
              onClick={handleGenerate}
              className="mt-2 text-xs font-semibold text-red-700 underline hover:text-red-900"
            >
              Retry Generation
            </button>
          </div>
        </div>
      )}

      {/* Output Display Area */}
      {output && (
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {isCodeOutput ? 'Generated Code' : 'Generated Result'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {isCodeOutput ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner">
              <div className="bg-slate-800/80 px-4 py-1.5 text-xs text-slate-400 font-mono flex items-center justify-between border-b border-slate-700">
                <span>{codeLanguage}</span>
                <span className="text-[10px]">Review code before production use</span>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed max-h-96">
                <code>{output}</code>
              </pre>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {output}
            </div>
          )}

          {/* AI Notice */}
          <p className="text-[11px] text-slate-400 text-right italic">
            Output generated by Google Gemini AI. Please verify important facts or test generated code.
          </p>
        </div>
      )}
    </div>
  );
};
