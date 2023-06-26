import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'block',
  margin: 0,
  width: 'auto',
  height: '1rem',

  '@media': {
    '(min-width: 900px)': {
      height: '1.25rem'
    }
  }
});
