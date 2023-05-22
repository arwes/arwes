const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
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
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withVanillaExtract(nextConfig);
