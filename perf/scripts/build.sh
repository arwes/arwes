#!/bin/sh

alias log="sh $(pwd)/../scripts/log.sh"
alias cross-env="$(pwd)/node_modules/.bin/cross-env"
alias rimraf="$(pwd)/node_modules/.bin/rimraf"
alias webpack="$(pwd)/node_modules/.bin/webpack"

if [ -z $1 ]
then
  log "Test \"$1\" is not valid. Provide a test name as first parameter."
  exit 1
fi

log "Building performance test \"$1\"..."

rimraf ./public/tests/$1
cross-env NODE_ENV=production TEST_NAME=$1 webpack --config ./perf.webpack.config.js

log "Test \"$1\" was built."
