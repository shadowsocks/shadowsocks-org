This is [SIP004](https://github.com/shadowsocks/shadowsocks-org/issues/30) proposed by @Mygod, the design of TCP chunk is from @breakwa11 and @Noisyfox. This first version of this document is written by @wongsyrone.

SIP004 aims to ensure IND-CCA2 for shadowsocks protocol, by using well known AEADs. There are 6 AEADs suppprted by shadowsocks:

* AES-128-GCM
* AES-192-GCM
* AES-256-GCM
* ChaCha20-Poly1305
* ChaCha20-IETF-Poly1305
* XChaCha20-IEFT-Poly1305

## TCP Protocol

TCP stream is organized into chunks. Each chunk is encrypted and authenticated with AEAD.

```
TCP request (before encryption)
+------+---------------------+------------------+
| ATYP | Destination Address | Destination Port |
+------+---------------------+------------------+
|  1   |       Variable      |         2        |
+------+---------------------+------------------+

TCP request (after encryption, *ciphertext*)
+--------+--------------+------------------+--------------+---------------+
| NONCE  |  *HeaderLen* |   HeaderLen_TAG  |   *Header*   |  Header_TAG   |
+--------+--------------+------------------+--------------+---------------+
| Fixed  |       2      |       Fixed      |   Variable   |     Fixed     |
+--------+--------------+------------------+--------------+---------------+
```

Header is (Atyp + Dst.addr + Dst.port).

HeaderLen is length of (Atyp + Dst.addr + Dst.port). It should be smaller than 0x3FFF.

```
TCP Chunk (before encryption)
+----------+
|  DATA    |
+----------+
| Variable |
+----------+

TCP Chunk (after encryption, *ciphertext*)
+--------------+---------------+--------------+------------+
|  *DataLen*   |  DataLen_TAG  |    *Data*    |  Data_TAG  |
+--------------+---------------+--------------+------------+
|      2       |     Fixed     |   Variable   |   Fixed    |
+--------------+---------------+--------------+------------+
```

Data.Len is a 16-bit big-endian integer indicating the length of Data. It should be smaller than 0x3FFF.

## UDP Protocol

Each UDP packet is encrypted and authenticated by AEAD.

```
UDP (before encryption)
+------+---------------------+------------------+----------+
| ATYP | Destination Address | Destination Port |   Data   |
+------+---------------------+------------------+----------+
|  1   |       Variable      |         2        | Variable |
+------+---------------------+------------------+----------+

UDP (after encryption, *ciphertext*)
+--------+-----------+-----------+
| NONCE  |  *Data*   |  Data_TAG |
+--------+-----------+-----------+
| Fixed  | Variable  |   Fixed   |
+--------+-----------+-----------+
```

Data is (Atyp + Dst.addr + Dst.port + Data)

## Key and Nonce 

The key is generated from a password using Argon2i with default salt `shadowsocks hash`. The
recommended parameters for Argon2i is:

```
        const unsigned char salt[crypto_pwhash_SALTBYTES] = {
            's', 'h', 'a', 'd', 'o', 'w', 's', 'o',
            'c', 'k', 's', ' ', 'h', 'a', 's', 'h'
        };
        int err = crypto_pwhash (key, nkey, (char*)pass, strlen(pass), salt,
                crypto_pwhash_OPSLIMIT_INTERACTIVE, crypto_pwhash_MEMLIMIT_INTERACTIVE,
                crypto_pwhash_ALG_DEFAULT);
```

For TCP, the first nonce is either from client or server side, it is generated randomly, and
the subsequent nonces are increased by 1.

For UDP, nonces are generated randomly without the incrementation.

