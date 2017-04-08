## Config File

Shadowsocks accepts [JSON] format configs like this:

```json
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_port":1080,
    "password":"barfoo!",
    "timeout":600,
    "method":"chacha20-ietf-poly1305"
}
```

Explanation of each field:

* `server`: your hostname or server IP (IPv4/IPv6).
* `server_port`: server port number.
* `local_port`: local port number.
* `password`: a password used to encrypt transfer.
* `timeout`: connections timeout in seconds.
* `method`: encryption method.

[JSON]: http://www.json.org/

## Encryption Method

The strongest option is an [AEAD cipher](/en/spec/AEAD-ciphers.html). The recommended
choice is "chacha20-ietf-poly1305" or "aes-256-gcm". Other
[stream ciphers](/en/spec/Stream-Ciphers.html) are implemented but do not provide
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

For example, we have a server at `192.168.100.1:8888` using `bf-cfb` encryption method and password `test`. Then, with the plain URI `ss://bf-cfb:test@192.168.100.1:8888`, we can generate the BASE64 encoded URI:

```
	ss://YmYtY2ZiOnRlc3RAMTkyLjE2OC4xMDAuMTo4ODg4Cg
```

To help organize and identify these URIs, you can append a tag after the BASE64 encoded string:

```
    ss://YmYtY2ZiOnRlc3RAMTkyLjE2OC4xMDAuMTo4ODg4Cg#example-server
```

This URI can also be encoded to QR code. Then, just scan it with your Android / iOS devices:

<div class="container">
<div class="sixteen columns"><br/></div>
<div id="qrcode-1"></div>
</div>

## <a name="qrcode">Try it yourself</a> 

<div class="container">
<div class="sixteen columns"><br/></div>
<form action="#" class="form-elements2">
<fieldset>
<label>Plain:</label>
<input id="uri-plain" type="text" value="ss://bf-cfb:test@192.168.100.1:8888"/>
</fieldset>
<fieldset>
<label>Encoded:</label>
<input id="uri-encoded" type="text" disabled="disabled" value=""/>
</fieldset>
<fieldset>
<label>QR Code:</label>
<div id="qrcode-gen"></div>
</fieldset>
</form>
</div>

