// TODO:
const VERSION = '1.0.0-alpha.0';

window.getNoxtronConfig = () => ({
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox/',
  title: {
    mobile: 'Arwes',
    desktop: 'Arwes Playground'
  },
  theme: {
    typography: {
      heading: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '600'
      },
      body: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: '400'
      },
      code: {
        fontFamily: '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
        fontWeight: '400'
      }
    }
  },
  links: {
    mobile: [],
    desktop: [
      [
        { as: 'a', href: `https://github.com/arwes/arwes/releases/tag/v${VERSION}`, target: 'github', children: VERSION },
        { as: 'a', href: '/', target: 'website', children: 'Website' },
        { as: 'a', href: '/perf', target: 'perf', children: 'Perf' },
        { as: 'a', href: '/project/versions', target: 'versions', children: 'Versions' }
      ],
      [
        { as: 'a', href: 'https://discord.gg/s5sbTkw', target: 'discord', children: 'Discord' },
        { as: 'a', href: 'https://twitter.com/arwesjs', target: 'twitter', children: 'Twitter' },
        { as: 'a', href: 'https://github.com/arwes/arwes', target: 'github', children: 'GitHub' }
      ]
    ]
  }
});
