import React, { type HTMLProps, type ReactNode } from 'react'
import {
  type AnimatedProp,
  memo,
  Animated,
  FrameCorners,
  Illuminator,
  useBleeps,
  cx
} from '@arwes/react'

import { type BleepNames, theme } from '@/config'
import styles from './ButtonSimple.module.css'

interface ButtonSimpleProps extends HTMLProps<HTMLButtonElement> {
  className?: string
  animated?: AnimatedProp
  children: ReactNode
}

const ButtonSimple = memo((props: ButtonSimpleProps): JSX.Element => {
  const { className, animated, children, ...otherProps } = props

  const bleeps = useBleeps<BleepNames>()

  return (
    <Animated<HTMLButtonElement>
      {...otherProps}
      as="button"
      className={cx(
        'relative',
        'group flex',
        'uppercase font-cta text-size-11',
        'select-none cursor-pointer transition-[color] ease-out duration-200',
        'text-secondary-main-2',
        'md:text-size-10',
        'xl:text-size-9',
        'hover:text-secondary-high-2',
        styles.root,
        className
      )}
      animated={animated}
      onMouseEnter={() => {
        bleeps.hover?.play()
      }}
      onClick={(event) => {
        otherProps.onClick?.(event)
        bleeps.click?.play()
      }}
    >
      <FrameCorners
        className="opacity-30 transition-opacity ease-out duration-200 group-hover:opacity-70"
        style={{
          filter: `drop-shadow(0 0 ${theme.space(2)} ${theme.colors.secondary.main(3)})`,
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': 'transparent'
        }}
        cornerLength={theme.spacen(2)}
      />
      <Illuminator
        style={{
          inset: theme.space(0.5),
          width: `calc(100% - ${theme.space(1)})`,
          height: `calc(100% - ${theme.space(1)})`
        }}
        size={theme.spacen(60)}
        color={theme.colors.secondary.main(3, { alpha: 0.2 })}
      />
      <div
        className={cx(
          'relative',
          'flex-1 flex flex-row justify-center items-center gap-1.5',
          'px-3 py-0 leading-[1.75rem]',
          'sm:px-4 sm:gap-2 sm:leading-[2rem]',
          styles.content
        )}
      >
        {children}
      </div>
    </Animated>
  )
})

export { ButtonSimple }
