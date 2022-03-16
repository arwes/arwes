const path = require('path');

const {
  NODE_ENV,
  BUILD_SRC_FILE,
  BUILD_OUT_PATH,
  BUILD_OUT_FILE,
  BUILD_OUT_NAME
} = process.env;
const CWD = process.cwd();

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
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
