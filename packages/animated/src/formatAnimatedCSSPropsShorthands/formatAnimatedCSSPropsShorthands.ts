import type { Properties as CSSProperties } from 'csstype'

import type { AnimatedCSSProps } from '../types.js'

const propsTransformDistances = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ'
}

const propsTransformAngles = {
  rotate: 'rotate',
  rotateX: 'rotateX',
  rotateY: 'rotateY',
  rotateZ: 'rotateZ',
  skew: 'skew',
  skewX: 'skewX',
  skewY: 'skewY'
}

const propsTransformUnitless = {
  scale: 'scale',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  scaleZ: 'scaleZ'
}

const formatAnimatedCSSPropsShorthands = (
  cssPropertiesEnhanced: AnimatedCSSProps
): CSSProperties => {
  const cssProperties: CSSProperties = {}

  let transform = ''

  Object.keys(cssPropertiesEnhanced).forEach((key) => {
    const raw = (cssPropertiesEnhanced as any)[key]

    if (propsTransformDistances[key as keyof typeof propsTransformDistances]) {
      const name = propsTransformDistances[key as keyof typeof propsTransformDistances]
      const value: string = Number.isFinite(raw) ? `${raw}px` : String(raw)
      transform += ` ${name}(${value})`
    } else if (propsTransformAngles[key as keyof typeof propsTransformAngles]) {
      const name = propsTransformAngles[key as keyof typeof propsTransformAngles]
      const value: string = Number.isFinite(raw) ? `${raw}deg` : String(raw)
      transform += ` ${name}(${value})`
    } else if (propsTransformUnitless[key as keyof typeof propsTransformUnitless]) {
      const name = propsTransformUnitless[key as keyof typeof propsTransformUnitless]
      transform += ` ${name}(${raw})`
    } else {
      ;(cssProperties as any)[key] = raw
    }
  })

  transform = transform.trim()

  if (transform) {
    cssProperties.transform = transform
  }

  return cssProperties
}

export { formatAnimatedCSSPropsShorthands }
