#!/bin/sh

alias log="sh $(pwd)/scripts/log.sh"
alias rimraf="$(pwd)/node_modules/.bin/rimraf"
alias webpack="$(pwd)/node_modules/.bin/webpack"
alias cross-env="$(pwd)/node_modules/.bin/cross-env"

compile () {
  log "Compiling \"$1\"..."

  COMPILE_OUT_PATH=./packages/$1/dist/
  COMPILE_SRC=./packages/$1/src/index.ts

  log "Removing dist path..."
  rimraf $COMPILE_OUT_PATH

  log "Compiling development file..."
  cross-env NODE_ENV=development COMPILE_NAME=$1 COMPILE_SRC=$COMPILE_SRC COMPILE_OUT_PATH=$COMPILE_OUT_PATH COMPILE_OUT_FILENAME=$1.js COMPILE_OUT_NAME=$1 webpack --config=./scripts/compile-umd.webpack.config.js

  log "Compiling production file..."
  cross-env NODE_ENV=production COMPILE_NAME=$1 COMPILE_SRC=$COMPILE_SRC COMPILE_OUT_PATH=$COMPILE_OUT_PATH COMPILE_OUT_FILENAME=$1.min.js COMPILE_OUT_NAME=$1 webpack --config=./scripts/compile-umd.webpack.config.js
}

log "Compiling Arwes packages for UMD."

compile tools
compile design
compile animator
compile animated
compile bleeps
compile core
compile arwes

log "Compilation completed."
