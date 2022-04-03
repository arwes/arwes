#!/bin/sh

PWD=$(pwd)
BASENAME=$(basename $PWD)

mkdir -p ./build/types
npx npm-dts generate --root ./ --entry ./src/index.ts --output ./build/types/index.d.ts --logLevel debug

# TODO: Packages tsconfig.json should take root tsconfig.base.json file
# instead of tsconfig.build.json file. This was made so the npm-dts transpiler
# worked only for source code declaration files.

# TODO: Fix issue in npm-dts package instead of patching it up here.

node ../../scripts/pkg-build-types-fix.js $BASENAME
