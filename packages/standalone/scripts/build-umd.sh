#!/bin/sh

npx rimraf ./build/umd/
npx cross-env NODE_ENV=development npx webpack --config=./scripts/build-umd.webpack.config.cjs
npx cross-env NODE_ENV=production npx webpack --config=./scripts/build-umd.webpack.config.cjs
