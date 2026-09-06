/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#0f2818',
        'forest': '#1a3a2a',
        'forest-light': '#2d5a3d',
        'sage': '#6b8e7f',
        'sage-light': '#9caea5',
        'moss': '#4a6b5e',
        'teal-dark': '#1e4d52',
        'teal': '#2a6f7a',
        'teal-light': '#5a9fa8',
        'gold': '#b8956a',
        'gold-light': '#d4b896',
        'cream': '#f5f1e8',
        'cream-dark': '#e8e3d8',
        'charcoal': '#2a2a2a',
        'charcoal-light': '#404040',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(20px) translateY(-10px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(90, 159, 168, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(90, 159, 168, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};