import React, { useMemo } from 'react';

interface HighlightTextProps {
  text: string;
  query: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * Escapes regex special characters to prevent regex injection errors.
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Component that renders text with search terms highlighted.
 * Breaks down multi-word queries into individual terms and highlights all matches.
 */
export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  className = '',
  highlightClassName = 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-semibold px-0.5 rounded-xs'
}) => {
  const parts = useMemo(() => {
    if (!text) return [];
    const trimmed = (query || '').trim();
    if (!trimmed) return [{ text, isMatch: false }];

    // Split multi-word queries into separate terms
    const rawTokens = trimmed.split(/\s+/).filter(Boolean);
    if (rawTokens.length === 0) return [{ text, isMatch: false }];

    // Sort terms by length descending so longer phrases match first
    const terms = rawTokens
      .map((t) => escapeRegExp(t))
      .sort((a, b) => b.length - a.length);

    try {
      const regex = new RegExp(`(${terms.join('|')})`, 'gi');
      const tokens = text.split(regex);

      return tokens.map((token) => {
        const isMatch = rawTokens.some((raw) =>
          token.toLowerCase() === raw.toLowerCase()
        );
        return { text: token, isMatch };
      });
    } catch {
      return [{ text, isMatch: false }];
    }
  }, [text, query]);

  if (!text) return null;

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.isMatch ? (
          <mark key={index} className={highlightClassName}>
            {part.text}
          </mark>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        )
      )}
    </span>
  );
};
