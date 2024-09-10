// React integration of `createFrameHeaderSettings`.

import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { FrameHeader } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <Animator>
      <div style={{ position: 'relative', width: 300, height: 30 }}>
        <FrameHeader
          style={{
            // @ts-expect-error css variables
            '--arwes-frames-bg-color': 'hsl(180, 75%, 10%)',
            '--arwes-frames-line-color': 'hsl(180, 75%, 25%)',
            '--arwes-frames-deco-color': 'hsl(180, 75%, 50%)'
          }}
          contentLength={60}
        />
        <div style={{ position: 'relative', color: 'cyan', font: '500 21px Tomorrow' }}>ARWES</div>
      </div>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
