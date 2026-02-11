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

The strongest option is an [AEAD cipher](/doc/aead). The recommended
choice is "chacha20-ietf-poly1305" or "aes-256-gcm". For the latest
AEAD-2022 ciphers, see [SIP022](/doc/sip022). [Stream ciphers](/doc/stream)
are deprecated and do not provide integrity or authenticity.

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

For example, we have a server at `192.168.100.1:8888` using `chacha20-ietf-poly1305` encryption method and password `test/!@#:`. Then, with the plain URI `ss://chacha20-ietf-poly1305:test/!@#:@192.168.100.1:8888`, we can generate the BASE64 encoded URI:

```
> console.log( "ss://" + btoa("chacha20-ietf-poly1305:test/!@#:@192.168.100.1:8888") )
ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTp0ZXN0LyFAIzpAMTkyLjE2OC4xMDAuMTo4ODg4
```

To help organize and identify these URIs, you can append a tag after the BASE64 encoded string:

```
ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTp0ZXN0LyFAIzpAMTkyLjE2OC4xMDAuMTo4ODg4#example-server
```

This URI can also be encoded to QR code. Then, just scan it with your Android / iOS devices:

### SIP002

There is also a new URI scheme proposed in [SIP002](/doc/sip002). Any client or server which supports SIP003 plugin should use the SIP002 URI scheme instead.
