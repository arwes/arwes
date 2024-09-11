import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameNeroSettingsProps, createFrameNeroSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameNeroProps = Omit<FrameBaseProps, 'settings'> & CreateFrameNeroSettingsProps

const FrameNero = memo((props: FrameNeroProps): JSX.Element => {
  const { styled, animated, padding, cornerLength, cornerWidth } = props

  const settings = useMemo(
    () => createFrameNeroSettings({ styled, animated, padding, cornerLength, cornerWidth }),
    [styled, animated, padding, cornerLength, cornerWidth]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framenero', props.className)}
      settings={settings}
    />
  )
})

export type { FrameNeroProps }
export { FrameNero }
