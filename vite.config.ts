import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Never expose source maps in production — they reveal your full source code
    // to anyone who opens DevTools, even on a minified bundle.
    sourcemap: false,
  },
})
