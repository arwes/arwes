import React, {
  type SVGAttributes,
  type ForwardedRef,
  type ReactElement,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { type FrameSettings, type Frame, createFrame } from '@arwes/frames'

import { positionedStyle } from '../internal/styles.js'

interface FrameBaseProps extends SVGAttributes<SVGSVGElement> {
  elementRef?: ForwardedRef<SVGSVGElement>
  positioned?: boolean
  settings?: FrameSettings
  create?: (svg: SVGSVGElement) => Frame
}

const FrameBase = memo((props: FrameBaseProps): ReactElement => {
  const {
    elementRef,
    className,
    style,
    positioned = true,
    settings,
    create,
    children,
    ...otherProps
  } = props

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current

    if (!svg) {
      return
    }

    const frame = settings ? createFrame(svg, settings) : create ? create(svg) : null

    return () => {
      frame?.remove()
    }
  }, [settings, create])

  return (
    <svg
      role="presentation"
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-frames-frame', className)}
      style={{
        ...(positioned ? positionedStyle : null),
        ...style
      }}
      xmlns="http://www.w3.org/2000/svg"
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio="none"
      {...otherProps}
    >
      {children}
    </svg>
  )
})

export type { FrameBaseProps }
export { FrameBase }
