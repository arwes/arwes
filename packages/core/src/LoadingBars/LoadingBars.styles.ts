import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const rootFullStyles = {
  display: 'flex',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean, length: number, size: number, full?: boolean }
): Record<string, CSSObject> => {
  const { palette, space, outline, shadow } = theme;
  const { animate, length, size, full } = options;

  return {
    root: Object.assign(
      {
        display: 'inline-block',
        padding: `0 ${space(2 * size)}px`
      },
      full ? rootFullStyles : undefined
    ) as CSSObject,
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 'auto',
      width: space(length * 2 * size),
      opacity: animate ? 0 : undefined
    },
    item: {
      width: space(1 * size),
      height: space(5 * size),
      borderStyle: 'solid',
      borderColor: palette.primary.main,
      borderWidth: outline(1),
      boxShadow: `0 0 ${shadow.blur(1 * size)}px ${palette.primary.main}`,
      transform: 'skewX(330deg)',
      transformOrigin: 'center'
    },
    itemPrimaryActive: {
      backgroundColor: palette.primary.main,
      boxShadow: `0 0 ${shadow.blur(2 * size)}px ${palette.primary.main}`
    },
    itemSecondaryActive: {
      backgroundColor: palette.primary.dark2,
      boxShadow: `0 0 ${shadow.blur(2 * size)}px ${palette.primary.dark2}`
    },
    itemInactive: {
      backgroundColor: '',
      boxShadow: ''
    }
  };
};

export { generateStyles };
