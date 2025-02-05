import { animate } from 'motion'
import type { AnimationPlaybackControls } from 'framer-motion'

import type { MotionEase, EasingName } from '../types.js'
import { easing } from '../easing/index.js'

type AnimateDrawProps = {
  element: Element
  duration?: number
  delay?: number
  ease?: MotionEase
  isEntering?: boolean
}

const animateDraw = (props: AnimateDrawProps): AnimationPlaybackControls => {
  const { element, duration, delay, isEntering = true } = props

  if (!(element instanceof SVGElement)) {
    throw new Error(
      'ARWES animateDraw() requires a SVG path, circle, ellipse, line, polygon, polyline or rect element.'
    )
  }

  const ease =
    (typeof props.ease === 'string' ? easing[props.ease as EasingName] : props.ease) ||
    (isEntering ? easing.outExpo : easing.outSine)

  return animate(element, { pathLength: isEntering ? [0, 1] : [1, 0] }, { duration, delay, ease })
}

export type { AnimateDrawProps }
export { animateDraw }
