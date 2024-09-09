import type { AnimatedCSSProps } from '../types.js'
import { formatAnimatedCSSProps } from '../formatAnimatedCSSProps/index.js'

const applyAnimatedCSSProps = (
  element: HTMLElement | SVGElement,
  props: AnimatedCSSProps
): void => {
  const styles = formatAnimatedCSSProps(props)

  Object.keys(styles).forEach((key) => {
    if (/^--[a-zA-Z]/.test(key)) {
      element.style.setProperty(key, styles[key as 'opacity'] as string)
    } else {
      element.style[key as 'opacity'] = styles[key as 'opacity'] as string
    }
  })
}

export { applyAnimatedCSSProps }
