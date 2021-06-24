// Extending https://necolas.github.io/normalize.css.

import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/css';
import { Theme } from '@arwes/design';

const createGlobalGeneralStyles = (theme: Theme): Record<string, CSSObject> => {
  const { palette, space, outline, shadowBlur, fontScale, transitionDuration } = theme;

  const highlightedContentBgColor1 = rgba(palette.primary.light1, 0.05);
  const highlightedContentBgColor2 = rgba(palette.primary.light1, 0.1);
  const highlightedContentBgColor3 = rgba(palette.primary.light1, 0.15);

  return {
    '*, *:before, *:after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    'html, body': {
      backgroundColor: palette.neutral.main,

      // Prevent adjustments of font size after orientation changes in iOS.
      WebkitTextSizeAdjust: '100%',

      // Fonts
      fontSize: `${16 * fontScale()}px`,
      lineHeight: 1.3,
      color: palette.text.main,

      // Scrollbars
      scrollbarWidth: 'thin',
      scrollbarColor: palette.primary.dark3 + ' ' + palette.primary.dark4,
      '& ::-webkit-scrollbar': {
        width: space(1.5),
        height: space(1.5)
      },
      [[
        '& ::-webkit-scrollbar-thumb',
        '& ::-webkit-scrollbar-track',
        '& ::-webkit-scrollbar-corner'
      ].join()]: {
        backgroundColor: palette.primary.dark4
      },
      '& ::-webkit-scrollbar-thumb': {
        border: `${space(0.4)}px solid ${palette.primary.dark4}`,
        backgroundColor: palette.primary.dark3,
        transition: `background-color ${transitionDuration()}ms ease-out`,

        '&:hover': {
          backgroundColor: palette.primary.dark2
        },
        '&:active': {
          backgroundColor: palette.primary.dark1
        }
      },

      // Selection
      '& ::selection': {
        backgroundColor: rgba(palette.primary.main, 0.3),
        color: 'inherit'
      }
    },

    // TEXT

    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      color: palette.text.dark1,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      textShadow: `0 0 ${shadowBlur(2)}px ${palette.text.dark1}`,

      a: {
        textShadow: `0 0 ${shadowBlur(2)}px ${palette.secondary.main}`
      }
    },
    h1: { fontSize: '1.75rem' },
    h2: { fontSize: '1.625rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.375rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1.125rem' },
    p: {
      fontSize: '1rem'
    },
    'b, strong': {
      fontWeight: 'bolder'
    },
    small: {
      fontSize: '80%'
    },
    // Prevent `sub` and `sup` elements from affecting the line height in all browsers.
    'sub, sup': {
      fontSize: '75%',
      lineHeight: 0,
      position: 'relative',
      verticalAlign: 'baseline'
    },
    sub: {
      bottom: '-0.25em'
    },
    sup: {
      top: '-0.5em'
    },
    a: {
      color: palette.secondary.main,
      outline: 'none',
      textDecoration: 'none',
      transition: `color ${transitionDuration()}ms ease-out`,

      'h1, h2, h3, h4, h5, h6': {
        textShadow: `0 0 ${shadowBlur(2)}px ${palette.secondary.main}`
      },

      '&:hover, &:focus': {
        color: palette.secondary.light2
      }
    },
    'abbr[title]': {
      // Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
      borderBottom: 'none',
      textDecoration: 'underline dotted'
    },
    'kbd, samp': {
      // Correct the inheritance and scaling of font size in all browsers.
      fontFamily: 'monospace, monospace',
      fontSize: '1rem'
    },

    // LISTS

    'ul, ol': {
      paddingLeft: space(6),
      'ul, ol': {
        marginBottom: 0
      }
    },
    ul: {
      li: {
        '&::marker': {
          content: '"≫ "',
          display: 'inline-block',
          marginTop: '0.05em',
          fontSize: '0.9em'
        }
      }
    },

    // CODES

    'code, pre': {
      // Correct the inheritance and scaling of font size in all browsers.
      fontFamily: 'monospace, monospace'
    },
    pre: {
      display: 'block',
      borderWidth: `${outline(1)}px 0`,
      borderStyle: 'solid',
      borderColor: palette.primary.dark1,
      padding: space(4),
      fontSize: '0.9rem',
      backgroundColor: highlightedContentBgColor1
    },

    // BLOCKQUOTE

    blockquote: {
      borderLeft: `${outline(6)}px solid ${palette.primary.main}`,
      paddingLeft: space(4) + outline(6),
      paddingRight: space(4),
      paddingTop: space(2),
      paddingBottom: space(2),
      backgroundColor: highlightedContentBgColor1,

      'p:last-of-type': {
        marginBottom: 0
      }
    },

    // TABLES

    table: {
      borderCollapse: 'separate',
      borderSpacing: space(1),
      width: '100%',
      textAlign: 'left'
    },
    thead: {
      tr: {
        backgroundColor: highlightedContentBgColor3
      },
      'th, td': {
        borderBottom: `${outline(1)}px solid ${palette.secondary.dark1}`
      }
    },
    tbody: {
      tr: {
        backgroundColor: highlightedContentBgColor1,
        '&:hover, &:focus': {
          backgroundColor: highlightedContentBgColor2
        }
      },
      td: {
        borderBottom: `${outline(1)}px solid ${palette.primary.dark2}`
      }
    },
    'th, td': {
      padding: `${space(1)}px ${space(1.5)}px`
    },
    tr: {
      transition: `background-color ${transitionDuration()}ms ease-out`
    },

    // ASSETS

    img: {
      maxWidth: '100%'
    },

    figure: {
      img: {
        marginBottom: 0,
        verticalAlign: 'top'
      }
    },
    figcaption: {
      padding: space(2),
      backgroundColor: highlightedContentBgColor1
    },

    // LINE

    hr: {
      display: 'block',
      height: 0,
      borderWidth: `0 0 ${outline(1)}px 0`,
      borderStyle: 'solid',
      borderColor: palette.text.main
    },

    // FORMS

    fieldset: {
      padding: space(4)
    },

    'button, input, optgroup, select, textarea': {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: 1.3
    },

    'button, select': {
      // Remove the inheritance of text transform in Edge, Firefox, and IE.
      textTransform: 'none'
    },

    'button, [type="button"], [type="reset"], [type="submit"]': {
      // Correct the inability to style clickable types in iOS and Safari.
      WebkitAppearance: 'button'
    },

    // Show the overflow in Edge.
    'button, input': {
      overflow: 'visible'
    },

    // Remove the inner border and padding in Firefox.
    [[
      'button::-moz-focus-inner',
      '[type="button"]::-moz-focus-inner',
      '[type="reset"]::-moz-focus-inner',
      '[type="submit"]::-moz-focus-inner'
    ].join()]: {
      borderStyle: 'none',
      padding: 0
    },
    // Restore the focus styles unset by the previous rules.
    [[
      'button:-moz-focusring',
      '[type="button"]:-moz-focusring',
      '[type="reset"]:-moz-focusring',
      '[type="submit"]:-moz-focusring'
    ].join()]: {
      outline: '1px dotted ButtonText'
    },

    // Add the correct vertical alignment in Chrome, Firefox, and Opera.
    progress: {
      verticalAlign: 'baseline'
    },

    // Correct the cursor style of increment and decrement buttons in Chrome.
    [[
      '[type="number"]::-webkit-inner-spin-button',
      '[type="number"]::-webkit-outer-spin-button'
    ].join()]: {
      height: 'auto'
    },

    '[type="search"]': {
      // Correct the odd appearance in Chrome and Safari.
      WebkitAppearance: 'textfield',
      // Correct the outline style in Safari.
      outlineOffset: '-2px'
    },

    // Remove the inner padding in Chrome and Safari on macOS.
    '[type="search"]::-webkit-search-decoration': {
      WebkitAppearance: 'none'
    },

    '::-webkit-file-upload-button': {
      // Correct the inability to style clickable types in iOS and Safari.
      WebkitAppearance: 'button',
      // Change font properties to `inherit` in Safari.
      font: 'inherit'
    },

    // INTERACTIVE

    details: {
      // Add the correct display in Edge, IE 10+, and Firefox.
      display: 'block'
    },

    summary: {
      // Add the correct display in all browsers.
      display: 'list-item'
    },

    // CONTENT BLOCK ELEMENTS

    [[
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'ul',
      'ol',
      'pre',
      'blockquote',
      'table',
      'figure',
      'hr',
      'fieldset'
    ].join()]: {
      marginBottom: space(4)
    }
  };
};

export { createGlobalGeneralStyles };
