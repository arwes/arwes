import type { Properties as CSSProperties } from 'csstype'
import type { MotionKeyframesDefinition, AnimationOptionsWithOverrides } from '@motionone/dom'
import type { AnimatorState, AnimatorDuration } from '@arwes/animator'

export type EasingFn = (x: number) => number
export type EasingName =
  | 'linear'
  | 'inQuad'
  | 'outQuad'
  | 'inOutQuad'
  | 'inCubic'
  | 'outCubic'
  | 'inOutCubic'
  | 'inQuart'
  | 'outQuart'
  | 'inOutQuart'
  | 'inQuint'
  | 'outQuint'
  | 'inOutQuint'
  | 'inSine'
  | 'outSine'
  | 'inOutSine'
  | 'inExpo'
  | 'outExpo'
  | 'inOutExpo'
  | 'inCirc'
  | 'outCirc'
  | 'inOutCirc'
  | 'inBack'
  | 'outBack'
  | 'inOutBack'
  | 'inElastic'
  | 'outElastic'
  | 'inOutElastic'
  | 'inBounce'
  | 'outBounce'
  | 'inOutBounce'
export type Easing = EasingFn | EasingName
export type EasingMotion = AnimationOptionsWithOverrides['easing'] | Easing

export interface AnimatedCSSPropsShorthands {
  x?: number | string
  y?: number | string
  z?: number | string
  rotate?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  skew?: number | string
  skewX?: number | string
  skewY?: number | string
  scale?: number | string
  scaleX?: number | string
  scaleY?: number | string
  scaleZ?: number | string
}

export type AnimatedCSSProps = Omit<CSSProperties, keyof AnimatedCSSPropsShorthands> &
  AnimatedCSSPropsShorthands

// Animated

export type AnimatedAnimationDefinition = MotionKeyframesDefinition & {
  duration?: number
  delay?: AnimationOptionsWithOverrides['delay']
  easing?: AnimationOptionsWithOverrides['easing'] | Easing
  repeat?: AnimationOptionsWithOverrides['repeat']
  direction?: AnimationOptionsWithOverrides['direction']
  options?: AnimationOptionsWithOverrides
}

export interface AnimatedAnimationFunctionConfig {
  /**
   * Root element.
   */
  element: HTMLElement | SVGElement
  /**
   * Query children elements inside the root element.
   * @param query - CSS selector.
   * @returns Array<HTMLElement | SVGElement>
   */
  $: <T = HTMLElement | SVGElement>(query: string) => T[]
  /**
   * Corresponding animator current animation transition duration.
   * For `'entering'` and `'entered'` states, it is `duration.enter`.
   * For `'exiting'` and `'exited'` states, it is `duration.exit`.
   */
  duration: number
  /**
   * Associated node duration object.
   */
  nodeDuration: AnimatorDuration
}

export interface AnimatedAnimationFunctionReturn {
  /**
   * A promise which resolves when the animation is finished/cancelled.
   */
  then?: (callback?: () => void) => Promise<void>
  /**
   * A promise which resolves when the animation is finished/cancelled.
   */
  finished?: Promise<void>
  /**
   * Cancel the animation inmediately and remove its underlying animated properties
   * from the element.
   */
  cancel: () => void
}

export type AnimatedAnimationFunction =
  | ((config: AnimatedAnimationFunctionConfig) => AnimatedAnimationFunctionReturn)
  | ((config: AnimatedAnimationFunctionConfig) => void)

export type AnimatedAnimation = AnimatedAnimationFunction | AnimatedAnimationDefinition

export interface AnimatedSettings {
  initialAttributes?: Record<string, string>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in AnimatorState]?: AnimatedAnimation | undefined
  }
}

type AnimatedPropPreset = 'fade' | 'flicker' | 'draw'

type AnimatedPropTransition = [
  string,
  number | string,
  number | string,
  (number | string)?,
  (AnimationOptionsWithOverrides['easing'] | Easing)?
]

export type AnimatedProp =
  | AnimatedSettings
  | Array<AnimatedPropPreset | AnimatedPropTransition | AnimatedSettings | undefined>
  | undefined

// AnimatedX

export type AnimatedXAnimationDefinition = AnimatedAnimationDefinition
export type AnimatedXAnimationFunctionConfig = Omit<
  AnimatedAnimationFunctionConfig,
  'duration' | 'nodeDuration'
>
export type AnimatedXAnimationFunctionReturn = AnimatedAnimationFunctionReturn
export type AnimatedXAnimationFunction =
  | ((config: AnimatedXAnimationFunctionConfig) => AnimatedXAnimationFunctionReturn)
  | ((config: AnimatedXAnimationFunctionConfig) => void)
export type AnimatedXAnimation = AnimatedXAnimationDefinition | AnimatedXAnimationFunction

export interface AnimatedXSettings<States extends string> {
  initialAttributes?: Record<string, string>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in States]?: AnimatedXAnimation | undefined
  }
}

export type AnimatedXProp<States extends string> =
  | AnimatedXSettings<States>
  | Array<AnimatedXSettings<States> | undefined>
  | undefined
