import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    // Never expose source maps in production — they reveal your full source code
    // to anyone who opens DevTools, even on a minified bundle.
    sourcemap: false,
    // Performance optimization settings
    minify: 'esbuild', // Use esbuild for minification (default, faster than terser)
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'react-router-dom'],
  },
  server: {
    // Enable compression for dev server
    middlewareMode: false,
  },
})
