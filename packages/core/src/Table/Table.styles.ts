import { Interpolation } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const styles: Record<string, Interpolation<ArwesTheme>> = {
  root: {
    //
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};

export { styles };
