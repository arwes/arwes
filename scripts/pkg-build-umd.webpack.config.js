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
      // External.
      react$: path.join(MOCKS, 'react.js'),
      '@emotion/react$': path.join(MOCKS, 'emotion/react.js'),
      motion$: path.join(MOCKS, 'motion.js'),

      // Arwes Core.
      '@arwes/tools$': path.join(MOCKS, 'arwes/tools.js'),
      '@arwes/theme$': path.join(MOCKS, 'arwes/theme.js'),
      '@arwes/animator$': path.join(MOCKS, 'arwes/animator.js'),
      '@arwes/animated$': path.join(MOCKS, 'arwes/animated.js'),
      '@arwes/bleeps$': path.join(MOCKS, 'arwes/bleeps.js'),
      '@arwes/bgs$': path.join(MOCKS, 'arwes/bgs.js'),

      // Arwes React.
      '@arwes/react$': path.join(MOCKS, 'arwes/react.js'),
      '@arwes/react-tools$': path.join(MOCKS, 'arwes/react-tools.js'),
      '@arwes/react-theme$': path.join(MOCKS, 'arwes/react-theme.js'),
      '@arwes/react-styles$': path.join(MOCKS, 'arwes/react-styles.js'),
      '@arwes/react-animator$': path.join(MOCKS, 'arwes/react-animator.js'),
      '@arwes/react-animated$': path.join(MOCKS, 'arwes/react-animated.js'),
      '@arwes/react-bleeps$': path.join(MOCKS, 'arwes/react-bleeps.js'),
      '@arwes/react-core$': path.join(MOCKS, 'arwes/react-core.js'),
      '@arwes/react-bgs$': path.join(MOCKS, 'arwes/react-bgs.js')
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
