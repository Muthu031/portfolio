import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseTypewriterOptions {
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

/** Cycles through `lines`, typing and deleting one character at a time, terminal-style. */
export function useTypewriter(
  lines: string[],
  { typingSpeedMs = 45, deletingSpeedMs = 25, pauseMs = 1800 }: UseTypewriterOptions = {}
): string {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || lines.length === 0) return;

    const currentLine = lines[lineIndex % lines.length];
    const atFullLine = charCount === currentLine.length;
    const atEmpty = charCount === 0;

    let delay = isDeleting ? deletingSpeedMs : typingSpeedMs;
    if (atFullLine && !isDeleting) delay = pauseMs;

    const timer = setTimeout(() => {
      if (!isDeleting && atFullLine) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && atEmpty) {
        setIsDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
        return;
      }
      setCharCount((c) => c + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, lineIndex, lines, reducedMotion, typingSpeedMs, deletingSpeedMs, pauseMs]);

  if (reducedMotion) return lines[0] ?? "";
  return (lines[lineIndex % lines.length] ?? "").slice(0, charCount);
}
