#!/bin/sh

if [ -z $1 ]
then
  echo "[ERROR] Please specify git branch."
  exit 1
fi

git fetch origin $1
git reset --hard origin/$1
npx cross-env NODE_ENV=production npm install
npx cross-env NODE_ENV=production npx nx run-many --target=build --all

echo "[SUCCESS] Project deployed."
