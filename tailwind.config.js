/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#060a1c',
          soft: '#0a1028',
          card: '#0d1430',
          border: '#1a2347',
        },
        // Sampled from the logo: deep navy base, periwinkle/steel-blue circuit, white mark.
        brand: {
          50:  '#eef1fb',
          100: '#dde3f6',
          200: '#c1cbef',
          300: '#9dacdf',
          400: '#7f90d2',
          500: '#6173bf',
          600: '#4c5da8',
          700: '#3d4b8a',
          800: '#2f3a6b',
          900: '#222b50',
        },
        accent: {
          ice: '#dbe4ff',
          steel: '#8fa0dc',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'radial-fade':
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(97,115,191,0.25), transparent 70%)",
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(97,115,191,0.5)',
        'glow-lg': '0 0 80px -10px rgba(97,115,191,0.6)',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { 'background-position': '-1000px 0' },
          '100%': { 'background-position': '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
