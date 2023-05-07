import { type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight, FastArrowRight, OpenInBrowser } from 'iconoir-react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { APP_PLAY_HOST_URL } from '@app/settings';
import { PageContentLayout, Button } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <Animator combine manager='stagger'>
      <PageContentLayout animated={aa('y', 12, 0)}>
        <Animator>
          <Text as='h1' fixed>Develop</Text>
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
                    <img src="https://img.shields.io/npm/v/@arwes/tools.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/tools?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/tools.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>General browser API tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/theme</code></td>
                  <td><small style={{ color: 'hsl(30 100% 50%)' }}>Development</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/theme.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/theme?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/theme.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Color, units, and general purpose dynamic theming tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/animated</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/animated.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/animated?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/animated.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>HTML element animation utilities</td>
                </tr>
                <tr>
                  <td><code>@arwes/animator</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/animator.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/animator?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/animator.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Assemble and disassemble user interfaces using animation controls</td>
                </tr>
                <tr>
                  <td><code>@arwes/bleeps</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/bleeps.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/bleeps?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/bleeps.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Define, manage, and control interactive short sound effects</td>
                </tr>
                <tr>
                  <td><code>@arwes/text</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/text.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/text?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/text.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Text rendering effect tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/frames</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/frames.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/frames?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/frames.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td><code>@arwes/bgs</code></td>
                  <td><small style={{ color: 'hsl(30 100% 50%)' }}>Development</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/bgs.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/bgs?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/bgs.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td><code>arwes</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/arwes.svg?style=flat-square" alt="Version" />
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
            Get started with <a href="https://nextjs.org/docs/getting-started/installation">Next.js</a> or any other React setup for a new or existing project and then install Arwes for React.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
