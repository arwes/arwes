import { easing } from '@arwes/animated';

export interface TextTransitionProps {
  text: string
  /**
   * Transition duration in seconds.
   */
  duration: number
  easing: keyof typeof easing
  isEntering: boolean
  onChange: (newText: string) => void
  onComplete?: () => void
}
