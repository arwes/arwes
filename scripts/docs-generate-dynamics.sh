#!/bin/sh

DATE=$(date -Iseconds)

echo "export const DEPLOY_TIME = '$DATE';" >| ./src/dynamics.ts
