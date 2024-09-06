'use client'

import { Animated, Animator } from '@arwes/react'

import { settings } from '@/config'
import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>Background Fundamentals</AR.Header>

    <AR.P>
      Ambient visual effects such as background patterns and simulation environments can be an
      option to create creative apps. ARWES provides a few configurable background components with
      common sci-fi effects.
    </AR.P>

    <Animator>
      <Animated
        as="iframe"
        data-name="playground"
        className="block w-full h-[30rem]"
        src={`${settings.apps.play.url}?code=&type=predefined&sandbox=Examples%7CReact%7Cbackgrounds&explorer=false&editor=false&preview=true`}
        animated={['flicker']}
      />
    </Animator>

    <AR.P>
      They are 2D Canvas HTML elements with configurable visual effects. Some of them offer common
      futuristic sci-fi environments. They can be an starting point of design for some apps. There
      are many other libraries which offer these kinds of background effects too such as{' '}
      <a href="https://www.vantajs.com" target="_blank">
        VantaJS
      </a>{' '}
      and{' '}
      <a href="https://github.com/tsparticles/tsparticles" target="_blank">
        tsparticles
      </a>
      .
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/frames"
      prev="Frames"
      nextHref="/docs/develop/fundamentals"
      next="Fundamentals"
    />
  </>
)
