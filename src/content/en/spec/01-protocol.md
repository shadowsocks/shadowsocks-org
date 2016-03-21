The shadowsocks protocol is very similar to [SOCKS5](https://www.ietf.org/rfc/rfc1928.txt) but encrypted and simpler.

Below is the structure of a shadowsocks request (sent from client-side), which is identical for both TCP and UDP connections before encrypted (or after decrypted).

```
+--------------+---------------------+------------------+----------+
| Address Type | Destination Address | Destination Port |   Data   |
+--------------+---------------------+------------------+----------+
|      1       |       Variable      |         2        | Variable |
+--------------+---------------------+------------------+----------+
```

Possible values of address type are 1 (IPv4), 4 (IPv6), 3 (hostname). For IPv4 address, it's packed as a [32-bit (4-byte)](https://tools.ietf.org/html/rfc791#section-2.3) big-endian integer. For IPv6 address, [a compact representation](https://tools.ietf.org/html/rfc1924) (16-byte array) is used. For hostname, the first byte of destination address indicates the length, which limits the length of hostname to 255. The destination port is also a big-endian integer.

The request is encrypted using the specified cipher with a random IV and the pre-shared key, it then becomes so-called _payload_.

##TCP
The first packet of a shadowsocks TCP connection sent either from server-side or client-side must contains the randomly generated IV that used for the encryption.

```
+-------+----------+
|  IV   | Payload  |
+-------+----------+
| Fixed | Variable |
+-------+----------+
```

Once this packet is received, payload is decrypted using the specified cipher with the IV in the packet and the pre-shared key. For the server-side, the data is then forwarded to the destination. For client-side, the data is forwarded to the application. And this shadowsocks TCP relay goes into _stream_ stage, in which the data is being encrypted with the same IV and transmitted directly without IV prepended.

```
+----------+
| Payload  |
+----------+
| Variable |
+----------+
```

##UDP
When the client-side receives a UDP request from other applications, RSV and FRAG are dropped and a shadowsocks UDP request is made out from it. A random IV is always generated and used for the encryption of shadowsocks UDP request and response. Therefore, all UDP requests and responses have the same structure, no matter whether it's the first packet or not.

```
+-------+----------+
|  IV   | Payload  |
+-------+----------+
| Fixed | Variable |
+-------+----------+
```
