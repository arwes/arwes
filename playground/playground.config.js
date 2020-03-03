const babelConfig = require('../babel.config');

module.exports = {
  mode: 'development',
  entry: './playground/playground.js',
  output: {
    path: __dirname,
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
    contentBase: __dirname,
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true
  }
};
