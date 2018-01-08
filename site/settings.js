module.exports.componentsProviders = [
  'ThemeProvider',
  'SoundsProvider'
];

module.exports.componentsContainers = [
  'Arwes',
  'Grid',
  'Frame',
  'Header',
  'Footer',
  'Project'
];

module.exports.componentsContents = [
  'Words',
  'Code',
  'Table',
  'Image',
  'Line',
  'Logo'
];

module.exports.componentsControls = [
  'Button',
  'Loading'
];

module.exports.componentsAnimations = [
  'Animation',
  'Appear',
  'Highlight',
  'Puffs'
];

module.exports.components = [
  ...module.exports.componentsProviders,
  ...module.exports.componentsContainers,
  ...module.exports.componentsContents,
  ...module.exports.componentsControls,
  ...module.exports.componentsAnimations
];

module.exports.titles = {
  '/docs/design-system': 'Design System | Arwes',
  '/docs/animations-system': 'Animations System | Arwes',
  '/docs/sounds-system': 'Sounds System | Arwes',
  '/docs/grid-system': 'Grid System | Arwes',
  '/docs/responsive-tool': 'Responsive Tool | Arwes',
  '/docs/loader-tool': 'Loader Tool | Arwes',
  '/docs/player-tool': 'Player Tool | Arwes',
  '/docs': 'Docs | Arwes',
  '/api': 'API | Arwes',
  '/play': 'Play | Arwes',
};

module.exports.googleAnalytics = 'UA-50433259-2';

module.exports.default = {};
