import { style, globalStyle } from '@vanilla-extract/css';
import { createFrameHexagonClip } from '@arwes/react';

export const root = style({
  position: 'relative',
  display: 'inline-block',
  padding: '0 30px',
  minWidth: '80px',
  height: '30px',
  lineHeight: '30px',
  fontSize: 14,
  fontFamily: "'Titillium Web', sans-serif",
  fontWeight: '400',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'hsl(60deg 100% 75%)',
  textAlign: 'center',
  textShadow: '0px 0px 2px hsl(60deg 100% 75% / 50%)',
  background: 'transparent',
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out',

  ':hover': {
    color: 'hsl(60deg 100% 85%)'
  },

  '@media': {
    '(min-width: 768px)': {
      padding: '0 40px',
      height: '36px',
      lineHeight: '36px',
      fontSize: '16px'
    },
    '(min-width: 1920px)': {
      padding: '0 60px',
      height: '44px',
      lineHeight: '44px',
      fontSize: '21px'
    }
  }
});

globalStyle(`${root} path`, {
  transitionProperty: 'color',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${root} path[data-name="shape"]`, {
  color: 'hsl(60deg 100% 40% / 8%)'
});

globalStyle(`${root} path[data-name="decoration"]`, {
  color: 'hsl(60deg 100% 40% / 14%)'
});

globalStyle(`${root}:hover path[data-name="shape"]`, {
  color: 'hsl(60deg 100% 40% / 16%)'
});

globalStyle(`${root}:hover path[data-name="decoration"]`, {
  color: 'hsl(60deg 100% 40% / 22%)'
});

export const clip = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  clipPath: createFrameHexagonClip({ squareSize: 12 })
});

export const illuminator = style({
  zIndex: 1
});

export const content = style({
  position: 'relative',
  zIndex: 2
});
