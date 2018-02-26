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
  'Content',
  'Words',
  'Code',
  'Table',
  'Image',
  'Line',
  'Logo'
];

module.exports.componentsStatics = [
  'Heading',
  'Paragraph',
  'Link',
  'Blockquote',
  'List'
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
  ...module.exports.componentsStatics,
  ...module.exports.componentsControls,
  ...module.exports.componentsAnimations
];

const baseTitle = 'Arwes - Sci-Fi UI Framework';
const componentsTitles = {};
module.exports.components.forEach(name => {
  componentsTitles[`/api/${name.toLowerCase()}`] = `${name} | API | ${baseTitle}`;
});
module.exports.titles = Object.assign(
  {
    '/docs/design-system': `Design System | ${baseTitle}`,
    '/docs/animations-system': `Animations System | ${baseTitle}`,
    '/docs/sounds-system': `Sounds System | ${baseTitle}`,
    '/docs/grid-system': `Grid System | ${baseTitle}`,
    '/docs/responsive-tool': `Responsive Tool | ${baseTitle}`,
    '/docs/loader-tool': `Loader Tool | ${baseTitle}`,
    '/docs/player-tool': `Player Tool | ${baseTitle}`,
    '/docs': `Docs | ${baseTitle}`,
  },
  componentsTitles,
  {
    '/api': `API | ${baseTitle}`,
    '/play': `Play | ${baseTitle}`,
    '/': baseTitle,
  }
);

module.exports.googleAnalytics = 'UA-50433259-2';

module.exports.default = {};
