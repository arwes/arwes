const path = require('path');

const {
  NODE_ENV,
  BUILD_SRC_FILE,
  BUILD_OUT_PATH,
  BUILD_OUT_FILE,
  BUILD_OUT_NAME
} = process.env;
const CWD = process.cwd();
const MOCKS = path.join(__dirname, 'pkg-build-umd-mocks');

module.exports = {
  mode: NODE_ENV || 'development',
  entry: BUILD_SRC_FILE,
  output: {
    path: path.join(CWD, BUILD_OUT_PATH),
    filename: BUILD_OUT_FILE,
    library: ['arwes', BUILD_OUT_NAME],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@arwes/tools$': path.join(MOCKS, 'arwes/tools.js'),
      '@arwes/theme$': path.join(MOCKS, 'arwes/theme.js'),
      '@arwes/styles$': path.join(MOCKS, 'arwes/styles.js'),
      '@arwes/animator$': path.join(MOCKS, 'arwes/animator.js'),
      '@arwes/animated$': path.join(MOCKS, 'arwes/animated.js'),
      '@arwes/bleeps$': path.join(MOCKS, 'arwes/bleeps.js'),
      '@arwes/core$': path.join(MOCKS, 'arwes/core.js'),
      '@arwes/arwes$': path.join(MOCKS, 'arwes/arwes.js'),
      react$: path.join(MOCKS, 'react.js'),
      '@emotion/react$': path.join(MOCKS, 'emotion/react.js'),
      motion$: path.join(MOCKS, 'motion.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.umd.json'
          }
        }
      }
    ]
  },
  devtool: false
};
