const glob = require('glob');

const pkgs = glob.sync('./packages/*').map(p => p.replace(/^\./, '<rootDir>'));

module.exports = {
  verbose: true,
  roots: pkgs,
  testPathIgnorePatterns: ['/lib/', '/node_modules/']
};
