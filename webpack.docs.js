const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      dev ? 'development' : 'production'
    )
  })
];

if (!dev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

module.exports = Object.assign({}, webpackBase, {
  entry: {
    app1: './docs/app1/index.js',
    app2: './docs/app2/index.js',
    app3: './docs/app3/index.js',
  },
  output: {
    path: './docs/js/',
    filename: '[name].js'
  },
  devtool: dev ? 'inline-source-map' : undefined,
  plugins
});
