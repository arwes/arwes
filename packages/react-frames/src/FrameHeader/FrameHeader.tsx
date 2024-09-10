import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameHeaderSettingsProps, createFrameHeaderSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameHeaderProps = Omit<FrameBaseProps, 'settings'> & CreateFrameHeaderSettingsProps

const FrameHeader = memo((props: FrameHeaderProps): JSX.Element => {
  const { styled, animated, padding, strokeWidth, decoWidth, direction, align, contentLength } =
    props

  const settings = useMemo(
    () =>
      createFrameHeaderSettings({
        styled,
        animated,
        padding,
        strokeWidth,
        decoWidth,
        direction,
        align,
        contentLength
      }),
    [styled, animated, padding, strokeWidth, decoWidth, direction, align, contentLength]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-frameheader', props.className)}
      settings={settings}
    />
  )
})

export type { FrameHeaderProps }
export { FrameHeader }
