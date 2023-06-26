import { style, globalStyle } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

export const root = style({
  position: 'relative',
  display: 'block',
  minWidth: 0,
  minHeight: 0,
  clipPath: createFrameOctagonClip({
    squareSize: '1rem',
    leftBottom: false,
    rightTop: false
  })
});

globalStyle(`${root} path`, {
  transitionProperty: 'color',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${root} [data-name=bg]`, {
  color: 'hsla(180, 100%, 10%, 0.1)'
});

globalStyle(`${root} [data-name=line]`, {
  color: 'hsla(180, 33%, 25%, 0.5)'
});

globalStyle(`${root}:hover [data-name=bg]`, {
  color: 'hsla(180, 100%, 10%, 0.2)'
});

globalStyle(`${root}:hover [data-name=line]`, {
  color: 'hsla(180, 33%, 30%, 0.5)'
});

export const container = style({
  position: 'relative',
  zIndex: 1,
  display: 'block',
  border: '1px solid transparent'
});

export const asset = style({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  paddingBottom: '75%',
  backgroundColor: 'hsla(180, 100%, 9%, 1)',
  clipPath: createFrameOctagonClip({
    squareSize: '1rem',
    leftBottom: false,
    rightTop: false,
    rightBottom: false
  })
});

export const image = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center'
});

export const content = style({
  display: 'grid',
  rowGap: '0.5rem',
  padding: '1rem'
});

export const title = style({
  display: 'block',
  margin: 0,
  fontSize: '1rem',
  color: 'hsl(180deg 88.18% 56.86%)'
});

globalStyle(`${title} a`, {
  color: 'hsl(180deg 88.18% 56.86%)'
});

globalStyle(`${title} a:hover`, {
  color: 'hsl(180deg 88.18% 66.86%)'
});

export const children = style({
  display: 'grid',
  rowGap: '0.5rem',
  fontSize: '0.875rem'
});

globalStyle(`${children} a`, {
  color: 'hsl(180deg 88.18% 45%)'
});

globalStyle(`${children} p`, {
  margin: 0
});
