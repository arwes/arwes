import rgba from 'polished/lib/color/rgba';
import { Interpolation } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean }
): Record<string, Interpolation<ArwesTheme>> => {
  const { palette, space, outline, shadow } = theme;
  const { animate } = options;

  return {
    root: {
      position: 'relative',
      display: 'flex',
      margin: `0 0 ${space(4)}px`,
      backgroundColor: animate ? undefined : rgba(palette.primary.light2, 0.05)
    },
    lang: {
      zIndex: 1,
      position: 'absolute',
      right: 0,
      top: outline(1),
      padding: `${space(0.5)}px ${space(1.5)}px`,
      color: palette.secondary.main,
      textShadow: `0 0 ${shadow.blur(1)}px ${palette.secondary.main}`,
      textTransform: 'uppercase',
      backgroundColor: animate ? undefined : palette.primary.dark3
    },
    container: {
      flex: 1,
      overflow: 'auto',
      padding: space(4)
    },
    containerIsTransitioning: {
      overflow: 'hidden'
    },
    content: {
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0,
      backgroundColor: 'transparent'
    },
    line: {
      position: 'absolute',
      left: 0,
      width: animate ? 0 : '100%',
      height: outline(1),
      backgroundColor: palette.primary.dark1,
      boxShadow: `0 0 ${outline(1)}px ${palette.primary.dark1}`
    },
    lineTop: {
      top: 0
    },
    lineBottom: {
      bottom: 0
    },
    lineLang: {
      bottom: 0,
      backgroundColor: palette.secondary.dark1,
      boxShadow: `0 0 ${outline(1)}px ${palette.secondary.dark1}`
    }
  };
};

export { generateStyles };
