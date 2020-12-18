const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('../babel.config');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './playground/src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
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
      },
      {
        test: /\.md$/i,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      repository: process.cwd(),
      playground: path.join(process.cwd(), 'playground')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: path.join(__dirname, 'dist/index.html')
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'static')
    ],
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    open: true
  }
};
