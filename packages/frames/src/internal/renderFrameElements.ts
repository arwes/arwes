import { cx } from '@arwes/tools'
import type { AnimatorNode } from '@arwes/animator'
import { type AnimatedXAnimationFunctionReturn, createAnimatedElement } from '@arwes/animated'

import type { FrameSettingsElement, FrameSettingsPath } from '../types.js'
import { formatStaticStyles } from './formatStaticStyles.js'

const renderFrameElements = (
  parent: SVGElement,
  width: number,
  height: number,
  elements: FrameSettingsElement[],
  contexts: Record<string, string>,
  animator: undefined | AnimatorNode,
  animations: Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>
): void => {
  for (let index = 0; index < elements.length; index++) {
    const elementSettings = { ...elements[index] }
    const elementContexts = (elementSettings as FrameSettingsPath).contexts

    if (elementContexts) {
      const elementContextsNames = Object.keys(elementContexts)

      for (const contextName of elementContextsNames) {
        const elementContext = elementContexts[contextName]!
        const contextState = contexts[contextName]
        const elementState = elementContext[contextState]

        if (!elementState) {
          continue
        }

        if (elementState.className) {
          elementSettings.className = cx(elementSettings.className, elementState.className)
        }

        if (elementState.style) {
          elementSettings.style = {
            ...elementSettings.style,
            ...elementState.style
          }
        }

        if (elementState.path) {
          ;(elementSettings as FrameSettingsPath).path = elementState.path
        }
      }
    }

    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      elementSettings.type ?? 'path'
    )

    const { name, id, className, style } = elementSettings

    if (name) {
      element.dataset.name = name
    }

    if (id) {
      element.id = id
    }

    if (className) {
      element.classList.value = className
    }

    if (style) {
      Object.assign(element.style, formatStaticStyles(style as Record<string, string>))
    }

    if (elementSettings.type === 'svg') {
      element.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }

    switch (elementSettings.type) {
      case 'svg':
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (typeof elementSettings.elements === 'string') {
          element.innerHTML = elementSettings.elements
        } else {
          renderFrameElements(
            element,
            width,
            height,
            elementSettings.elements,
            contexts,
            animator,
            animations
          )
        }
        break
      }
    }

    if (animator && elementSettings.animated) {
      const animatedElement = createAnimatedElement({
        element,
        animator,
        settingsRef: {
          current: {
            animated: elementSettings.animated
          }
        }
      })
      const elementAnimations =
        animations.get(element) ?? new Map<string, AnimatedXAnimationFunctionReturn>()
      elementAnimations.set('__animator__', animatedElement)
      animations.set(element, elementAnimations)
    }

    parent.appendChild(element)
  }
}

export { renderFrameElements }
