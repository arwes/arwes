import React from 'react'
import { createRoot } from 'react-dom/client'
import { FrameCorners } from '@arwes/react-frames'

const Sandbox = (): JSX.Element => {
  return (
    // The parent element of the frame component should be positioned.
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        margin: '1rem',
        padding: '1rem 2rem'
      }}
    >
      {/* Any frame component by default will take all space inside the nearest
          positioned parent. You can change this behaviour by using frame property
          `positioned = false`. */}
      <FrameCorners
        style={{
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': 'hsl(180, 75%, 10%)',
          '--arwes-frames-line-color': 'hsl(180, 75%, 50%)'

          // The frame elements properties can be changed using CSS like:
          // ```css
          // [data-frame=bg] {
          //   color: hsl(180, 75%, 10%);
          // }
          // [data-frame=line] {
          //   color: hsl(180, 75%, 50%);
          // }
          // ```
        }}
      />

      {/* The frame component is positioned so the other elements which need
          to be on top should also be positioned. You can change this behaviour
          by using z-index property of any of them. */}
      <div style={{ position: 'relative', color: 'hsl(180, 75%, 50%)' }}>
        Futuristic Sci-Fi UI Web Framework
      </div>
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
