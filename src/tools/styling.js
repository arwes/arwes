import { lighten } from 'polished';

export const placeholder = (theme, color) => {
  return {
    /* Chrome/Opera/Safari */
    '::-webkit-input-placeholder': {
      color,
    },
    /* Firefox 19+ */
    '::-moz-placeholder': {
      color,
    },
    /* IE 10+ */
    ':-ms-input-placeholder': {
      color,
    },
    /* Firefox 18- */
    ':-moz-placeholder': {
      color,
    }
  };
};

export const selection = (theme, backgroundColor, color) => {
  return {
    /* WebKit/Blink Browsers */
    '::selection': {
      backgroundColor,
      color,
      textShadow: 'none',
    },
    /* Gecko Browsers */
    '::-moz-selection': {
      backgroundColor,
      color,
      textShadow: 'none',
    }
  };
};

export const scrollbar = (theme, backgroundColor, borderColor) => {
  return {
    '::-webkit-scrollbar': {
      width: 10,
      height: 10,
      backgroundColor,
    },
    '::-webkit-scrollbar-thumb': {
      border: '1px solid ' + borderColor,
      cursor: 'pointer',

      '&:hover': {
        borderColor: lighten(theme.accent, borderColor),
      }
    }
  };
};
