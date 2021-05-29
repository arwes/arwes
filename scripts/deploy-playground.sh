#!/bin/sh

alias log="sh $(pwd)/scripts/log.sh"

if [ -z $1 ]
then
  log "Please specify git branch."
  exit 1
fi

git fetch origin $1
git reset --hard origin/$1

NODE_ENV=production

# WORKSPACE

npm install

# PLAYGROUND

cd ./playground

npm install
npm run build

cd ..
