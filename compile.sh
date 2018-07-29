#!/bin/sh

alias babel='./node_modules/.bin/babel'

log() {
  echo "\033[1;36m$1\033[0m"
}

build() {
  log "\nCompiling $1..."
  NODE_ENV=production
  rm -rf ./packages/$1/lib/
  babel ./packages/$1/src --out-dir ./packages/$1/lib/ --ignore '*.test.js'
}

log "Compiling Arwes packages."

build "arwes"
build "sounds"

log "\nCompilation completed."
