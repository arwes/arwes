import { type RefObject, useEffect } from 'react'
import type { AnimationControls } from 'motion'
import { animateFrameAssembler } from '@arwes/frames'
import { useAnimator } from '@arwes/react-animator'

const useFrameAssembler = (svgRef: RefObject<SVGElement | HTMLElement>): void => {
  const animator = useAnimator()

  useEffect(() => {
    const svg = svgRef.current

    if (!animator || !svg) {
      return
    }

    let animation: AnimationControls

    const unsubscribe = animator.node.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          animation?.cancel()
          animation = animateFrameAssembler({
            element: svg,
            duration: node.settings.duration.enter,
            isEntering: true
          })
          break
        }

        case 'exiting': {
          animation?.cancel()
          animation = animateFrameAssembler({
            element: svg,
            duration: node.settings.duration.exit,
            isEntering: false
          })
          break
        }
      }
    })

    return () => {
      animation?.cancel()
      unsubscribe()
    }
  }, [animator])
}

export { useFrameAssembler }
