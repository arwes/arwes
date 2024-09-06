'use client'

import {
  Animated,
  Animator,
  AnimatorGeneralProvider,
  FrameBase,
  type FrameSettings
} from '@arwes/react'

const frameSettings: FrameSettings = {
  elements: [
    {
      style: { fill: 'none', stroke: '#20DFDF' },
      path: [
        ['M', 0.5, 1],
        ['H', '100% - 0.5'],
        ['v', 21]
      ]
    },
    {
      style: { fill: 'none', stroke: '#20DFDF' },
      path: [
        ['M', '100% - 0.5', '100% - 0.5'],
        ['H', '0.5'],
        ['v', -21]
      ]
    },
    {
      style: { fill: 'hsl(180deg 75% 50% / 10%)', stroke: 'none' },
      path: [
        ['M', 6, 6],
        ['H', '100% - 6'],
        ['V', '100% - 6'],
        ['H', 6]
      ]
    }
  ]
}

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
          <FrameBase settings={frameSettings} />
          <div className="relative m-auto p-4">Futuristic Sci-Fi UI Web Framework</div>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleFrame = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example" className="inline-block size-[15rem]">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleFrame }
