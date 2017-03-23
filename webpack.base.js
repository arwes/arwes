module.exports = {
  resolve: {
    fallback: process.cwd()
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.js$/,
      include: process.cwd(),
      exclude: /(node_modules)/,
      query: {
        presets: [
          'react',
          'es2015',
          'stage-1'
        ]
      }
    }]
  }
};
