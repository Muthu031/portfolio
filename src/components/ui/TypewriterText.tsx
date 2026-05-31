// ─── TypewriterText Component ──────────────────────────────────────────────
// Displays animated typing text that cycles through multiple phrases.
// Characters are added one by one (type), the phrase pauses, then characters
// are removed one by one (delete), and the next phrase starts typing.
//
// A blinking cyan cursor appears next to the text while characters are being
// typed. The cursor disappears during the pause between phrases.
//
// The actual typing logic lives in the useTypewriter hook.
// This component is just responsible for rendering the result.
//
// Usage:
//   <TypewriterText texts={['Developer', 'Architect', 'Problem Solver']} />

import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

interface TypewriterTextProps {
  texts: string[];              // Array of phrases to cycle through
  typingSpeed?: number;         // ms between each character being typed (default 75)
  deletingSpeed?: number;       // ms between each character being deleted (default 35)
  pauseDuration?: number;       // ms to wait after full phrase is typed (default 2200)
  className?: string;           // CSS classes for the outer wrapper
  cursorClassName?: string;     // CSS classes for the blinking cursor element
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed,
  deletingSpeed,
  pauseDuration,
  className = '',
  cursorClassName = '',
}) => {
  // Get the current partial text and typing state from the hook
  const { displayText, isTyping } = useTypewriter({
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  });

  return (
    // aria-live="polite" tells screen readers to announce text changes
    // aria-label gives screen readers the full current phrase to read at once
    <span className={`inline-flex items-center ${className}`} aria-live="polite" aria-label={displayText}>
      {/* The text being typed out character by character */}
      <span>{displayText}</span>

      {/* The blinking cursor — shown only while actively typing or deleting */}
      <span
        aria-hidden="true" // Screen readers should ignore the cursor character
        className={`inline-block w-[2px] h-[1.1em] ml-[2px] bg-electric align-middle ${isTyping ? 'animate-cursor-blink' : 'opacity-0'} ${cursorClassName}`}
      />
    </span>
  );
};
