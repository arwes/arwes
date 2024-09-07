import type { AnimationOptionsWithOverrides } from '@motionone/dom'
import { animate } from 'motion'

import type { EasingName, AnimatedSettings, AnimatedAnimation } from '../types.js'
import { easing } from '../easing/index.js'

const transition = (
  prop: string,
  from: number | string,
  to: number | string,
  back?: number | string,
  easing?: AnimationOptionsWithOverrides['easing'] | EasingName
): AnimatedSettings => ({
  transitions: {
    entering: { [prop]: [from, to], easing } as unknown as AnimatedAnimation,
    exiting: { [prop]: [to, back ?? from], easing } as unknown as AnimatedAnimation
  }
})

const fadeTransition = Object.freeze({
  transitions: {
    entering: { opacity: [0, 1] },
    exiting: { opacity: [1, 0] }
  }
})
const fade = (): AnimatedSettings => fadeTransition

const flickerTransition = Object.freeze({
  transitions: {
    entering: { opacity: [0, 1, 0.5, 1], easing: easing.outSine },
    exiting: { opacity: [1, 0, 0.5, 0], easing: easing.outSine }
  }
})
const flicker = (): AnimatedSettings => flickerTransition

const draw = (
  durationCustom?: number | undefined,
  easingCustom?: (x: number) => number
): AnimatedSettings => ({
  transitions: {
    entering: ({ element, duration }) => {
      if (!(element instanceof SVGPathElement) || duration <= 0) {
        return
      }

      const length = element.getTotalLength()

      element.style.strokeDashoffset = String(length)
      element.style.strokeDasharray = String(length)

      return animate(
        element,
        { strokeDashoffset: [length, 0] },
        { duration: durationCustom ?? duration, easing: easingCustom ?? easing.outSine }
      )
    },
    exiting: ({ element, duration }) => {
      if (!(element instanceof SVGPathElement) || duration <= 0) {
        return
      }

      const length = element.getTotalLength()

      element.style.strokeDashoffset = '0'
      element.style.strokeDasharray = String(length)

      return animate(
        element,
        { strokeDashoffset: [0, length] },
        { duration: durationCustom ?? duration, easing: easingCustom ?? easing.outSine }
      )
    }
  }
})

export { transition, fade, flicker, draw }
