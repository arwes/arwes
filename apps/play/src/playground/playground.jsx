/** @jsx jsx */
/* eslint-disable import/no-webpack-loader-syntax */

import LERNA_SETTINGS from '@repository/lerna.json';

const GA_TRACKING_ID = 'UA-50433259-2';

// TODO: Use the same icons for the docs website and the playground.
const ICONS = {
  mdiLabelOutline: 'M16,17H5V7H16L19.55,12M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z',
  mdiDiscord: 'M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z',
  mdiGithub: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  mdiTwitter: 'M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z'
};

window.noxtron.setupPlayground(({ emotion, Icon }) => {
  const { jsx } = emotion;

  const isLocationNext = ['next.arwes.dev', '127.0.0.1', 'localhost']
    .find(host => window.location.host.includes(host));

  const Link = props => (
    <a css={{ display: 'flex', alignItems: 'center' }} {...props} />
  );

  const LinkIcon = props => (
    <Icon css={{ marginRight: '5px' }} path={props.path} size='1em' />
  );

  const ArwesIcon = () => (
    <img
      css={{ display: 'inline-block', marginRight: '5px', width: '1em', height: '1em' }}
      src='/logo.png'
    />
  );

  const versionLink = (
    <Link
      href={
        isLocationNext
          ? 'https://github.com/arwes/arwes/tree/next'
          : `https://github.com/arwes/arwes/releases/tag/v${LERNA_SETTINGS.version}`
      }
      target='github'
    >
      <LinkIcon path={ICONS.mdiLabelOutline} /> {isLocationNext ? 'Version Next' : `v${LERNA_SETTINGS.version}`}
    </Link>
  );

  return {
    element: document.querySelector('#root'),
    basePath: '/play/',
    assetsPath: '/play/noxtron/',
    playgroundPath: '/play/',
    sandboxPath: '/play/sandbox/',
    codeLanguage: 'typescript',
    title: {
      small: (
        <img
          style={{ display: 'block', margin: 0, height: '0.9em' }}
          src='/logotype.png'
          alt='Arwes Playground'
        />
      ),
      medium: (
        <img
          style={{ display: 'block', margin: 0, height: '0.9em' }}
          src='/logotype.png'
          alt='Arwes Playground'
        />
      )
    },
    theme: {
      typographyCommons: {
        heading: {
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400',
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
      },
      colorSchemeDisabled: true
    },
    links: {
      small: [
        [
          versionLink,
          <Link href='/'>
            <ArwesIcon /> Docs
          </Link>,
          <Link href='/perf'>
            <ArwesIcon /> Perf
          </Link>
        ]
      ],
      medium: [
        [
          versionLink,
          <Link href='/'>
            <ArwesIcon /> Docs
          </Link>,
          <Link href='/perf'>
            <ArwesIcon /> Perf
          </Link>
        ],
        [
          <Link href='https://discord.gg/s5sbTkw' target='discord'>
            <LinkIcon path={ICONS.mdiDiscord} /> Discord
          </Link>,
          <Link href='https://twitter.com/arwesjs' target='twitter'>
            <LinkIcon path={ICONS.mdiTwitter} /> Twitter
          </Link>,
          <Link href='https://github.com/arwes/arwes' target='github'>
            <LinkIcon path={ICONS.mdiGithub} /> GitHub
          </Link>
        ]
      ]
    },
    getTypeDefinitions: () => import('./typeDefinitions.js').then(m => m.typeDefinitions),
    getSandboxes: () => import('./sandboxes.js').then(m => m.sandboxes),
    onSandboxChange: () => {
      // Google Analytics page tracking.
      const { pathname, search } = window.location;
      window.gtag?.('config', GA_TRACKING_ID, { page_path: `${pathname}${search}` });
    }
  };
});

// Google Analytics.
if (process.env.NODE_ENV === 'production' && window.location.host.includes('arwes.dev')) {
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID;
  document.head.appendChild(gtagScript);
  const win = window;
  win.dataLayer = win.dataLayer || [];
  function gtag () {
    win.dataLayer.push(arguments);
  }
  win.gtag = gtag;
  // @ts-expect-error
  gtag('js', new Date());
  // @ts-expect-error
  gtag('config', GA_TRACKING_ID);
}
