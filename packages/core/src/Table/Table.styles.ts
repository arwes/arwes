import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (theme: ArwesTheme): Record<string, CSSObject> => {
  const { space } = theme;

  return {
    root: {
      display: 'block',
      overflow: 'auto',
      margin: `0 0 ${space(4)}px`,
      width: '100%'
    },
    rootIsTransitioning: {
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  };
};

export { generateStyles };
