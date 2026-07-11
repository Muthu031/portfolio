import { useEffect, useState } from "react";
import { isSoundEnabled, playSound, setSoundEnabled, subscribeSound, type SoundKind } from "../lib/sound";

/** Reactive wrapper around the sound module — Navbar's toggle and every button-press effect share this. */
export function useGameSound() {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  useEffect(() => subscribeSound(setEnabled), []);

  return {
    enabled,
    toggle: () => setSoundEnabled(!enabled),
    play: (kind: SoundKind) => playSound(kind),
  };
}
