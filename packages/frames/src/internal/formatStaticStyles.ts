import type { Properties as CSSProperties } from 'csstype'
import { formatAnimatedCSSPropsShorthands } from '@arwes/animated'

const formatStaticStyles = (style: Record<string, unknown>): CSSProperties => {
  const cleanStyle: Record<string, number | string> = {}

  Object.keys(style).forEach((prop) => {
    const value = style[prop]

    if (typeof value === 'number' || typeof value === 'string') {
      cleanStyle[prop] = value
    }
  })

  return formatAnimatedCSSPropsShorthands(cleanStyle)
}

export { formatStaticStyles }
