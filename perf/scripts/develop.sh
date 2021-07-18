#!/bin/sh

alias log="sh $(pwd)/../scripts/log.sh"
alias cross-env="$(pwd)/node_modules/.bin/cross-env"
alias webpack="$(pwd)/node_modules/.bin/webpack"

if [ -z $1 ]
then
  log "No valid test names. Provide test names separated by comma as first parameter."
  exit 1
fi

log "Building and watching performance tests \"$1\"..."

cross-env TEST_NAMES=$1 webpack serve --config ./webpack.config.js
