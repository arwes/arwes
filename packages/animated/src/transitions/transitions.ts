import type { MotionEase, AnimatedSettings, AnimatedAnimation } from '../types.js'
import { easing } from '../easing/index.js'
import { animateDraw } from '../animateDraw/index.js'

const transition = (
  prop: string,
  from: number | string,
  to: number | string,
  back?: number | string,
  ease?: MotionEase
): AnimatedSettings => ({
  transitions: {
    entering: { [prop]: [from, to], ease } as unknown as AnimatedAnimation,
    exiting: { [prop]: [to, back ?? from], ease } as unknown as AnimatedAnimation
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
    entering: { opacity: [0, 1, 0.5, 1], ease: easing.outSine },
    exiting: { opacity: [1, 0, 0.5, 0], ease: easing.outSine }
  }
})
const flicker = (): AnimatedSettings => flickerTransition

const draw = (durationCustom?: number | undefined, ease?: MotionEase): AnimatedSettings => ({
  transitions: {
    entering: ({ element, duration }) =>
      animateDraw({ element, ease, duration: durationCustom ?? duration }),
    exiting: ({ element, duration }) =>
      animateDraw({
        element,
        ease,
        duration: durationCustom ?? duration,
        isEntering: false
      })
  }
})

export { transition, fade, flicker, draw }
