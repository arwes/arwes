#!/bin/sh

# Compile specified package source code with TypeScript compiler to
# commonjs distribution files from "packages/[package]/src" to "packages/[package]/lib".

alias log="sh $(pwd)/scripts/log.sh"
alias rimraf="$(pwd)/node_modules/.bin/rimraf"
alias tsc="$(pwd)/node_modules/.bin/tsc"

if [ ! -d "./packages/$1" ]
then
  log "Package \"$1\" does not exist."
  exit 1
fi

log "Compiling \"$1\" package..."

rimraf ./packages/$1/lib/
tsc -p ./packages/$1/tsconfig.build.json $2

log "Package compiled."
