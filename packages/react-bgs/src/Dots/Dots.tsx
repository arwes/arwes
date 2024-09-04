import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { useAnimator } from '@arwes/react-animator'
import { type CreateBackgroundDotsSettings, createBackgroundDots } from '@arwes/bgs'

import { positionedStyle } from '../internal/styles.js'

interface DotsProps extends CreateBackgroundDotsSettings {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  id?: string
  className?: string
  style?: CSSProperties
  positioned?: boolean
}

const Dots = memo((props: DotsProps): ReactElement => {
  const { elementRef: elementRefExternal, id, className, style, positioned = true } = props

  const animator = useAnimator()
  const elementRef = useRef<HTMLCanvasElement>(null)
  const settingsRef = useRef(props)

  settingsRef.current = props

  useEffect(() => {
    const canvas = elementRef.current

    if (!canvas) {
      return
    }

    const background = createBackgroundDots({
      canvas,
      animator: animator?.node,
      settingsRef
    })

    return () => background.cancel()
  }, [animator])

  return (
    <canvas
      role="presentation"
      ref={mergeRefs(elementRef, elementRefExternal)}
      id={id}
      className={cx('arwes-bgs-dots', className)}
      style={{ ...(positioned ? positionedStyle : null), ...style }}
    />
  )
})

export type { DotsProps }
export { Dots }
