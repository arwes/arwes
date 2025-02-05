import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Animated } from '@arwes/react-animated'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <Animated
        style={{ width: 50, height: 50, backgroundColor: '#777' }}
        animated={[
          ['opacity', 0.25, 1],
          ['background', '#ff0', '#0ff', '#f0f', 'linear'],
          ['x', 0, 100, undefined, 'outElastic']
        ]}
        hideOnExited={false}
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
