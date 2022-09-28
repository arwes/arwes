import type { Styles } from '../types';

// TODO: Merge deeply nested style objects.

const mergeThemeStyles = (styles1: Styles, styles2: Styles): Styles => {
  const newStyles = { ...styles1 };

  Object.keys(styles2).forEach(key => {
    newStyles[key] = {
      ...newStyles[key],
      ...styles2[key]
    };
  });

  return newStyles;
};

export { mergeThemeStyles };
