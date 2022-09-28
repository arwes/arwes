import { CSSObject } from '@emotion/css';

const generateStyles = (options: { animate: boolean }): Record<string, CSSObject > => {
  const { animate } = options;

  return {
    root: {
      position: 'relative',
      display: 'inline-block'
    },
    actualChildren: {
      display: 'inline-block',
      zIndex: 1,
      opacity: animate ? 0 : undefined
    },
    blink: {
      position: 'relative',
      display: 'inline-block',
      width: 0,
      height: 0,
      lineHeight: '0',
      color: 'inherit'
    },
    blinkKeyframes: {
      '0%, 100%': {
        color: 'transparent'
      },
      '50%': {
        color: 'inherit'
      }
    }
  };
};

export { generateStyles };
