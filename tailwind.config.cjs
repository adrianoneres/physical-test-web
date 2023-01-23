/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32,
    },
    colors: {
      transparent: 'transparent',
      black: '#111827',
      white: '#FFFFFF',
      green: '#22C55E',
      yellow: '#F59E0B',
      red: '#E11D48',
      blue: {
        600: '#2563EB',
        500: '#3B82F6',
        300: '#93C5FD',
      },
      slate: {
        800: '#1E293B',
        300: '#CBD5E1',
        100: '#F1F5F9',
      },
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
};
