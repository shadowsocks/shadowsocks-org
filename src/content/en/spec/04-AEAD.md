This is [SIP004](https://github.com/shadowsocks/shadowsocks-org/issues/30)
proposed by @Mygod, the design of TCP chunk is from @breakwa11 and @Noisyfox.
This first version of this document is written by @wongsyrone.

SIP004 aims to ensure IND-CCA2 for shadowsocks protocol by using well known
AEADs. Currently, the following AEAD ciphers are supported by shadowsocks:

* AES-128-GCM
* AES-192-GCM
* AES-256-GCM
* ChaCha20-IETF-Poly1305
* XChaCha20-IETF-Poly1305

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

## Session key (SIP007)

AEAD ciphers require a per-session subkey derived from the pre-shared master
key using HKDF, and use the subkey to encrypt/decrypt. Essentially it means we
are moving from (M+N)-bit (PSK, nonce) pair to (M+N)-bit (HKDF(PSK, salt),
nonce) pair. Because HKDF is a PRF, the new construction significantly expands
the amount of randomness (from N to at least M where M is much greater than N),
thus correcting the previously mentioned design flaw.

Assuming we already have a user-supplied pre-shared master key PSK. 

Function HKDF_SHA1 is a HKDF constructed using SHA1 hash. Its signature is

```
    HKDF_SHA1(secret_key, salt, info)
```

The "info" string argument allows us to bind the derived subkey to a specific application context. 

For AEAD ciphers, the encryption scheme is:

1. Pick a random R-bit salt (R = max(128, len(SK)))
2. Derive subkey SK = HKDF_SHA1(PSK, salt, "ss-subkey")
3. Send salt
4. For each chunk, encrypt and authenticate payload using SK with a counting nonce (starting from 0 and increment by 1 after each use)
5. Send encrypted chunk

## Key in Base64-URL (SIP006)

For AEAD, it's recommended to use a 32-byte random key. The key can be passed
to shadowsocks in a Base64-URL encoded string.  If an invalid key provided, the
shadowsocks server should show a warning and generate a random key for the
user.
