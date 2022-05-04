#!/bin/sh

if [ -z $CI_IGNORE ] || [ $CI_IGNORE != "true" ]
then
  npx nx run-many --target=build --projects=standalone --parallel=8
  npm run lint
  npm run test-coverage
fi
