const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelConfig = require('./babel.config');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'playground.js',
    publicPath: '/'
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
      repository: path.join(process.cwd(), '..'),
      playground: process.cwd()
    }
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
    historyApiFallback: true,
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    open: true
  }
};
