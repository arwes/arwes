import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ARWES_CORE_FRAME_BG_CLASSNAME } from '../constants';
import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { palette?: string, active?: boolean, disabled?: boolean }
): Record<string, CSSObject> => {
  const { shadow, transitionDuration } = theme;
  const { active, disabled } = options;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;

  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;
  const colorBg = rgba(colorPalette.dark2, 0.25);
  const colorBgHover = rgba(colorPalette.light2, 0.25);

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
      textShadow: `0 0 ${shadow.blur(1)}px ${color}`,
      color,
      cursor: disabled ? 'default' : 'pointer',
      transition: ['color', 'text-shadow']
        .map(prop => `${prop} ${transitionDuration}ms ease-out`)
        .join(','),

      '&:hover, &:focus': !disabled && {
        color: colorHover,
        textShadow: `0 0 ${shadow.blur(1)}px ${colorHover}`,

        [`& .${ARWES_CORE_FRAME_BG_CLASSNAME}`]: active && {
          backgroundColor: colorBgHover
        }
      },

      [`& .${ARWES_CORE_FRAME_BG_CLASSNAME}`]: active && {
        backgroundColor: colorBg,
        transition: `background-color ${transitionDuration}ms ease-out`
      }
    },
    rootIsTransitioning: {
      cursor: 'default'
    },
    content: {}
  };
};

export { generateStyles };
