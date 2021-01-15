#!/bin/sh

NODE_ENV=production

npm run site-build

pm2-runtime start ./node_modules/.bin/next -- start --port 17000 --name arwes
