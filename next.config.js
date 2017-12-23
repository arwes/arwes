module.exports = {
  distDir: 'build',
  webpack: (config) => {
    return Object.assign({}, config, {
      watchOptions: Object.assign({}, config.watchOptions, {
        poll: true
      }),
      externals: Object.assign({}, config.externals, {
        fs: 'fs',
      }),
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.md$/,
            loader: 'raw-loader',
          }
        ]),
      }),
    });
  }
};
