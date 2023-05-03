import { type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { PageContentLayout, Button } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <Animator combine manager='stagger'>
      <PageContentLayout animated={aa('y', 12, 0)}>
        <Animator>
          <Text as='h1' fixed>Futuristic Sci-Fi UI Web Framework</Text>
        </Animator>
        <Animator>
          <Animated as='hr' animated={aa('scaleX', 0, 1)} />
        </Animator>
        <Animator>
          <Text>Arwes is a web framework to build user interfaces based on futuristic science fiction designs, animations, and sound effects. The concepts behind are opinionated with influences from <a href="https://aesthetics.fandom.com/wiki/Cyberprep" target='_blank'>Cyberprep</a> and <a href="https://en.wikipedia.org/wiki/Synthwave" target='_blank'>Synthwave</a>, and productions like <a href="http://robertsspaceindustries.com" target='_blank'>Star Citizen</a>, <a href="https://www.halowaypoint.com" target='_blank'>Halo</a>, and <a href="http://www.imdb.com/title/tt1104001" target='_blank'>TRON: Legacy</a>. It tries to inspire advanced science and technology.</Text>
        </Animator>
        <Animator>
          <Animated as='blockquote' animated={aaVisibility()}>
            <Text>
              The project is under development and not ready for production yet. It is still in <a href="https://stackoverflow.com/questions/40067469" target='_blank'>alpha release</a>, so the components are being tested and their API may change as it gets completed.
            </Text>
          </Animated>
        </Animator>
        <Animator>
          <Animated as='blockquote' animated={aaVisibility()}>
            <Text>
              <a href='https://github.com/arwes/arwes/tree/main' target='_blank'>Branch main</a> is for <code>@alpha</code> version releases and public content deployed at <a href='https://arwes.dev' target='_blank'>arwes.dev</a>.
              <br />
              <a href='https://github.com/arwes/arwes/tree/next' target='_blank'>Branch next</a> is for <code>@next</code> version releases and active development deployed at <a href='https://next.arwes.dev' target='_blank'>next.arwes.dev</a>.
            </Text>
          </Animated>
        </Animator>
        <Animator>
          <Text>
            The framework is delivered for the web platform as <a href='https://www.npmjs.com/'>NPM</a> packages in the <code>@arwes/[package]</code> scope for ES Modules, CommonJS, and UMD formats in JavaScript ES2018 version with strict <a href='https://www.typescriptlang.org/' target='_blank'>TypeScript</a> v4.8+ type definitions.
          </Text>
        </Animator>
        <Animator>
          <Text>
            The packages are categorized by "agnostic" and "implementation" packages. Arwes agnostic packages do not have UI libraries or frameworks dependencies, while the implementation packages depend on specific UI tools to simplify their use and add custom UI components. Currently, the framework offers <a href="https://react.dev">React.js</a> specific packages but it can be used with any other UI library.
          </Text>
        </Animator>
        <Animator>
          <Text>
            Latest version of Chrome, Firefox, and Safari, for Android, iOS and desktop are supported. Server-side rendering with Node.js v18+ is supported. Tools like <a href="https://nextjs.org">Next.js</a> and <a href='https://remix.run'>Remix</a> can be used with the framework.
          </Text>
        </Animator>

        <nav style={{ display: 'flex', justifyContent: 'right' }}>
          <Animator>
            <Link href='/docs/develop'>
              <Button frame='hexagon' animated={[aaVisibility(), aa('x', -12, 0)]} tabIndex={-1} title='Get started'>
                <span>Develop</span>
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
