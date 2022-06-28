# AEAD ciphers

[AEAD] stands for Authenticated Encryption with Associated Data. AEAD ciphers simultaneously provide confidentiality, integrity, and authenticity. They have excellent performance and power efficiency on modern hardware. Users should use AEAD ciphers whenever possible.

The following AEAD ciphers are recommended. Compliant Shadowsocks implementations must support AEAD_CHACHA20_POLY1305. Implementations for devices with hardware AES acceleration should also implement AEAD_AES_128_GCM and AEAD_AES_256_GCM.

<table>
  <tr><th>Name</th><th>Alias</th><th>Key Size</th><th>Salt Size</th><th>Nonce Size</th><th>Tag Size</th></tr>
  <tr><td>AEAD_CHACHA20_POLY1305</td><td>chacha20-ietf-poly1305</td><td>32</td><td>32</td><td>12</td><td>16</td></tr>
  <tr><td>AEAD_AES_256_GCM</td><td>aes-256-gcm</td><td>32</td><td>32</td><td>12</td><td>16</td></tr>
  <tr><td>AEAD_AES_128_GCM</td><td>aes-128-gcm</td><td>16</td><td>16</td><td>12</td><td>16</td></tr>
</table>

Please refer to [IANA AEAD registry](https://www.iana.org/assignments/aead-parameters/aead-parameters.xhtml) for naming scheme and specification.


The way Shadowsocks using AEAD ciphers is specified in [SIP004] and amended in [SIP007]. [SIP004] was proposed by [@Mygod] with design inspirations from [@wongsyrone], [@Noisyfox] and [@breakwa11]. [SIP007] was proposed by [@riobard] with input from [@madeye], [@Mygod], [@wongsyrone], and many others.




## Key Derivation

The master key can be input directly from user or generated from a password. The key derivation is still following EVP_BytesToKey(3) in OpenSSL. The detailed spec can be found here: https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)

[HKDF_SHA1] is a function that takes a secret key, a non-secret salt, an info string, and produces a subkey that is cryptographically strong even if the input secret key is weak.

```
    HKDF_SHA1(key, salt, info) => subkey
```

The info string binds the generated subkey to a specific application context. In our case, it must be the string "ss-subkey" without quotes. 

We derive a per-session subkey from a pre-shared master key using HKDF_SHA1. Salt must be unique through the entire life of the pre-shared master key.


## Authenticated Encryption/Decryption


AE_encrypt is a function that takes a secret key, a non-secret nonce, a message, and produces ciphertext and authentication tag. Nonce must be unique for a given key in each invocation. 

```
    AE_encrypt(key, nonce, message) => (ciphertext, tag)
```



AE_decrypt is a function that takes a secret key, non-secret nonce, ciphertext, authentication tag, and produces original message. If any of the input is tampered with, decryption will fail.

```
    AE_decrypt(key, nonce, ciphertext, tag) => message
```

## TCP

An AEAD encrypted TCP stream starts with a randomly generated salt to derive the per-session subkey, followed by any number of encrypted chunks. Each chunk has the following structure:

```
    [encrypted payload length][length tag][encrypted payload][payload tag]
```

Payload length is a 2-byte big-endian unsigned integer capped at 0x3FFF. The higher two bits are reserved and must be set to zero. Payload is therefore limited to 16*1024 - 1 bytes. 

The first AEAD encrypt/decrypt operation uses a counting nonce starting from 0. After each encrypt/decrypt operation, the nonce is incremented by one as if it were an unsigned little-endian integer. Note that each TCP chunk involves two AEAD encrypt/decrypt operation: one for the payload length, and one for the payload. Therefore each chunk increases the nonce twice.


## UDP

An AEAD encrypted UDP packet has the following structure

```
    [salt][encrypted payload][tag]
```

The salt is used to derive the per-session subkey and must be generated randomly to ensure uniqueness. Each UDP packet is encrypted/decrypted independently, using the derived subkey and a nonce with all zero bytes.



[AEAD]: https://en.wikipedia.org/wiki/Authenticated_encryption
[SIP004]: https://github.com/shadowsocks/shadowsocks-org/issues/30
[SIP007]: https://github.com/shadowsocks/shadowsocks-org/issues/42
[@Mygod]: https://github.com/Mygod
[@madeye]: https://github.com/madeye
[@wongsyrone]: https://github.com/wongsyrone
[@breakwa11]: https://github.com/breakwa11
[@riobard]: https://github.com/riobard
[@Noisyfox]: https://github.com/noisyfox
[HKDF_SHA1]: https://tools.ietf.org/html/rfc5869