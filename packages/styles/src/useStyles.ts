import { useMemo } from 'react';

import { Styles } from './types';
import { STYLES_EMPTY } from './constants';
import { mergeThemeStyles } from './utils/mergeThemeStyles';

const useStyles = (
  stylesList: [Styles, Styles | false | null | undefined],
  dependencies: any[]
): Styles => {
  const [baseStyles, userStyles] = stylesList;

  const userStylesType = typeof userStyles === 'boolean' ? 'boolean' : typeof (userStyles || undefined);

  return useMemo(() => {
    if (typeof userStyles === 'boolean') {
      return STYLES_EMPTY;
    }

    if (!userStyles) {
      return baseStyles;
    }

    return mergeThemeStyles(baseStyles, userStyles);
  }, [userStylesType, ...dependencies]);
};

export { useStyles };
