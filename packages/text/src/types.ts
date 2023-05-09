import { type easing } from '@arwes/animated';

export type TextTransitionManager = 'sequence' | 'decipher';

export interface TextTransitionProps {
  rootElement: HTMLElement
  contentElement: HTMLElement
  /**
   * Transition duration in seconds.
   */
  duration: number
  easing?: keyof typeof easing
  isEntering?: boolean
  hideOnExited?: boolean
  hideOnEntered?: boolean
}
