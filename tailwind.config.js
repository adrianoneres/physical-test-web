/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      '2xl': 32,
    },
    colors: {
      transparent: 'transparent',
      black: '#091e42',
      white: '#ffffff',

      danger: {
        600: '#dc2626',
        500: '#e11d48',
        100: '#fee2e2',
      },
      warning: {
        600: '#d97706',
        500: '#ea580c',
        100: '#fef3c7',
      },
      success: {
        600: '#059669',
        500: '#0d9488',
        100: '#d1fae5',
      },

      blue: {
        600: '#2563eb',
        500: '#3b82f6',
        300: '#93c5fd',
        100: '#dbeafe',
      },
      gray: {
        900: '#111827',
        500: '#6b7280',
        300: '#d1d5db',
        100: '#f3f4f6',
      },
      slate: {
        800: '#1e293b',
        600: '#475569',
        300: '#cbd5e1',
        100: '#f1f5f9',
        50: '#f8fafc',
      },
    },
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [],
};
