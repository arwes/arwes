#!/bin/sh

if [ -z $CI_IGNORE ] || [ $CI_IGNORE != "true" ]
then
  npm run bootstrap
  npm run compile-commonjs
  npm run lint
  npm run test-coverage
fi
