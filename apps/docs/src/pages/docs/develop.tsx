import { type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight, FastArrowRight, OpenInBrowser } from 'iconoir-react';
import { Animator, Animated, Text, BleepsOnAnimator, aa, aaVisibility } from '@arwes/react';
import type { BleepNames } from '@app/types';
import { PageContentLayout, Button, CodeBlock } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <Animator combine manager='stagger'>
      <PageContentLayout animated={aa('y', 12, 0)}>
        <Animator>
          <Text as='h1' fixed>Develop</Text>
          <BleepsOnAnimator<BleepNames> transitions={{ entering: 'content' }} continuous />
        </Animator>
        <Animator>
          <Animated as='hr' animated={aa('scaleX', 0, 1)} />
        </Animator>
        <Animator>
          <Text>
            Arwes packages are categorized by "vanilla" and "implementation" packages. Arwes vanilla packages do not have UI libraries or frameworks dependencies, while the implementation packages depend on specific UI tools to simplify their use and add custom UI components.
          </Text>
        </Animator>
        <Animator>
          <Text>
            Their purpose can be for visual, motion, or audio design, or UI components implementations. The <a href='/play'>Playground</a> can be used to experiment with various use cases in real-time in browser to get a sense of what is possible to do.
          </Text>
        </Animator>

        {/* VANILLA */}

        <Animator>
          <Text as='h2' fixed id='vanilla'>
            <FastArrowRight style={{ verticalAlign: 'middle' }} />
            <span> Vanilla</span>
          </Text>
        </Animator>
        <Animator>
          <Text>
            Vanilla packages can be used with any other UI library but many tools are low level APIs and require more elaborated configurations. Implementation packages mostly provide "sugar-APIs" to facilitate their use.
          </Text>
        </Animator>
        <Animator>
          <Text>
            Available vanilla packages:
          </Text>
        </Animator>

        <Animator>
          <Animated
            style={{
              marginBottom: '1.5rem',
              minWidth: 0,
              minHeight: 0,
              maxWidth: '100%',
              overflowX: 'auto'
            }}
            animated={aaVisibility()}
          >
            <table style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Stats</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>@arwes/tools</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/tools?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/tools.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>General browser API tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/theme</code></td>
                  <td><small style={{ color: 'hsl(30 100% 50%)' }}>Development</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/theme?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/theme.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Color, units, and general purpose dynamic theming tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/animated</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/animated?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/animated.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>HTML element animation utilities</td>
                </tr>
                <tr>
                  <td><code>@arwes/animator</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/animator?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/animator.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Assemble and disassemble user interfaces using animation controls</td>
                </tr>
                <tr>
                  <td><code>@arwes/bleeps</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/bleeps?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/bleeps.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Define, manage, and control interactive short sound effects</td>
                </tr>
                <tr>
                  <td><code>@arwes/text</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/text?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/text.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Text rendering effect tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/frames</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/frames?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/frames.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td><code>@arwes/bgs</code></td>
                  <td><small style={{ color: 'hsl(30 100% 50%)' }}>Development</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/bgs?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/bgs.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td><code>arwes</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/arwes?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/arwes.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>All vanilla packages bundle</td>
                </tr>
              </tbody>
            </table>
          </Animated>
        </Animator>

        {/* REACT.JS */}

        <Animator>
          <Text as='h2' fixed id='react'>
            <FastArrowRight style={{ verticalAlign: 'middle' }} />
            <span> React</span>
          </Text>
        </Animator>
        <Animator>
          <Text>
            The framework offers <a href="https://react.dev">React.js</a> v18 specific packages with <a href="https://web.dev/rendering-on-the-web">SSR</a> support.
          </Text>
        </Animator>
        <Animator>
          <Text>
            Get started with <a href="https://nextjs.org/docs/getting-started/installation">Next.js</a> or any other React setup for a new or existing project.
          </Text>
        </Animator>
        <Animator>
          <Text as='blockquote' data-arwes-global-palette='error'>
            Arwes does not work with React strict mode.
          </Text>
        </Animator>
        <Animator>
          <Text>
            In the Next.js configuration file, disable React strict mode:
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`// next.config.js
module.exports = {
  reactStrictMode: false
};`}
          />
        </Animator>
        <Animator>
          <Text>
            And then install Arwes for React.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code='npm install @arwes/react'
          />
        </Animator>
        <Animator>
          <Text>
            The package re-exports all the vanilla packages and the React specific packages.
          </Text>
        </Animator>
        <Animator>
          <Text>
            If the app is going to use the Arwes animator system, some optional global animation settings can be setup at the root component. For example, to enable/disable animations or their durations.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`import { type ReactElement } from 'react';
import {
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider
} from '@arwes/react';

const animatorsSettings: AnimatorGeneralProviderSettings = {
  // Durations in seconds.
  duration: {
    enter: 0.2,
    exit: 0.2,
    stagger: 0.04
  }
};

const App = (): ReactElement => {
  return (
    <AnimatorGeneralProvider {...animatorsSettings}>
      {/* ... */}
    </AnimatorGeneralProvider>
  );
};`}
          />
        </Animator>
        <Animator>
          <Text>
            Now there can be also a root Animator component to manage the app children animations.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`import { useState } from 'react';
import { Animator } from '@arwes/react';

const App = (): ReactElement => {
  const [active] = useState(true);

  return (
    <Animator combine manager='stagger' active={active}>
      {/* ... */}
    </Animator>
  );
};`}
          />
        </Animator>
        <Animator>
          <Text>
            Sound effects can be setup globally so any children component can read and play them.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`import {
  type BleepsProviderSettings,
  BleepsProvider
} from '@arwes/react';

const bleepsSettings: BleepsProviderSettings = {
  // Shared global audio settings.
  master: {
    volume: 0.9
  },
  bleeps: {
    // A transition bleep sound to play when the user enters the app.
    intro: {
      sources: [
        { src: 'https://next.arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    // An interactive bleep sound to play when user clicks.
    click: {
      sources: [
        { src: 'https://next.arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    }
  }
};

const App = (): ReactElement => {
  return (
    <BleepsProvider {...bleepsSettings}>
      {/* ... */}
    </BleepsProvider>
  );
};`}
          />
        </Animator>
        <Animator>
          <Text>
            Some applications would use visual animated patterns effects for their backgrounds. Multiple UI effects can be used together for more styles.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`import { GridLines, Dots, MovingLines } from '@arwes/react';

const Background = (): ReactElement => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'hsla(100deg, 100%, 3%)'
      }}
    >
      <GridLines lineColor='hsla(100deg, 100%, 75%, 0.05)' />
      <Dots color='hsla(100deg, 100%, 75%, 0.05)' />
      <MovingLines lineColor='hsla(100deg, 100%, 75%, 0.07)' />
    </div>
  );
};

const App = (): ReactElement => {
  return (
    <>
      <Animator>
        <Background />
      <Animator>

      {/* ... */}
    </>
  );
};`}
          />
        </Animator>
        <Animator>
          <Text>
            To experiment with some Arwes building blocks, a card component can be created to display a title and a description. It would use a custom frame style (with colors defined by CSS) and transition animations for the text.
          </Text>
        </Animator>
        <Animator>
          <CodeBlock
            data-arwes-global-block
            animated={aaVisibility()}
            code={`import {
  useBleeps,
  BleepsOnAnimator,
  Animated,
  FrameSVGCorners,
  Text,
  aa,
  aaVisibility
} from '@arwes/react';

const Card = (): ReactElement => {
  const bleeps = useBleeps();

  return (
    <Animator merge combine manager='stagger'>
      {/* Play the intro bleep when card appears. */}
      <BleepsOnAnimator transitions={{ entering: 'intro' }} continuous />

      <Animated
        style={{
          position: 'relative',
          display: 'block',
          maxWidth: '300px',
          margin: '1rem auto',
          padding: '2rem',
          textAlign: 'center'
        }}
        // Effects for entering and exiting animation transitions.
        animated={[aaVisibility(), aa('y', '2rem', 0)]}
        // Play bleep when the card is clicked.
        onClick={() => bleeps.click?.play()}
      >
        <Animator>
          {/* Frame decoration and shape colors defined by CSS.
              (This way of overwriting is not recommended for production apps.) */}
          <style>{\`
            :where(.arwes-react-frames-framesvg [data-name="decoration"]) {
              color: hsla(100deg, 100%, 50%);
            }
            :where(.arwes-react-frames-framesvg [data-name="shape"]) {
              color: hsla(100deg, 100%, 75%, 0.05)
            }
          \`}</style>
          <FrameSVGCorners strokeWidth={2} />
        </Animator>

        <Animator>
          <Text as='h1'>
            Arwes Project
          </Text>
        </Animator>

        <Animator>
          <Text>
            Futuristic science fiction user interface web framework.
          </Text>
        </Animator>
      </Animated>
    </Animator>
  );
};

const App = (): ReactElement => {
  return (
    <>
      <Animator>
        <Card />
      <Animator>

      {/* ... */}
    </>
  );
};`}
          />
        </Animator>
        <Animator>
          <Text>
            With all these elements there is a simple web page with custom and flexible sci-fi effects. Open the playground sandbox to see it in real-time in-browser.
          </Text>
        </Animator>

        <Animator>
          <p>
            <a
              href='/play?code=aW1wb3J0IFJlYWN0LCB7IHR5cGUgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnOwppbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7CmltcG9ydCB7CiAgdHlwZSBBbmltYXRvckdlbmVyYWxQcm92aWRlclNldHRpbmdzLAogIEFuaW1hdG9yR2VuZXJhbFByb3ZpZGVyLAogIEFuaW1hdG9yLAogIEFuaW1hdGVkLAogIGFhVmlzaWJpbGl0eSwKICBhYSwKICB0eXBlIEJsZWVwc1Byb3ZpZGVyU2V0dGluZ3MsCiAgQmxlZXBzUHJvdmlkZXIsCiAgdXNlQmxlZXBzLAogIEJsZWVwc09uQW5pbWF0b3IsCiAgRnJhbWVTVkdDb3JuZXJzLAogIEdyaWRMaW5lcywKICBEb3RzLAogIE1vdmluZ0xpbmVzLAogIFRleHQKfSBmcm9tICdAYXJ3ZXMvcmVhY3QnOwoKY29uc3QgQmFja2dyb3VuZCA9ICgpOiBSZWFjdEVsZW1lbnQgPT4gewogIHJldHVybiAoCiAgICA8ZGl2CiAgICAgIHN0eWxlPXt7CiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsCiAgICAgICAgaW5zZXQ6IDAsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnaHNsYSgxMDBkZWcsIDEwMCUsIDMlKScKICAgICAgfX0KICAgID4KICAgICAgPEdyaWRMaW5lcyBsaW5lQ29sb3I9J2hzbGEoMTAwZGVnLCAxMDAlLCA3NSUsIDAuMDUpJyAvPgogICAgICA8RG90cyBjb2xvcj0naHNsYSgxMDBkZWcsIDEwMCUsIDc1JSwgMC4wNSknIC8%2BCiAgICAgIDxNb3ZpbmdMaW5lcyBsaW5lQ29sb3I9J2hzbGEoMTAwZGVnLCAxMDAlLCA3NSUsIDAuMDcpJyAvPgogICAgPC9kaXY%2BCiAgKTsKfTsKCmNvbnN0IENhcmQgPSAoKTogUmVhY3RFbGVtZW50ID0%2BIHsKICBjb25zdCBibGVlcHMgPSB1c2VCbGVlcHMoKTsKCiAgcmV0dXJuICgKICAgIDxBbmltYXRvciBtZXJnZSBjb21iaW5lIG1hbmFnZXI9J3N0YWdnZXInPgogICAgICB7LyogUGxheSB0aGUgaW50cm8gYmxlZXAgd2hlbiBjYXJkIGFwcGVhcnMuICovfQogICAgICA8QmxlZXBzT25BbmltYXRvciB0cmFuc2l0aW9ucz17eyBlbnRlcmluZzogJ2ludHJvJyB9fSBjb250aW51b3VzIC8%2BCgogICAgICA8QW5pbWF0ZWQKICAgICAgICBzdHlsZT17ewogICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsCiAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLAogICAgICAgICAgbWF4V2lkdGg6ICczMDBweCcsCiAgICAgICAgICBtYXJnaW46ICcxcmVtIGF1dG8nLAogICAgICAgICAgcGFkZGluZzogJzJyZW0nLAogICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJwogICAgICAgIH19CiAgICAgICAgLy8gRWZmZWN0cyBmb3IgZW50ZXJpbmcgYW5kIGV4aXRpbmcgYW5pbWF0aW9uIHRyYW5zaXRpb25zLgogICAgICAgIGFuaW1hdGVkPXtbYWFWaXNpYmlsaXR5KCksIGFhKCd5JywgJzJyZW0nLCAwKV19CiAgICAgICAgLy8gUGxheSBibGVlcCB3aGVuIHRoZSBjYXJkIGlzIGNsaWNrZWQuCiAgICAgICAgb25DbGljaz17KCkgPT4gYmxlZXBzLmNsaWNrPy5wbGF5KCl9CiAgICAgID4KICAgICAgICA8QW5pbWF0b3I%2BCiAgICAgICAgICB7LyogRnJhbWUgZGVjb3JhdGlvbiBhbmQgc2hhcGUgY29sb3JzIGRlZmluZWQgYnkgQ1NTLgogICAgICAgICAgICAgIChUaGlzIHdheSBvZiBvdmVyd3JpdGluZyBpcyBub3QgcmVjb21tZW5kZWQgZm9yIHByb2R1Y3Rpb24gYXBwcy4pICovfQogICAgICAgICAgPHN0eWxlPntgCiAgICAgICAgICAgIDp3aGVyZSguYXJ3ZXMtcmVhY3QtZnJhbWVzLWZyYW1lc3ZnIFtkYXRhLW5hbWU9ImRlY29yYXRpb24iXSkgewogICAgICAgICAgICAgIGNvbG9yOiBoc2xhKDEwMGRlZywgMTAwJSwgNTAlKTsKICAgICAgICAgICAgfQogICAgICAgICAgICA6d2hlcmUoLmFyd2VzLXJlYWN0LWZyYW1lcy1mcmFtZXN2ZyBbZGF0YS1uYW1lPSJzaGFwZSJdKSB7CiAgICAgICAgICAgICAgY29sb3I6IGhzbGEoMTAwZGVnLCAxMDAlLCA3NSUsIDAuMDUpCiAgICAgICAgICAgIH0KICAgICAgICAgIGB9PC9zdHlsZT4KICAgICAgICAgIDxGcmFtZVNWR0Nvcm5lcnMgc3Ryb2tlV2lkdGg9ezJ9IC8%2BCiAgICAgICAgPC9BbmltYXRvcj4KCiAgICAgICAgPEFuaW1hdG9yPgogICAgICAgICAgPFRleHQgYXM9J2gxJz4KICAgICAgICAgICAgQXJ3ZXMgUHJvamVjdAogICAgICAgICAgPC9UZXh0PgogICAgICAgIDwvQW5pbWF0b3I%2BCgogICAgICAgIDxBbmltYXRvcj4KICAgICAgICAgIDxUZXh0PgogICAgICAgICAgICBGdXR1cmlzdGljIHNjaWVuY2UgZmljdGlvbiB1c2VyIGludGVyZmFjZSB3ZWIgZnJhbWV3b3JrLgogICAgICAgICAgPC9UZXh0PgogICAgICAgIDwvQW5pbWF0b3I%2BCiAgICAgIDwvQW5pbWF0ZWQ%2BCiAgICA8L0FuaW1hdG9yPgogICk7Cn07Cgpjb25zdCBhbmltYXRvcnNTZXR0aW5nczogQW5pbWF0b3JHZW5lcmFsUHJvdmlkZXJTZXR0aW5ncyA9IHsKICBkdXJhdGlvbjogewogICAgZW50ZXI6IDAuMiwKICAgIGV4aXQ6IDAuMiwKICAgIHN0YWdnZXI6IDAuMDQKICB9Cn07Cgpjb25zdCBibGVlcHNTZXR0aW5nczogQmxlZXBzUHJvdmlkZXJTZXR0aW5ncyA9IHsKICBtYXN0ZXI6IHsKICAgIHZvbHVtZTogMC45CiAgfSwKICBibGVlcHM6IHsKICAgIGludHJvOiB7CiAgICAgIHNvdXJjZXM6IFt7IHNyYzogJ2h0dHBzOi8vbmV4dC5hcndlcy5kZXYvYXNzZXRzL3NvdW5kcy9pbnRyby5tcDMnLCB0eXBlOiAnYXVkaW8vbXBlZycgfV0KICAgIH0sCiAgICBjbGljazogewogICAgICBzb3VyY2VzOiBbeyBzcmM6ICdodHRwczovL25leHQuYXJ3ZXMuZGV2L2Fzc2V0cy9zb3VuZHMvY2xpY2subXAzJywgdHlwZTogJ2F1ZGlvL21wZWcnIH1dCiAgICB9CiAgfQp9OwoKY29uc3QgU2FuZGJveCA9ICgpOiBSZWFjdEVsZW1lbnQgPT4gewogIHJldHVybiAoCiAgICA8PgogICAgICB7LyogR2xvYmFsIHN0eWxlcy4gKi99CiAgICAgIDxzdHlsZT57YAogICAgICAgIGJvZHkgeyBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSxzYW5zLXNlcmlmOyB9CiAgICAgICAgaDEgeyBtYXJnaW46IDAgMCAxcmVtOyBjb2xvcjogaHNsKDEwMGRlZyAxMDAlIDYwJSk7IH0KICAgICAgICBwIHsgbWFyZ2luOiAwOyBjb2xvcjogaHNsKDEwMGRlZyA1MCUgNzUlKTsgfQogICAgICBgfTwvc3R5bGU%2BCgogICAgICA8QW5pbWF0b3JHZW5lcmFsUHJvdmlkZXIgey4uLmFuaW1hdG9yc1NldHRpbmdzfT4KICAgICAgICA8QmxlZXBzUHJvdmlkZXIgey4uLmJsZWVwc1NldHRpbmdzfT4KICAgICAgICAgIDxBbmltYXRvciBjb21iaW5lIG1hbmFnZXI9J3N0YWdnZXInPgogICAgICAgICAgICA8QW5pbWF0b3I%2BCiAgICAgICAgICAgICAgPEJhY2tncm91bmQgLz4KICAgICAgICAgICAgPC9BbmltYXRvcj4KICAgICAgICAgICAgPEFuaW1hdG9yPgogICAgICAgICAgICAgIDxDYXJkIC8%2BCiAgICAgICAgICAgIDwvQW5pbWF0b3I%2BCiAgICAgICAgICA8L0FuaW1hdG9yPgogICAgICAgIDwvQmxlZXBzUHJvdmlkZXI%2BCiAgICAgIDwvQW5pbWF0b3JHZW5lcmFsUHJvdmlkZXI%2BCiAgICA8Lz4KICApOwp9OwoKY3JlYXRlUm9vdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpIGFzIEhUTUxFbGVtZW50KS5yZW5kZXIoPFNhbmRib3ggLz4pOwo%3D&type=custom&sandbox=&explorer=false&editor=true&preview=true'
              target='_blank'
            >
              <Button
                size='small'
                frame='simple'
                tabIndex={-1}
              >
                <OpenInBrowser />
                <span>Open Sandbox</span>
              </Button>
            </a>
          </p>
        </Animator>

        <Animator>
          <Text>
            Available React packages:
          </Text>
        </Animator>

        <Animator>
          <Animated
            style={{
              marginBottom: '1.5rem',
              minWidth: 0,
              minHeight: 0,
              maxWidth: '100%',
              overflowX: 'auto'
            }}
            animated={aaVisibility()}
          >
            <table style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Stats</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>@arwes/react-tools</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-tools?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-tools.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>General React API tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-animator</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animator?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-animator.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Animator interface tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-animated</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animated?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-animated.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Animated UI elements using animator tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-bleeps</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bleeps?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-bleeps.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Interactive short sound effects manager</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-core</code></td>
                  <td><small style={{ color: 'hsl(0 100% 50%)' }}>Specification</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-core?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-core.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Core UI components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-text</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-text?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-text.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Text effect components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-frames</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-frames?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-frames.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-bgs</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bgs?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-bgs.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td><code>@arwes/react</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>All vanilla and React packages bundle</td>
                </tr>
              </tbody>
            </table>
          </Animated>
        </Animator>

        <nav style={{ marginTop: '3rem', display: 'grid', gridAutoFlow: 'column', columnGap: '1.5rem', justifyContent: 'right' }}>
          <Animator>
            <a href='/play'>
              <Button
                frame='hexagon'
                animated={[aaVisibility(), aa('x', -12, 0)]}
                onHoverAnimateIcons
                tabIndex={-1}
                title='Go to play'
              >
                <span>Play</span>
                <ArrowRight />
              </Button>
            </a>
          </Animator>
          <Animator>
            <Link href='/docs/design'>
              <Button
                frame='hexagon'
                animated={[aaVisibility(), aa('x', -12, 0)]}
                onHoverAnimateIcons
                tabIndex={-1}
                title='Go to design'
              >
                <span>Design</span>
                <ArrowRight />
              </Button>
            </Link>
          </Animator>
        </nav>

      </PageContentLayout>
    </Animator>
  );
};

export default Page;
