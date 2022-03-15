import '@emotion/react';
import { Theme as ArwesTheme } from '@arwes/design';

declare module '@emotion/react' {
  export interface Theme extends ArwesTheme {}
}
