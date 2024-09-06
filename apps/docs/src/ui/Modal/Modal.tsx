import { Children, useRef, type ReactNode } from 'react'
import {
  cx,
  memo,
  Animated,
  Animator,
  FrameKranox,
  useBleeps,
  useFrameAssembler,
  Text
} from '@arwes/react'
import { Xmark as IconClose } from 'iconoir-react'

import { type BleepNames } from '@/config'
import { Hr } from '../Hr'
import styles from './Modal.module.css'

interface ModalProps {
  className?: string
  contentClassName?: string
  header: ReactNode
  footer?: ReactNode
  children: ReactNode
  onClose?: () => void
}

const Modal = memo((props: ModalProps): JSX.Element => {
  const { className, contentClassName, header, footer, children, onClose } = props

  const frameRef = useRef<SVGSVGElement>(null)
  const bleeps = useBleeps<BleepNames>()

  useFrameAssembler(frameRef)

  return (
    <article
      role="dialog"
      className={cx(
        'z-20 fixed inset-0 flex justify-center items-center p-6',
        styles.root,
        className
      )}
    >
      <Animated
        role="presentation"
        className="absolute inset-0 bg-primary-main-12/80"
        style={{
          backdropFilter: 'blur(0.25rem)'
        }}
        animated={['fade']}
      />

      <Animated className="relative flex-1 flex flex-col m-auto py-6 max-w-md min-h-0 max-h-full">
        <FrameKranox
          elementRef={frameRef}
          className={styles.frame}
          styled={false}
          padding={2}
          strokeWidth={2}
          bgStrokeWidth={1}
        />

        <Animator combine manager="stagger">
          <Animator>
            <Animated
              as="header"
              className="relative flex flex-col gap-2 px-10"
              animated={['flicker']}
            >
              <div className="flex-1 flex flex-row gap-4 justify-between items-center">
                <Text
                  as="h1"
                  className={cx('font-header text-size-6 text-primary-main-3', 'sm:text-size-5')}
                  fixed
                >
                  {header}
                </Text>

                <button
                  className={cx(
                    'text-size-5 sm:text-size-4',
                    'transition-all ease-out duration-200',
                    'text-secondary-main-4 hover:text-secondary-high-2'
                  )}
                  autoFocus
                  title="Close"
                  onClick={() => {
                    onClose?.()
                    bleeps.click?.play()
                  }}
                >
                  <IconClose />
                </button>
              </div>

              <Hr direction="both" />
            </Animated>
          </Animator>

          <main className="relative flex-1 flex px-10 py-3 min-w-0 min-h-0">
            <Animated
              className={cx('flex-1 flex flex-col gap-4 min-w-0 min-h-0', contentClassName)}
            >
              {children}
            </Animated>
          </main>

          {!!Children.count(footer) && <footer className="relative">{footer}</footer>}
        </Animator>
      </Animated>
    </article>
  )
})

export { Modal }
