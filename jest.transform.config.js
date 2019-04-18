/* eslint-env node */

const babelJest = require('babel-jest');
const babelConfig = require('./babel.config');

module.exports = babelJest.createTransformer(babelConfig);
