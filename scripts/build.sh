#!/bin/bash

BASE_DIR=`dirname $0`/..

echo ""
echo "build with uglify-js"
echo "-------------------------------------------------------------------"
rm dist -rf
mkdir dist
mkdir dist/js
mkdir dist/css
mkdir dist/html
cd $BASE_DIR
pwd
./node_modules/yuicompressor/nodejs/cli.js --type css -o dist/css/angular-doitsimple.css  src/css/*.css

cat src/js/*.js src/js/*/*.js | ngmin >concat.tmp.js
./node_modules/uglify-js/bin/uglifyjs concat.tmp.js \
         -o dist/js/angular-doitsimple.min.js \
         -c 
rm concat.tmp.js
cp src/html/*.html dist/html/.
