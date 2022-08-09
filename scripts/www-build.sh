#!/bin/sh

echo "\n[DEBUG] Installing dependencies..."

npm install

echo "\n[DEBUG] Building project..."

npx cross-env NODE_ENV=production npx nx run-many --target build --all --parallel=8

echo "\n[DEBUG] Creating www bundle..."

rm -rf ./www ./www.zip
mkdir -p ./www
cp -r ./static/* ./www
cp -r ./apps/website/out/* ./www
cp -r ./apps/play/build/play/ ./www/play/
cp -r ./apps/perf/build/perf/ ./www/perf/

echo "\n[SUCCESS] Built successfully."
