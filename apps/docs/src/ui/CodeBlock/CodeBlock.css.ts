import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'block',
  overflowX: 'auto',
  width: '100%',
  minWidth: 0,
  minHeight: 0
});

export const pre = style({
  display: 'block',
  width: '100%',
  minWidth: 700, // TODO:
  minHeight: 0
});

export const line = style({
  display: 'block',
  width: '100%',
  minWidth: 0,
  minHeight: 0
});
