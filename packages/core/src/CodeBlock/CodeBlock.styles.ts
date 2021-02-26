import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean }
): Record<string, CSSObject> => {
  const { palette, space, outline, shadow } = theme;
  const { animate } = options;

  return {
    root: {
      margin: `0 0 ${space(4)}px`
    },
    container: {
      position: 'relative',
      display: 'flex'
    },
    bg: {
      position: 'absolute',
      zIndex: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: rgba(palette.primary.light2, 0.05),
      opacity: animate ? 0 : undefined
    },
    wrap: {
      position: 'relative',
      zIndex: 1,
      flex: 1,
      overflow: 'auto',
      padding: space(4)
    },
    // In case it is a PRE element, reset its default styles.
    content: {
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0,
      backgroundColor: 'transparent'
    },

    lang: {
      position: 'absolute',
      zIndex: 2,
      right: 0,
      top: outline(1),
      padding: `${space(0.5)}px ${space(1.5)}px`,
      color: palette.secondary.main,
      textShadow: `0 0 ${shadow.blur(1)}px ${palette.secondary.main}`,
      textTransform: 'uppercase'
    },
    langBg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: palette.primary.dark3,
      opacity: animate ? 0 : undefined
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
