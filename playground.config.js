const path = require('path');
const babelConfig = require('./babel.config');

module.exports = {
  mode: 'development',
  entry: './playground/playground.js',
  output: {
    path: path.resolve(__dirname, 'playground'),
    filename: 'playground-dist.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'playground'),
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
