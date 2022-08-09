const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const REPOSITORY_PATH = path.join(__dirname, '../../');
const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');
const BASE_PATH = '/play/'; // Must end with "/".

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  devtool: false,
  entry: {
    playground: path.join(SRC_PATH, 'playground/playground.jsx'),
    sandbox: path.join(SRC_PATH, 'sandbox/sandbox.jsx')
  },
  output: {
    path: path.join(BUILD_PATH, BASE_PATH),
    filename: '[name].js',
    publicPath: BASE_PATH,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
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
      '@repository': REPOSITORY_PATH
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'playground/playground.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'sandbox/sandbox.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'sandbox/index.html'),
      chunks: ['sandbox']
    }),
    isProduction && new CopyWebpackPlugin({
      patterns: [{
        from: path.join(REPOSITORY_PATH, 'static'),
        to: BUILD_PATH,
        info: { minimized: true }
      }]
    }),
    isProduction && new CopyWebpackPlugin({
      patterns: [{
        from: path.join(REPOSITORY_PATH, 'node_modules/noxtron/build/umd/'),
        to: path.join(BUILD_PATH, BASE_PATH, 'noxtron/'),
        info: { minimized: true }
      }]
    })
  ].filter(Boolean),
  devServer: {
    static: [{
      directory: path.join(REPOSITORY_PATH, 'static'),
      publicPath: '/',
      watch: true
    }, {
      directory: path.join(REPOSITORY_PATH, 'node_modules/noxtron/build/umd/'),
      publicPath: path.join(BASE_PATH, 'noxtron/'),
      watch: true
    }, {
      directory: BUILD_PATH,
      publicPath: BASE_PATH,
      watch: true
    }],
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: BASE_PATH
  }
};
