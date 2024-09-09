import {
  type AnimatedXAnimationFunctionReturn,
  formatAnimatedCSSPropsShorthands,
  createAnimatedXElement
} from '@arwes/animated'

import type { FrameSettingsElement } from '../types.js'

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
      Object.assign(
        element.style,
        formatAnimatedCSSPropsShorthands(state.style as Record<string, unknown>)
      )
    }

    if (state.animate) {
      const elementContextAnimations =
        animations.get(element) ?? new Map<string, AnimatedXAnimationFunctionReturn>()

      elementContextAnimations.get(contextName)?.cancel()

      const animation = createAnimatedXElement({
        element,
        settingsRef: {
          current: {
            state: 'start',
            animated: {
              transitions: {
                start: state.animate
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
