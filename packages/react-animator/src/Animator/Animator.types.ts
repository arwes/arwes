import type { ForwardedRef, ReactNode, DependencyList } from 'react';

import type { AnimatorAction, AnimatorNode, AnimatorSettingsPartial } from '@arwes/animator';

export interface AnimatorProps extends AnimatorSettingsPartial {
  root?: boolean
  disabled?: boolean
  dismissed?: boolean
  unmountOnExited?: boolean
  unmountOnEntered?: boolean
  unmountOnDisabled?: boolean
  checkToSendAction?: AnimatorAction
  checkToSend?: DependencyList
  nodeRef?: ForwardedRef<AnimatorNode>
  children?: ReactNode
}
