#!/bin/sh

mkdir -p ./build/cjs
echo "{ \"type\": \"commonjs\" }" >| ./build/cjs/package.json
npx tsc -p ./tsconfig.build.cjs.json $1
