'use client'

import Link from 'next/link'
import { Codepen as IconPlay } from 'iconoir-react'

import { AR } from '@/ui'
import { ExampleFrameProvided } from './ExampleFrameProvided'
import { Animated, Animator } from '@arwes/react'
import { ExampleFrameCustom } from './ExampleFrameCustom'

export default (): JSX.Element => (
  <>
    <AR.Header>React Frames</AR.Header>

    <AR.P>
      ARWES provides a frames API to create responsive vector graphics. Make sure to read the{' '}
      <Link href="/docs/develop/fundamentals/frames">Frames Fundamentals</Link> for context.
    </AR.P>

    <AR.P>
      All of the frames are by default with CSS <code>position: absolute</code> and taking full size
      of the closest positioned parent. This pattern is an easy way to make the frame responsive.
      This can be removed with the component prop <code>positioned=false</code>.
    </AR.P>

    <AR.P>
      They also have default styles which can be overwriten or removed with the component prop{' '}
      <code>styled=false</code>.
    </AR.P>

    <AR.H2>Out-of-the-box Frames</AR.H2>

    <AR.P>There are a few frames which can be used right away with a few configurations.</AR.P>

    <AR.P>For example, the octagon frame:</AR.P>

    <AR.CodeBlock
      code={`import { FrameSVGOctagon } from '@arwes/react'

<div style={{ position: 'relative', width: 300, height: 300 }}>
  <FrameSVGOctagon
    style={{
      '--arwes-frames-line-color': '#20DFDF',
      '--arwes-frames-bg-color': 'hsl(180deg 75% 50% / 10%)'
    }}
  />
  <div style={{ position: 'relative' }}>
    Futuristic Sci-Fi UI Web Framework
  </div>
</div>`}
    />

    <ExampleFrameProvided />

    <AR.P>
      Check out the{' '}
      <a href="/play">
        <IconPlay /> Playground
      </a>{' '}
      for more examples on frames.
    </AR.P>

    <AR.H2>
      <code>&lt;FrameSVG&gt;</code>
    </AR.H2>

    <AR.P>
      Implementing custom SVG frames can be done with the <code>&lt;FrameSVG&gt;</code> component.
      All frames provided by the framework use it behind the scenes.
    </AR.P>

    <AR.P>Using this SVG example:</AR.P>

    <Animator>
      <Animated data-name="example">
        <svg
          width="201"
          height="102"
          viewBox="0 0 201 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
          <path d="M 200.5 101 H 0.5 V 81" stroke="#20DFDF" />
          <rect x="5.5" y="6.5" width="190" height="90" fill="#20DFDF" fillOpacity="0.1" />
        </svg>
      </Animated>
    </Animator>

    <AR.P>With the following SVG source code:</AR.P>

    <AR.CodeBlock
      lang="html"
      code={`<svg
  width="201"
  height="102"
  viewBox="0 0 201 102"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
  <path d="M 200.5 101 H 0.5 V 81" stroke="#20DFDF" />
  <rect x="5.5" y="6.5" width="190" height="90" fill="#20DFDF" fill-opacity="0.1" />
</svg>`}
    />

    <AR.P>The following frame definition can be created:</AR.P>

    <AR.CodeBlock
      code={`import { type FrameSVGSettings } from '@arwes/react'

const frameSettings: FrameSVGSettings = {
  elements: [
    {
      name: 'line',
      style: { fill: 'none', stroke: '#20DFDF' },
      path: [
        ['M', 0.5, 1],
        ['H', '100% - 0.5'],
        ['v', 21]
      ]
    },
    {
      name: 'line',
      style: { fill: 'none', stroke: '#20DFDF' },
      path: [
        ['M', '100% - 0.5', '100% - 0.5'],
        ['H', '0.5'],
        ['v', -21]
      ]
    },
    {
      name: 'bg',
      style: { fill: 'hsl(180deg 75% 50% / 10%)', stroke: 'none' },
      path: [
        ['M', 6, 6],
        ['H', '100% - 6'],
        ['V', '100% - 6'],
        ['H', 6]
      ]
    }
  ]
}`}
    />

    <AR.P>Which can be used to render the frame along with other HTML/SVG elements like:</AR.P>

    <AR.CodeBlock
      highlightLines={[4]}
      code={`import { FrameSVG } from '@arwes/react'

<div style={{ position: 'relative', width: 300, height: 300 }}>
  <FrameSVG {...frameSettings} />
  <div style={{ position: 'relative' }}>
    Futuristic Sci-Fi UI Web Framework
  </div>
<div>`}
    />

    <AR.P>Which would responsively render like this:</AR.P>

    <ExampleFrameCustom />

    <AR.P>
      Check out the{' '}
      <a href="/play">
        <IconPlay /> Playground
      </a>{' '}
      for more examples.
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/react/text"
      prev="Text"
      nextHref="/docs/develop/react/bgs"
      next="Backgrounds"
    />
  </>
)
