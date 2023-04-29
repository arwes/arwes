import { style } from '@vanilla-extract/css';

// Ups

export const hiddenMD = style({
  '@media': {
    '(min-width: 900px)': {
      display: 'none'
    }
  }
});

export const hiddenLG = style({
  '@media': {
    '(min-width: 1200px)': {
      display: 'none'
    }
  }
});

// Downs

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

export const hiddenLGDown = style({
  '@media': {
    '(max-width: 1199px)': {
      display: 'none'
    }
  }
});

export const hiddenXLDown = style({
  '@media': {
    '(max-width: 1535px)': {
      display: 'none'
    }
  }
});
