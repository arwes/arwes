import { darken, lighten } from 'polished';

const accent = 0.2;
const generateColor = color => ({
  base: color,
  light: lighten(accent, color),
  dark: darken(accent, color),
});
const generateBackground = color => ({
  level0: color,
  level1: lighten(0.015, color),
  level2: lighten(0.030, color),
  level3: lighten(0.045, color),
});

export default {

  margin: 20,
  padding: 20,
  shadowLength: 4,
  animTime: 200,
  alpha: 0.75,
  accent,

  color: {
    primary: generateColor('#26dafd'),
    secondary: generateColor('#df9527'),
    control: generateColor('#acf9fb'),
    header: generateColor('#a1ecfb'),
    success: generateColor('#00ff00'),
    alert: generateColor('#ff0000'),
    disabled: generateColor('#999999'),
  },

  background: {
    primary: generateBackground('#021114'),
    success: generateBackground('#081402'),
    alert: generateBackground('#140202'),
    disabled: generateBackground('#141414'),
  },

  typography: {
    lineHeight: 1.5,
    headerSizes: {
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 21,
      h5: 18,
      h6: 16,
    },
    fontSize: 21,
    headerFontFamily: '"Electrolize", "sans-serif"',
    fontFamily: '"Titillium Web", "sans-serif"',
    codeFontFamily: 'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
  },

  responsive: {
    small: 600,
    medium: 992,
    large: 1200,
  },
};
