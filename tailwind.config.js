/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Enable JIT mode for faster builds and smaller output
  theme: {
    // Enhanced breakpoints for better mobile responsiveness
    screens: {
      'xs': '320px',   // Extra small devices
      'sm': '640px',   // Small devices
      'md': '768px',   // Medium tablets
      'lg': '1024px',  // Large tablets and small laptops
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Large desktop
    },
    extend: {
      colors: {
        electric: '#00f5ff',
        golden: '#ffb800',
        void: '#0a0a0f',
        panel: '#0f0f1a',
        card: '#0d0d1a',
        cream: '#e8e8f0',
        muted: '#8888aa',
        subtle: '#44445a',
        'line': 'rgba(255,255,255,0.06)',
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Optimize animations for better performance
      animation: {
        'glitch': 'glitch 8s infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0,0)', filter: 'none' },
          '92%': { transform: 'translate(-3px, 1px)', filter: 'hue-rotate(90deg)' },
          '94%': { transform: 'translate(3px, -1px)', filter: 'hue-rotate(-90deg)' },
          '96%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(45deg)' },
          '98%': { transform: 'translate(2px, -1px)', filter: 'none' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'scroll-bounce': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(10px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      // Better spacing for mobile and desktop
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
      // Optimize transitions
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  // Use JIT compiler for optimal performance
  mode: 'jit',
  plugins: [],
  // Purge unused styles more aggressively
  safelist: [
    // Add any dynamic classes here if needed
  ],
}
