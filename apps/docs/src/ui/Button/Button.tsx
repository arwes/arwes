import React, { type HTMLProps, type ReactNode } from 'react'
import {
  type AnimatedProp,
  memo,
  Animated,
  FrameOctagon,
  styleFrameClipOctagon,
  Illuminator,
  useBleeps,
  cx
} from '@arwes/react'

import { type BleepNames, theme } from '@/config'
import styles from './Button.module.css'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string
  animated?: AnimatedProp
  children: ReactNode
}

const Button = memo((props: ButtonProps): JSX.Element => {
  const { className, animated, children, ...otherProps } = props

  const bleeps = useBleeps<BleepNames>()

  return (
    <Animated<HTMLButtonElement>
      {...otherProps}
      as="button"
      className={cx(
        'relative',
        'group flex',
        'uppercase font-cta text-size-10',
        'select-none cursor-pointer transition-[color] ease-out duration-200',
        'text-secondary-main-2',
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
      <FrameOctagon
        className="opacity-70 transition-opacity ease-out duration-200 group-hover:opacity-100"
        style={{
          filter: `drop-shadow(0 0 ${theme.space(2)} ${theme.colors.secondary.main(3)})`,
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': theme.colors.secondary.main(2, { alpha: 0.1 }),
          '--arwes-frames-line-color': theme.colors.secondary.main(2, { alpha: 0.5 })
        }}
        leftBottom={false}
        rightTop={false}
        squareSize={theme.spacen(2)}
      />
      <Illuminator
        style={{
          clipPath: styleFrameClipOctagon({
            leftBottom: false,
            rightTop: false,
            squareSize: theme.spacen(2)
          })
        }}
        size={theme.spacen(60)}
        color={theme.colors.secondary.main(3, { alpha: 0.15 })}
      />
      <div
        className={cx(
          'relative',
          'flex-1 flex flex-row justify-center items-center',
          'gap-2 px-6 leading-[2rem]',
          'xl:px-8',
          styles.content
        )}
      >
        {children}
      </div>
    </Animated>
  )
})

export { Button }
