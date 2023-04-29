import { style } from '@vanilla-extract/css';

export const root = style({
  padding: '0.25rem',
  color: '#59B2B2',
  textDecoration: 'none',
  opacity: 0.8,

  ':hover': {
    opacity: 1
  },
  ':focus': {
    opacity: 1,
    outline: '1px dotted hsl(180deg 100% 40% / 50%)'
  }
});
