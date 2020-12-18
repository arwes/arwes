#!/bin/sh

# Compile all the specified packages JavaScript source code with Babel.
# They compile from "packages/[package]/src" to "packages/[package]/lib".

alias babel='./node_modules/.bin/babel'

log () {
  echo "\033[1;36m$1\033[0m"
}

build () {
  log "\nCompiling $1..."
  NODE_ENV=production
  rm -rf ./packages/$1/lib/
  babel --config-file ./babel.config.js --ignore ./packages/**/*.test.js,./packages/**/*.sandbox.js --verbose ./packages/$1/src/ --out-dir ./packages/$1/lib/
}

log "Compiling Arwes packages."

build "tools"
build "animation"
build "sounds"
build "design"
build "arwes"

log "\nCompilation completed."
