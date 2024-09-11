import type { FrameSettingsElement } from '../types.js'
import { formatFramePath } from './formatFramePath.js'
import { formatFrameDimension } from './formatFrameDimension.js'

const drawFrameElements = (
  parent: SVGElement,
  width: number,
  height: number,
  elementsSettings: FrameSettingsElement[],
  contexts: Record<string, string>
): void => {
  const children = Array.from(parent.children) as SVGElement[]

  for (let index = 0; index < elementsSettings.length; index++) {
    const element = children[index]
    const settings = { ...elementsSettings[index] }
    const contextsNames: string[] = settings.contexts ? Object.keys(settings.contexts) : []

    if (!element) {
      throw new Error('ARWES frame elements did not match the original setup on drawing.')
    }

    if (settings.type === undefined || settings.type === 'path') {
      for (const contextName of contextsNames) {
        const state = contexts[contextName]
        const elementState = settings.contexts![contextName]![state]

        if (!elementState) {
          continue
        }

        elementState.path && (settings.path = elementState.path)
      }

      const d =
        typeof settings.path === 'string'
          ? settings.path
          : formatFramePath(width, height, settings.path)

      if (element.getAttribute('d') !== d) {
        element.setAttribute('d', d)
      }
    }
    //
    else if (settings.type === 'rect') {
      for (const contextName of contextsNames) {
        const state = contexts[contextName]
        const elementState = settings.contexts![contextName]![state]

        if (!elementState) {
          continue
        }

        elementState.x !== undefined && (settings.x = elementState.x)
        elementState.y !== undefined && (settings.y = elementState.y)
        elementState.width !== undefined && (settings.width = elementState.width)
        elementState.height !== undefined && (settings.height = elementState.height)
        elementState.rx !== undefined && (settings.rx = elementState.rx)
        elementState.ry !== undefined && (settings.ry = elementState.ry)
      }

      element.setAttribute('x', formatFrameDimension(width, settings.x))
      element.setAttribute('y', formatFrameDimension(height, settings.y))
      element.setAttribute('width', formatFrameDimension(width, settings.width))
      element.setAttribute('height', formatFrameDimension(height, settings.height))
      settings.rx !== undefined && element.setAttribute('rx', String(settings.rx))
      settings.ry !== undefined && element.setAttribute('ry', String(settings.ry))
    }
    //
    else if (settings.type === 'ellipse') {
      let cx = settings.cx
      let cy = settings.cy
      let rx = settings.rx
      let ry = settings.ry

      for (const contextName of contextsNames) {
        const state = contexts[contextName]
        const elementState = settings.contexts![contextName]![state]

        if (!elementState) {
          continue
        }

        elementState.cx !== undefined && (cx = elementState.cx)
        elementState.cy !== undefined && (cy = elementState.cy)
        elementState.rx !== undefined && (rx = elementState.rx)
        elementState.ry !== undefined && (ry = elementState.ry)
      }

      cx = formatFrameDimension(width, cx)
      cy = formatFrameDimension(height, cy)
      rx = formatFrameDimension(width, rx)
      ry = formatFrameDimension(height, ry)

      element.setAttribute('cx', cx)
      element.setAttribute('cy', cy)
      element.setAttribute('rx', rx)
      element.setAttribute('ry', ry)
    }
    //
    else if (settings.type === 'svg') {
      let viewBox = settings.viewBox
      let x = settings.x
      let y = settings.y
      let w = settings.width
      let h = settings.height

      for (const contextName of contextsNames) {
        const state = contexts[contextName]
        const elementState = settings.contexts![contextName]![state]

        if (!elementState) {
          continue
        }

        elementState.viewBox !== undefined && (viewBox = elementState.viewBox)
        elementState.x !== undefined && (x = elementState.x)
        elementState.y !== undefined && (y = elementState.y)
        elementState.width !== undefined && (w = elementState.width)
        elementState.height !== undefined && (h = elementState.height)
      }

      w = formatFrameDimension(width, w)
      h = formatFrameDimension(height, h)
      x = formatFrameDimension(width, x)
      y = formatFrameDimension(height, y)

      element.setAttribute('viewBox', viewBox)
      element.setAttribute('x', x)
      element.setAttribute('y', y)
      element.setAttribute('width', w)
      element.setAttribute('height', h)

      if (Array.isArray(settings.elements)) {
        drawFrameElements(element, +w, +h, settings.elements, contexts)
      }
    }

    switch (settings.type) {
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (Array.isArray(settings.elements)) {
          drawFrameElements(element, width, height, settings.elements, contexts)
        }
        break
      }
    }
  }
}

export { drawFrameElements }
