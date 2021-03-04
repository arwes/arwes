import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { palette?: string, disabled?: boolean }
): Record<string, CSSObject> => {
  const { shadow, transitionDuration } = theme;
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
      color,
      textShadow: `0 0 ${shadow.blur(1)}px ${color}`,
      cursor: disabled ? 'default' : 'pointer',
      transition: ['color', 'text-shadow']
        .map(prop => `${prop} ${transitionDuration}ms ease-out`)
        .join(','),

      '&:hover, &:focus': !disabled && {
        color: colorHover,
        textShadow: `0 0 ${shadow.blur(1)}px ${colorHover}`
      }
    },
    rootIsTransitioning: {
      cursor: 'default'
    },
    content: {}
  };
};

export { generateStyles };
