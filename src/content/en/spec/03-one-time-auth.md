# (Deprecated)

One-time authentication (shortened as _OTA_) is a new experimental feature designed to improve the security against [CCA](https://en.wikipedia.org/wiki/Chosen-ciphertext_attack). You should understand the [protocol](protocol.html) before reading this document.

By default, the server that supports OTA should run in the compatible mode. OTA is only applied if the client's request header has a flag set. However, if the server switch on OTA explicitly, all clients must switch on OTA, otherwise connections will be denied.

The authentication method is **HMAC-SHA1** which has wide supports among all major platforms and fairly good speed.

##TCP
The structure of an OTA-enabled request (unencrypted) is shown below:

```
+------+---------------------+------------------+-----------+
| ATYP | Destination Address | Destination Port | HMAC-SHA1 |
+------+---------------------+------------------+-----------+
|  1   |       Variable      |         2        |    10     |
+------+---------------------+------------------+-----------+
```

ATYP is a 8-bit char where the rightmost four bits, 0b00001111 (0xf), are reserved for address types, the flag bit of OTA is 0b00010000 (0x10). In C/C++, simply check if `ATYP & 0x10 == 0x10`, then OTA is enabled.

The key of HMAC-SHA1 is (IV + KEY), and the input is the whole header (not including HMAC-SHA1). The output of HMAC-SHA1 is truncated to leftmost 80 bits (10 bytes) according to [RFC 2104](https://tools.ietf.org/html/rfc2104#page-5).

###Chunk Authentication
The structure of an OTA-enabled chunk (decrypted) of shadowsocks TCP relay is shown below:

```
+----------+-----------+----------+----
| DATA.LEN | HMAC-SHA1 |   DATA   | ...
+----------+-----------+----------+----
|     2    |     10    | Variable | ...
+----------+-----------+----------+----
```

DATA.LEN is a 16-bit big-endian integer indicating the length of DATA.

The input of HMAC-SHA1 is DATA. And the key of HMAC-SHA1 is (IV + Chunk ID) where Chunk ID is an unsigned integer counted per connection from 0. In order to achieve this, both server side and client side need to keep a counter for each TCP connection. Chunk ID must be converted to big-endian before constructing the key of HMAC-SHA1.

For a client, after constructing an OTA-enabled request, the whole chunk is encrypted as a payload then sent to server-side.

Tips:

- The server must check the completeness of a shadowsocks TCP request before verifying HMAC-SHA1 and forwarding.
- The chunk authentication is only applied for the packets sent from client-side shadowsocks.

##UDP
There is no _session_ in UDP relay, each UDP packet contains both header and data. Therefore, for an OTA-enabled UDP packet, the datagram structure (unencrypted) is slightly different:

```
+------+---------------------+------------------+----------+-----------+
| ATYP | Destination Address | Destination Port |   DATA   | HMAC-SHA1 |
+------+---------------------+------------------+----------+-----------+
|  1   |       Variable      |         2        | Variable |     10    |
+------+---------------------+------------------+----------+-----------+
```

The key of HMAC-SHA1 is (IV + KEY), and the input is the header plus data.
