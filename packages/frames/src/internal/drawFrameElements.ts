import type { FrameSettingsElement } from '../types.js'
import { formatFramePath } from './formatFramePath.js'
import { formatFrameDimension } from './formatFrameDimension.js'

const drawFrameElements = (
  parent: SVGElement,
  width: number,
  height: number,
  elementsSettings: FrameSettingsElement[]
): void => {
  const children = Array.from(parent.children) as SVGElement[]

  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const childSettings = elementsSettings[index]

    if (childSettings.type === undefined || childSettings.type === 'path') {
      const d =
        typeof childSettings.path === 'string'
          ? childSettings.path
          : formatFramePath(width, height, childSettings.path)

      if (child.getAttribute('d') !== d) {
        child.setAttribute('d', d)
      }
    }
    //
    else if (childSettings.type === 'rect') {
      child.setAttribute('x', formatFrameDimension(width, childSettings.x))
      child.setAttribute('y', formatFrameDimension(height, childSettings.y))
      child.setAttribute('width', formatFrameDimension(width, childSettings.width))
      child.setAttribute('height', formatFrameDimension(height, childSettings.height))
      childSettings.rx !== undefined && child.setAttribute('rx', String(childSettings.rx))
      childSettings.ry !== undefined && child.setAttribute('ry', String(childSettings.ry))
    }
    //
    else if (childSettings.type === 'circle') {
      child.setAttribute('cx', formatFrameDimension(width, childSettings.cx))
      child.setAttribute('cy', formatFrameDimension(height, childSettings.cy))
      child.setAttribute('r', String(childSettings.r))
    }
    //
    else if (childSettings.type === 'ellipse') {
      child.setAttribute('cx', formatFrameDimension(width, childSettings.cx))
      child.setAttribute('cy', formatFrameDimension(height, childSettings.cy))
      child.setAttribute('rx', String(childSettings.rx))
      child.setAttribute('ry', String(childSettings.ry))
    }
    //
    else if (childSettings.type === 'svg') {
      child.setAttribute('viewBox', childSettings.viewBox)
      child.setAttribute('x', formatFrameDimension(width, childSettings.x))
      child.setAttribute('y', formatFrameDimension(height, childSettings.y))
      child.setAttribute('width', formatFrameDimension(width, childSettings.width))
      child.setAttribute('height', formatFrameDimension(height, childSettings.height))
    }

    switch (childSettings.type) {
      case 'svg':
      case 'g':
      case 'defs':
      case 'clipPath':
      case 'mask': {
        if (Array.isArray(childSettings.elements)) {
          drawFrameElements(child, width, height, childSettings.elements)
        }
        break
      }
    }
  }
}

export { drawFrameElements }
