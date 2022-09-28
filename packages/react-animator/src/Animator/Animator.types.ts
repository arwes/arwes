import { ReactNode } from 'react';

import type { AnimatorSettings } from '@arwes/animator';

export interface AnimatorProps extends AnimatorSettings {
  root?: boolean
  disabled?: boolean
  dismissed?: boolean
  children?: ReactNode
}
