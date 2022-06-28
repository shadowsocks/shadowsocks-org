***Stream ciphers are completely broken and will be removed soon. New users must use [AEAD ciphers](/guide/aead).***

This historic document is for educational purposes only.


## Stream Encryption/Decryption

Stream_encrypt is a function that takes a secret key, an initialization vector, a message, and produces a ciphertext with the same length as the message.

    Stream_encrypt(key, IV, message) => ciphertext

Stream_decrypt is a function that takes a secret key, an initializaiton vector, a ciphertext, and produces the original message.

    Stream_decrypt(key, IV, ciphertext) => message

The key can be input directly from user or generated from a password. The key derivation is following `EVP_BytesToKey(3)` in OpenSSL. The detailed spec can be found here: https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)

## TCP

A stream cipher encrypted TCP stream starts with a randomly generated initializaiton vector, followed by encrypted payload data.

    [IV][encrypted payload]



## UDP

A stream cipher encrypted UDP packet has the following structure

    [IV][encrypted payload]

 Each UDP packet is encrypted/decrypted independently with a randomly generated initialization vector.



## Historic stream ciphers

<table>
  <tr><th>Name</th><th>Key Size</th><th>IV Length</th></tr>
  <tr><td>aes-128-ctr</td><td>16</td><td>16</td></tr>
  <tr><td>aes-192-ctr</td><td>24</td><td>16</td></tr>
  <tr><td>aes-256-ctr</td><td>32</td><td>16</td></tr>
  <tr><td>aes-128-cfb</td><td>16</td><td>16</td></tr>
  <tr><td>aes-192-cfb</td><td>24</td><td>16</td></tr>
  <tr><td>aes-256-cfb</td><td>32</td><td>16</td></tr>
  <tr><td>camellia-128-cfb</td><td>16</td><td>16</td></tr>
  <tr><td>camellia-192-cfb</td><td>24</td><td>16</td></tr>
  <tr><td>camellia-256-cfb</td><td>32</td><td>16</td></tr>
  <tr><td>chacha20-ietf</td><td>32</td><td>12</td></tr>
  <tr><td>bf-cfb</td><td>16</td><td>8</td></tr>
  <tr><td>chacha20</td><td>32</td><td>8</td></tr>
  <tr><td>salsa20</td><td>32</td><td>8</td></tr>
  <tr><td>rc4-md5</td><td>16</td><td>16</td></tr>
</table>



[Stream ciphers]: https://en.wikipedia.org/wiki/Stream_cipher
[#36]: https://github.com/shadowsocks/shadowsocks-org/issues/36