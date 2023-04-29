import { style, globalStyle } from '@vanilla-extract/css';

export const menuItem = style({});

globalStyle(`${menuItem} a, ${menuItem} button`, {
  height: '3.5rem',
  lineHeight: '3.5rem'
});

export const button = style({
  appearance: 'none',
  background: 'none',
  fontSize: '1rem'
});
