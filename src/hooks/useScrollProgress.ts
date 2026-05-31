// ─── useScrollProgress Hook ───────────────────────────────────────────
// This hook calculates how far down the page the user has scrolled,
// expressed as a percentage from 0 (top) to 100 (bottom).
//
// It is used by the ScrollProgressBar component to animate the thin
// gradient bar that appears at the very top of the page.

import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  // Store the scroll percentage as a number (0–100)
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // How many pixels the user has scrolled from the top

      // Total scrollable distance = full page height minus the viewport height
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Convert to a 0–100 percentage. Guard against dividing by zero.
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Clamp the value so it never goes below 0 or above 100
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    // Listen to the scroll event. { passive: true } tells the browser we won't
    // call preventDefault(), which allows it to optimise scrolling performance.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run once immediately so the bar shows the correct position on first render
    handleScroll();

    // Cleanup: remove the listener when the component using this hook unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty array = only run this effect once when the hook is first used

  return progress; // The calling component receives a number 0–100
}
