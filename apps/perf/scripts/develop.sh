#!/bin/sh

alias log="sh $(pwd)/../scripts/log.sh"
alias cross-env="$(pwd)/node_modules/.bin/cross-env"
alias webpack="$(pwd)/node_modules/.bin/webpack"

if [ -z $1 ]
then
  log "No test names provided."
  log "Tests names can be provided as first parameter separated by comma."
  log "Using all available performance tests."
  webpack serve
else
  log "Building and watching performance tests \"$1\"..."
  cross-env TEST_NAMES=$1 webpack serve
fi
