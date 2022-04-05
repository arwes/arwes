#!/bin/sh

PWD=$(pwd)
BASENAME=$(basename $PWD)

mkdir -p ./build/types

# npm-dts CLI option "--tsc" requires an empty space at the beginning of the
# passed parameter due to bug.
npx npm-dts generate --root ./ --entry ./src/index.ts --output ./build/types/index.d.ts --logLevel debug --tsc " -p ./tsconfig.build.esm.json"

# TODO: Fix issue in npm-dts package instead of patching it up here.
node ../../scripts/pkg-build-types-fix.js $BASENAME
