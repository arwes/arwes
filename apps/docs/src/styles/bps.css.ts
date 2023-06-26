import { style } from '@vanilla-extract/css';

// Ups

export const hiddenXS = style({
  '@media': {
    '(min-width: 400px)': {
      display: 'none'
    }
  }
});

export const hiddenSM = style({
  '@media': {
    '(min-width: 600px)': {
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

export const hiddenLG = style({
  '@media': {
    '(min-width: 1200px)': {
      display: 'none'
    }
  }
});

export const hiddenXL = style({
  '@media': {
    '(min-width: 1536px)': {
      display: 'none'
    }
  }
});

// Downs

export const hiddenXSDown = style({
  '@media': {
    '(max-width: 399px)': {
      display: 'none'
    }
  }
});

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
