import React, {
  type ForwardedRef,
  type ReactElement,
  type CSSProperties,
  type ReactNode,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs, useUpdateEffect } from '@arwes/react-tools'
import { useAnimator } from '@arwes/react-animator'
import { type FrameSettings, type Frame, createFrame } from '@arwes/frames'

import { positionedStyle } from '../internal/styles.js'

type FrameBaseProps = {
  elementRef?: ForwardedRef<SVGSVGElement>
  positioned?: boolean
  settings: FrameSettings
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const FrameBase = memo((props: FrameBaseProps): ReactElement => {
  const { elementRef, positioned = true, settings, className, style, children } = props

  const animator = useAnimator()
  const svgRef = useRef<SVGSVGElement>(null)
  const frameRef = useRef<Frame | null>(null)
  const settingsRef = useRef<FrameSettings>(settings)

  Object.assign(settingsRef.current, settings, { animator: animator?.node })

  useEffect(() => {
    const svg = svgRef.current

    if (!svg) {
      return
    }

    frameRef.current = createFrame(svg, settingsRef.current)

    return () => frameRef.current?.remove()
  }, [animator])

  useUpdateEffect(() => {
    frameRef.current?.render()
  }, [settings])

  return (
    <svg
      role="presentation"
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-frames-frame', className)}
      style={{ ...(positioned ? positionedStyle : null), ...style }}
      xmlns="http://www.w3.org/2000/svg"
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio="none"
    >
      {children}
    </svg>
  )
})

export type { FrameBaseProps }
export { FrameBase }
