import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
  userSelect: 'none',

  '@media': {
    '(min-width: 900px)': {
      padding: '0.75rem 1rem'
    }
  }
});

export const container = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, auto)',
  padding: '0 1rem',

  '@media': {
    '(min-width: 900px)': {
      padding: '0 2rem'
    },
    '(min-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  }
});

export const frame = style({
  zIndex: -1,
  position: 'absolute',
  inset: 0,
  overflow: 'hidden'
});

export const section = style({
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  columnGap: '1rem'
});

export const left = style({
  justifyContent: 'flex-start'
});

export const center = style({
  justifyContent: 'center'
});

export const right = style({
  justifyContent: 'flex-end'
});
