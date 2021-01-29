const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {
  NODE_ENV,
  COMPILE_NAME,
  COMPILE_SRC,
  COMPILE_OUT_PATH,
  COMPILE_OUT_FILENAME,
  COMPILE_OUT_NAME
} = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: COMPILE_SRC,
  output: {
    path: path.join(process.cwd(), COMPILE_OUT_PATH),
    filename: COMPILE_OUT_FILENAME,
    library: ['arwes', COMPILE_OUT_NAME],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(process.cwd(), 'packages', COMPILE_NAME, 'tsconfig.build.json')
      })
    ]
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
        test: /\.tsx?$/
      }
    ]
  }
};
