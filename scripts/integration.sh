#!/bin/sh

if [ -z $CI_IGNORE ] || [ $CI_IGNORE != "true" ]
then
  npx cross-env NODE_ENV=production npx nx run-many --target build --all --parallel=8
  npm run lint
  npm run test-coverage
fi
