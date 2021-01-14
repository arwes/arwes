#!/bin/sh

# Compile all the specified packages JavaScript source code with TypeScript compiler
# to commonjs distribution files from "packages/[package]/src" to "packages/[package]/lib".

log () {
  echo "\033[1;36m$1\033[0m"
}

build () {
  log "Compiling $1..."

  cd ./packages/$1/

  ../../node_modules/.bin/rimraf ./lib/
  ../../node_modules/.bin/tsc -p tsconfig.build.json

  cd ../../
}

log "Compiling Arwes packages for CommonJS."

build "tools"
build "design"
build "animation"
build "sounds"
build "core"
build "arwes"

log "Compilation completed."
