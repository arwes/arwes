#!/bin/sh

# In deployment server:
# 1) Fetch the latest repository changes.
# 2) Re-install dependencies.
# 3) Build applications.

git fetch origin main
git reset --hard origin/main

nvm use

# WORKSPACE

npm install

# PLAYGROUND

cd ./playground

npm install
npm run build

cd ..

# WEBSITE

cd ./website

npm install
npm run build

cd ..
