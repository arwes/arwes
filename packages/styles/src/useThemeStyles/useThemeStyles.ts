import { useMemo } from 'react';
import { useTheme } from '@emotion/react';

import { Styles, StylesCreator, StylesCreatorFunction } from '../types';
import { STYLES_EMPTY } from '../constants';
import { mergeThemeStyles } from '../utils/mergeThemeStyles';

const useThemeStyles = <P = undefined>(
  styleCreators: [StylesCreatorFunction<P>, StylesCreator<P>],
  props: P,
  dependencies: unknown[]
): Styles => {
  const [createBaseStyles, createUserStyles] = styleCreators;

  const createUserStylesType = typeof createUserStyles === 'boolean'
    ? 'boolean'
    : typeof (createUserStyles || undefined);

  const theme = useTheme();

  return useMemo(() => {
    if (createUserStyles === false) {
      return STYLES_EMPTY;
    }

    const baseStyles = createBaseStyles(theme, props);

    if (typeof createUserStyles === 'function') {
      const userStyles = createUserStyles(theme, props);
      return mergeThemeStyles(baseStyles, userStyles);
    }
    else if (typeof createUserStyles === 'object' && createUserStyles !== null) {
      return mergeThemeStyles(baseStyles, createUserStyles);
    }

    return baseStyles;
  }, [createUserStylesType, theme, ...dependencies]);
};

export { useThemeStyles };
