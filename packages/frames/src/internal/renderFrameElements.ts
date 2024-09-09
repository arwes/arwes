import type { AnimatorNode } from '@arwes/animator'
import {
  type AnimatedXAnimationFunctionReturn,
  createAnimatedElement,
  applyAnimatedCSSProps
} from '@arwes/animated'

import type { FrameSettingsElement } from '../types.js'

const renderFrameElements = (
  parent: SVGElement,
  width: number,
  height: number,
  elements: FrameSettingsElement[],
  contexts: Record<string, string>,
  animator: undefined | AnimatorNode,
  animations: Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>
): void => {
  const children = Array.from(parent.children) as SVGElement[]

  for (let index = 0; index < elements.length; index++) {
    const settings = elements[index]

    const element =
      children[index] ??
      document.createElementNS('http://www.w3.org/2000/svg', settings.type ?? 'path')

    const { name, id, className, style } = settings

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
      applyAnimatedCSSProps(element, style)
    }

    if (settings.type === 'svg') {
      element.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }

    switch (settings.type) {
      case 'svg':
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (typeof settings.elements === 'string') {
          element.innerHTML = settings.elements
        } else {
          renderFrameElements(
            element,
            width,
            height,
            settings.elements,
            contexts,
            animator,
            animations
          )
        }
        break
      }
    }

    if (animator && settings.animated) {
      const elementAnimations =
        animations.get(element) ?? new Map<string, AnimatedXAnimationFunctionReturn>()

      // Reset existing animations if currently running.
      elementAnimations.get('__animator__')?.cancel()

      const animatedElement = createAnimatedElement({
        element,
        animator,
        settingsRef: {
          current: {
            animated: settings.animated
          }
        }
      })

      elementAnimations.set('__animator__', animatedElement)
      animations.set(element, elementAnimations)
    }

    if (!element.parentNode) {
      parent.appendChild(element)
    }
  }
}

export { renderFrameElements }
