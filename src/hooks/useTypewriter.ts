import { useState, useEffect } from "react";

const TYPE_SPEED = 40;
const DELETE_SPEED = 25;
const PAUSE_DURATION = 2000;

const WORDS = [
  "Crafting performant APIs and pixel-perfect interfaces.",
  "Full-Stack Developer — Node.js, TypeScript, React.js, PostgreSQL.",
  "Building products that scale, from database to dashboard.",
];

export function useTypewriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text === currentWord) {
            setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % WORDS.length);
          }
        }
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return text;
}
