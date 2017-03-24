const pkg = require('./package');
const webpackBase = require('./webpack.base.js');

module.exports = {

  // Docs site title.
  title: pkg.name,

  // HTML template.
  template: './demos/styleguide/template.html',

  // All JS files inside `src/components`.
  components: './js/components/**/index.js',

  // Folder to publish the docs.
  styleguideDir: './demos/styleguide',

  // Show the code snippets by default.
  showCode: true,

  // Webpack configuration, which extends the library's with our own.
  updateWebpackConfig (conf, env) {
    conf.resolve.fallback = webpackBase.resolve.fallback;
    conf.module.loaders = conf.module.loaders.concat(webpackBase.module.loaders);
    return conf;
  }
};
