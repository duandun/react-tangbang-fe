#!/bin/sh
echo "编译中....."
npm run build

echo "压缩打包中..."
mkdir -p output
tar zcvf tangbang-front.tar.gz dist/index.html dist/static login-page
mv tangbang-front.tar.gz output
scp output/tangbang-front.tar.gz root@47.93.29.71:/home/tangbang-front
