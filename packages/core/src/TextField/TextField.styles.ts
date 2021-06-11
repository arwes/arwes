import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (
  theme: Theme,
  options: { palette?: string }
): Record<string, CSSObject> => {
  const { outline, shadowBlur, transitionDuration } = theme;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;

  return {
    root: {
      position: 'relative',
      display: 'block'
    },
    container: {},
    input: {
      display: 'block',
      outline: 'none',
      border: 'none',
      padding: '0 0.5rem',
      width: '100%',
      minHeight: '2rem',
      lineHeight: '2rem',
      fontSize: '1rem',
      color: colorPalette.main,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: `${transitionDuration()}ms`,
      transitionTimingFunction: 'ease-out',

      // TEXTAREA specific styles.
      resize: 'vertical',

      // Reset default browser styles.
      WebkitAppearance: 'none',
      WebkitBorderRadius: 0,
      MozAppearance: 'textfield',

      // Remove X from input type search.
      [[
        '&::-webkit-search-decoration',
        '&::-webkit-search-cancel-button',
        '&::-webkit-search-results-button',
        '&::-webkit-search-results-decoration'
      ].join()]: {
        WebkitAppearance: 'none'
      },

      // Remove arrows from input type number.
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0
      },

      '&:hover:not(:disabled, :read-only), &:focus:not(:disabled, :read-only)': {
        outline: 'none',
        backgroundColor: rgba(colorPalette.main, 0.05),
        boxShadow: `0 0 ${shadowBlur(1)}px ${colorPalette.dark3}`,

        // The "lineBottomOver" element.
        '& + div': {
          transform: 'scaleX(1)'
        }
      },

      // Remove browser validation styles.
      '&:required, &:invalid': {
        boxShadow: 'none'
      },

      // Autocomplete styles.
      [[
        '&:-webkit-autofill',
        '&:-webkit-autofill:hover',
        '&:-webkit-autofill:focus'
      ].join()]: {
        filter: 'none',
        border: 'none',

        // Hack to define colors, since the basic style properties do not work.
        WebkitTextFillColor: colorPalette.main,
        WebkitBoxShadow: `0 0 0px 1000px ${colorPalette.dark3} inset`
      },

      '&::placeholder': {
        color: rgba(colorPalette.main, 0.5)
      },

      '&:disabled': {
        color: colorPalette.dark1,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        cursor: 'auto',

        '&::placeholder': {
          color: colorPalette.dark2
        }
      }
    },
    line: {
      position: 'absolute',
      bottom: 0,
      borderBottomWidth: outline(1),
      borderBottomStyle: 'solid',
      borderBottomColor: colorPalette.dark1,
      boxShadow: `0 0 ${shadowBlur(1)}px ${colorPalette.dark1}`,
      transformOrigin: 'left'
    },
    lineBottom: {
      left: 0,
      right: 0,

      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: outline(1),
        borderBottomStyle: 'solid',
        borderBottomColor: colorPalette.light1,
        width: '0.5rem'
      },
      '&::before': {
        left: 0
      },
      '&::after': {
        right: 0
      }
    },
    lineBottomOver: {
      left: 0,
      right: 0,
      borderBottomColor: colorPalette.light1,
      boxShadow: `0 0 ${shadowBlur(1)}px ${colorPalette.light1}`,
      transition: `transform ${transitionDuration()}ms ease-out`,
      transform: 'scaleX(0)'
    }
  };
};

export { generateStyles };
