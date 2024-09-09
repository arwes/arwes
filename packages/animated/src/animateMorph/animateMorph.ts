import { type AnimationControls, animate } from 'motion'
import type { EasingMotion, EasingName } from '../types.js'
import { easing } from '../easing/index.js'

type AnimateMorphProps = {
  element: SVGPathElement
  from: Array<[string, ...number[]]>
  to: Array<[string, ...number[]]>
  duration?: number
  easing?: EasingMotion
}

const animateMorph = (props: AnimateMorphProps): AnimationControls => {
  const { element, from, to, duration } = props

  const easingCustom =
    typeof props.easing === 'string' ? easing[props.easing as EasingName] : props.easing

  const diffs = from.map((line, index) =>
    line.map((item, subIndex) => {
      if (subIndex === 0) {
        return 0
      }
      const start = +item
      const end = +to[index][subIndex]
      return end - start
    })
  )

  return animate(
    (progress) => {
      const d = from
        .map((line, index) =>
          line
            .map((item, subIndex) => {
              const diff = diffs[index][subIndex]
              if (diff === 0) {
                return item
              }
              return +item + diff * progress
            })
            .join(' ')
        )
        .join(' ')

      element.setAttribute('d', d)
    },
    {
      duration,
      easing: easingCustom
    }
  )
}

export type { AnimateMorphProps }
export { animateMorph }
