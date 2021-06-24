import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (
  theme: Theme,
  options: { palette?: string, disabled?: boolean }
): Record<string, CSSObject> => {
  const { shadowBlur, transitionDuration } = theme;
  const { disabled } = options;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;
  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;

  return {
    root: {
      display: 'inline-block',
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      lineHeight: 1,
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      textDecoration: 'none',
      textShadow: `0 0 ${shadowBlur(1)}px ${color}`,
      color,
      cursor: disabled ? 'default' : 'pointer',
      transitionProperty: 'color, text-shadow',
      transitionDuration: `${transitionDuration()}ms`,
      transitionTimingFunction: 'ease-out',
      WebkitTapHighlightColor: 'transparent',

      '&:hover, &:focus': !disabled && {
        textShadow: `0 0 ${shadowBlur(1)}px ${colorHover}`,
        color: colorHover
      }
    },
    rootIsTransitioning: {
      cursor: 'default'
    }
  };
};

export { generateStyles };
