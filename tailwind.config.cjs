/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
    },
    colors: {
      black: '#111827',
      white: '#FFFFFF',
      green: '#22C55E',
      yellow: '#F59E0B',
      red: '#E11D48',
      'blue-600': '#2563EB',
      'blue-500': '#3B82F6',
      'blue-300': '#93C5FD',
      'slate-800': '#1E293B',
      'slate-300': '#CBD5E1',
      'slate-100': '#F1F5F9',
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
};
