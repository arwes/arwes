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
  cloneNode: {
    display: 'inline-block',
    position: 'absolute',
    zIndex: 0,
    left: '0',
    right: '0',
    top: '0',
    overflow: 'hidden'
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
