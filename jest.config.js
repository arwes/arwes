const glob = require('glob');

const testMatch = glob
  .sync('./packages/*')
  .map(path => path.replace(/^\./, '<rootDir>'))
  .map(path => path + '/src/**/*.test.ts?(x)');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  testURL: 'http://localhost/',
  testMatch
};
