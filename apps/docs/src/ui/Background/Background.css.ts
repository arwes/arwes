import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'block'
});

export const layer1 = style({
  display: 'block',
  position: 'absolute',
  zIndex: 1,
  inset: 0,
  transformOrigin: 'top',
  transitionProperty: 'opacity, filter',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out'
});

export const layer1Image = style({
  display: 'block',
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center'
});

export const layer2 = style({
  zIndex: 2
});

export const layer3 = style({
  zIndex: 2
});
