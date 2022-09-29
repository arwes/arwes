import { CSSObject } from '@emotion/react';

const generateStyles = (options: { animate?: boolean }): Record<string, CSSObject> => {
  const { animate } = options;

  return {
    root: {
      '& > li': {
        opacity: animate ? 0 : undefined
      }
    }
  };
};

export { generateStyles };
