#!/bin/sh

if [ -z $1 ]
then
  echo "Please specify git branch."
  exit 1
fi

git fetch origin $1
git reset --hard origin/$1

NODE_ENV=production

# WORKSPACE

npm install

# WEBSITE

cd ./website

npm install
npm run build

cd ..
