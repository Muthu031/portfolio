// ─── ScrollProgressBar Component ──────────────────────────────────────────
// A thin 2px gradient bar pinned to the very top of the screen that fills
// from left to right as the user scrolls down the page.
//
// The bar goes from 0% wide (top of page) to 100% wide (bottom of page).
// It uses the useScrollProgress hook to get the current scroll percentage,
// then Framer Motion animates the width of the inner coloured div.
//
// This component is rendered inside App.tsx so it is always visible.

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgressBar: React.FC = () => {
  // progress is a number from 0 to 100 representing how far the page has been scrolled
  const progress = useScrollProgress();

  return (
    // Outer track: fixed at the top, very thin, dark background
    <div
      className="fixed top-0 left-0 right-0 z-[9990] h-[2px] bg-white/5"
      aria-hidden="true" // Decorative only — screen readers don't need to know about it
    >
      {/* Inner fill: the coloured portion that grows as you scroll.
          transition: { duration: 0 } removes any animation delay so it tracks
          the scroll position in real time without lag. */}
      <motion.div
        className="h-full origin-left" // origin-left makes it grow from the left side
        style={{
          width: `${progress}%`,                          // Width is controlled by scroll position
          background: 'linear-gradient(90deg, #00f5ff, #ffb800)', // Cyan → Golden gradient
          boxShadow: '0 0 8px rgba(0, 245, 255, 0.6)',            // Subtle glow under the bar
        }}
        transition={{ duration: 0 }} // No easing delay — updates instantly
      />
    </div>
  );
};
