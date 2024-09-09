import {
  type AnimatedXAnimationFunctionReturn,
  applyAnimatedCSSProps,
  createAnimatedXElement
} from '@arwes/animated'

import type { FrameSettingsElement } from '../types.js'

const transitionElement = (
  element: SVGElement,
  contexts: Record<string, string>,
  animations: Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>,
  settings: FrameSettingsElement
): void => {
  if (!settings.contexts) {
    return
  }

  const contextNames = Object.keys(settings.contexts)

  contextNames
    .map((name) => settings.contexts![name])
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
    const context = settings.contexts[contextName]!
    const state = context[contexts[contextName]]

    if (!state) {
      continue
    }

    if (state.className) {
      element.classList.add(state.className)
    }

    if (state.style) {
      applyAnimatedCSSProps(element, state.style)
    }

    if (state.animate) {
      const elementContextAnimations =
        animations.get(element) ?? new Map<string, AnimatedXAnimationFunctionReturn>()

      elementContextAnimations.get(contextName)?.cancel()

      const animation = createAnimatedXElement({
        element,
        settingsRef: {
          current: {
            state: 'initial',
            animated: {
              transitions: {
                initial: state.animate
              }
            }
          }
        }
      })

      elementContextAnimations.set(contextName, animation)
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

  for (let index = 0; index < elementsSettings.length; index++) {
    const element = children[index]
    const settings = elementsSettings[index]

    if (!element) {
      throw new Error('ARWES frame elements did not match the original setup on transition.')
    }

    transitionElement(element, contexts, animations, settings)

    switch (settings.type) {
      case 'svg':
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (Array.isArray(settings.elements)) {
          transitionFrameElements(element, contexts, animations, settings.elements)
        }
        break
      }
    }
  }
}

export { transitionFrameElements }
