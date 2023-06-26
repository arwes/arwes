const glob = require('glob');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: glob
    .sync('./packages/*')
    .map(path => `<rootDir>/${path}`)
    .map(path => path + '/src/**/*.test.ts?(x)'),
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/static/',
    '/build/',
    '/out/',
    '/public/',
    '/www/',
    '/.deprecated/',
    '/.cache/',
    '/.next/'
  ],
  setupFiles: [
    'jest-canvas-mock'
  ]
};
