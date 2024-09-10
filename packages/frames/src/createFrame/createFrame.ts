import { type AnimatedXAnimationFunctionReturn } from '@arwes/animated'

import type { FrameSettings, Frame } from '../types.js'
import { renderFrameElements } from '../internal/renderFrameElements.js'
import { drawFrameElements } from '../internal/drawFrameElements.js'
import { transitionFrameElements } from '../internal/transitionFrameElements.js'

const createFrame = <Contexts extends Record<string, string> = Record<string, string>>(
  svg: SVGSVGElement,
  settings: FrameSettings<Contexts>
): Frame<Contexts> => {
  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('ARWES createFrame requires a <svg> element.')
  }

  const { animator } = settings

  let width = 0
  let height = 0
  // eslint-disable-next-line prefer-const
  let observer: ResizeObserver

  const container =
    settings.container ?? document.createElementNS('http://www.w3.org/2000/svg', 'g')
  const contexts = { ...settings.contexts }
  const animations = new Map<SVGElement, Map<keyof Contexts, AnimatedXAnimationFunctionReturn>>()

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
    renderFrameElements(
      container,
      settings.elements,
      animator,
      animations as Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>
    )
  }

  const draw = (): void => {
    drawFrameElements(container, width, height, settings.elements, contexts)
  }

  const transition = (context: string, state: string): void => {
    contexts[context] = state

    draw()

    transitionFrameElements(
      container,
      contexts,
      animations as Map<SVGElement, Map<string, AnimatedXAnimationFunctionReturn>>,
      settings.elements
    )
  }

  const cancel = (): void => {
    observer.disconnect()
    animations.forEach((context) => context.forEach((animation) => animation.cancel()))
  }

  const remove = (): void => {
    cancel()
    Array.from(container.children).forEach((child) => child.remove())
  }

  container.dataset.frame = ''

  // For most use cases, a frame's lines/borders, which are rendered using SVG `stroke`,
  // should not be re-scaled when the SVG is unexpectedly re-scaled and the frame is not
  // re-scaled accordingly. These lines/borders should be presented the same way.
  container.style.setProperty('vector-effect', 'non-scaling-stroke')

  resize()
  render()
  draw()

  if (contexts) {
    const contextNames = Object.keys(contexts)

    for (const contextName of contextNames) {
      transition(contextName, contexts[contextName])
    }
  }

  if (!container.parentNode) {
    svg.appendChild(container)
  }

  let isFirstResize = true

  observer = new ResizeObserver(() => {
    if (isFirstResize) {
      isFirstResize = false
      return
    }

    resize()
    draw()
  })

  observer.observe(svg)

  return Object.freeze({
    get contexts() {
      return Object.freeze({ ...contexts })
    },
    render: () => {
      resize()
      render()
      draw()
    },
    transition,
    cancel,
    remove
  }) as unknown as Frame<Contexts>
}

export { createFrame }
