/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFEF9',
        'cream-dark': '#F5F3ED',
        forest: '#1A3A3A',
        'forest-dark': '#0F2626',
        'forest-light': '#2D5555',
        teal: '#5A9FA8',
        'teal-dark': '#3D7080',
        'teal-light': '#7AB8C4',
        sage: '#6B8E7F',
        'sage-light': '#8FA99C',
        'sage-dark': '#4D6B5F',
        moss: '#5A7C6F',
        gold: '#D4A574',
        'gold-light': '#E8BFA3',
        charcoal: '#2B2B2B',
        'charcoal-light': '#3F3F3F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(90, 159, 168, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(90, 159, 168, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
