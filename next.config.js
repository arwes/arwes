module.exports = {
  distDir: 'build',
  webpack: (config) => {
    config.watchOptions = Object.assign(
      {},
      config.watchOptions,
      { poll: true }
    );
    return config;
  }
};
