#!/bin/sh

if [ $# -eq 0 ] ; then
    echo "Please prove a commit message."
    exit 1
fi

npm run build && \
git add --all && \
git commit -m $1 && \
git push && \
echo "here" && \
npm version patch && \
git push && \
npm publish --access public
