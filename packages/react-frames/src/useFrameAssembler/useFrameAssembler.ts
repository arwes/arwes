import { type RefObject, useEffect } from 'react'
import type { AnimationPlaybackControls } from 'framer-motion'
import { animateFrameAssembler } from '@arwes/frames'
import { useAnimator } from '@arwes/react-animator'

const useFrameAssembler = (svgRef: RefObject<SVGElement | HTMLElement>): void => {
  const animator = useAnimator()

  useEffect(() => {
    const container = svgRef.current

    if (!animator || !container) {
      return
    }

    let animation: AnimationPlaybackControls

    const unsubscribe = animator.node.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          animation?.cancel()
          animation = animateFrameAssembler({
            element: container,
            duration: node.settings.duration.enter,
            isEntering: true
          })
          break
        }

        case 'exiting': {
          animation?.cancel()
          animation = animateFrameAssembler({
            element: container,
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
