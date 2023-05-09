# Config Format

## Config File

Shadowsocks accepts [JSON] format configs like this:

```json
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_port":1080,
    "password":"barfoo!",
    "method":"chacha20-ietf-poly1305"
}
```

Explanation of each field:

* `server`: your hostname or server IP (IPv4/IPv6).
* `server_port`: server port number.
* `local_port`: local port number.
* `password`: a password used to encrypt transfer.
* `method`: encryption method.

[JSON]: http://www.json.org/

### Encryption Method

The strongest option is an [AEAD cipher](/doc/aead.html). The recommended
choice is "chacha20-ietf-poly1305" or "aes-256-gcm". Other
[stream ciphers](/doc/stream.html) are implemented but do not provide
integrity and authenticity. Unless otherwise specified the encryption method
defaults to "table", which is **not secure**.

## URI and QR code

Shadowsocks for Android / iOS also accepts BASE64 encoded URI format configs:

```
ss://BASE64-ENCODED-STRING-WITHOUT-PADDING#TAG
```	

Where the plain URI should be:

```
ss://method:password@hostname:port
```

Note that the above URI doesn't follow RFC3986. It means the password here should be plain text, not percent-encoded.

For example, we have a server at `192.168.100.1:8888` using `bf-cfb` encryption method and password `test/!@#:`. Then, with the plain URI `ss://bf-cfb:test/!@#:@192.168.100.1:8888`, we can generate the BASE64 encoded URI:

```
> console.log( "ss://" + btoa("bf-cfb:test/!@#:@192.168.100.1:8888") )
ss://YmYtY2ZiOnRlc3QvIUAjOkAxOTIuMTY4LjEwMC4xOjg4ODg
```

To help organize and identify these URIs, you can append a tag after the BASE64 encoded string:

```
ss://YmYtY2ZiOnRlc3QvIUAjOkAxOTIuMTY4LjEwMC4xOjg4ODg#example-server
```

This URI can also be encoded to QR code. Then, just scan it with your Android / iOS devices:

### SIP002

There is also a new URI scheme proposed in <a href="/sips/sip002.html">SIP002</a>. Any client or server which supports SIP003 plugin should use SIP002 URI scheme instead.