import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (theme: Theme): Record<string, CSSObject> => {
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
