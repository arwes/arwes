import { ReactNode } from 'react';

import type { AnimatorGeneralProviderSettings } from '../types';

export interface AnimatorGeneralProviderProps extends AnimatorGeneralProviderSettings {
  children?: ReactNode
}
