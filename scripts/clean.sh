#!/bin/sh

rm -rf ./node_modules/.cache/nx
rm -rf ./packages/*/build
rm -rf ./packages/*/.tsbuildinfo
rm -rf ./apps/*/build
rm -rf ./apps/website/.next
rm -rf ./apps/website/out
rm -rf ./apps/website/public
