const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'development', TEST_NAMES } = process.env;
const REPOSITORY_PATH = path.join(__dirname, '..');
const tsConfigFilePath = path.join(__dirname, 'tsconfig.webpack.json');

if (!TEST_NAMES) {
  throw new Error('No valid TEST_NAMES was provided.');
}

const testNames = TEST_NAMES.split(',');

const entries = testNames.reduce((all, testName) => ({
  ...all,
  [testName]: `./src/tests/${testName}/index.tsx`
}), {});

const output = {
  path: path.join(__dirname, 'public'),
  filename: pathData => {
    const { name: testName } = pathData.chunk;
    return `tests/${testName}/index.js`;
  }
};

const templates = testNames.map(testName => {
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
  entry: entries,
  output,
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
    ...templates,
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
