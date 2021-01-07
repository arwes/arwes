module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          browsers: '> 0.25%, not dead',
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from'
  ]
};
