const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const tsConfigFilePath = path.join(__dirname, 'tsconfig.webpack.json');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public/play'),
    filename: 'play.js',
    publicPath: '/play'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfigFilePath,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.md$/i,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigFilePath
      })
    ],
    alias: {
      '@repository': path.join(process.cwd(), '..')
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
