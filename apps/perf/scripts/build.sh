#!/bin/sh

if [ -z $1 ]
then
  echo "[INFO] No test names provided."
  echo "[INFO] Tests names can be provided as first parameter separated by comma."
  echo "[INFO] Using all available performance tests."
  npx cross-env NODE_ENV=production npx webpack --progress
else
  echo "[INFO] Building performance tests \"$1\"..."
  npx cross-env NODE_ENV=production TEST_NAMES=$1 npx webpack --progress
  echo "[SUCCESS] Tests \"$1\" were built."
fi
