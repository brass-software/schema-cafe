#!/bin/sh

npm run build && \
git add --all && \
git commit -m wip && \
git push && \
npm version patch && \
git push && \
npm publish --access public
