const path = require('path');

const { NODE_ENV } = process.env;
const CWD = process.cwd();
const MOCKS = path.join(__dirname, '../../../scripts/pkg-build-umd-mocks');

const mode = NODE_ENV || 'development';
const outFilename = mode === 'production' ? 'umd.min.js' : 'umd.js';

module.exports = {
  mode,
  entry: './src/index.ts',
  output: {
    path: path.join(CWD, './build/umd'),
    filename: outFilename,
    library: 'arwes',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
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
