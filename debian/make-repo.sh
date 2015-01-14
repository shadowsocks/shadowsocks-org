#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: ./make-repo.sh CODENAME"
    exit -1
fi

DIST=$1
PACKAGE=dists/$DIST/main

# Build package info
dpkg-scanpackages $PACKAGE/binary-i386 /dev/null > $PACKAGE/binary-i386/Packages
dpkg-scanpackages $PACKAGE/binary-amd64 /dev/null > $PACKAGE/binary-amd64/Packages
dpkg-scanpackages $PACKAGE/binary-i386 /dev/null | gzip -9c > $PACKAGE/binary-i386/Packages.gz
dpkg-scanpackages $PACKAGE/binary-amd64 /dev/null | gzip -9c > $PACKAGE/binary-amd64/Packages.gz

pushd dists/$DIST

# Create Release
cat > Release <<EOM
Origin: Shadowsocks
Label: Shadowsocks
Architectures: i386 amd64
Components: main
Suite: $DIST
Description: Shadowsocks APT Repository
EOM
apt-ftparchive release . >> Release

popd

TARGET=dists/$DIST
GPGKEY=1D27208A
## Do the actual work
rm -f ${TARGET}/Release.gpg
gpg -a --sign --default-key ${GPGKEY} -o ${TARGET}/Release.gpg ${TARGET}/Release
