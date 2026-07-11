// Tiny opt-in UI sound engine. Generates its beeps as WAV data URIs at
// runtime instead of shipping binary audio assets, then plays them through
// howler (dynamically imported so it never enters the main bundle).
// Sound is OFF by default and only ever turns on via explicit user click —
// see Navbar's mute/unmute toggle. Nothing here ever autoplays.

type Listener = (enabled: boolean) => void;

const STORAGE_KEY = "portfolio:sound-enabled";
const listeners = new Set<Listener>();

let enabled = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(next: boolean): void {
  enabled = next;
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, String(next));
  listeners.forEach((listener) => listener(enabled));
}

export function subscribeSound(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function synthBeepDataUri(frequency: number, durationMs: number, volume: number): string {
  const sampleRate = 8000;
  const numSamples = Math.max(1, Math.floor((durationMs / 1000) * sampleRate));
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = 1 - i / numSamples; // linear decay so beeps don't click/pop
    const sample = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    view.setInt16(44 + i * 2, sample * 32767, true);
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return `data:audio/wav;base64,${btoa(binary)}`;
}

export type SoundKind = "click" | "unlock";

const presetCache = new Map<SoundKind, string>();

function presetDataUri(kind: SoundKind): string {
  if (!presetCache.has(kind)) {
    presetCache.set(kind, kind === "click" ? synthBeepDataUri(660, 60, 0.15) : synthBeepDataUri(880, 220, 0.18));
  }
  return presetCache.get(kind) as string;
}

export async function playSound(kind: SoundKind): Promise<void> {
  if (!enabled) return;
  const { Howl } = await import("howler");
  new Howl({
    src: [presetDataUri(kind)],
    format: ["wav"],
    volume: kind === "click" ? 0.35 : 0.5,
  }).play();
}
