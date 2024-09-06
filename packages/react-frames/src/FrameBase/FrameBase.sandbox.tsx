import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { type FrameSettings } from '@arwes/frames'
import { FrameBase } from '@arwes/react-frames'

const frameSettings: FrameSettings = {
  elements: [
    // Background shape.
    {
      name: 'bg',
      style: {
        strokeWidth: 0,
        fill: 'hsl(180, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 10%))'
      },
      path: [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '100% - 20'],
        ['L', '100% - 20', 20]
      ]
    },
    // Top line.
    {
      name: 'line',
      style: {
        strokeWidth: '1',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', 10, 10],
        ['L', '100% - 10', 10],
        ['L', '100% - 10', 40]
      ]
    },
    // Bottom line.
    {
      name: 'line',
      style: {
        strokeWidth: '2',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', '100% - 10', '100% - 10'],
        ['L', 10, '100% - 10'],
        ['L', 10, '100% - 40']
      ]
    }
  ]
}

const Sandbox = (): ReactElement => {
  return (
    <div style={{ position: 'relative', width: 300, height: 200 }}>
      <FrameBase settings={frameSettings} />
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
