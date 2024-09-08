import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameOctagonSettingsProps, createFrameOctagonSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameOctagonProps = FrameBaseProps & CreateFrameOctagonSettingsProps

const FrameOctagon = memo((props: FrameOctagonProps): JSX.Element => {
  const { styled, leftTop, rightTop, rightBottom, leftBottom, squareSize, strokeWidth, padding } =
    props

  const settings = useMemo(
    () =>
      createFrameOctagonSettings({
        styled,
        leftTop,
        rightTop,
        rightBottom,
        leftBottom,
        squareSize,
        strokeWidth,
        padding
      }),
    [styled, leftTop, rightTop, rightBottom, leftBottom, squareSize, strokeWidth, padding]
  )

  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-frameoctagon', props.className)}
      settings={settings}
    />
  )
})

export type { FrameOctagonProps }
export { FrameOctagon }
