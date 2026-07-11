import type { Options } from "canvas-confetti";

// Brand-colored confetti burst, dynamically imported so canvas-confetti never
// ships in the main bundle — only paid for when it actually fires.
export async function fireConfetti(overrides: Partial<Options> = {}): Promise<void> {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 60,
    spread: 70,
    startVelocity: 32,
    origin: { y: 0.6 },
    colors: ["#7c5cff", "#ffc857", "#eef1fb"],
    disableForReducedMotion: true,
    ...overrides,
  });
}
