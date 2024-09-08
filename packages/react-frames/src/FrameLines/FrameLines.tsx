import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameLinesSettingsProps, createFrameLinesSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameLinesProps = FrameBaseProps & CreateFrameLinesSettingsProps

const FrameLines = memo((props: FrameLinesProps): JSX.Element => {
  const { styled, padding, largeLineWidth, smallLineWidth, smallLineLength } = props

  const settings = useMemo(
    () =>
      createFrameLinesSettings({
        styled,
        padding,
        largeLineWidth,
        smallLineWidth,
        smallLineLength
      }),
    [styled, padding, largeLineWidth, smallLineWidth, smallLineLength]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framelines', props.className)}
      settings={settings}
    />
  )
})

export type { FrameLinesProps }
export { FrameLines }
