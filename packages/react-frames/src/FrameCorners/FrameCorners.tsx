import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameCornersProps, createFrameCorners } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameCornersProps
  extends Omit<FrameBaseProps, keyof CreateFrameCornersProps>,
    CreateFrameCornersProps {}

const FrameCorners = memo((props: FrameCornersProps): ReactElement => {
  const { styled, padding, strokeWidth, cornerLength, className, ...otherProps } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameCorners(svg, props),
    [styled, padding, strokeWidth, cornerLength]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-framecorners', className)}
      create={create}
    />
  )
})

export type { FrameCornersProps }
export { FrameCorners }
