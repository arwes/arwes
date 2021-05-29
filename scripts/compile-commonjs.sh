#!/bin/sh

alias log="sh $(pwd)/scripts/log.sh"
alias compile="sh $(pwd)/scripts/compile-commonjs-package.sh"

log "Compiling Arwes packages for CommonJS."

compile tools
compile design
compile animator
compile animated
compile bleeps
compile core
compile arwes

log "Compilation completed."
