import { useCallback, useState } from "react";

/** True exactly once per browser for a given `key` — gates the achievement-unlock confetti/toast to new visitors only. */
export function useFirstVisit(key: string): [boolean, () => void] {
  const storageKey = `portfolio:seen:${key}`;
  const [isFirstVisit] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(storageKey) === null
  );

  // Stable identity across re-renders — callers put this in a useEffect
  // dependency array, and a fresh function reference every render would
  // make that effect refire on every unrelated state update.
  const markSeen = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(storageKey, "1");
  }, [storageKey]);

  return [isFirstVisit, markSeen];
}
