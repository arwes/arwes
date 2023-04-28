import { style } from '@vanilla-extract/css';

export const hiddenSMDown = style({
  '@media': {
    '(max-width: 599px)': {
      display: 'none'
    }
  }
});

export const hiddenMDDown = style({
  '@media': {
    '(max-width: 899px)': {
      display: 'none'
    }
  }
});

export const hiddenMD = style({
  '@media': {
    '(min-width: 900px)': {
      display: 'none'
    }
  }
});
