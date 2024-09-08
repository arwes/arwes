import type { EasingMotion, AnimatedSettings, AnimatedAnimation } from '../types.js'
import { easing } from '../easing/index.js'
import { animateDraw } from '../animateDraw/index.js'

const transition = (
  prop: string,
  from: number | string,
  to: number | string,
  back?: number | string,
  easing?: EasingMotion
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

const draw = (durationCustom?: number | undefined, easing?: EasingMotion): AnimatedSettings => ({
  transitions: {
    entering: ({ element, duration }) =>
      animateDraw({
        isEntering: true,
        element: element as SVGPathElement,
        duration: durationCustom ?? duration,
        easing
      }),
    exiting: ({ element, duration }) =>
      animateDraw({
        isEntering: false,
        element: element as SVGPathElement,
        duration: durationCustom ?? duration,
        easing
      })
  }
})

export { transition, fade, flicker, draw }
