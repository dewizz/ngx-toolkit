#!/bin/sh

set -x

# get current version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
PLACEHOLDER="0.0.0-PLACEHOLDER"
TFILE="/tmp/out.tmp.$$"

# change version & publish each lib
for module in dist/*
do
    sed "s/$PLACEHOLDER/$PACKAGE_VERSION/g" "$module/package.json" > $TFILE && mv $TFILE "$module/package.json"
    cp LICENSE "$module/LICENSE"
    npm publish --access public "./$module"
done
