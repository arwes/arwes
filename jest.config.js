const glob = require('glob');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: glob
    .sync('./packages/*')
    .map(path => path.replace(/^\./, '<rootDir>'))
    .map(path => path + '/src/**/*.test.ts?(x)'),
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/static/',
    '/build/',
    '/out/',
    '/public/',
    '/www/',
    '/__deprecated__/',
    '/.cache/',
    '/.next/'
  ],
  setupFiles: [
    'jest-canvas-mock'
  ]
};
