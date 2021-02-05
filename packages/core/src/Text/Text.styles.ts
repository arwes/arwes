import { CSSObject } from '@emotion/css';

const styles: Record<string, CSSObject> = {
  root: {
    position: 'relative',
    display: 'inline-block'
  },
  actualChildren: {
    display: 'inline-block',
    zIndex: 1
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

export { styles };
