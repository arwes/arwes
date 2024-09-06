import { Children } from 'react'
import {
  Animated,
  FrameOctagon,
  Illuminator,
  styleFrameClipOctagon,
  memo,
  cx,
  Animator,
  BleepsOnAnimator
} from '@arwes/react'
import { useMedia } from 'react-use'

import { type BleepNames, theme } from '@/config'

type LayoutContentProps = {
  className?: string
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
}

const CONTAINER_WIDTH_CLASS = 'w-full min-w-0 max-w-screen-3xl min-h-0'
const ASIDE_WIDTH_CLASS = 'w-full min-w-0 max-w-[16rem] min-h-0'
const MAIN_WIDTH_CLASS = 'w-full min-w-0 max-w-[50rem] min-h-0'

const LayoutContent = memo((props: LayoutContentProps): JSX.Element => {
  const { className, left, right, children } = props

  const isLG = useMedia(theme.breakpoints.up('lg', { strip: true }), false)
  const isXL = useMedia(theme.breakpoints.up('xl', { strip: true }), false)

  return (
    <Animator combine>
      <BleepsOnAnimator<BleepNames> transitions={{ entering: 'type' }} />

      <div
        className={cx(
          'relative flex-1 flex flex-col justify-start items-center w-full min-w-0 min-h-0',
          className
        )}
      >
        <Animator duration={{ delay: isLG ? 0.2 : 0 }}>
          <div
            role="presentation"
            className={cx('absolute inset-0 flex px-2 pb-2', 'md:px-4 md:pb-4')}
          >
            <div
              className={cx(
                'flex flex-row justify-center gap-4 mx-auto',
                'lg:justify-between',
                CONTAINER_WIDTH_CLASS
              )}
            >
              {isLG && <aside className={cx('relative', ASIDE_WIDTH_CLASS)} />}

              <main className="flex justify-center w-full">
                <Animated
                  className={cx('relative overflow-hidden mx-auto', MAIN_WIDTH_CLASS)}
                  style={{
                    clipPath: styleFrameClipOctagon({ squareSize: theme.space(isLG ? 4 : 2) })
                  }}
                  animated={['flicker']}
                >
                  <FrameOctagon
                    style={{
                      // @ts-expect-error css variables
                      '--arwes-frames-bg-color': theme.colors.primary.main(9, { alpha: 0.15 }),
                      '--arwes-frames-line-color': theme.colors.primary.main(9, { alpha: 0.5 })
                    }}
                    squareSize={theme.spacen(isLG ? 4 : 2)}
                  />
                  {isXL && (
                    <Illuminator
                      color={theme.colors.primary.main(7, { alpha: 0.1 })}
                      size={theme.spacen(100)}
                    />
                  )}
                </Animated>
              </main>

              {isXL && <aside className={cx('relative', ASIDE_WIDTH_CLASS)} />}
            </div>
          </div>
        </Animator>

        <div
          className={cx(
            'relative flex-1 flex justify-center pb-2 w-full min-w-0 min-h-0',
            'md:pb-4'
          )}
        >
          <div
            className={cx(
              'flex-1 overflow-y-auto flex justify-center gap-4 px-2',
              'md:px-4',
              CONTAINER_WIDTH_CLASS
            )}
          >
            {isLG && (
              <aside className={cx('sticky top-0 flex', ASIDE_WIDTH_CLASS)}>
                {Children.count(left) > 0 && (
                  <Animator>
                    <Animated className="relative flex w-full" animated={['flicker']}>
                      <FrameOctagon
                        style={{
                          // @ts-expect-error css variables
                          '--arwes-frames-bg-color': theme.colors.primary.main(9, { alpha: 0.1 }),
                          '--arwes-frames-line-color': theme.colors.primary.main(9, { alpha: 0.5 })
                        }}
                        squareSize={theme.spacen(2)}
                      />
                      {isXL && (
                        <div className="absolute inset-0 overflow-hidden">
                          <Illuminator
                            color={theme.colors.primary.main(7, { alpha: 0.1 })}
                            size={theme.spacen(100)}
                          />
                        </div>
                      )}
                      <div className="relative overflow-y-auto flex p-4 w-full">{left}</div>
                    </Animated>
                  </Animator>
                )}
              </aside>
            )}

            <Animator
              combine
              manager="stagger"
              duration={{ delay: isLG ? 0.2 : 0, stagger: 0.05, limit: 25 }}
            >
              <main className="flex justify-center w-full min-w-0 min-h-0">
                <div
                  className={cx(
                    'flex flex-col mx-auto mb-auto p-4',
                    'md:p-8',
                    'xl:p-12',
                    MAIN_WIDTH_CLASS
                  )}
                >
                  {children}
                </div>
              </main>
            </Animator>

            {isXL && (
              <aside className={cx('sticky top-0 flex', ASIDE_WIDTH_CLASS)}>
                {Children.count(right) > 0 && (
                  <Animator>
                    <Animated className="relative flex w-full mb-auto" animated={['flicker']}>
                      <FrameOctagon
                        style={{
                          // @ts-expect-error css variables
                          '--arwes-frames-bg-color': theme.colors.primary.main(9, { alpha: 0.1 }),
                          '--arwes-frames-line-color': theme.colors.primary.main(9, { alpha: 0.5 })
                        }}
                        squareSize={theme.spacen(2)}
                      />
                      {isXL && (
                        <div className="absolute inset-0 overflow-hidden">
                          <Illuminator
                            color={theme.colors.primary.main(7, { alpha: 0.1 })}
                            size={theme.spacen(100)}
                          />
                        </div>
                      )}
                      <div className="relative flex p-4 w-full">{right}</div>
                    </Animated>
                  </Animator>
                )}
              </aside>
            )}
          </div>
        </div>
      </div>
    </Animator>
  )
})

export { LayoutContent }
