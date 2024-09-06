import { animate } from 'motion'
import {
  type EasingName,
  type AnimatedXTransitionFunctionReturn,
  easing as ARWESEasing
} from '@arwes/animated'

import type { FrameSettingsElement, FrameSettingsContexts, FrameSettings, Frame } from '../types.js'
import { renderFrameElements } from '../internal/renderFrameElements.js'
import { formatFramePath } from '../internal/formatFramePath.js'
import { formatStaticStyles } from '../internal/formatStaticStyles.js'

const createFrame = <Contexts extends Record<string, string> = Record<string, string>>(
  svg: SVGSVGElement,
  settings: FrameSettings<Contexts>
): Frame<Contexts> => {
  let width = 0
  let height = 0
  // eslint-disable-next-line prefer-const
  let observer: ResizeObserver

  const settingsContexts = (settings.contexts ?? {}) as FrameSettingsContexts<Contexts>
  const contexts = Object.keys(settingsContexts)
    .map((name) => ({ [name]: settingsContexts[name].initial ?? '' }))
    .reduce((t, i) => ({ ...t, ...i }), {}) as unknown as Contexts

  const animations = new Map<SVGElement, Map<keyof Contexts, AnimatedXTransitionFunctionReturn>>()

  const container =
    settings.container ?? document.createElementNS('http://www.w3.org/2000/svg', 'g')

  const resize = (): void => {
    // In certain browsers, when the SVG viewBox has values with decimals above the 0.5,
    // the browser clips the values to the edge. Round down the dimensions so it doesn't happen.
    width = Math.floor(svg.clientWidth)
    height = Math.floor(svg.clientHeight)

    if (svg.getAttribute('viewBox') !== `0 0 ${width} ${height}`) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
  }

  const render = (): void => {
    container.dataset.frame = ''

    // For most use cases, a frame's lines/borders, which are rendered using SVG `stroke`,
    // should not be re-scaled when the SVG is unexpectedly re-scaled and the frame is not
    // re-scaled accordingly. These lines/borders should be presented the same way.
    container.style.setProperty('vector-effect', 'non-scaling-stroke')

    renderFrameElements(container, width, height, settings.elements, contexts)

    if (!container.parentNode) {
      svg.appendChild(container)
    }
  }

  const drawElements = (parent: SVGElement, elementsSettings: FrameSettingsElement[]): void => {
    const children = Array.from(parent.children) as SVGElement[]

    for (let index = 0; index < children.length; index++) {
      const child = children[index]
      const childSettings = elementsSettings[index]

      if (childSettings.type === undefined || childSettings.type === 'path') {
        const d = formatFramePath(width, height, childSettings.path)

        if (child.getAttribute('d') !== d) {
          child.setAttribute('d', d)
        }
      }

      switch (childSettings.type) {
        case 'g':
        case 'defs':
        case 'clipPath':
        case 'mask': {
          drawElements(child, childSettings.elements)
          break
        }
      }
    }
  }

  const draw = (): void => {
    drawElements(container, settings.elements)
  }

  const transitionElement = (element: SVGElement, elementSettings: FrameSettingsElement): void => {
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

      if (state.transition) {
        let animation: undefined | AnimatedXTransitionFunctionReturn

        if (typeof state.transition === 'function') {
          const $ = <T = SVGElement | HTMLElement>(query: string): T[] =>
            Array.from(element.querySelectorAll(query)) as T[]
          animation = state.transition({ element, $ }) as
            | undefined
            | AnimatedXTransitionFunctionReturn
        }
        //
        else {
          const { duration, delay, easing, direction, repeat, options, ...styles } =
            state.transition

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
            animations.get(element) ?? new Map<keyof Contexts, AnimatedXTransitionFunctionReturn>()
          elementContextAnimations.get(contextName)?.cancel()
          elementContextAnimations.set(contextName, animation)
        }
      }
    }
  }

  const transitionElements = (
    parent: SVGElement,
    elementsSettings: FrameSettingsElement[]
  ): void => {
    const children = Array.from(parent.children) as SVGElement[]

    for (let index = 0; index < children.length; index++) {
      const child = children[index]
      const childSettings = elementsSettings[index]

      transitionElement(child, childSettings)

      switch (childSettings.type) {
        case 'g':
        case 'defs':
        case 'clipPath':
        case 'mask': {
          transitionElements(child, childSettings.elements)
          break
        }
      }
    }
  }

  const transition = (context: keyof Contexts, state: Contexts[string]): void => {
    contexts[context] = state
    transitionElements(container, settings.elements)
  }

  const cancel = (): void => {
    observer.disconnect()
    animations.forEach((context) => context.forEach((animation) => animation.cancel()))
  }

  const remove = (): void => {
    cancel()
    Array.from(container.children).forEach((child) => child.remove())
  }

  resize()
  render()
  draw()

  observer = new ResizeObserver(() => {
    resize()
    draw()
  })
  observer.observe(svg)

  return Object.freeze({ transition, cancel, remove }) as Frame<Contexts>
}

export { createFrame }
