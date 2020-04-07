## Python

shadowsocks-python is the initial version written by [@clowwindy]. It aims to provide a simple-to-use and easy-to-deploy implementation with basic features of shadowsocks.

#### PyPI

First, make sure you have Python 2.6 or 2.7.

```bash
$ python --version
Python 2.6.8
```

Then install from PIP

```bash
$ pip install shadowsocks
```

#### GitHub

Checkout the source codes and run the scripts directly.

https://github.com/shadowsocks

shadowsocks-python is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Go

[go-shadowsocks2](https://github.com/shadowsocks/go-shadowsocks2) is the next-generation Shadowsocks in Go, maintained by [@riobard], superseds the discontinued [shadowsocks-go](https://github.com/shadowsocks/shadowsocks-go).

#### GitHub

Use `go get` to install.

```bash
$ go get -u -v github.com/shadowsocks/go-shadowsocks2
```

go-shadowsocks2 is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Go from Outline

[outline-ss-server](https://github.com/Jigsaw-Code/outline-ss-server) is the shadowsocks implementation used by the Outline Server, but it can be used standalone. Main features:
* Multiple users on a single port and multiple ports.
* Whitebox monitoring of the service using [prometheus.io](https://prometheus.io)
* Live updates via config change + SIGHUP
* Prohibits unsafe access to localhost ports and usage of non-AEAD ciphers

#### GitHub

Download pre-built binaries from the [GitHub releases](https://github.com/Jigsaw-Code/outline-ss-server/releases) or build it from source:
```
go get github.com/Jigsaw-code/outline-ss-server
$(go env GOPATH)/bin/outline-ss-server -config=config.yml -metrics=127.0.0.1:9091
```

outline-ss-server is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## C with libev

shadowsocks-libev is a lightweight and full featured port for embedded devices
and low end boxes. It's a pure C implementation and has a very small footprint
(several megabytes) for thousands of connections. This port is maintained by [@madeye].

#### Debian/Ubuntu:

shadowsocks-libev is available in the official repository for Debian
9("Stretch"), unstable, Ubuntu 16.10 and later derivatives:

```
sudo apt update
sudo apt install shadowsocks-libev
```

For Debian Jessie users, please install it from jessie-backports:

```
sudo sh -c 'printf "deb http://httpredir.debian.org/debian jessie-backports
main" > /etc/apt/sources.list.d/jessie-backports.list'
sudo apt-get update
sudo apt-get -t jessie-backports install shadowsocks-libev
```

#### Docker

shadowsocks-libev is shipped also in containers, which makes it a great choice if your cloud provider is Docker-ready or if you aim to build a scalable solution.

```
docker pull shadowsocks/shadowsocks-libev
docker run -e PASSWORD=<password> -p<server-port>:8388 -p<server-port>:8388/udp -d shadowsocks/shadowsocks-libev
```

More information about the image can be found [here](https://github.com/shadowsocks/shadowsocks-libev/blob/master/docker/alpine/README.md).

#### GitHub

Build and install the project from source codes.

```bash
$ sudo apt-get install --no-install-recommends build-essential autoconf libtool \
        libssl-dev gawk debhelper dh-systemd init-system-helpers pkg-config asciidoc \
        xmlto apg libpcre3-dev zlib1g-dev libev-dev libudns-dev libsodium-dev libmbedtls-dev libc-ares-dev automake
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

#### Prebuilt binaries

Download pre-built binaries from https://github.com/shadowsocks/libQtShadowsocks/releases

#### GitHub

```bash
$ git clone https://github.com/shadowsocks/libQtShadowsocks.git
$ cd libQtShadowsocks
$ qmake
$ make -j4
$ sudo make install
```
libQtShadowsocks is licensed under the [GNU Lesser General Public License, version 3.0](https://www.gnu.org/licenses/lgpl.html)

## Perl

Net::Shadowsocks is an asynchronous, non-blocking Shadowsocks client and server Perl module maintained by [@zhou0].

#### Setting up

You need a Perl interpreter to execute Perl program. Any Unix like system , including Linux and Mac OS X, has Perl pre-installed. Windows does not have Perl installed by default, you need to install Strawberry Perl.The source code is available on CPAN and github. Download from CPAN https://metacpan.org/release/Net-Shadowsocks or download from github https://github.com/zhou0/shadowsocks-perl

#### Installing

On Unix like systems,either

 ```bash
$ perl Build.PL
$ ./Build
$ ./Build test
$ ./Build install
```
or
```bash
$ perl Makefile.PL
$ make
$ make test
$ make install
```
You might need to change make to dmake or nmake depending on the compiler toolchain used on Windows. If You have cpan, you can also install using this command
```bash
$ cpan Net::Shadowsocks
```

#### Running

There is a server.pl script under the eg directory. Put your config.json in the same directory as server.pl and
run the server.pl script there.

Net::Shadowsocks is licensed under the [Artistic License (2.0)] (http://www.perlfoundation.org/artistic_license_2_0).


[@clowwindy]: https://github.com/clowwindy
[@cyfdecyf]: https://github.com/cyfdecyf
[@madeye]: https://github.com/madeye
[@librehat]: https://github.com/librehat
[@zhou0]: https://github.com/zhou0
[@riobard]: https://github.com/riobard
