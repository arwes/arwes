import { animate } from 'motion'
import { filterProps } from '@arwes/tools'

import { formatAnimatedCSSPropsShorthands } from '../formatAnimatedCSSPropsShorthands/index.js'
import { easing } from '../easing/index.js'

import type {
  EasingName,
  AnimatedXProp,
  AnimatedXSettings,
  AnimatedXAnimation,
  AnimatedXAnimationFunctionReturn
} from '../types.js'

type AnimatedXElementPropsSettings<States extends string> = {
  state: States
  animated: AnimatedXProp<States>
  hideOnStates?: States[] | undefined
  renderInitials?: boolean | undefined
}

type AnimatedXElementProps<
  States extends string,
  Element extends HTMLElement | SVGElement = HTMLElement
> = {
  element: Element
  settingsRef: { current: AnimatedXElementPropsSettings<States> }
}

type AnimatedXElement = {
  refresh: () => void
  cancel: () => void
}

const createAnimatedXElement = <
  States extends string,
  Element extends HTMLElement | SVGElement = HTMLElement
>(
  props: AnimatedXElementProps<States, Element>
): AnimatedXElement => {
  const { element } = props

  const getSettings = (): AnimatedXElementPropsSettings<States> => ({
    hideOnStates: [],
    renderInitials: true,
    ...filterProps(props.settingsRef.current)
  })

  let stateLastExecuted = props.settingsRef.current.state

  const animations = new Set<AnimatedXAnimationFunctionReturn>()

  const settingsInitial = getSettings()

  if (settingsInitial.renderInitials) {
    const { animated } = settingsInitial
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean) as Array<AnimatedXSettings<States>>

    const initialAttributes: Record<string, string> = animatedList
      .map((item) => item?.initialAttributes)
      .reduce((total: object, item: object | undefined) => ({ ...total, ...item }), {})

    Object.keys(initialAttributes).forEach((attribute) => {
      element.setAttribute(attribute, initialAttributes[attribute])
    })

    const dynamicStyles = animatedList
      .map((item) => item?.initialStyle)
      .filter(Boolean)
      .map((style) => formatAnimatedCSSPropsShorthands(style!))
      .reduce((total, item) => ({ ...total, ...item }), {})

    Object.assign(element.style, dynamicStyles)
  }

  const runAnimations = (): void => {
    const { state, animated, hideOnStates } = getSettings()

    stateLastExecuted = state

    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean) as Array<AnimatedXSettings<States>>

    element.style.visibility = hideOnStates?.includes(state) ? 'hidden' : ''

    const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
      Array.from(element.querySelectorAll(query)) as T[]

    animatedList
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      .map((settingsItem) => settingsItem.transitions?.[state] as AnimatedXAnimation)
      .filter(Boolean)
      .forEach((transition) => {
        if (typeof transition === 'function') {
          const animation = transition({ element, $ })

          if (animation) {
            animations.add(animation)

            if (animation.then) {
              void animation.then(() => {
                animations.delete(animation)
              })
            } else if (animation.finished) {
              void animation.finished.then(() => {
                animations.delete(animation)
              })
            }
          }
        }
        //
        else {
          const {
            duration,
            delay,
            easing: ease,
            repeat,
            direction,
            options,
            ...definition
          } = transition

          // TODO: Apply final animation state to element if duration is 0.
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          if (Number.isFinite(duration) && (duration as number) <= 0) {
            throw new Error(
              'ARWES createAnimatedXElement() animation duration must be greater than 0.'
            )
          }

          try {
            const animation = animate(element, definition, {
              duration,
              delay,
              easing: typeof ease === 'string' ? easing[ease as EasingName] : ease,
              repeat,
              direction,
              ...options
            })

            animations.add(animation)

            void animation.finished.then(() => {
              animations.delete(animation)
            })
          } catch (err) {
            throw new Error(`ARWES createAnimatedXElement() animation error:\n${String(err)}`)
          }
        }
      })
  }

  runAnimations()

  const refresh = (): void => {
    if (stateLastExecuted !== props.settingsRef.current.state) {
      runAnimations()
    }
  }

  const cancel = (): void => {
    animations.forEach((animation) => animation.cancel())
    animations.clear()
  }

  return Object.freeze({ refresh, cancel })
}

export type { AnimatedXElementPropsSettings, AnimatedXElementProps, AnimatedXElement }
export { createAnimatedXElement }
