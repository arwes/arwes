import { style, globalStyle } from '@vanilla-extract/css';

export const menuItem = style({});

globalStyle(`${menuItem} a`, {
  height: '3.5rem',
  lineHeight: '3.5rem'
});
