import type { ReactNode } from 'react';

import type { AnimatorSettings, AnimatorDuration } from '@arwes/animator';

export type AnimatorPropsSettings = Partial<Omit<AnimatorSettings, 'duration'>> & { duration?: Partial<AnimatorDuration> };

export interface AnimatorProps extends AnimatorPropsSettings {
  root?: boolean
  disabled?: boolean
  dismissed?: boolean
  children?: ReactNode
}
