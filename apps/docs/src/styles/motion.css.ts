import { style } from '@vanilla-extract/css';

export const transition = style({
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out'
});
