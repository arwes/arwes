const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [{
            from: path.join(__dirname, '../../static'),
            to: path.join(__dirname, 'public')
          }]
        })
      );
    }
    return config;
  }
};

module.exports = nextConfig;
