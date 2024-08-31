import React, {
  type ReactElement,
  type ForwardedRef,
  type HTMLProps,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { type CreateEffectIlluminatorProps, createEffectIlluminator } from '@arwes/effects'

interface IlluminatorProps
  extends Omit<CreateEffectIlluminatorProps, 'container' | 'className' | 'style'>,
    HTMLProps<HTMLDivElement> {
  elementRef?: ForwardedRef<HTMLDivElement>
}

const Illuminator = memo((props: IlluminatorProps): ReactElement => {
  const { elementRef, color, size, ...otherProps } = props

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const illuminator = createEffectIlluminator({ container, color, size })

    return () => illuminator.cancel()
  }, [color, size])

  return (
    <div
      ref={mergeRefs(containerRef, elementRef)}
      role="presentation"
      {...otherProps}
      className={cx('arwes-frames-illuminator', otherProps.className)}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...otherProps.style
      }}
    />
  )
})

export type { IlluminatorProps }
export { Illuminator }
