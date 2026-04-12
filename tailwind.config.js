/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'sky-blue':   '#e0f7ff',
        'aqua-light': '#7dd3fc',
        'aqua-mid':   '#38bdf8',
        'teal':       '#0ea5e9',
        'deep-teal':  '#0369a1',
        'navy':       '#0c4a6e',
        'navy-dark':  '#071e33',
        'sand':       '#fef9c3',
        'gold':       '#fbbf24',
        'coral':      '#f97316',
        'seafoam':    '#a7f3d0',
      },
      fontFamily: {
        nature:  ['"Touch of Nature"', 'cursive'],
        ocean:   ['"Poppins"', 'cursive'],
        body:    ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow':   'floatY 6s ease-in-out infinite',
        'float-med':    'floatY 4.5s ease-in-out infinite',
        'sway':         'sway 5s ease-in-out infinite',
        'sway-reverse': 'swayReverse 5.5s ease-in-out infinite',
        'drift':        'drift 18s linear infinite',
        'bubble-rise':  'bubbleRise 8s ease-in infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'spin-slow':    'spin 20s linear infinite',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-22px)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-4deg) translateX(0)' },
          '50%':     { transform: 'rotate(4deg) translateX(6px)' },
        },
        swayReverse: {
          '0%,100%': { transform: 'rotate(4deg) translateX(0)' },
          '50%':     { transform: 'rotate(-4deg) translateX(-6px)' },
        },
        drift: {
          '0%':   { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        bubbleRise: {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '100%': { transform: 'translateY(-100vh) scale(1.3)', opacity: '0' },
        },
        pulseGlow: {
          '0%,100%': { filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.5))' },
          '50%':     { filter: 'drop-shadow(0 0 24px rgba(56,189,248,0.9))' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}