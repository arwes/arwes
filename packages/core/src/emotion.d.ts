import '@emotion/react';

import { ArwesTheme } from './ArwesThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends ArwesTheme {}
}
