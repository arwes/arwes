import { animate, stagger } from 'motion'
import { filterProps } from '@arwes/tools'
import type { AnimatorNode } from '@arwes/animator'

import type { EasingName, AnimatedProp, AnimatedAnimationFunctionReturn } from '../types.js'
import { easing } from '../easing/index.js'
import { applyAnimatedCSSProps } from '../applyAnimatedCSSProps/index.js'
import { transition, fade, flicker, draw } from '../transitions/index.js'

type AnimatedElementPropsSettings<Element = HTMLElement | SVGElement> = {
  animated: AnimatedProp
  hideOnExited?: undefined | boolean
  hideOnEntered?: undefined | boolean
  renderInitials?: undefined | boolean
  onTransition?: undefined | ((element: Element, node: AnimatorNode) => void)
}

type AnimatedElementProps<Element = HTMLElement | SVGElement> = {
  element: Element
  animator: AnimatorNode
  settingsRef: {
    current: AnimatedElementPropsSettings<Element>
  }
}

type AnimatedElement<Element = HTMLElement | SVGElement> = {
  settingsRef: {
    current: AnimatedElementPropsSettings<Element>
  }
  cancel: () => void
}

const animatedPresets = {
  fade,
  flicker,
  draw
} as const

const createAnimatedElement = <Element extends HTMLElement | SVGElement = HTMLElement>(
  props: AnimatedElementProps<Element>
): AnimatedElement<Element> => {
  const { element, animator } = props

  const getSettings = (): AnimatedElementPropsSettings<Element> => ({
    hideOnExited: true,
    renderInitials: true,
    ...filterProps(props.settingsRef.current)
  })

  const animations = new Set<AnimatedAnimationFunctionReturn>()

  const settingsInitial = getSettings()

  if (settingsInitial.renderInitials) {
    const { animated } = settingsInitial
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived
      .map((item) => (typeof item === 'string' || Array.isArray(item) ? undefined : item))
      .filter(Boolean)

    const initialAttributes: Record<string, string> = animatedList
      .map((item) => (item ? item.initialAttributes : null))
      .reduce((total: object, item: object | null | undefined) => ({ ...total, ...item }), {})

    Object.keys(initialAttributes).forEach((attribute) => {
      element.setAttribute(attribute, initialAttributes[attribute])
    })

    const dynamicStyles = animatedList
      .map((item) => (item ? item.initialStyle : null))
      .reduce((total, item) => ({ ...total, ...item }), {})

    applyAnimatedCSSProps(element, dynamicStyles!)
  }

  const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
    Array.from(element.querySelectorAll(query)) as T[]

  const unsubscribe = animator.subscribe((node) => {
    const { animated, hideOnExited, hideOnEntered, onTransition } = getSettings()

    element.style.visibility =
      (hideOnExited && node.state === 'exited') || (hideOnEntered && node.state === 'entered')
        ? 'hidden'
        : ''

    const nodeSettings = node.settings
    const nodeDuration = nodeSettings.duration
    const transitionDuration =
      node.state === 'entering' || node.state === 'entered' ? nodeDuration.enter : nodeDuration.exit

    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean)

    animatedList
      .filter(Boolean)
      .map((item) => {
        if (typeof item === 'string') {
          const preset = animatedPresets[item]
          if (!preset) {
            throw new Error(`ARWES createAnimatedElement() unexpected animated preset "${item}".`)
          }
          return preset()
        }
        if (Array.isArray(item)) {
          return transition(...item)
        }
        return item
      })
      .map((settingsItem) => (settingsItem ? settingsItem.transitions?.[node.state] : null))
      .filter(Boolean)
      .forEach((transition) => {
        try {
          if (typeof transition === 'function') {
            const animation = transition({
              element,
              $,
              duration: transitionDuration,
              nodeDuration,
              animate,
              stagger,
              easing
            }) as unknown as AnimatedAnimationFunctionReturn

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
          else if (transition) {
            const {
              duration: durationInitial,
              delay,
              ease,
              repeat,
              direction,
              options,
              ...definition
            } = transition

            const duration = durationInitial || transitionDuration

            // TODO: Apply final animation state to element if duration is 0.
            if (duration <= 0) {
              throw new Error(
                'ARWES createAnimatedElement() animation duration must be greater than 0.'
              )
            }

            const animation = animate(element, definition, {
              duration,
              delay,
              ease: typeof ease === 'string' ? (easing[ease as EasingName] ?? ease) : ease,
              repeat,
              direction,
              ...options
            })

            animations.add(animation)

            void animation.then(() => {
              animations.delete(animation)
            })
          }
        } catch (err) {
          throw new Error(`ARWES createAnimatedElement() animation error:\n${String(err)}`)
        }
      })

    onTransition?.(element, node)
  })

  const cancel = (): void => {
    unsubscribe()
    animations.forEach((animation) => animation.cancel())
    animations.clear()
  }

  return Object.freeze({ settingsRef: props.settingsRef, cancel })
}

export type { AnimatedElementPropsSettings, AnimatedElementProps, AnimatedElement }
export { createAnimatedElement }
