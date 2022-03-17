#!/bin/sh

if [ -z $CI_IGNORE ] || [ $CI_IGNORE != "true" ]
then
  npx nx run-many --target=build --projects=tools,theme,styles,animator,animated,bleeps,core,arwes --parallel=8
  npm run lint
  npm run test-coverage
fi
