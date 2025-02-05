import { animate } from 'motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import { easing } from '@arwes/animated'

type AnimateFrameAssemblerProps = {
  element: HTMLElement | SVGElement
  duration: number
  isEntering?: boolean
}

const animateFrameAssembler = (props: AnimateFrameAssemblerProps): AnimationPlaybackControls => {
  const { element, duration, isEntering = true } = props

  const bgs = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=bg]'))
  const lines = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=line]'))
  const decos = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=deco]'))

  return animate([
    [bgs, { opacity: [0, 1] }, { at: 0, duration: duration / 2, ease: easing.outSine }],
    [
      decos,
      { opacity: [0, 1, 0.5, 1] },
      { at: duration / 2, duration: duration / 2, ease: easing.outSine }
    ],
    [lines, { pathLength: isEntering ? [0, 1] : [1, 0] }, { at: 0, duration, ease: easing.outSine }]
  ])
}

export type { AnimateFrameAssemblerProps }
export { animateFrameAssembler }
