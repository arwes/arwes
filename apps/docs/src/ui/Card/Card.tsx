import { useRef } from 'react'
import { useMedia } from 'react-use'
import {
  Animated,
  Animator,
  FrameNefrex,
  Illuminator,
  Text,
  cx,
  styleFrameClipOctagon,
  useFrameAssembler
} from '@arwes/react'

import { theme } from '@/config'
import styles from './Card.module.css'

type CardProps = {
  title: string
  description: string
  icon: React.ReactNode
}

const Card = (props: CardProps): JSX.Element => {
  const { title, description, icon } = props

  const isXL = useMedia(theme.breakpoints.up('xl', { strip: true }), false)
  const frameRef = useRef<SVGSVGElement>(null)

  useFrameAssembler(frameRef)

  return (
    <Animated as="article" className={cx('relative group flex', styles.root)}>
      <FrameNefrex
        elementRef={frameRef}
        className="opacity-70 transition-all ease-out duration-200 group-hover:opacity-100"
        strokeWidth={4}
        styled={false}
      />

      <Animated className="font-code leading-none text-size-12 text-primary-main-3/20 md:text-size-11">
        <div className="absolute right-2 top-2">⎯ 0x1010</div>
        <div className="absolute left-2 bottom-2">0x1010 ⎯</div>
      </Animated>

      {isXL && (
        <div
          className="absolute inset-0.5 overflow-hidden"
          style={{
            clipPath: styleFrameClipOctagon({
              leftBottom: false,
              rightTop: false,
              squareSize: theme.space(4)
            })
          }}
        >
          <Illuminator
            size={theme.spacen(100)}
            color={theme.colors.primary.main(7, { alpha: 0.1 })}
          />
        </div>
      )}

      <div className="flex-1 flex flex-row justify-between items-center gap-4 p-6 lg:p-8">
        <div className="flex flex-col gap-2">
          <Animator>
            <Text
              as="h1"
              className={cx(
                'relative',
                'font-header text-size-6 text-primary-main-3 group-hover:text-primary-high-2'
              )}
              fixed
            >
              <div
                className={cx(
                  'absolute left-0 inset-y-1 w-1',
                  'bg-current transition-all ease-out duration-200 origin-left scale-x-0',
                  'group-hover:scale-x-100'
                )}
              />
              <div className="transition-all ease-out duration-200 group-hover:translate-x-4">
                {title}
              </div>
            </Text>
          </Animator>
          <Animator>
            <Text className="font-body text-size-8 text-primary-main-5 group-hover:text-primary-high-4">
              {description}
            </Text>
          </Animator>
        </div>

        <Animator>
          <Animated
            className={cx(
              'text-[3.5rem] text-primary-main-3',
              'transition-all ease-out duration-200',
              'group-hover:scale-110 group-hover:text-primary-high-2'
            )}
            animated={['flicker']}
          >
            {icon}
          </Animated>
        </Animator>
      </div>
    </Animated>
  )
}

export { Card }
