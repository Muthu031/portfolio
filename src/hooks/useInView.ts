import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  /** Once true, stop observing — section enter-animations should not replay on scroll-back. */
  triggerOnce?: boolean;
}

/** Tracks whether an element has scrolled into the viewport, via IntersectionObserver. */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  triggerOnce = true,
}: UseInViewOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, isInView];
}
