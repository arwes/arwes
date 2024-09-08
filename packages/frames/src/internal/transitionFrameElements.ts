import { animate } from 'motion'
import {
  type EasingName,
  type AnimatedXAnimationFunctionReturn,
  easing as ARWESEasing
} from '@arwes/animated'

import type { FrameSettingsElement } from '../types.js'
import { formatStaticStyles } from './formatStaticStyles.js'

const transitionElement = (
  element: SVGElement,
  contexts: Record<string, string>,
  animations: Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>,
  elementSettings: FrameSettingsElement
): void => {
  const elementContexts = elementSettings.contexts

  if (!elementContexts) {
    return
  }

  const contextNames = Object.keys(elementContexts)

  contextNames
    .map((name) => elementContexts[name])
    .filter(Boolean)
    .map((context) =>
      Object.keys(context!)
        .map((stateName) => context![stateName])
        .map((state) => state?.className)
    )
    .flat()
    .filter(Boolean)
    .forEach((className) => element.classList.remove(className!))

  for (const contextName of contextNames) {
    const context = elementContexts[contextName]

    if (!context) {
      continue
    }

    const state = context[contexts[contextName]]

    if (!state) {
      continue
    }

    if (state.className) {
      element.classList.add(state.className)
    }

    if (state.style) {
      Object.assign(element.style, formatStaticStyles(state.style as Record<string, unknown>))
    }

    if (state.animate) {
      let animation: undefined | AnimatedXAnimationFunctionReturn

      if (typeof state.animate === 'function') {
        const $ = <T = SVGElement | HTMLElement>(query: string): T[] =>
          Array.from(element.querySelectorAll(query)) as T[]
        animation = state.animate({ element, $ })!
      }
      //
      else {
        const { duration, delay, easing, direction, repeat, options, ...styles } = state.animate

        const animateEasing = easing ?? options?.easing
        const animateEasingFunction =
          typeof animateEasing === 'string'
            ? ARWESEasing[animateEasing as EasingName] || animateEasing
            : animateEasing

        animation = animate(element, styles, {
          duration,
          delay,
          easing: animateEasingFunction,
          direction,
          repeat,
          ...options
        })
      }

      if (animation) {
        const elementContextAnimations =
          animations.get(element) ?? new Map<string, AnimatedXAnimationFunctionReturn>()
        elementContextAnimations.get(contextName)?.cancel()
        elementContextAnimations.set(contextName, animation)
      }
    }
  }
}

const transitionFrameElements = (
  parent: SVGElement,
  contexts: Record<string, string>,
  animations: Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>,
  elementsSettings: FrameSettingsElement[]
): void => {
  const children = Array.from(parent.children) as SVGElement[]

  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const childSettings = elementsSettings[index]

    transitionElement(child, contexts, animations, childSettings)

    switch (childSettings.type) {
      case 'svg':
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (Array.isArray(childSettings.elements)) {
          transitionFrameElements(child, contexts, animations, childSettings.elements)
        }
        break
      }
    }
  }
}

export { transitionFrameElements }
