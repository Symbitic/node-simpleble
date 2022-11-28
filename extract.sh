#!/bin/bash

# Exit on failure
set -e

if [ $# -ne 1 ]
then
  echo "No arch given"
  exit 1
fi

arch=$1

# Validate arch.
case $arch in
   arm64|armhf)
     ;;
   *)
     echo "$arch is not a recognized architecture"
     exit 1
     ;;
esac

echo "Extracting dbus for $arch"

mkdir -p temp
cd temp
rm -rf root "$arch"
rm -rf *.deb

LIBDBUS_DEB="libdbus-1-dev_1.12.16-2ubuntu2.3_${arch}.deb"
LIBLZMA_DEB="liblzma-dev_5.2.4-1ubuntu1.1_${arch}.deb"
LIBLZ4_DEB="liblz4-dev_1.9.2-2ubuntu0.20.04.1_${arch}.deb"
LIBGPG_ERROR_DEB="libgpg-error-dev_1.37-1_${arch}.deb"
LIBGCRYPT_DEB="libgcrypt20-dev_1.8.5-5ubuntu1.1_${arch}.deb"
LIBSYSTEMD_DEB="libsystemd-dev_245.4-4ubuntu3.15_${arch}.deb"

LIBDBUS_URL="http://ports.ubuntu.com/pool/main/d/dbus/${LIBDBUS_DEB}"
LIBLZMA_URL="http://ports.ubuntu.com/pool/main/x/xz-utils/${LIBLZMA_DEB}"
LIBLZ4_URL="http://ports.ubuntu.com/pool/main/l/lz4/${LIBLZ4_DEB}"
LIBGPG_ERROR_URL="http://ports.ubuntu.com/pool/main/libg/libgpg-error/${LIBGPG_ERROR_DEB}"
LIBGCRYPT_URL="http://ports.ubuntu.com/pool/main/libg/libgcrypt20/${LIBGCRYPT_DEB}"
LIBSYSTEMD_URL="http://ports.ubuntu.com/pool/main/s/systemd/${LIBSYSTEMD_DEB}"

echo "Downloading..."
wget -q -c "${LIBDBUS_URL}"
wget -q -c "${LIBLZMA_URL}"
wget -q -c "${LIBLZ4_URL}"
wget -q -c "${LIBGPG_ERROR_URL}"
wget -q -c "${LIBGCRYPT_URL}"
wget -q -c "${LIBSYSTEMD_URL}"

echo "Extracting..."
dpkg-deb -x "${LIBDBUS_DEB}" root
dpkg-deb -x "${LIBLZMA_DEB}" root
dpkg-deb -x "${LIBLZ4_DEB}" root
dpkg-deb -x "${LIBGPG_ERROR_DEB}" root
dpkg-deb -x "${LIBGCRYPT_DEB}" root
dpkg-deb -x "${LIBSYSTEMD_DEB}" root

mkdir -p ${arch}/lib

for f in `find ./root -iname "*.a"`
do
  mv "$f" "$arch/lib/"
done

mv root/usr/include ${arch}/include
if [ "$arch" == "arm64" ]; then mv "root/usr/lib/aarch64-linux-gnu/dbus-1.0/include/dbus/dbus-arch-deps.h" "${arch}/include/dbus-1.0/dbus/"; fi
if [ "$arch" == "armhf" ]; then mv "root/usr/lib/arm-linux-gnueabihf/dbus-1.0/include/dbus/dbus-arch-deps.h" "${arch}/include/dbus-1.0/dbus/"; fi

if [ "$arch" == "armhf" ]
then
  libdir=$(zig env | grep lib_dir | cut -d '"' -f 4)
  output="${libdir}/libc/glibc/sysdeps/arm/arm-features.h"
  if [ ! -f "${output}" ]
  then
    sudo wget -q -c --content-disposition -O "${output}" "https://sourceware.org/git?p=glibc.git;a=blob_plain;f=sysdeps/arm/arm-features.h;hb=HEAD"
  fi
fi

rm -rf root
rm -rf *.deb

cd ..
