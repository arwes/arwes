const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const allPerfTestsList = require('./perfTestsList.json');

const { NODE_ENV = 'development', TEST_NAMES } = process.env;
const REPOSITORY_PATH = path.join(__dirname, '..');
const tsConfigFilePath = path.join(__dirname, 'tsconfig.webpack.json');

const testNames = TEST_NAMES
  ? TEST_NAMES.split(',')
  : allPerfTestsList;

const testsEntries = testNames.reduce((all, testName) => ({
  ...all,
  [testName]: `./src/tests/${testName}/index.tsx`
}), {});

const testsTemplates = testNames.map(testName => {
  return new HtmlWebpackPlugin({
    publicPath: '/',
    template: path.join(__dirname, 'src/tests', testName, 'index.html'),
    filename: `tests/${testName}/index.html`,
    chunks: [testName],
    showErrors: true
  });
});

module.exports = {
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? false : 'eval-source-map',
  entry: {
    ...testsEntries,
    index: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: pathData => {
      const { name: testName } = pathData.chunk;
      return `tests/${testName}/index.js`;
    }
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
      // Allow react profiler to work on production mode.
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',

      '@repository': REPOSITORY_PATH,
      '@perf': path.join(REPOSITORY_PATH, 'perf')
    }
  },
  plugins: [
    ...testsTemplates,
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      showErrors: true
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(REPOSITORY_PATH, 'static'),
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
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '127.0.0.1',
    port: 9100,
    open: true
  }
};
