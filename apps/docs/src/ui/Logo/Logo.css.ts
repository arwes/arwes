import { style, keyframes } from '@vanilla-extract/css';

export const root = style({
  display: 'block'
});

export const link = style({
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  padding: '0.25rem',
  columnGap: '0.5rem',
  textDecoration: 'none',
  opacity: 0.8,
  transitionProperty: 'opacity, color, outline',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out',

  ':hover': {
    opacity: 1
  },
  ':focus': {
    opacity: 1,
    outline: '1px dotted hsl(180deg 100% 40% / 50%)'
  }
});

const rotation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

export const logo = style({
  display: 'block',
  width: 'auto',
  height: '1.5rem',
  animation: `${rotation} 30s infinite linear`
});

export const type = style({
  display: 'block',
  width: 'auto',
  height: '1.25rem'
});
