// ─── useIntersectionObserver Hook ────────────────────────────────────────
// This hook watches an HTML element and tells you whether it is currently
// visible inside the browser's viewport (the part of the page you can see).
//
// How it works:
//   1. You call the hook and get back a `ref` and an `inView` boolean.
//   2. Attach `ref` to any JSX element: <div ref={ref}>...
//   3. When that element scrolls into view, `inView` becomes true.
//
// This is used heavily for scroll-triggered animations — components only
// animate in when the user actually scrolls to them.

import { useState, useEffect, useRef, RefObject } from 'react';

// Configuration options you can pass to the hook.
interface Options {
  threshold?: number | number[]; // How much of the element must be visible (0.0–1.0). Default 0.1 = 10%
  rootMargin?: string;           // CSS-style margin around the viewport. Default '0px' (no extra margin)
  triggerOnce?: boolean;         // If true, stop watching after the first time it enters view. Default true
}

// What the hook returns.
interface Result<T extends Element> {
  ref: RefObject<T>;                          // Attach this to the element you want to watch
  inView: boolean;                            // True when the element is visible in the viewport
  entry: IntersectionObserverEntry | null;    // The raw browser event (useful for advanced cases)
}

export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,    // Trigger when at least 10% of the element is visible
  rootMargin = '0px', // No extra buffer around the viewport
  triggerOnce = true, // By default, only animate once — don't reset when scrolling back up
}: Options = {}): Result<T> {
  const ref = useRef<T>(null);  // React ref that will be attached to the DOM element
  const [inView, setInView] = useState(false);  // Tracks if the element is visible
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null); // Raw browser event

  useEffect(() => {
    const el = ref.current;
    if (!el) return; // If the element hasn't mounted yet, do nothing

    // Create a browser IntersectionObserver that fires a callback when
    // the visibility of 'el' changes.
    const observer = new IntersectionObserver(
      ([e]) => {
        setEntry(e); // Store the raw event
        if (e.isIntersecting) {
          // Element just became visible — mark it as in-view
          setInView(true);
          if (triggerOnce) observer.unobserve(el); // Stop watching if we only need it once
        } else if (!triggerOnce) {
          // Element scrolled out of view and we want to reset it
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el); // Start watching the element

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView, entry };
}
