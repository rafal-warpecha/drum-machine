#!/bin/bash

set -o errexit # Exit on error

npm run build:prod
node gh-pages.deploy.js
