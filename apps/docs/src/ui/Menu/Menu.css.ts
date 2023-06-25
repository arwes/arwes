import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'grid',
  margin: 0,
  padding: 0,
  gridAutoFlow: 'column',
  columnGap: '0.25rem',
  listStyle: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',

  '@media': {
    '(min-width: 900px)': {
      fontSize: '1rem'
    }
  }
});
