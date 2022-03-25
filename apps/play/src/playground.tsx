import React, { HTMLProps, ReactElement } from 'react';
import { render } from 'react-dom';
import { mdiLabelOutline, mdiDiscord, mdiGithub, mdiTwitter } from '@mdi/js';
import Icon from '@mdi/react';
import type { NTUserConfig, NTSandbox } from 'noxtron/build/cjs/apps';
import { Playground } from 'noxtron/build/cjs/apps/playground';

import lernaSettings from '@repository/lerna.json';

const getMdCode = (md: string): string => md.replace(/```.*\r?\n/g, '');

const Link = (props: HTMLProps<HTMLAnchorElement>): ReactElement => (
  <a style={{ display: 'flex', alignItems: 'center' }} {...props} />
);
const LinkIcon = (props: { path: string }): ReactElement => (
  <Icon path={props.path} size='1em' style={{ marginRight: '5px' }} />
);
const ArwesIcon = (): ReactElement => (
  <img
    src='https://arwes.dev/logo.png'
    style={{ display: 'inline-block', marginRight: '5px', width: '1em', height: '1em' }}
  />
);

const sandboxes: NTSandbox[] = [
  {
    name: '@arwes/animator',
    children: [
      {
        name: 'Animator',
        children: [
          { name: 'basic', language: 'typescript', code: getMdCode(require('@repository/packages/animator/src/Animator/Animator.basic.sandbox.md').default) }
        ]
      }
    ]
  }
];

const config: NTUserConfig = {
  sandboxes,
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox/',
  title: {
    mobile: (
      <img
        style={{ display: 'block', margin: 0, height: '1.3em' }}
        src='https://arwes.dev/logo.png'
        alt='Arwes Playground'
      />
    ),
    desktop: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{ display: 'block', margin: '0 5px 0 0', height: '1.1em' }}
          src='https://arwes.dev/logo.png'
        />
        <img
          style={{ display: 'block', margin: 0, height: '0.9em' }}
          src='https://arwes.dev/logo-horizontal-text.png'
          alt='Arwes Playground'
        />
      </div>
    )
  },
  theme: {
    typographyCommons: {
      heading: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
      body: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '400',
        textTransform: 'uppercase'
      },
      code: {
        fontFamily: '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
        fontWeight: '400'
      }
    },
    colorHues: {
      primary: 180,
      secondary: 60
    }
  },
  links: {
    mobile: [],
    desktop: [
      [
        <Link href={`https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`} target='github'>
          <LinkIcon path={mdiLabelOutline} /> v{lernaSettings.version}
        </Link>,
        <Link href='/' target='website'>
          <ArwesIcon /> Website
        </Link>,
        <Link href='/perf' target='perf'>
          <ArwesIcon /> Perf
        </Link>,
        <Link href='/project/versions' target='versions'>
          <ArwesIcon /> Versions
        </Link>
      ],
      [
        <Link href='https://discord.gg/s5sbTkw' target='discord'>
          <LinkIcon path={mdiDiscord} /> Discord
        </Link>,
        <Link href='https://twitter.com/arwesjs' target='twitter'>
          <LinkIcon path={mdiTwitter} /> Twitter
        </Link>,
        <Link href='https://github.com/arwes/arwes' target='github'>
          <LinkIcon path={mdiGithub} /> GitHub
        </Link>
      ]
    ]
  }
};

render(<Playground config={config} />, document.querySelector('#root'));
