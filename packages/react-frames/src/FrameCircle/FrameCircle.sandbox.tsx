// React integration of `createFrameCircleSettings`.

import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { FrameCircle } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <Animator>
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <FrameCircle
          style={{
            // @ts-expect-error css variables
            '--arwes-frames-bg-color': 'hsl(180, 75%, 10%)',
            '--arwes-frames-line-color': 'hsl(180, 75%, 25%)',
            '--arwes-frames-deco-color': 'hsl(180, 75%, 50%)'
          }}
        />
      </div>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
