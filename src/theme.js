import { darken, lighten } from 'polished';

const margin = 20;
const padding = 20;
const colorAccent = 0.2;
const colorAlpha = 0.75;
const animTime = 100;

const color0 = '#26dafd';
const color1 = '#acf9fb';
const color2 = '#ffffff';
const colorAlert = '#ff0000';
const colorSuccess = '#00ff00';
const colorDisabled = '#999999';
const colorBackground0 = '#021114';

export default {

  //
  // General
  //

  margin,
  padding,
  colorAccent,
  colorAlpha,
  animTime,

  //
  // Colors
  //

  // Primary
  color0,
  color0Light: lighten(colorAccent, color0),
  color0Dark: darken(colorAccent, color0),

  // Secondary
  color1,
  color1Light: lighten(colorAccent, color1),
  color1Dark: darken(colorAccent, color1),

  // Tertiary
  color2,
  color2Light: lighten(colorAccent, color2),
  color2Dark: darken(colorAccent, color2),

  // Success
  colorSuccess,
  colorSuccessLight: lighten(colorAccent, colorSuccess),
  colorSuccessDark: darken(colorAccent, colorSuccess),

  // Alert
  colorAlert,
  colorAlertLight: lighten(colorAccent, colorAlert),
  colorAlertDark: darken(colorAccent, colorAlert),

  // Disabled
  colorDisabled,
  colorDisabledLight: lighten(colorAccent, colorDisabled),
  colorDisabledDark: darken(colorAccent, colorDisabled),

  // Backgrounds
  colorBackground0,
  colorBackground1: lighten(0.015, colorBackground0),
  colorBackground2: lighten(0.030, colorBackground0),
  colorBackground3: lighten(0.045, colorBackground0),

  //
  // Typography
  //

  lineHeight: 1.5,
  fontSize: 16,
  fontSizeMedium: 21,

  headerSizes: {
    h1: 28,
    h2: 24,
    h3: 21,
    h4: 18,
    h5: 16,
    h6: 16,
  },

  headerSizesMedium: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 21,
    h5: 18,
    h6: 16,
  },

  codeFontFamily: 'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
  headerFontFamily: '"Electrolize", "sans-serif"',
  fontFamily: '"Titillium Web", "sans-serif"',

  //
  // Responsive
  //

  responsive: {
    small: 600,
    medium: 992,
    large: 1200,
  },
};