npm install @arwes/react
          </Animated>
        </Animator>
        <Animator>
          <Text>
            The package re-exports all the vanilla packages and the React specific packages.
          </Text>
        </Animator>
        <Animator>
          <Text>
            If the app is going to use the Arwes animator system, some optional global animation settings can be setup as a root component. For example, to enable/disable animations or their durations.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
{`import { type ReactElement } from 'react';
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
      {/* children... */}
    </AnimatorGeneralProvider>
  );
};`}
          </Animated>
        </Animator>
        <Animator>
          <Text>
            Now there can be also a root Animator component to manage the app children animations.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
{`import { type ReactElement, useState } from 'react';
import { Animator } from '@arwes/react';

const App = (): ReactElement => {
  const [active] = useState(true);

  return (
    <Animator combine manager='stagger' active={active}>
      {/* children... */}
    </Animator>
  );
};`}
          </Animated>
        </Animator>
        <Animator>
          <Text>
            Sound effects can be setup globally so any children component can read and play them.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
{`import { type ReactElement } from 'react';
import {
  type BleepsManagerProps,
  BleepsProvider
} from '@arwes/react';

const bleepsSettings: BleepsManagerProps = {
  // Shared global audio settings.
  master: {
    volume: 0.9
  },
  bleeps: {
    // A transition bleep sound to play when an object appears on the screen.
    object: {
      sources: [
        { src: 'https://next.arwes.dev/assets/sounds/object.mp3', type: 'audio/mpeg' }
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
      {/* children... */}
    </BleepsProvider>
  );
};`}
          </Animated>
        </Animator>
        <Animator>
          <Text>
            Some applications would use visual animated patterns effects for their backgrounds. Multiple UI effects can be used together for more styles.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
{`import { GridLines, Dots, MovingLines } from '@arwes/react';

const Background = (): ReactElement => {
  // The component can have its own Animator but for better composability,
  // it should merge with its closest parent Animator.
  return (
    <Animator merge duration={{ interval: 10 }}>
      {/* Some backgrounds require custom durations. */}
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
    </Animator>
  );
};

const App = (): ReactElement => {
  return (
    <>
      {/* For composability, an animated component would require its own custom
          parent Animator. */}
      <Animator>
        <Background />
      <Animator>

      {/* more children... */}
    </>
  );
};`}
          </Animated>
        </Animator>
        <Animator>
          <Text>
            To experiment with some Arwes building blocks, there can be a card component to display a title and a description. It would use a custom frame style and transition animations for the text.
          </Text>
        </Animator>
        <Animator>
          <Animated as='pre' animated={aaVisibility()}>
{`import {
  useBleeps,
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
      <Animated
        style={{
          position: 'relative',
          display: 'inline-block',
          margin: '1rem',
          padding: '2rem',
          textAlign: 'center'
        }}
        // Effects for entering and exiting animation transitions.
        animated={[aaVisibility(), aa('y', 24, 0)]}
        // Play a bleep when the card is clicked.
        onClick={() => bleeps.click?.play()}
      >
        <Animator>
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
      {/* ... */}

      <Animator>
        <Card />
      <Animator>

      {/* more children... */}
    </>
  );
};`}
          </Animated>
        </Animator>
        <Animator>
          <Text>
            With all these elements there is a simple web page with custom and flexible sci-fi effects. Open the playground sandbox to see it in real-time in-browser.
          </Text>
        </Animator>

        <Animator>
          <p>
            <a
              href={`${APP_PLAY_HOST_URL}/play/?code=aW1wb3J0IFJlYWN0LCB7IHR5cGUgUmVhY3RFbGVtZW50LCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7CmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50JzsKaW1wb3J0IHsKICB0eXBlIEFuaW1hdG9yR2VuZXJhbFByb3ZpZGVyU2V0dGluZ3MsCiAgdXNlQW5pbWF0b3IsCiAgQW5pbWF0b3JHZW5lcmFsUHJvdmlkZXIsCiAgQW5pbWF0b3IsCiAgQW5pbWF0ZWQsCiAgdHlwZSBCbGVlcHNNYW5hZ2VyUHJvcHMsCiAgQmxlZXBzUHJvdmlkZXIsCiAgdXNlQmxlZXBzLAogIEZyYW1lU1ZHQ29ybmVycywKICBHcmlkTGluZXMsCiAgRG90cywKICBNb3ZpbmdMaW5lcywKICBUZXh0LAogIGFhVmlzaWJpbGl0eSwKICBhYQp9IGZyb20gJ0Bhcndlcy9yZWFjdCc7Cgpjb25zdCBCYWNrZ3JvdW5kID0gKCk6IFJlYWN0RWxlbWVudCA9PiB7CiAgcmV0dXJuICgKICAgIDxBbmltYXRvciBtZXJnZSBkdXJhdGlvbj17eyBpbnRlcnZhbDogMTAgfX0%2BCiAgICAgIDxkaXYKICAgICAgICBzdHlsZT17ewogICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsCiAgICAgICAgICBpbnNldDogMCwKICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2hzbGEoMTAwZGVnLCAxMDAlLCAzJSknCiAgICAgICAgfX0KICAgICAgPgogICAgICAgIDxHcmlkTGluZXMgbGluZUNvbG9yPSdoc2xhKDEwMGRlZywgMTAwJSwgNzUlLCAwLjA1KScgLz4KICAgICAgICA8RG90cyBjb2xvcj0naHNsYSgxMDBkZWcsIDEwMCUsIDc1JSwgMC4wNSknIC8%2BCiAgICAgICAgPE1vdmluZ0xpbmVzIGxpbmVDb2xvcj0naHNsYSgxMDBkZWcsIDEwMCUsIDc1JSwgMC4wNyknIC8%2BCiAgICAgIDwvZGl2PgogICAgPC9BbmltYXRvcj4KICApOwp9OwoKY29uc3QgQ2FyZCA9ICgpOiBSZWFjdEVsZW1lbnQgPT4gewogIGNvbnN0IGFuaW1hdG9yID0gdXNlQW5pbWF0b3IoKTsKICBjb25zdCBibGVlcHMgPSB1c2VCbGVlcHMoKTsKCiAgdXNlRWZmZWN0KCgpID0%2BIHsKICAgIGlmICghYW5pbWF0b3IpIHJldHVybjsKCiAgICBhbmltYXRvci5ub2RlLnN1YnNjcmliZShub2RlID0%2BIHsKICAgICAgaWYgKG5vZGUuc3RhdGUgPT09ICdlbnRlcmluZycpIHsKICAgICAgICBibGVlcHMub2JqZWN0Py5wbGF5KCk7CiAgICAgIH0KICAgIH0pOwogIH0sIFthbmltYXRvciwgYmxlZXBzXSk7CgogIHJldHVybiAoCiAgICA8QW5pbWF0b3IgbWVyZ2UgY29tYmluZSBtYW5hZ2VyPSdzdGFnZ2VyJz4KICAgICAgPEFuaW1hdGVkCiAgICAgICAgc3R5bGU9e3sKICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLAogICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsCiAgICAgICAgICBtYXJnaW46ICcxcmVtJywKICAgICAgICAgIHBhZGRpbmc6ICcycmVtJywKICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicKICAgICAgICB9fQogICAgICAgIGFuaW1hdGVkPXtbYWFWaXNpYmlsaXR5KCksIGFhKCd5JywgMjQsIDApXX0KICAgICAgICBvbkNsaWNrPXsoKSA9PiBibGVlcHMuY2xpY2s%2FLnBsYXkoKX0KICAgICAgPgogICAgICAgIDxBbmltYXRvcj4KICAgICAgICAgIDxGcmFtZVNWR0Nvcm5lcnMgc3Ryb2tlV2lkdGg9ezJ9IC8%2BCiAgICAgICAgPC9BbmltYXRvcj4KICAgICAgICA8QW5pbWF0b3I%2BCiAgICAgICAgICA8VGV4dCBhcz0naDEnPgogICAgICAgICAgICBBcndlcyBQcm9qZWN0CiAgICAgICAgICA8L1RleHQ%2BCiAgICAgICAgPC9BbmltYXRvcj4KICAgICAgICA8QW5pbWF0b3I%2BCiAgICAgICAgICA8VGV4dD4KICAgICAgICAgICAgRnV0dXJpc3RpYyBzY2llbmNlIGZpY3Rpb24gdXNlciBpbnRlcmZhY2Ugd2ViIGZyYW1ld29yay4KICAgICAgICAgIDwvVGV4dD4KICAgICAgICA8L0FuaW1hdG9yPgogICAgICA8L0FuaW1hdGVkPgogICAgPC9BbmltYXRvcj4KICApOwp9OwoKY29uc3QgYW5pbWF0b3JzU2V0dGluZ3M6IEFuaW1hdG9yR2VuZXJhbFByb3ZpZGVyU2V0dGluZ3MgPSB7CiAgZHVyYXRpb246IHsKICAgIGVudGVyOiAwLjIsCiAgICBleGl0OiAwLjIsCiAgICBzdGFnZ2VyOiAwLjA0CiAgfQp9OwoKY29uc3QgYmxlZXBzU2V0dGluZ3M6IEJsZWVwc01hbmFnZXJQcm9wcyA9IHsKICBtYXN0ZXI6IHsKICAgIHZvbHVtZTogMC45CiAgfSwKICBibGVlcHM6IHsKICAgIG9iamVjdDogewogICAgICBzb3VyY2VzOiBbeyBzcmM6ICdodHRwczovL25leHQuYXJ3ZXMuZGV2L2Fzc2V0cy9zb3VuZHMvb2JqZWN0Lm1wMycsIHR5cGU6ICdhdWRpby9tcGVnJyB9XQogICAgfSwKICAgIGNsaWNrOiB7CiAgICAgIHNvdXJjZXM6IFt7IHNyYzogJ2h0dHBzOi8vbmV4dC5hcndlcy5kZXYvYXNzZXRzL3NvdW5kcy9jbGljay5tcDMnLCB0eXBlOiAnYXVkaW8vbXBlZycgfV0KICAgIH0KICB9Cn07Cgpjb25zdCBTYW5kYm94ID0gKCk6IFJlYWN0RWxlbWVudCA9PiB7CiAgcmV0dXJuICgKICAgIDxBbmltYXRvckdlbmVyYWxQcm92aWRlciB7Li4uYW5pbWF0b3JzU2V0dGluZ3N9PgogICAgICA8QmxlZXBzUHJvdmlkZXIgey4uLmJsZWVwc1NldHRpbmdzfT4KICAgICAgICA8QW5pbWF0b3IgY29tYmluZSBtYW5hZ2VyPSdzdGFnZ2VyJz4KICAgICAgICAgIDxzdHlsZT57YAogICAgICAgICAgICAuYXJ3ZXMtcmVhY3QtZnJhbWVzLWZyYW1lc3ZnIHBhdGhbZGF0YS1uYW1lPSJkZWNvcmF0aW9uIl0gewogICAgICAgICAgICAgIGNvbG9yOiBoc2xhKDEwMGRlZywgMTAwJSwgNTAlKTsKICAgICAgICAgICAgfQogICAgICAgICAgICAuYXJ3ZXMtcmVhY3QtZnJhbWVzLWZyYW1lc3ZnIHBhdGhbZGF0YS1uYW1lPSJzaGFwZSJdIHsKICAgICAgICAgICAgICBjb2xvcjogaHNsYSgxMDBkZWcsIDEwMCUsIDc1JSwgMC4wNSkKICAgICAgICAgICAgfQogICAgICAgICAgYH08L3N0eWxlPgoKICAgICAgICAgIDxBbmltYXRvcj4KICAgICAgICAgICAgPEJhY2tncm91bmQgLz4KICAgICAgICAgIDwvQW5pbWF0b3I%2BCiAgICAgICAgICA8QW5pbWF0b3I%2BCiAgICAgICAgICAgIDxDYXJkIC8%2BCiAgICAgICAgICA8L0FuaW1hdG9yPgoKICAgICAgICAgIHsvKiBERUJVRyAqL30KICAgICAgICAgIDxzdHlsZT57YAogICAgICAgICAgICBib2R5IHsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sc2Fucy1zZXJpZjsgY29sb3I6IGN5YW47IH0KICAgICAgICAgICAgaDEgeyBtYXJnaW46IDAgMCAxcmVtOyBjb2xvcjogaHNsKDEwMGRlZyAxMDAlIDYwJSk7IH0KICAgICAgICAgICAgcCB7IG1hcmdpbjogMDsgY29sb3I6IGhzbCgxMDBkZWcgNTAlIDc1JSk7IH0KICAgICAgICAgIGB9PC9zdHlsZT4KICAgICAgICAgIHsvKiBERUJVRyAqL30KCiAgICAgICAgPC9BbmltYXRvcj4KICAgICAgPC9CbGVlcHNQcm92aWRlcj4KICAgIDwvQW5pbWF0b3JHZW5lcmFsUHJvdmlkZXI%2BCiAgKTsKfTsKCmNyZWF0ZVJvb3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKSBhcyBIVE1MRWxlbWVudCkucmVuZGVyKDxTYW5kYm94IC8%2BKTsK&type=custom&sandbox=&explorer=false&editor=false&preview=true`}
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
                    <img src="https://img.shields.io/npm/v/@arwes/react-tools.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-tools?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-tools.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>General React API tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-animator</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-animator.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animator?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-animator.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Animator interface tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-animated</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-animated.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animated?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-animated.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Animated UI elements using animator tools</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-bleeps</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-bleeps.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bleeps?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-bleeps.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Interactive short sound effects manager</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-core</code></td>
                  <td><small style={{ color: 'hsl(0 100% 50%)' }}>Specification</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-core.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-core?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-core.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Core UI components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-text</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-text.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-text?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-text.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Text effect components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-frames</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-frames.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-frames?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-frames.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td><code>@arwes/react-bgs</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react-bgs.svg?style=flat-square" alt="Version" />
                    <img src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bgs?style=flat-square" alt="npm bundle size (scoped)" />
                    <img src="https://img.shields.io/npm/dm/@arwes/react-bgs.svg?style=flat-square" alt="Downloads" />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td><code>@arwes/react</code></td>
                  <td><small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small></td>
                  <td>
                    <img src="https://img.shields.io/npm/v/@arwes/react.svg?style=flat-square" alt="Version" />
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
