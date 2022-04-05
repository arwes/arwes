#!/bin/sh

if [ -z $1 ]
then
  echo "[INFO] No test names provided."
  echo "[INFO] Tests names can be provided as first parameter separated by comma."
  echo "[INFO] Using all available performance tests."
  npx webpack serve
else
  echo "[INFO] Building and watching performance tests \"$1\"..."
  npx cross-env TEST_NAMES=$1 npx webpack serve
fi
