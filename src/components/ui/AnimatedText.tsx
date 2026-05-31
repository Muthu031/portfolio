// ─── AnimatedText Component ───────────────────────────────────────────────
// Renders a piece of text where each word (or character) animates in one at a
// time with a fade-up + blur effect, like a cinematic reveal.
//
// Usage:
//   <AnimatedText text="Hello World" el="h1" splitBy="words" delay={0.2} />
//
// Props:
//   text      — The full string to animate
//   el        — The HTML tag to render (default: 'span')
//   className — Extra Tailwind/CSS classes
//   delay     — Seconds to wait before the first item starts animating
//   splitBy   — 'words' (default) or 'chars' — determines the unit that animates

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  el?: keyof JSX.IntrinsicElements; // Any valid HTML tag, e.g. 'h1', 'p', 'span'
  className?: string;
  delay?: number;                   // Seconds before animation starts
  splitBy?: 'words' | 'chars';      // Split the text into words or individual characters
}

// Framer Motion container variant: the parent element
// controls when children start their animations (staggerChildren).
const container = (delay: number) => ({
  hidden: { opacity: 0 }, // Parent starts invisible (children inherit)
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Each child starts 40ms after the previous one
      delayChildren: delay,  // Wait 'delay' seconds before the first child animates
    },
  },
});

// Each word or character animates from blurry & 24px below → sharp & in place.
const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, damping: 14, stiffness: 100 },
  },
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Element = 'span', // Default wrapper element is a <span>
  className = '',
  delay = 0,
  splitBy = 'words',
}) => {
  // motion[Element] lets us create a motion.h1, motion.p, etc. dynamically
  const MotionEl = motion[Element as keyof typeof motion] as typeof motion.span;

  // ── Character split mode ──
  if (splitBy === 'chars') {
    const chars = text.split('');
    return (
      <MotionEl
        className={`inline ${className}`}
        variants={container(delay)}
        initial="hidden"
        animate="visible"
        aria-label={text} // Screen readers read the full text, not each individual character
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            className="inline-block"
            // Preserve spaces so they don't collapse
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </motion.span>
        ))}
      </MotionEl>
    );
  }

  // ── Word split mode (default) ──
  const words = text.split(' ');
  return (
    <MotionEl
      className={`inline ${className}`}
      variants={container(delay)}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className="inline-block mr-[0.28em] last:mr-0" // Add a small space between words
        >
          {word}
        </motion.span>
      ))}
    </MotionEl>
  );
};
