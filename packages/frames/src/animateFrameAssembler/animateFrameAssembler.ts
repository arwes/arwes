import { type AnimationControls, type TimelineSegment, timeline } from 'motion'
import { easing } from '@arwes/animated'

type animateFrameAssemblerProps = {
  element: HTMLElement | SVGElement
  duration: number
  isEntering?: boolean
}

const animateFrameAssembler = (props: animateFrameAssemblerProps): AnimationControls => {
  const { element, duration, isEntering = true } = props

  const bgs = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=bg]'))
  const lines = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=line]'))
  const decos = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=deco]'))
  const elements = [...bgs, ...lines, ...decos]

  for (const line of lines) {
    const length = line.getTotalLength()
    line.style.opacity = '1'
    line.style.strokeDasharray = String(length)
    line.dataset.length = String(length)
  }

  const lineAnimations: TimelineSegment[] = lines.map((line) => {
    const length = Number(line.dataset.length)
    return [line, { strokeDashoffset: [length, 0] }, { at: 0, duration, easing: easing.outSine }]
  })

  const animation = timeline(
    [
      [bgs, { opacity: [0, 1] }, { at: 0, duration: duration / 2, easing: easing.outSine }],
      [
        decos,
        { opacity: [0, 1, 0.5, 1] },
        { at: duration / 2, duration: duration / 2, easing: easing.outSine }
      ],
      ...lineAnimations
    ],
    {
      direction: isEntering ? 'normal' : 'reverse'
    }
  )

  void animation.finished.then(() => {
    for (const element of elements) {
      element.style.opacity = isEntering ? '1' : '0'
    }

    for (const line of lines) {
      line.style.strokeDasharray = ''
      line.style.strokeDashoffset = ''
    }
  })

  return animation
}

export type { animateFrameAssemblerProps }
export { animateFrameAssembler }
