const path = require('path');

module.exports = {
  mode: 'development',
  entry: './playground/playground.js',
  output: {
    path: path.resolve(__dirname, 'playground'),
    filename: 'playground-dist.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-export-extensions'
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'playground'),
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
