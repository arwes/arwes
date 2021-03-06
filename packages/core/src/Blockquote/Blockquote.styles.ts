import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate?: boolean, palette?: string }
): Record<string, CSSObject> => {
  const { space, outline, shadow } = theme;
  const { animate } = options;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;
  const color = colorPalette.main;
  const colorBg = rgba(colorPalette.light1, 0.05);

  return {
    root: {
      display: 'block',
      margin: 0,
      marginBottom: space(4),
      border: 'none',
      padding: 0,
      backgroundColor: 'transparent'
    },
    container: {
      position: 'relative'
    },
    bg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colorBg,
      opacity: animate ? 0 : undefined
    },
    line: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: outline(6),
      height: '100%',
      backgroundColor: color,
      boxShadow: `0 0 ${shadow.blur(2)}px ${color}`,
      opacity: animate ? 0 : undefined
    },
    content: {
      paddingLeft: space(4) + outline(6),
      paddingRight: space(4),
      paddingTop: space(2),
      paddingBottom: space(2)
    }
  };
};

export { generateStyles };
