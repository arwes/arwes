import type { Properties as CSSProperties } from 'csstype';
import { type AppTheme } from '@arwes/theme';
import { createFrameOctagonClip } from '@arwes/frames';

const createAppStylesBaseline = (theme: AppTheme): Record<string, CSSProperties> => {
  const { dark, space, colors, fontFamilies, typography, transitions } = theme;

  // Remove "fontSize" from main typography styles since the browser should set this value.
  const { fontSize: _typographyMainStylesFontSize, ...typographyMainStyles } = typography.body(1);

  type PaletteName = keyof typeof theme.colors;
  const themeNames = Object.keys(theme.colors) as unknown as PaletteName[];

  const blockquotesThemes = themeNames.reduce((themes: Record<string, CSSProperties>, themeName: PaletteName) => {
    const palette = colors[themeName];
    themes[`blockquote[data-arwes-global-palette=${String(themeName)}]`] = {
      borderColor: palette.main(4),
      background: `linear-gradient(
        to right,
        ${palette.main(4, { alpha: 0.15 })},
        ${palette.main(4, { alpha: 0.05 })}
      )`
    };
    return themes;
  }, {});

  return {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },

    'html, body': {
      // Prevent adjustments of font size after orientation changes in iOS.
      WebkitTextSizeAdjust: '100%',

      WebkitFontSmoothing: 'antialiased',

      fontFamily: 'sans-serif',
      fontSize: '100%',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.5',
      color: colors.primary.text(dark ? 2 : 7),
      ...typographyMainStyles,

      backgroundColor: dark ? colors.primary.bg(2) : 'white',

      scrollbarWidth: 'auto',
      scrollbarColor: `${colors.secondary.main(7)} transparent`
    },

    '::-webkit-scrollbar': {
      width: '0.625rem',
      height: '0.625rem'
    },

    '::-webkit-scrollbar-track, ::-webkit-scrollbar-corner': {
      background: dark ? colors.primary.bg(4) : 'white'
    },
    '::-webkit-scrollbar-thumb': {
      border: `0.2rem solid ${dark ? colors.primary.bg(4) : 'white'}`,
      background: colors.secondary.main(7),
      transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
      transitionTimingFunction: 'ease-out',
      transitionDuration: transitions.duration(1)
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: colors.secondary.main(5)
    },

    '::selection': {
      backgroundColor: colors.secondary.deco(7)
    },

    // TEXTS

    [`:where(
      [data-arwes-global-block],
      h1:not(:last-child),
      h2:not(:last-child),
      h3:not(:last-child),
      h4:not(:last-child),
      h5:not(:last-child),
      h6:not(:last-child),
      p:not(:last-child),
      blockquote:not(:last-child),
      pre:not(:last-child),
      figure:not(:last-child),
      table:not(:last-child),
      hr:not(:last-child),
      ul:not(:last-child),
      ol:not(:last-child)
    )`]: {
      marginBottom: space(6)
    },

    'h1, h2, h3, h4, h5, h6': {
      scrollMarginTop: space(12),
      fontStyle: 'normal',
      color: colors.primary.main(dark ? 4 : 9),
      textShadow: dark ? `0 0 1px ${colors.primary.main(4)}` : undefined
    },

    h1: typography.title(0),
    h2: typography.title(1),
    h3: typography.title(2),
    h4: typography.title(3),
    h5: typography.title(4),
    h6: typography.title(5),

    'b, strong': {
      fontWeight: 'bolder'
    },

    small: {
      fontSize: '75%'
    },

    // Prevent `sub` and `sup` elements from affecting the line height in all browsers.
    'sub, sup': {
      position: 'relative',
      fontSize: '75%',
      lineHeight: 0,
      verticalAlign: 'baseline'
    },

    sub: {
      bottom: '-0.25em'
    },

    sup: {
      top: '-0.5em'
    },

    // Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
    'abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'underline dotted'
    },

    // Correct the inheritance and scaling of font size in all browsers.
    'kbd, samp': {
      ...typography.body(1),
      fontFamily: 'monospace, monospace'
    },

    a: {
      color: colors.secondary.text(dark ? 3 : 7),
      textShadow: dark ? `0 0 1px ${colors.secondary.text(3)}` : undefined,
      textDecoration: 'none',
      transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
      transitionDuration: transitions.duration(1),
      transitionTimingFunction: 'ease-out'
    },

    'a:hover': {
      color: colors.secondary.main(dark ? 3 : 7)
    },

    'a:focus': {
      outline: `1px dashed ${colors.secondary.main(3)}`
    },

    // LISTS

    'ul, ol': {
      paddingLeft: space(4)
    },
    ':where(ul, ol) ul, :where(ul, ol) ol': {
      marginBottom: 0
    },
    ':where(ul) li::marker': {
      content: '"≫ "',
      display: 'inline-block',
      marginTop: '0.05em',
      fontSize: '0.9em',
      fontWeight: 'bold'
    },

    // CODE

    'code, pre': {
      // Correct the inheritance and scaling of font size in all browsers.
      fontFamily: fontFamilies.code
    },

    code: {
      fontSize: '75%'
    },

    pre: {
      display: 'block',
      borderWidth: '1px 0',
      borderStyle: 'solid',
      borderColor: colors.primary.main(7),
      padding: '1rem',
      fontSize: '0.75rem',
      background: dark
        ? `linear-gradient(
          to right,
          ${colors.primary.text(6, { alpha: 0.1 })},
          ${colors.primary.text(9, { alpha: 0.1 })}
        )`
        : colors.primary.text(0)
    },

    // BLOCKQUOTE

    blockquote: {
      display: 'block',
      border: 'none',
      borderLeft: `${space(0.5)} solid ${colors.primary.main(5)}`,
      padding: space([4, 4, 4, 4.5]),
      width: '100%',
      background: `linear-gradient(
        to right,
        ${colors.primary.main(4, { alpha: 0.15 })},
        ${colors.primary.main(4, { alpha: 0.05 })}
      )`,
      clipPath: createFrameOctagonClip({
        squareSize: space(3),
        leftTop: false,
        leftBottom: false
      })
    },

    ...blockquotesThemes,

    // TABLES

    table: {
      borderCollapse: 'separate',
      borderSpacing: space(1),
      width: '100%',
      textAlign: 'left'
    },

    ':where(thead tr)': {
      ...typography.body(2),
      color: colors.primary.text(dark ? 4 : 7),
      background: dark
        ? `linear-gradient(
          to top,
          ${colors.primary.main(7, { alpha: 0.2 })},
          ${colors.primary.main(7, { alpha: 0.05 })}
        )`
        : colors.primary.text(0)
    },

    ':where(thead th, thead td)': {
      borderBottom: `1px solid ${colors.primary.main(dark ? 7 : 2)}`
    },

    ':where(tbody tr)': {
      backgroundColor: dark
        ? colors.primary.main(8, { alpha: 0.1 })
        : undefined
    },

    ':where(tbody tr:hover)': {
      backgroundColor: dark
        ? colors.primary.main(8, { alpha: 0.3 })
        : colors.primary.deco(4)
    },

    'th, td': {
      padding: space([1, 3]),
      verticalAlign: 'top'
    },

    tr: {
      transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
      transitionTimingFunction: 'ease-out',
      transitionDuration: transitions.duration(1)
    },

    // ASSETS

    img: {
      display: 'block',
      maxWidth: '100%'
    },

    ':where(figure img)': {
      verticalAlign: 'top',
      clipPath: createFrameOctagonClip({
        squareSize: space(3),
        leftBottom: false,
        rightTop: false,
        rightBottom: false
      })
    },

    figcaption: {
      padding: space([2, 4]),
      backgroundColor: dark
        ? colors.primary.main(8, { alpha: 0.2 })
        : colors.primary.text(0),
      color: dark ? undefined : colors.primary.text(7),
      clipPath: createFrameOctagonClip({
        squareSize: space(3),
        leftTop: false,
        leftBottom: false,
        rightTop: false
      })
    },

    // LINES

    hr: {
      position: 'relative',
      border: 'none',
      background: dark
        ? `linear-gradient(
          to right,
          ${colors.primary.deco(2)},
          ${colors.primary.deco(8)}
        )`
        : colors.primary.main(7),
      width: '100%',
      height: '1px',
      transformOrigin: 'left center'
    },

    'hr::after': dark
      ? {
          content: '""',
          position: 'absolute',
          right: 0,
          bottom: 0,
          display: 'block',
          width: space(6),
          height: 0,
          borderBottom: `1px solid ${colors.primary.deco(10)}`
        }
      : {}
  };
};

export { createAppStylesBaseline };
