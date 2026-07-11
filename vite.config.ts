import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// tsparticles and canvas-confetti are only ever reached via dynamic import()
// (see ParticleField.tsx and lib/confetti.ts), so Rollup already splits them
// into their own lazy-loaded chunks — no manualChunks needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
