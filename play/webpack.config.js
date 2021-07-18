const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const babelConfig = require('./babel.config');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public/play'),
    filename: 'play.js',
    publicPath: '/play'
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
      '@repository': path.join(process.cwd(), '..'),
      '@play': process.cwd()
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/play',
      template: path.join(__dirname, 'src/index.html'),
      filename: path.join(__dirname, 'public/play/index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, 'public')
      }]
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'static'),
        to: path.join(__dirname, 'public')
      }]
    })
  ],
  devServer: {
    publicPath: '/play',
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: {
      rewrites: [
        { from: /^\/play/, to: '/play' }
      ]
    },
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: true,
    openPage: 'play'
  }
};
