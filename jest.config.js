const glob = require('glob');

const testMatch = glob
  .sync('./packages/*')
  .map(path => path.replace(/^\./, '<rootDir>'))
  .map(path => path + '/src/**/*.test.js');

module.exports = {
  transform: { '^.+\\.js$': '<rootDir>/jest.transform.config.js' },
  verbose: true,
  testURL: 'http://localhost/',
  testMatch
};
