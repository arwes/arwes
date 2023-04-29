import { style } from '@vanilla-extract/css';

export const root = style({
  padding: '0.75rem',
  width: '100%'
});

export const container = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '0 2rem'
});

export const frame = style({
  zIndex: -1,
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderTop: '1px solid hsla(180, 100%, 9%, 0.6)',
  borderLeft: '1px solid hsla(180, 100%, 9%, 0.6)',
  borderRight: '1px solid hsla(180, 100%, 9%, 0.6)',
  borderBottom: '1px solid hsl(180deg 33% 25%)',
  backgroundColor: 'hsla(180, 100%, 75%, 0.02)',

  selectors: {
    [`${root}:hover &`]: {
      borderColor: 'hsla(180, 100%, 9%, 0.8) hsla(180, 100%, 9%, 0.8) hsl(180deg 33% 30%)',
      backgroundColor: 'hsla(180, 100%, 75%, 0.04)'
    }
  }
});

export const frameLineLeft = style({
  position: 'absolute',
  left: 0,
  bottom: 0,
  borderBottom: '1px solid hsl(180 68% 67%)',
  width: '1rem'
});

export const frameLineRight = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
  borderBottom: '1px solid hsl(180 68% 67%)',
  width: '1rem'
});

export const left = style({
  display: 'grid',
  gridAutoFlow: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '1rem'
});

export const center = style({
  display: 'grid',
  gridAutoFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '1rem'
});

export const right = style({
  display: 'grid',
  gridAutoFlow: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  columnGap: '1rem'
});
