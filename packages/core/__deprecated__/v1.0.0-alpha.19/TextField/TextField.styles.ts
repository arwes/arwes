import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (
  theme: Theme,
  options: { palette?: string, multiline?: boolean, disabled?: boolean, readOnly?: boolean }
): Record<string, CSSObject> => {
  const { outline, shadowBlur, transitionDuration } = theme;
  const { multiline, disabled, readOnly } = options;

  const isHoverFocusEnabled = !disabled && !readOnly;

  const paletteUsed = theme.palette[options.palette as string] ?? theme.palette.primary;
  const color = disabled ? paletteUsed.dark2 : paletteUsed.main;
  const colorTextValue = color;
  const colorTextPlaceholder = rgba(color, 0.5);

  const lineWidth = `${outline(1)}px`;
  const shadowBlurWidth = `${shadowBlur(1)}px`;
  const transitionDurationMs = `${transitionDuration()}ms`;

  // Since Firefox doesn't vertically align text properly for <input/> elements,
  // a different layout is set for <textarea/> and <input/> elements.
  const textBoxStyles = {
    padding: multiline ? '0.5rem' : '0 0.5rem',
    height: multiline ? undefined : '2rem',
    minHeight: multiline ? '2rem' : undefined,
    lineHeight: multiline ? 'inherit' : '2rem',
    fontSize: '1rem'
  };

  return {
    root: {
      display: 'block'
    },
    container: {
      position: 'relative',
      display: 'block',
      cursor: isHoverFocusEnabled ? 'pointer' : 'default',
      WebkitTapHighlightColor: 'transparent'
    },
    input: {
      ...textBoxStyles,
      zIndex: 10,
      position: 'relative',
      display: 'block',
      outline: 'none',
      border: 'none',
      width: '100%',
      color: colorTextValue,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: transitionDurationMs,
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

      ...(isHoverFocusEnabled && {
        '&:hover, &:focus': {
          outline: 'none',
          boxShadow: 'none',

          '& ~ .arwes-text-field__bg': {
            backgroundColor: rgba(color, 0.1),
            boxShadow: `0 0 ${shadowBlurWidth} ${rgba(color, 0.1)}`
          },
          [[
            '& ~ .arwes-text-field__line::before',
            '& ~ .arwes-text-field__line::after'
          ].join()]: {
            transform: 'scaleX(2)'
          }
        }
      }),

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
        WebkitTextFillColor: color,
        WebkitBoxShadow: `0 0 0px 1000px ${paletteUsed.dark4} inset`
      },

      '&::placeholder': {
        color: colorTextPlaceholder,
        opacity: 1 // Firefox style reset.
      }
    },
    bg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: rgba(color, 0.05),
      boxShadow: `0 0 ${shadowBlurWidth} ${rgba(color, 0.05)}`,
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: transitionDurationMs,
      transitionTimingFunction: 'ease-out'
    },
    animatedText: {
      ...textBoxStyles,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      overflow: 'hidden'
    },
    // Plain styles props to apply to the "animatedText" element when
    // there is NOT an input value, so it is a placeholder text.
    animatedTextIsTextPlaceholderPlainStyles: {
      color: colorTextPlaceholder
    },
    // Plain styles props to apply to the "animatedText" element when
    // there is an input value.
    animatedTextIsTextValuePlainStyles: {
      color: colorTextValue
    },
    line: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottomWidth: lineWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: paletteUsed.dark1,
      boxShadow: `0 0 ${shadowBlurWidth} ${paletteUsed.dark1}`,
      transformOrigin: 'left',

      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: lineWidth,
        borderBottomStyle: 'solid',
        borderBottomColor: paletteUsed.light1,
        width: '0.5rem',
        transitionProperty: 'transform',
        transitionDuration: transitionDurationMs,
        transitionTimingFunction: 'ease-out'
      },
      '&::before': {
        left: 0,
        transformOrigin: 'left'
      },
      '&::after': {
        right: 0,
        transformOrigin: 'right'
      }
    }
  };
};

export { generateStyles };
