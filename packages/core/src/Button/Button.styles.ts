import { CSSObject } from '@emotion/react';

import { ARWES_CORE_FRAME_BG_CLASSNAME } from '../constants';
import { ArwesTheme } from '../ArwesThemeProvider';

const BUTTON_FRAME_BG_BASE_OPACITY = 0.2;
const BUTTON_FRAME_BG_HIGH_OPACITY = 0.6;

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

      [`& .${ARWES_CORE_FRAME_BG_CLASSNAME}`]: active && {
        backgroundColor: color,
        opacity: BUTTON_FRAME_BG_BASE_OPACITY,
        transition: `opacity ${transitionDuration}ms ease-out`
      },

      '&:hover, &:focus': !disabled && {
        color: colorHover,
        textShadow: `0 0 ${shadow.blur(1)}px ${colorHover}`,

        [`& .${ARWES_CORE_FRAME_BG_CLASSNAME}`]: active && {
          backgroundColor: colorHover
        }
      }
    },
    rootIsTransitioning: {
      cursor: 'default'
    },
    content: {}
  };
};

export {
  BUTTON_FRAME_BG_BASE_OPACITY,
  BUTTON_FRAME_BG_HIGH_OPACITY,
  generateStyles
};
