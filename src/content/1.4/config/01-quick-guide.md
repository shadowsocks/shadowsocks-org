## Config File

Shadowsocks accepts [JSON] format configs like this:

```json
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_port":1080,
    "password":"barfoo!",
    "timeout":600,
    "method":"table"
}
```

Explanation of each field:

* `server`: your hostname or server IP (IPv4/IPv6).
* `server_port`: server port number.
* `local_port`: local port number.
* `password`: a password used to encrypt transfer.
* `timeout`: connections timeout in seconds.
* `method`: encryption method, "bf-cfb", "aes-256-cfb", "des-cfb", "rc4", etc. Default is table, which is not secure. "aes-256-cfb" is recommended.

[JSON]: http://www.json.org/

## URI

Shadowsocks also accepts BASE64 encoded URI format configs:

```
	ss://BASE64-ENCODED-STRING-WITHOUT-PADDING
```	

Where the plain URI should be:

```
	ss://method:password@hostname:port
```

For example, we have a server at `192.168.100.1:8888` using `bf-cfb` encryption method and password `test`. Then, with the plain URI `ss://bf-cfb:test@192.168.100.1:8888`, we can get the BASE64 encoded URI:

```
	ss://YmYtY2ZiOnRlc3RAMTkyLjE2OC4xMDAuMTo4ODg4
```

## QR Code

Shadowsocks clients for Android and iOS accept QR codes of our URI format config. For the example URI described above, we have this QR code:

<div class="container">
<div class="sixteen columns"><br/></div>
<div id="qrcode-1"></div>
</div>

