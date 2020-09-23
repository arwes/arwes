const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('../babel.config');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './playground/src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'playground.js'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: path.join(__dirname, 'public/index.html')
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'static')
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true
  }
};
