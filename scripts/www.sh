#!/bin/sh

rm -rf ./www ./www.zip
mkdir -p ./www
cp -r ./static/* ./www
cp -r ./apps/docs/out/* ./www
cp -r ./apps/play/build/play/ ./www/play/
cp -r ./apps/perf/build/perf/ ./www/perf/
