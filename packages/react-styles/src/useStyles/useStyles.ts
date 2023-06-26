import { useMemo } from 'react';

import { type Styles, type StylesCreatorFunction, type StylesCreator } from '../types';
import { STYLES_EMPTY } from '../constants';
import { mergeThemeStyles } from '../internal/mergeThemeStyles';

const useStyles = <P = undefined>(
  stylesList: [StylesCreatorFunction<P>, StylesCreator<P>],
  props: P,
  dependencies: unknown[]
): Styles => {
  const [createBaseStyles, createUserStyles] = stylesList;

  const userStylesType = typeof createUserStyles === 'boolean'
    ? 'boolean'
    : typeof (createUserStyles || undefined);

  return useMemo(() => {
    if (typeof createUserStyles === 'boolean') {
      return STYLES_EMPTY;
    }

    const baseStyles = createBaseStyles(props);

    if (typeof createUserStyles === 'function') {
      const userStyles = createUserStyles(props);
      return mergeThemeStyles(baseStyles, userStyles);
    }

    if (typeof createUserStyles === 'object' && createUserStyles !== null) {
      return mergeThemeStyles(baseStyles, createUserStyles);
    }

    return baseStyles;
  }, [userStylesType, ...dependencies]);
};

export { useStyles };
