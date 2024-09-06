'use client'

import { Animated, Animator } from '@arwes/react'

import { AR } from '@/ui'
import { ExampleFrames } from './ExampleFrames'
import { ExampleFrame } from './ExampleFrame'

export default (): JSX.Element => (
  <>
    <AR.Header>Frames Fundamentals</AR.Header>

    <AR.P>
      Simple rectangles and ellipses might not be enough for creative designs. Frames can be created
      to customize how the content is structured and organized in more elegant ways.{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">
        SVG
      </a>{' '}
      can be used to create these frames by using vector graphics but it does not support responsive
      updates in [x, y] axes (such as percentages and{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank">
        CSS <code>calc()</code>
      </a>
      ) and creating certain effects such as{' '}
      <a href="https://css-tricks.com/svg-line-animation-works" target="_blank">
        line drawing
      </a>{' '}
      becomes difficult.
    </AR.P>

    <AR.P>
      ARWES Frames comes with a few built-in frames and it can be a solution to create custom
      responsive and dynamic SVG elements along with interactive animations and effects. It is not a
      general purpose canvas renderer but rather focus on structural panels, containers, or
      separators for content.
    </AR.P>

    <AR.P>
      For new frames, if they can be created with simple SVG, it is better than using ARWES Frames
      because of simplicity, compatibility, and performance. Make sure to read{' '}
      <a href="https://css-tricks.com/scale-svg" target="_blank">
        Scaling SVG
      </a>{' '}
      and check out the main features you can use to create graphs with SVG and CSS such as{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking"
        target="_blank"
      >
        clipping and masking
      </a>
      ,{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns" target="_blank">
        patterns
      </a>
      , or{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Filter_effects"
        target="_blank"
      >
        filters
      </a>
      . Also, check out some alternatives such as{' '}
      <a href="https://github.com/propjockey/augmented-ui" target="_blank">
        Augmented UI
      </a>{' '}
      to create frames using{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" target="_blank">
        CSS <code>clip-path</code>
      </a>
      . Otherwise, ARWES Frames can be the solution.
    </AR.P>

    <AR.H2>Out-of-the-box Frames</AR.H2>

    <AR.P>
      The framework provides a few out-of-the-box frame components which can be styled and animated.
    </AR.P>

    <ExampleFrames />

    <AR.P>
      They all create SVG elements dynamically with different names and CSS variables for easy
      customization.
    </AR.P>

    <AR.UL>
      <li>
        <code>[data-name="line"]</code> for SVG <code>path</code> elements as lines or polylines.
        <ul>
          <li>
            <code>--arwes-frames-line-color</code> for stroke color.
          </li>
          <li>
            <code>--arwes-frames-line-filter</code> for filter effect.
          </li>
        </ul>
      </li>
      <li>
        <code>[data-name="bg"]</code> for background shapes.
        <ul>
          <li>
            <code>--arwes-frames-bg-color</code> for fill color.
          </li>
          <li>
            <code>--arwes-frames-bg-filter</code> for filter effect.
          </li>
        </ul>
      </li>
      <li>
        <code>[data-name="deco"]</code> for decorative elements.
        <ul>
          <li>
            <code>--arwes-frames-deco-color</code> for fill or stroke color.
          </li>
          <li>
            <code>--arwes-frames-deco-filter</code> for filter effect.
          </li>
        </ul>
      </li>
    </AR.UL>

    <AR.H2>Designing Frames</AR.H2>

    <AR.P>
      It is possible to generate any SVG using JavaScript, but since the SVG elements will be
      dynamically created in runtime, the simpler the shapes the better for both performance and
      maintenance.
    </AR.P>

    <AR.P>There are many native and web applications to design SVG such as:</AR.P>

    <AR.Links
      links={[
        {
          text: 'Inkscape',
          href: 'https://inkscape.org',
          target: '_blank'
        },
        {
          text: 'Figma',
          href: 'https://www.figma.com',
          target: '_blank'
        }
      ]}
    />

    <AR.H2>Developing Frames</AR.H2>

    <AR.P>
      Once the SVG to be used as a frame is designed, it can be developed into a responsive and
      dynamic custom SVG. Unfortunately, there is no visual way to implement them, it has to be a
      manual process, it is limited in the type of SVG elements to create, and a decent amount of
      knowledge and experience in SVG is required.
    </AR.P>

    <AR.P>
      There are great resources on Internet to learn about SVG in depth if needed such as:
    </AR.P>

    <AR.Links
      links={[
        {
          text: 'Introducing SVG from scratch',
          href: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Introduction',
          target: '_blank'
        },
        {
          text: 'SVG Paths',
          href: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths',
          target: '_blank'
        }
      ]}
    />

    <AR.P>For example, take this easy SVG to use as a frame:</AR.P>

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

    <AR.P>
      It consists in 3 SVG elements, two <code>path</code> elements for both the lines, and a{' '}
      <code>rect</code> for the background.
    </AR.P>

    <AR.P>
      The first <code>path</code> element is the top line. It consists in 3 points, left-top corner{' '}
      <code>M 0.5 1</code>, right-top corner <code>H 200.5</code>, then it goes downward for a
      certain length <code>V 21</code>.
    </AR.P>

    <AR.CodeBlock lang="html" code='<path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />' />

    <Animator>
      <Animated data-name="example">
        <svg
          width="201"
          height="22"
          viewBox="0 0 201 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
        </svg>
      </Animated>
    </Animator>

    <AR.P>
      The left-top corner point will always be static since no matter how it is resized it will be
      in the same place. But the right-top corner point depends on the size width of the SVG
      container. For this, it can be defined with a dynamic percentage calculation. Finally, the
      last point can be moved downwards a specific length statically.
    </AR.P>

    <AR.P>
      A frame definition would be a JavaScript object with all the elements to render. The first
      line could look like:
    </AR.P>

    <AR.CodeBlock
      code={`{
  path: [
    ['M', 0.5, 1], // x,y pixels
    ['H', '100% - 0.5'], // x = svg_width * 100% - 0.5 pixels
    ['v', 21] // Lowercase "v" which is relative to prev point.
  ]
}`}
    />

    <AR.P>
      All other properties such as <code>stroke</code>, <code>class</code>, or <code>style</code>{' '}
      attributes can be defined like:
    </AR.P>

    <AR.CodeBlock
      code={`{
  name: 'line', // [data-name] attribute
  className: 'my-frame-line', // class attribute
  style: { // CSS properties.
    stroke: '#20DFDF'
  },
  path: [
    ['M', 0.5, 1],
    ['H', '100% - 0.5'],
    ['v', 21]
  ]
}`}
    />

    <AR.P>The final frame elements definition could be like:</AR.P>

    <AR.CodeBlock
      code={`[
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
]`}
    />

    <AR.P>The final frame can be now resized as desired with any other HTML/SVG element:</AR.P>

    <ExampleFrame />

    <AR.P>
      Basic mathematical calculations are supported within the frame elements definition and the
      percentages in [x, y] axes are automatically calculated where it applies.
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/text"
      prev="Text"
      nextHref="/docs/develop/fundamentals/bgs"
      next="Backgrounds"
    />
  </>
)
