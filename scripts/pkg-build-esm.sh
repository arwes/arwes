#!/bin/sh

mkdir -p ./build/esm
echo "{ \"type\": \"module\" }" >| ./build/esm/package.json
npx ttsc -p ./tsconfig.build.esm.json $1
