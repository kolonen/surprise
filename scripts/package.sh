#!/bin/bash
PROD_URL=$1

# CLIENT
# replace url
rm -rf client/build
mkdir client/build
cp -r client/src client/build
cp client/index.html client/build
sed -i "s/localhost:4500/$PROD_URL/" client/build/src/Config.js

# browserify
cd client
browserify -t babelify --presets react build/src/main.js -o build/bundle.js
cd ..

# SERVER
# disable debug mode
rm -rf server/build
mkdir server/build
cp server/*.py server/requirements.txt server/build
sed -i 's/debug=True/debug=False/' server/build/wagerserver.py

# PACKAGE
rm -rf build
mkdir -p build/surprise/server
mkdir -p build/surprise/client
cp client/build/bundle.js client/build/index.html build/surprise/client
cp server/build/* build/surprise/server
zip -r surprise.zip build/surprise

