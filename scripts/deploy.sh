#!/bin/sh

if [ -z $1 ]
then
  echo "\n[ERROR] Please specify git branch."
  exit 1
fi

echo "\n[DEBUG] Fetching updates..."

git fetch origin $1
git reset --hard origin/$1

echo "\n[DEBUG] Installing dependencies..."

npx npm install

echo "\n[DEBUG] Building project..."

npx cross-env NODE_ENV=production npx nx run-many --target=build --all

echo "\n[DEBUG] Creating www bundle..."

rm -rf ./www
mkdir -p ./www
cp -r ./apps/static/* ./www
cp -r ./apps/website/out/* ./www
cp -r ./apps/play/build/play/ ./www
cp -r ./apps/perf/build/perf/ ./www

echo "\n[SUCCESS] Project deployed."
