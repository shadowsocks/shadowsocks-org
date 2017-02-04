<br/>

## Recommended

The following AEAD ciphers are recommended.

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Key Size</th>
    <th>IV Length</th>
    <th>Tag Length</th>
  </tr>

  <tr>
    <td>xchacha20-ietf-poly1305</td>
    <td>32</td>
    <td>24</td>
    <td>16</td>
  </tr>

  <tr>
    <td>chacha20-ietf-poly1305</td>
    <td>32</td>
    <td>12</td>
    <td>16</td>
  </tr>

  <tr>
    <td>aes-256-gcm</td>
    <td>32</td>
    <td>12</td>
    <td>16</td>
  </tr>

  <tr>
    <td>aes-192-gcm</td>
    <td>24</td>
    <td>12</td>
    <td>16</td>
  </tr>

  <tr>
    <td>aes-128-gcm</td>
    <td>16</td>
    <td>12</td>
    <td>16</td>
  </tr>

</table>



## Deprecated

The following stream ciphers still work and provide reasonable safety margin.
However, users should use the above recommended AEAD ciphers if possible.

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Key Size</th>
    <th>IV Length</th>
  </tr>
  <tr>
    <td>aes-128-ctr</td>
    <td>16</td>
    <td>16</td>
  </tr>
  <tr>
    <td>aes-192-ctr</td>
    <td>24</td>
    <td>16</td>
  </tr>
  <tr>
    <td>aes-256-ctr</td>
    <td>32</td>
    <td>16</td>
  </tr>
  <tr>
    <td>aes-128-cfb</td>
    <td>16</td>
    <td>16</td>
  </tr>
  <tr>
    <td>aes-192-cfb</td>
    <td>24</td>
    <td>16</td>
  </tr>
  <tr>
    <td>aes-256-cfb</td>
    <td>32</td>
    <td>16</td>
  </tr>

  <tr>
    <td>camellia-128-cfb</td>
    <td>16</td>
    <td>16</td>
  </tr>
  <tr>
    <td>camellia-192-cfb</td>
    <td>24</td>
    <td>16</td>
  </tr>
  <tr>
    <td>camellia-256-cfb</td>
    <td>32</td>
    <td>16</td>
  </tr>
  <tr>
    <td>chacha20-ietf</td>
    <td>32</td>
    <td>12</td>
  </tr>
  
</table>


## Dangerous

The following stream ciphers are vulnerable to various attacks. Please DO NOT use them.
Implementors are advised to remove them as soon as possible.

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Key Size</th>
    <th>IV Length</th>
  </tr>
  
  <tr>
    <td>bf-cfb</td>
    <td>16</td>
    <td>8</td>
  </tr>

  <tr>
    <td>chacha20</td>
    <td>32</td>
    <td>8</td>
  </tr>

  <tr>
    <td>salsa20</td>
    <td>32</td>
    <td>8</td>
  </tr>

  <tr>
    <td>rc4-md5</td>
    <td>16</td>
    <td>16</td>
  </tr>
</table>