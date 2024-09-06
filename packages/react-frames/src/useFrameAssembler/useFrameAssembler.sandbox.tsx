import React, { type ReactElement, useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { FrameOctagon, useFrameAssembler } from '@arwes/react-frames'

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement>(null)
  useFrameAssembler(svgRef)
  return (
    <FrameOctagon
      elementRef={svgRef}
      style={{
        // @ts-expect-error css variables
        '--arwes-frames-bg-color': 'hsl(60, 75%, 10%)',
        '--arwes-frames-bg-filter': 'drop-shadow(0 0 2px hsl(60, 75%, 10%))',
        '--arwes-frames-line-color': 'hsl(60, 75%, 50%)',
        '--arwes-frames-line-filter': 'drop-shadow(0 0 2px hsl(60, 75%, 50%))'
      }}
      padding={4}
      squareSize={20}
    />
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), active ? 2_000 : 1_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <Animator active={active}>
      <div style={{ position: 'relative', width: 300, height: 100 }}>
        <Frame />
      </div>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
