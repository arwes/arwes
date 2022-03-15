#!/bin/sh

mkdir -p ./build/esm
npx tsc -p ./tsconfig.build.esm.json $1
