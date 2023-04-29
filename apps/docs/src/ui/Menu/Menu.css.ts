import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: '0.5rem',
  listStyle: 'none',
  justifyContent: 'center',
  alignItems: 'center'
});
