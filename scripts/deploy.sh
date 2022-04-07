#!/bin/sh

if [ -z $1 ]
then
  echo "[ERROR] Please specify git branch."
  exit 1
fi

echo "[DEBUG] Fetching updates..."

git fetch origin $1
git reset --hard origin/$1

echo "[DEBUG] Installing dependencies..."

npx cross-env NODE_ENV=production npm install

echo "[DEBUG] Building project..."

npx cross-env NODE_ENV=production npx nx run-many --target=build --all

echo "[DEBUG] Creating www bundle..."

mkdir -p ./www
cp -r ./apps/website/build/ ./www
cp -r ./apps/play/build/play/ ./www
cp -r ./apps/perf/build/perf/ ./www

echo "[SUCCESS] Project deployed."
