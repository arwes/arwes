import React, { type ReactElement, useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { animate } from 'motion'
import {
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  Animator,
  useAnimator
} from '@arwes/react-animator'

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null)
  const animator = useAnimator()!

  useEffect(() => {
    const unsubscribe = animator.node.subscribe((node) => {
      const element = elementRef.current as HTMLElement

      switch (node.state) {
        case 'entering': {
          void animate(
            element,
            { x: [0, 100], background: ['#0ff', '#ff0'] },
            { duration: node.settings.duration.enter }
          )
          break
        }
        case 'exiting': {
          void animate(
            element,
            { x: [100, 0], background: ['#ff0', '#0ff'] },
            { duration: node.settings.duration.enter }
          )
          break
        }
      }
    })
    return () => unsubscribe()
  }, [])

  return <div ref={elementRef} style={{ margin: 10, width: 40, height: 20, background: '#0ff' }} />
}

const Item = (): ReactElement => {
  return (
    <Animator>
      <AnimatorUIListener />
    </Animator>
  )
}

const animatorGeneralSettings: AnimatorGeneralProviderSettings = {
  disabled: false,
  duration: { enter: 0.1, exit: 0.1, stagger: 0.3 }
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((v) => !v), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <AnimatorGeneralProvider {...animatorGeneralSettings}>
      <Animator active={active} manager="stagger">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Animator>
    </AnimatorGeneralProvider>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
