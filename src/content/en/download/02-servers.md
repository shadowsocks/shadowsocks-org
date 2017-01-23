## Python

shadowsocks-python is the initial version written by [@clowwindy]. It aims to provide a simple-to-use and easy-to-deploy implementation with basic features of shadowsocks.

### PyPI

First, make sure you have Python 2.6 or 2.7.

```bash
$ python --version
Python 2.6.8
```

Then install from PIP

```bash
$ pip install shadowsocks
```

### GitHub

Checkout the source codes and run the scripts directly.

```bash
$ git clone https://github.com/shadowsocks/shadowsocks.git
$ cd shadowsocks
$ python setup.py
```

shadowsocks-python is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Go

shadowsocks-go is a state-of-the-art port written in Go language, designed for large-scale system. It implements the multi-ports-multi-password feature, which is suitable for paid service providers with user management and traffic statistics support. This port is maintained by [@cyfdecyf].

### Pre-built Binaries

Download archives from http://dl.chenyufei.info/shadowsocks/.

### GitHub

Use `go get` to install the scripts.

```bash
$ go get github.com/shadowsocks/shadowsocks-go/cmd/shadowsocks-server
```

shadowsocks-go is licensed under the [MIT license](http://opensource.org/licenses/MIT).

## C with libev

shadowsocks-libev is a lightweight and full featured port for embedded devices 
and low end boxes. It's a pure C implementation and has a very small footprint 
(several megabytes) for thousands of connections. This port is maintained by [@madeye].

### Debian/Ubuntu:

Shadowsocks-libev is available in the official repository for Debian
9("Stretch"), unstable, Ubuntu 16.10 and later derivatives:

```
sudo apt update
sudo apt install shadowsocks-libev
```

For Debian Jessie users, please install it from jessie-backports:

```
sudo sh -c 'printf "deb http://httpredir.debian.org/debian jessie-backports
main" > /etc/apt/sources.list.d/jessie-backports.list'
sudo apt update
sudo apt -t jessie-backports install shadowsocks-libev
```

### GitHub

Build and install the project from source codes.

```bash
$ sudo apt-get install --no-install-recommends build-essential autoconf libtool \
        libssl-dev gawk debhelper dh-systemd init-system-helpers pkg-config asciidoc \
        xmlto apg libpcre3-dev zlib1g-dev libev-dev libudns-dev libsodium-dev
$ git clone https://github.com/shadowsocks/shadowsocks-libev.git
$ cd shadowsocks-libev
$ git submodule update --init
$ ./autogen.sh && ./configure && make
$ sudo make install
```

shadowsocks-libev is licensed under the [GNU General Public License v3.0](https://www.gnu.org/copyleft/gpl.html).

## C++ with Qt

libQtShadowsocks is a lightweight and ultra-fast shadowsocks library written in C++ with Qt 5.
The client `shadowsocks-libqss` can be used in both client-side and server-side. This port
is maintained by [@librehat].

### Prebuilt binaries

Download pre-built binaries from https://github.com/shadowsocks/libQtShadowsocks/releases

### GitHub

```bash
$ git clone https://github.com/shadowsocks/libQtShadowsocks.git
$ cd libQtShadowsocks
$ qmake
$ make -j4
$ sudo make install
```

libQtShadowsocks is licensed under the [GNU Lesser General Public License, version 3.0](https://www.gnu.org/licenses/lgpl.html)

[@clowwindy]: https://github.com/clowwindy
[@cyfdecyf]: https://github.com/cyfdecyf
[@madeye]: https://github.com/madeye
[@librehat]: https://github.com/librehat
