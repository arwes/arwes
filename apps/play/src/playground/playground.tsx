/* eslint-disable import/no-webpack-loader-syntax */

import React, { HTMLProps, ReactElement } from 'react';
import { render } from 'react-dom';
import { mdiLabelOutline, mdiDiscord, mdiGithub, mdiTwitter } from '@mdi/js';
import Icon from '@mdi/react';
import type { NTPlaygroundSettings } from 'noxtron';
import { Playground } from 'noxtron/build/playground';

import LERNA_SETTINGS from '@repository/lerna.json';

const GA_TRACKING_ID = 'UA-50433259-2';

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

// Google Analytics.
if (process.env.NODE_ENV === 'production' && window.location.host.includes('arwes.dev')) {
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID;
  document.head.appendChild(gtagScript);
  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  function gtag (): void {
    win.dataLayer.push(arguments);
  }
  win.gtag = gtag;
  // @ts-expect-error
  gtag('js', new Date());
  // @ts-expect-error
  gtag('config', GA_TRACKING_ID);
}

const settings: NTPlaygroundSettings = {
  basePath: '/play/',
  playgroundPath: '/play/',
  sandboxPath: '/play/sandbox/',
  codeLanguage: 'typescript',
  typeDefinitions: [
    // react and react-dom
    {
      filename: 'file:///node_modules/csstype/index.d.ts',
      code: require('!raw-loader?esModule=false!csstype/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/prop-types/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/prop-types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/react/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react/global.d.ts',
      code: require('!raw-loader?esModule=false!@types/react/global.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/scheduler/tracing.d.ts',
      code: require('!raw-loader?esModule=false!@types/scheduler/tracing.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react-dom/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/react-dom/index.d.ts')
    },

    // @emotion/react
    {
      filename: 'file:///node_modules/@emotion/react/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/jsx-namespace.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/jsx-namespace.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/theming.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/theming.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/helper.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/helper.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/serialize/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/serialize/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/utils/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/utils/types/index.d.ts')
    },

    // motion
    {
      filename: 'file:///node_modules/motion/index.d.ts',
      code: getMdCode(require('!raw-loader?esModule=false!./types/motion.md'))
    },

    // empanada
    {
      filename: 'file:///node_modules/empanada/index.d.ts',
      code: getMdCode(require('!raw-loader?esModule=false!./types/empanada.md'))
    },

    // arwes
    {
      filename: 'file:///node_modules/@arwes/tools/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/tools/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/theme/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/theme/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/styles/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/styles/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/animator/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/animator/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/animated/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/animated/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/bleeps/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/bleeps/build/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@arwes/patterns/index.d.ts',
      code: require('!raw-loader?esModule=false!@arwes/patterns/build/types/index.d.ts')
    }
  ],
  sandboxes: [
    {
      name: '@arwes/theme',
      children: [
        {
          name: 'createThemeColor',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.basic.sandbox.md'))
            },
            {
              name: 'variations',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.variations.sandbox.md'))
            }
          ]
        },
        {
          name: 'createThemeStyle',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeStyle/createThemeStyle.basic.sandbox.md'))
            }
          ]
        },
        {
          name: 'createThemeBreakpoints',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.basic.sandbox.md'))
            },
            {
              name: 'series',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.series.sandbox.md'))
            },
            {
              name: 'labels',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.labels.sandbox.md'))
            }
          ]
        },
        {
          name: 'createCreateTheme',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createCreateTheme/createCreateTheme.basic.sandbox.md'))
            }
          ]
        },
        {
          name: 'createUseCreateThemeExtended',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createUseCreateThemeExtended/createUseCreateThemeExtended.basic.sandbox.md'))
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/styles',
      children: [
        {
          name: 'useStyles',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.basic.sandbox.md'))
            },
            {
              name: 'props',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.props.sandbox.md'))
            }
          ]
        },
        {
          name: 'useThemeStyles',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.basic.sandbox.md'))
            },
            {
              name: 'props',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.props.sandbox.md'))
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/animator',
      children: [
        {
          name: 'Animator',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.basic.sandbox.md'))
            },
            {
              name: 'nested',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.nested.sandbox.md'))
            },
            {
              name: 'combine',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.combine.sandbox.md'))
            },
            {
              name: 'root',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.root.sandbox.md'))
            },
            {
              name: 'stagger',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.stagger.sandbox.md'))
            },
            {
              name: 'disabled',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.disabled.sandbox.md'))
            },
            {
              name: 'dismissed',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dismissed.sandbox.md'))
            },
            {
              name: 'dynamicRendering',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dynamicRendering.sandbox.md'))
            }
          ]
        },
        {
          name: 'AnimatorGeneralProvider',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/AnimatorGeneralProvider/AnimatorGeneralProvider.basic.sandbox.md'))
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/animated',
      children: [
        {
          name: 'Animated',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.basic.sandbox.md'))
            },
            {
              name: 'functions',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.functions.sandbox.md'))
            },
            {
              name: 'composition',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.composition.sandbox.md'))
            },
            {
              name: 'disabled',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.disabled.sandbox.md'))
            }
          ]
        },
        {
          name: 'animations',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/animations/animations.basic.sandbox.md'))
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/bleeps',
      children: [
        {
          name: 'BleepsProvider',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.basic.sandbox.md'))
            },
            {
              name: 'loops',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.loops.sandbox.md'))
            },
            {
              name: 'categories',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.categories.sandbox.md'))
            },
            {
              name: 'dynamic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.dynamic.sandbox.md'))
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/patterns',
      children: [
        {
          name: 'Puffs',
          children: [
            {
              name: 'basic',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/patterns/src/Puffs/Puffs.basic.sandbox.md'))
            },
            {
              name: 'randomDirections',
              code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/patterns/src/Puffs/Puffs.randomDirections.sandbox.md'))
            }
          ]
        }
      ]
    }
  ],
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
    mobile: [
      [
        <Link href={`https://github.com/arwes/arwes/releases/tag/v${LERNA_SETTINGS.version}`} target='github'>
          <LinkIcon path={mdiLabelOutline} /> v{LERNA_SETTINGS.version}
        </Link>,
        <Link href='/' target='website'>
          <ArwesIcon /> Website
        </Link>,
        <Link href='/perf' target='perf'>
          <ArwesIcon /> Perf
        </Link>
      ]
    ],
    desktop: [
      [
        <Link href={`https://github.com/arwes/arwes/releases/tag/v${LERNA_SETTINGS.version}`} target='github'>
          <LinkIcon path={mdiLabelOutline} /> v{LERNA_SETTINGS.version}
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
  },
  onSandboxChange: () => {
    // Google Analytics page tracking.
    const win = window as any;
    const { pathname, search } = window.location;
    win.gtag?.('config', GA_TRACKING_ID, { page_path: `${pathname}${search}` });
  }
};

render(<Playground settings={settings} />, document.querySelector('#root'));
