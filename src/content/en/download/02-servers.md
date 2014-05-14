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
$ git clone https://github.com/clowwindy/shadowsocks.git
$ cd shadowsocks
$ python setup.py
```

shadowsocks-python is released under the [MIT] license.

## NodeJS

shadowsocks-nodejs is a high performance port maintained by [@clowwindy]. It implements all features of shadowsocks protocol, including TCP CONNECT and UDP ASSOCIATE.

### NPM

Install the stable version with npm

```bash
$ npm install -g shadowsocks
```

### GitHub

Fetch and run the scripts

```bash
$ npm install -g coffee-script
$ git clone https://github.com/clowwindy/shadowsocks-nodejs.git
$ cd shadowsocks-nodejs
$ cake build
```

shadowsocks-nodejs is released under the [MIT] license.

## Go

shadowsocks-go is a state-of-the-art port written in Go language, designed for large-scale system. It implements the multi-ports-multi-password feature, which is suitable for paid service providers with user management and traffic statistics support. This port is maintained by [@cyfdecyf].

### Pre-built Binaries

Download archives from http://dl.chenyufei.info/shadowsocks/.

### GitHub

Use `go get` to install the scripts.

```bash
$ go get github.com/shadowsocks/shadowsocks-go/cmd/shadowsocks-server
```

shadowsocks-go is released under the [MIT] license

## C with libev

shadowsocks-libev is a lightweight and full featured port for embedded devices 
and low end boxes. It's a pure C implementation and has a very small footprint 
(several megabytes) for thousands of connections. This port is maintained by [@madeye].

### Debian/Ubuntu:

Install the binaries by adding each of the following repositories to your system.

On Debian Wheezy, Ubuntu 12.04 or any distribution with libssl > 1.0.0

``` bash
$ echo "deb http://shadowsocks.org/debian wheezy main" >> /etc/apt/sources.list
```

On Debian Squeeze, Ubuntu 11.04, or any distribution with libssl > 0.9.8, but < 1.0.0

```bash
$ echo "deb http://shadowsocks.org/debian squeeze main" >> /etc/apt/sources.list
```

Then

```bash
$ apt-get update
$ apt-get install shadowsocks
```

### GitHub

Build and install the project from source codes.

```bash
$ git clone https://github.com/madeye/shadowsocks-libev.git
$ cd shadowsocks-libev
$ sudo apt-get install build-essential autoconf libtool libssl-dev
$ ./configure && make
$ make install
```

shadowsocks-libev is released under the [GPLv3] license

[@clowwindy]: https://github.com/clowwindy
[@cyfdecyf]: https://github.com/cyfdecyf
[@madeye]: https://github.com/madeye
[MIT]: http://opensource.org/licenses/MIT
[GPLv3]: http://www.gnu.org/licenses/gpl.html
