import { useRef } from 'react'
import { useMedia } from 'react-use'
import { Animated, Animator, FrameLines, Illuminator, memo, useFrameAssembler } from '@arwes/react'

import { theme } from '@/config'
import { spring } from 'motion'

const FrameAlert = memo((): JSX.Element => {
  const isMD = useMedia(theme.breakpoints.up('md', { strip: true }), false)
  const frameRef = useRef<SVGSVGElement>(null)

  useFrameAssembler(frameRef)

  return (
    <Animated
      role="presentation"
      className="absolute inset-0"
      style={{
        background: `repeating-linear-gradient(-45deg, ${theme.colors.error(3, { alpha: 0.01 })}, ${theme.colors.error(3, { alpha: 0.01 })} 5px, transparent 5px, transparent 10px)`
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {isMD && (
          <Illuminator size={theme.spacen(100)} color={theme.colors.error(5, { alpha: 0.1 })} />
        )}

        <Animator>
          <Animated
            className="absolute -left-20 right-0 top-0 h-[10%] text-error-7/20"
            style={{
              background: `repeating-linear-gradient(-45deg, currentcolor, currentcolor ${theme.space(3)}, transparent ${theme.space(3)}, transparent ${theme.space(6)})`
            }}
            animated={['fade', ['x', theme.space(20), 0, 0, spring()]]}
          />
          <Animated
            className="absolute left-0 -right-20 bottom-0 h-[10%] text-error-7/20"
            style={{
              background: `repeating-linear-gradient(-45deg, currentcolor, currentcolor ${theme.space(3)}, transparent ${theme.space(3)}, transparent ${theme.space(6)})`
            }}
            animated={['fade', ['x', theme.space(-20), 0, 0, spring()]]}
          />
        </Animator>
      </div>

      <FrameLines
        elementRef={frameRef}
        style={{
          filter: `drop-shadow(0 0 ${theme.space(1)} ${theme.colors.error(5, { alpha: 0.1 })})`,

          // @ts-expect-error variables
          '--arwes-frames-bg-color': theme.colors.error(12, { alpha: 0.5 }),
          '--arwes-frames-line-color': theme.colors.error(7)
        }}
        largeLineWidth={isMD ? 2 : 1}
        smallLineWidth={isMD ? 4 : 2}
        smallLineLength={theme.spacen(isMD ? 6 : 4)}
      />
    </Animated>
  )
})

export { FrameAlert }
