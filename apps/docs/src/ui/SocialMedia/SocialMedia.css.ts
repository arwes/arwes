import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'auto',
  columnGap: '0.5rem',
  listStyle: 'none',
  justifyContent: 'center',
  alignItems: 'center'
});

export const item = style({
  display: 'flex',
  justifyContent: 'center'
});

export const link = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '0.25rem',
  color: 'hsl(180 82.31% 71.18%)',
  opacity: 0.8,
  transitionProperty: 'opacity, color, outline',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out',

  ':hover': {
    color: 'hsl(180 82.31% 71.18%)',
    opacity: 1
  },
  ':focus': {
    opacity: 1,
    outline: '1px dotted hsl(180deg 100% 40% / 50%)'
  }
});
