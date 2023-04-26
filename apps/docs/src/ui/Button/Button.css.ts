import { style, globalStyle } from '@vanilla-extract/css';
import { createFrameHexagonClip } from '@arwes/react';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 12px',
  minWidth: '60px',
  height: '24px',
  lineHeight: '24px',
  fontSize: 12,
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
  ':focus': {
    outline: '1px dotted hsl(60deg 100% 40% / 50%)'
  },

  '@media': {
    '(min-width: 768px)': {
      padding: '0 16px',
      height: '28px',
      lineHeight: '28px',
      fontSize: 14
    },
    '(min-width: 1920px)': {
      padding: '0 24px',
      height: '32px',
      lineHeight: '32px',
      fontSize: 16
    }
  }
});

export const medium = style({
  padding: '0 32px',
  height: '32px',
  lineHeight: '32px',
  fontSize: 14,

  '@media': {
    '(min-width: 768px)': {
      padding: '0 48px',
      height: '36px',
      lineHeight: '36px',
      fontSize: 16
    },
    '(min-width: 1920px)': {
      padding: '0 64px',
      height: '44px',
      lineHeight: '44px',
      fontSize: 18
    }
  }
});

export const content = style({
  display: 'inline-grid',
  gridAutoFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 8,
  zIndex: 2,
  textDecoration: 'none'
});

globalStyle(`${content} svg`, {
  display: 'inline-block',
  margin: 0
});

// Frame Simple

export const frameSimple = style({});

export const frameSimpleDeco = style({
  position: 'absolute',
  right: 4,
  bottom: 4,
  borderWidth: '0 1px 1px 0',
  borderStyle: 'solid',
  borderColor: 'hsl(60deg 100% 75%)',
  width: 4,
  height: 4,
  transformOrigin: 'right bottom',
  transitionProperty: 'width, height, right, bottom, border',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out',

  selectors: {
    [`${root}:hover &`]: {
      right: 0,
      bottom: 0,
      width: '100%',
      height: '25%',
      borderColor: 'hsl(60deg 100% 40% / 50%)'
    }
  }
});

// Frame Hexagon

export const frameHexagon = style({});

export const frameHexagonClip = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  clipPath: createFrameHexagonClip({ squareSize: 12 })
});

export const frameHexagonIlluminator = style({
  zIndex: 1
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
