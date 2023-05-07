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
  overflow: 'hidden',
  border: 'none',
  borderBottom: '1px solid hsl(180deg 33% 25%)',
  backgroundColor: 'hsla(180, 100%, 5%, 0.5)',

  selectors: {
    [`${root}:hover &`]: {
      borderColor: 'hsla(180, 100%, 9%, 0.8) hsla(180, 100%, 9%, 0.8) hsl(180deg 33% 30%)',
      backgroundColor: 'hsla(180, 100%, 5%, 0.4)'
    }
  },

  '@media': {
    '(min-width: 900px)': {
      borderTop: '1px solid hsla(180, 100%, 9%, 0.6)',
      borderLeft: '1px solid hsla(180, 100%, 9%, 0.6)',
      borderRight: '1px solid hsla(180, 100%, 9%, 0.6)'
    }
  }
});

export const frameLine = style({
  position: 'absolute',
  bottom: 0,
  borderBottom: '1px solid hsl(180 68% 67%)',
  width: '0.5rem',

  '@media': {
    '(min-width: 900px)': {
      width: '1rem'
    }
  }
});

export const frameLineLeft = style({
  left: 0
});

export const frameLineRight = style({
  right: 0
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
