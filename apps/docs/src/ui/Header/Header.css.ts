import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 24,
  width: '100%'
});

export const left = style({
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: 24
});

export const center = style({
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: 24
});

export const right = style({
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: 24
});
