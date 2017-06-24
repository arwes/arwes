const pkg = require('./package');
const webpackBase = require('./webpack.base.js');

module.exports = {

  // Docs site title.
  title: pkg.name,

  // HTML template.
  template: './docs/styleguide/template.html',

  // All JS files inside `src/components`.
  components: './src/components/**/index.js',

  // Folder to publish the docs.
  styleguideDir: './docs/styleguide/',

  // Show the code snippets by default.
  showCode: false,

  theme: {
    color: {
      base: '#26dafd',
      light: '#13a1bd',
      lightest: '#0a6678',
      link: '#acf9fb',
      linkHover: '#d6f7f7',
      border: '#95eeff',
      name: '#7f9a44',
      type: '#b77daa',
      error: '#fff',
      baseBackground: '#021114',
      errorBackground: '#c00',
      codeBackground: '#082228',
      sidebarBackground: '#082228',
    },
    fontFamily: {
      base: '"Titillium Web", sans-serif'
    },
  },

  styles: {
    Logo: {
      logo: {
        fontSize: '2rem',
        textTransform: 'capitalize',
      }
    },
    ComponentsList: {
      item: {
        paddingLeft: '5px',
      },
    },
  },

  // code editor theme
  highlightTheme: 'night',

  // Webpack configuration, which extends the library's with our own.
  webpackConfig: webpackBase,
};
