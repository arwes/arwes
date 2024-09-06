'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Animator,
  AnimatorGeneralProvider,
  FrameCorners,
  FrameKranox,
  FrameLines,
  FrameNefrex,
  FrameOctagon,
  FrameUnderline,
  useFrameAssembler
} from '@arwes/react'
import { theme } from '@/config'

const Frames = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  useFrameAssembler(containerRef)
  return (
    <div
      ref={containerRef}
      className="flex flex-row flex-wrap gap-4"
      style={{
        // @ts-expect-error css variables
        '--arwes-frames-bg-color': theme.colors.secondary.main(10),
        '--arwes-frames-bg-filter': `drop-shadow(0 0 2px ${theme.colors.secondary.main(10)})`,
        '--arwes-frames-line-color': theme.colors.secondary.main(3),
        '--arwes-frames-line-filter': `drop-shadow(0 0 2px ${theme.colors.secondary.main(3)})`
      }}
    >
      <FrameOctagon
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        strokeWidth={2}
        squareSize={20}
      />
      <FrameUnderline
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        strokeWidth={2}
        squareSize={20}
      />
      <FrameCorners
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        cornerLength={20}
        strokeWidth={2}
      />
      <FrameLines
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        largeLineWidth={2}
        smallLineWidth={2}
        smallLineLength={20}
      />
      <FrameNefrex
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        strokeWidth={2}
        squareSize={20}
        smallLineLength={20}
        largeLineLength={40}
      />
      <FrameKranox
        className="!relative !inset-auto !w-36 !h-32 md:!w-48"
        padding={4}
        strokeWidth={2}
        squareSize={10}
        smallLineLength={10}
        largeLineLength={20}
      />
    </div>
  )
}

const Example = (): JSX.Element => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), active ? 2_500 : 1_500)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 1, exit: 1 }}>
      <Animator root active={active}>
        <Frames />
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleFrames = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleFrames }
