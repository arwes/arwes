import React, { type HTMLProps, type ReactNode } from 'react'
import { type AnimatedProp, memo, Animated, FrameOctagon, useBleeps, cx } from '@arwes/react'

import { type BleepNames, theme } from '@/config'
import styles from './ButtonContent.module.css'

interface ButtonContentProps extends HTMLProps<HTMLButtonElement> {
  className?: string
  animated?: AnimatedProp
  children: ReactNode
}

const ButtonContent = memo((props: ButtonContentProps): JSX.Element => {
  const { className, animated, children, ...otherProps } = props

  const bleeps = useBleeps<BleepNames>()

  return (
    <Animated<HTMLButtonElement>
      {...otherProps}
      as="button"
      className={cx(
        'relative',
        'group flex',
        'font-cta text-size-9 text-left',
        'select-none cursor-pointer transition-[color] ease-out duration-200',
        'text-secondary-low-2',
        'xl:text-size-8',
        'hover:text-secondary-high-3',
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
          filter: `drop-shadow(0 0 ${theme.space(2)} ${theme.colors.secondary.low(2)})`,
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': theme.colors.secondary.low(2, { alpha: 0.1 }),
          '--arwes-frames-line-color': theme.colors.secondary.low(2, { alpha: 0.5 })
        }}
        leftTop={false}
        leftBottom={false}
        rightTop={false}
        squareSize={theme.spacen(2)}
      />
      <div
        role="presentation"
        className={cx(
          'absolute left-[1px] top-1/2 -translate-y-1/2 w-1 h-4',
          'transition-all ease-out duration-200',
          'bg-secondary-low-2/50',
          'group-hover:h-full group-hover:bg-secondary-high-3/50'
        )}
      />
      <div
        role="presentation"
        className={cx(
          'absolute left-[1px] top-0 size-full bg-gradient-to-r from-secondary-high-4/10 to-secondary-high-4/0',
          'transition-transform ease-out duration-200 origin-left scale-x-0',
          'group-hover:scale-x-100'
        )}
      />
      <div
        className={cx(
          'relative',
          'flex-1 flex flex-row justify-between items-center',
          'gap-2 px-4 py-2',
          styles.content
        )}
      >
        {children}
      </div>
    </Animated>
  )
})

export { ButtonContent }
