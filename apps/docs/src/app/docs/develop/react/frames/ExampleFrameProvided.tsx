'use client'

import { Animated, Animator, AnimatorGeneralProvider, FrameOctagon } from '@arwes/react'

const Example = (): JSX.Element => {
  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 2, exit: 2 }}>
      <Animator root active>
        <Animated
          className="relative flex size-full text-center"
          animated={{
            transitions: {
              entering: {
                width: ['50%', '100%'],
                height: ['100%', '25%'],
                easing: 'steps(5, end)',
                repeat: Infinity,
                direction: 'alternate'
              }
            }
          }}
        >
          <FrameOctagon
            style={{
              // @ts-expect-error css variables
              '--arwes-frames-line-color': '#20DFDF',
              '--arwes-frames-bg-color': 'hsl(180deg 75% 50% / 10%)'
            }}
          />
          <div className="relative m-auto p-4">
            <p className="!m-0">Futuristic Sci-Fi UI Web Framework</p>
          </div>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleFrameProvided = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example" className="inline-block size-[15rem]">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleFrameProvided }
