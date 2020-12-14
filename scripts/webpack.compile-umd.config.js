const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {
  NODE_ENV,
  COMPILE_SRC,
  COMPILE_OUT_PATH,
  COMPILE_OUT_FILENAME,
  COMPILE_OUT_SCOPE,
  COMPILE_OUT_NAME
} = process.env;

// When importing the UMD version of the package "@arwes/arwes", it also imports
// all the other packages. It will be exposed as "[global].arwes".
// Other packages will exposed as "[global].arwes.[packageName]".
const libraryName = COMPILE_OUT_SCOPE !== 'none'
  ? [COMPILE_OUT_SCOPE, COMPILE_OUT_NAME]
  : COMPILE_OUT_NAME;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: COMPILE_SRC,
  output: {
    path: path.join(process.cwd(), COMPILE_OUT_PATH),
    filename: COMPILE_OUT_FILENAME,
    library: libraryName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(process.cwd(), 'tsconfig.json')
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
