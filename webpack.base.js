module.exports = {
  resolve: {
    modules: [
      './',
      'node_modules'
    ],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            'es2015',
            'stage-1'
          ]
        }
      },
      test: /.js$/,
      exclude: /(node_modules)/,
    }]
  }
};
