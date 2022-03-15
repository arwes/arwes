#!/bin/sh

PKG=$(basename "$PWD")
BUILD_SRC_FILE=./src/index.ts
BUILD_OUT_PATH=./build/umd/

npx rimraf $BUILD_OUT_PATH

# Development unminified build
npx cross-env \
  NODE_ENV=development \
  BUILD_SRC_FILE=$BUILD_SRC_FILE \
  BUILD_OUT_PATH=$BUILD_OUT_PATH \
  BUILD_OUT_FILE=$PKG.js \
  BUILD_OUT_NAME=$PKG \
  npx webpack --config=../../scripts/pkg-build-umd.webpack.config.js

# Production minified build
npx cross-env \
  NODE_ENV=production \
  BUILD_SRC_FILE=$BUILD_SRC_FILE \
  BUILD_OUT_PATH=$BUILD_OUT_PATH \
  BUILD_OUT_FILE=$PKG.min.js \
  BUILD_OUT_NAME=$PKG \
  npx webpack --config=../../scripts/pkg-build-umd.webpack.config.js
