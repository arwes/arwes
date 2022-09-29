import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (
  theme: Theme,
  options: { palette?: string }
): Record<string, CSSObject> => {
  const { space, outline, shadowBlur } = theme;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;
  const color = colorPalette.main;
  const colorBg = rgba(colorPalette.light1, 0.05);

  return {
    root: {
      position: 'relative',
      display: 'block',
      margin: 0,
      marginBottom: space(4),
      border: 'none',
      padding: 0,
      backgroundColor: 'transparent'
    },
    bg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colorBg
    },
    line: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: outline(6),
      height: '100%',
      backgroundColor: color,
      boxShadow: `0 0 ${shadowBlur(2)}px ${color}`,
      transformOrigin: 'top'
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
