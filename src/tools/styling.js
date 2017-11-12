import { lighten } from 'polished';

export const placeholder = (theme, color) => {
  return {
    /* Chrome/Opera/Safari */
    '::-webkit-input-placeholder': {
      color: color,
    },
    /* Firefox 19+ */
    '::-moz-placeholder': {
      color: color,
    },
    /* IE 10+ */
    ':-ms-input-placeholder': {
      color: color,
    },
    /* Firefox 18- */
    ':-moz-placeholder': {
      color: color,
    }
  };
};

export const selection = (theme, backgroundColor, color) => {
  return {
    /* WebKit/Blink Browsers */
    '::selection': {
      background: backgroundColor,
      color: color,
      textShadow: 'none',
    },
    /* Gecko Browsers */
    '::-moz-selection': {
      background: backgroundColor,
      color: color,
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
        borderColor: lighten(theme.colorAccent, borderColor),
      }
    }
  };
};
