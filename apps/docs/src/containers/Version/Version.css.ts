import { style } from '@vanilla-extract/css';

export const root = style({
  padding: '0.25rem',
  opacity: 0.8,

  ':hover': {
    opacity: 1
  },
  ':focus': {
    opacity: 1
  }
});
