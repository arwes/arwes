import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean, palette?: string, hover?: boolean, disabled?: boolean }
): Record<string, CSSObject> => {
  const { space, outline, shadow, transitionDuration } = theme;
  const { animate, hover, disabled } = options;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;
  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;

  return {
    root: {
      position: 'relative',
      display: 'inline-block',

      [[
        '&:hover .arwes-frame-underline__line',
        '&:focus .arwes-frame-underline__line'
      ].join(',')]: hover && !disabled && {
        backgroundColor: colorHover,
        boxShadow: `0 0 ${shadow.blur(2)}px ${colorHover}`
      }
    },
    container: {},

    line: {
      position: 'absolute',
      height: outline(2),
      backgroundColor: color,
      boxShadow: `0 0 ${shadow.blur(2)}px ${color}`,
      transition: ['background-color', 'box-shadow']
        .map(prop => `${prop} ${transitionDuration}ms ease-out`)
        .join(','),
      opacity: animate ? 0 : undefined
    },
    line1: {
      left: 0,
      bottom: 0,
      width: `calc(100% - ${space(4)}px)`
    },
    line2: {
      right: 0,
      bottom: 0,
      width: space(4),
      transform: 'skewY(135deg)', // 45deg.
      transformOrigin: 'left'
    },

    shapes: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      overflow: 'hidden',
      opacity: animate ? 0 : undefined
    },
    shape: {
      position: 'absolute',
      overflow: 'hidden'
    },
    shape1: {
      left: 0,
      right: 0,
      bottom: space(4),
      height: '100%'
    },
    shape2: {
      left: 0,
      right: space(4),
      bottom: 0,
      height: space(4)
    },
    shape3: {
      right: 0,
      bottom: 0,
      width: space(4),
      height: space(4)
    },
    shape3A: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      transform: 'skewY(135deg)', // 45deg.
      transformOrigin: 'left'
    },

    content: {
      padding: `${space(2)}px ${space(4)}px`
    }
  };
};

export { generateStyles };
