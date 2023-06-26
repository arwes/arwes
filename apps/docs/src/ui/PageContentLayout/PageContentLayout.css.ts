import { style, globalStyle } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

export const root = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
  minHeight: 0
});

export const floating = style({});

export const frame = style({
  zIndex: 1,
  position: 'absolute',
  left: '50%',
  top: '2rem',
  display: 'none',
  bottom: '2rem',
  width: '100%',
  maxWidth: 900,
  transform: 'translate(-50%, 0)',
  clipPath: createFrameOctagonClip({
    squareSize: '1rem'
  }),

  '@media': {
    '(min-width: 1200px)': {
      display: 'block'
    }
  }
});

globalStyle(`${frame} path`, {
  transitionProperty: 'color',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${frame} [data-name=bg]`, {
  color: 'hsla(180, 100%, 10%, 0.1)'
});

globalStyle(`${frame} [data-name=line]`, {
  color: 'hsla(180, 100%, 10%, 0.5)'
});

export const overflow = style({
  zIndex: 2,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: 0,
  width: '100%',
  minWidth: 0,
  minHeight: 0,

  '@media': {
    '(min-width: 1200px)': {
      padding: '2rem 1rem'
    }
  }
});

export const container = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'auto',
  width: '100%',
  minWidth: 0,
  minHeight: 0
});

export const content = style({
  padding: '2.5rem 1.25rem',
  width: '100%',
  minWidth: 0,
  minHeight: 0,
  maxWidth: 900,

  // To create the container scroll padding bottom space.
  ':after': {
    content: '""',
    display: 'block',
    marginTop: '3rem',
    width: '100%',
    height: 1
  },

  selectors: {
    [`${floating} &`]: {
      padding: '2rem',

      '@media': {
        '(min-width: 1200px)': {
          padding: 0
        }
      }
    }
  },

  '@media': {
    '(min-width: 1200px)': {
      padding: '3rem'
    }
  }
});
