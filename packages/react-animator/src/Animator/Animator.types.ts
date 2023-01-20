import type { ForwardedRef, ReactNode } from 'react';

import type { AnimatorNode, AnimatorSettingsPartial } from '@arwes/animator';

export interface AnimatorProps extends AnimatorSettingsPartial {
  root?: boolean
  disabled?: boolean
  dismissed?: boolean
  children?: ReactNode
  nodeRef?: ForwardedRef<AnimatorNode>
}
