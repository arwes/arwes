module.exports = {
  distDir: 'build',
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      poll: true
    };
    return config;
  }
};
