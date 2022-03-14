import { CSSObject } from '@emotion/react';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  root: {
    display: 'block'
  },
  rendered: {
    display: 'block'
  },
  error: {
    display: 'block',
    margin: 0,
    padding: 10,
    color: theme.color.error
  }
};

export { styles };
