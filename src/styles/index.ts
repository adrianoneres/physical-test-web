import { createStitches } from '@stitches/react';

export const {
  config,
  css,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      black: '#091e42',
      white: '#ffffff',

      success: '#36b37e',
      warning: '#ff8b00',
      danger: '#ff5630',

      slate900: '#253858',
      slate500: '#7a869a',

      gray900: '#333333',
      gray500: '#666666',
      gray300: '#b3b3b3',
      gray100: '#e6e6e6',

      blue600: '##006eff',
      blue500: '#2684ff',
      blue100: '#deebff',
    },

    fontSizes: {
      sm: '0.813rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '4rem',
    },
  },
});
