// ─── useTypewriter Hook ──────────────────────────────────────────────
// This hook produces the typewriter effect in the Hero section, where text
// appears to be typed character by character, then deleted, then the next
// phrase starts typing automatically on a loop.
//
// How the cycle works:
//   1. Type characters one by one (typingSpeed delay between each)
//   2. When the full phrase is typed, pause (pauseDuration)
//   3. Delete characters one by one (deletingSpeed delay)
//   4. Move to the next phrase in the array and repeat from step 1

import { useState, useEffect, useRef, useCallback } from 'react';

// The options you pass in when calling the hook.
interface UseTypewriterOptions {
  texts: string[];         // Array of phrases to cycle through
  typingSpeed?: number;    // Milliseconds between each typed character. Default 75ms
  deletingSpeed?: number;  // Milliseconds between each deleted character. Default 35ms (faster)
  pauseDuration?: number;  // How long to wait (ms) after the full phrase is typed. Default 2200ms
}

// What the hook returns to the component.
interface UseTypewriterReturn {
  displayText: string;  // The current partial text to render on screen
  isTyping: boolean;    // True while characters are being added (used to blink cursor)
  currentIndex: number; // Index of which phrase in the texts array is active
}

export function useTypewriter({
  texts,
  typingSpeed = 75,       // ~75ms per character feels natural
  deletingSpeed = 35,     // Deleting is faster than typing — ~35ms per character
  pauseDuration = 2200,   // 2.2 second pause after the full phrase appears
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState<string>('');      // Partial text currently shown
  const [isDeleting, setIsDeleting] = useState<boolean>(false);    // Are we in delete mode?
  const [textIndex, setTextIndex] = useState<number>(0);           // Which phrase are we on?
  const [isTyping, setIsTyping] = useState<boolean>(true);         // Used to control cursor blink
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Stores the active timer

  // Helper to cancel any in-progress timer and prevent memory leaks
  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Main effect: runs every time displayText or isDeleting changes.
  // Each run schedules the *next* character add / remove via setTimeout.
  useEffect(() => {
    const currentText = texts[textIndex] ?? ''; // The full phrase we're working with

    if (!isDeleting) {
      // ── TYPING MODE ──
      if (displayText.length < currentText.length) {
        // There are still characters to type — add the next one after typingSpeed ms
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // All characters typed! Pause, then switch to deleting mode
        setIsTyping(false); // Stop cursor blink during the pause
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(true); // Resume cursor blink as we start deleting
        }, pauseDuration);
      }
    } else {
      // ── DELETING MODE ──
      if (displayText.length > 0) {
        // There are still characters to remove — remove the last one after deletingSpeed ms
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // All characters deleted! Move to the next phrase and switch back to typing mode
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length); // Loop back to first phrase at the end
      }
    }

    // Cancel the timer when the effect re-runs or the component unmounts
    return clearTimer;
  }, [
    displayText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    clearTimer,
  ]);

  return { displayText, isTyping, currentIndex: textIndex };
}
