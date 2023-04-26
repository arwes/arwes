import { style } from '@vanilla-extract/css';

export const root = style({
  color: '#59B2B2',
  textDecoration: 'none',
  opacity: 0.5,
  transitionProperty: 'opacity, color, outline',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out',

  ':hover': {
    opacity: 1
  },
  ':focus': {
    opacity: 1,
    outline: '1px dotted hsl(180 82.31% 71.18%)'
  }
});
