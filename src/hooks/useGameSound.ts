import { useRef, useCallback } from "react";
// @ts-ignore - no types for howler
const Howl = require("howler").Howl;

let soundEnabled = false;

export function useGameSound() {
  const pressRef = useRef<any>(null);
  const unlockRef = useRef<any>(null);

  const initSounds = useCallback(() => {
    if (pressRef.current) return;
    pressRef.current = new Howl({
      src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="],
      volume: 0.1,
    });
    unlockRef.current = new Howl({
      src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="],
      volume: 0.1,
    });
  }, []);

  const playPress = useCallback(() => {
    if (!soundEnabled) return;
    initSounds();
    pressRef.current?.play();
  }, [initSounds]);

  const playUnlock = useCallback(() => {
    if (!soundEnabled) return;
    initSounds();
    unlockRef.current?.play();
  }, [initSounds]);

  const setEnabled = useCallback((enabled: boolean) => {
    soundEnabled = enabled;
  }, []);

  return { playPress, playUnlock, soundEnabled, setEnabled };
}

export { soundEnabled };
