import { type AnimationControls, animate } from 'motion'

import type { EasingMotion, EasingName } from '../types.js'
import { easing } from '../easing/index.js'

type AnimateDrawProps = {
  element: SVGPathElement
  duration?: number
  delay?: number
  easing?: EasingMotion
  isEntering?: boolean
}

const animateDraw = (props: AnimateDrawProps): AnimationControls => {
  const { element, duration, delay, isEntering = true } = props

  if (!(element instanceof SVGPathElement)) {
    throw new Error('ARWES animateDraw() requires a SVGPathElement.')
  }

  const length = element.getTotalLength()
  const easingCustom =
    typeof props.easing === 'string' ? easing[props.easing as EasingName] : props.easing

  element.style.strokeDashoffset = String(isEntering ? length : 0)
  element.style.strokeDasharray = String(length)

  const animation = animate(
    element,
    { strokeDashoffset: isEntering ? [length, 0] : [0, length] },
    { duration, delay, easing: easingCustom || easing.outSine }
  )

  void animation.finished.then(() => {
    element.style.strokeDashoffset = ''
    element.style.strokeDasharray = ''
  })

  return animation
}

export type { AnimateDrawProps }
export { animateDraw }
