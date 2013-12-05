#!/bin/bash

DIST=$1

pushd $DIST

# Build package info
pushd shadowsocks
dpkg-scanpackages binary-i386 /dev/null > binary-i386/Packages
dpkg-scanpackages binary-amd64 /dev/null > binary-amd64/Packages
dpkg-scanpackages binary-i386 /dev/null | gzip -9c > binary-i386/Packages.gz
dpkg-scanpackages binary-amd64 /dev/null | gzip -9c > binary-amd64/Packages.gz
popd

# Create Release
cat > Release <<EOM
Origin: Shadowsocks
Label: Shadowsocks
Codename: $DIST
Architectures: i386 amd64
Components: shadowsocks
Description: Shadowsocks APT Repository
EOM
apt-ftparchive release . >> Release

popd
