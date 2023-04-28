import { style } from '@vanilla-extract/css';

export const root = style({
  padding: '0.75rem',
  width: '100%'
});

export const container = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: '2rem',
  paddingRight: '2rem'
});

export const frame = style({
  zIndex: -1,
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderTop: '1px solid hsl(180deg 100% 75% / 10%)',
  borderLeft: '1px solid hsl(180deg 100% 75% / 10%)',
  borderRight: '1px solid hsl(180deg 100% 75% / 10%)',
  borderBottom: '1px solid hsl(180deg 33% 40%)',
  backgroundColor: 'hsl(180deg 100% 6% / 25%)',
  opacity: 0.8,
  transitionProperty: 'opacity',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out',

  selectors: {
    [`${root}:hover &`]: {
      opacity: 1
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
  alignItems: 'center',
  columnGap: '1rem',
  padding: '0.75rem 0'
});

export const center = style({
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  columnGap: '1rem',
  padding: '0.75rem 0'
});

export const right = style({
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  columnGap: '1rem',
  padding: '0.75rem 0'
});
