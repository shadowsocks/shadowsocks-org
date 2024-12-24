import{_ as t,c as e,o as a,R as r}from"./chunks/framework.bdd825cc.js";const u=JSON.parse('{"title":"Stream ciphers","description":"","frontmatter":{},"headers":[],"relativePath":"doc/stream.md","filePath":"doc/stream.md","lastUpdated":1735026824000}'),s={name:"doc/stream.md"},d=r('<h1 id="stream-ciphers" tabindex="-1">Stream ciphers <a class="header-anchor" href="#stream-ciphers" aria-label="Permalink to &quot;Stream ciphers&quot;">​</a></h1><p><em><strong>Stream ciphers are completely broken and will be removed soon. New users must use <a href="/doc/aead.html">AEAD ciphers</a>.</strong></em></p><p>This historic document is for educational purposes only.</p><h2 id="stream-encryption-decryption" tabindex="-1">Stream Encryption/Decryption <a class="header-anchor" href="#stream-encryption-decryption" aria-label="Permalink to &quot;Stream Encryption/Decryption&quot;">​</a></h2><p>Stream_encrypt is a function that takes a secret key, an initialization vector, a message, and produces a ciphertext with the same length as the message.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Stream_encrypt(key, IV, message) =&gt; ciphertext</span></span></code></pre></div><p>Stream_decrypt is a function that takes a secret key, an initializaiton vector, a ciphertext, and produces the original message.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Stream_decrypt(key, IV, ciphertext) =&gt; message</span></span></code></pre></div><p>The key can be input directly from user or generated from a password. The key derivation is following <code>EVP_BytesToKey(3)</code> in OpenSSL. The detailed spec can be found here: <a href="https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)" target="_blank" rel="noreferrer">https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)</a></p><h2 id="tcp" tabindex="-1">TCP <a class="header-anchor" href="#tcp" aria-label="Permalink to &quot;TCP&quot;">​</a></h2><p>A stream cipher encrypted TCP stream starts with a randomly generated initializaiton vector, followed by encrypted payload data.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[IV][encrypted payload]</span></span></code></pre></div><h2 id="udp" tabindex="-1">UDP <a class="header-anchor" href="#udp" aria-label="Permalink to &quot;UDP&quot;">​</a></h2><p>A stream cipher encrypted UDP packet has the following structure</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[IV][encrypted payload]</span></span></code></pre></div><p>Each UDP packet is encrypted/decrypted independently with a randomly generated initialization vector.</p><h2 id="historic-stream-ciphers" tabindex="-1">Historic stream ciphers <a class="header-anchor" href="#historic-stream-ciphers" aria-label="Permalink to &quot;Historic stream ciphers&quot;">​</a></h2><table><tr><th>Name</th><th>Key Size</th><th>IV Length</th></tr><tr><td>aes-128-ctr</td><td>16</td><td>16</td></tr><tr><td>aes-192-ctr</td><td>24</td><td>16</td></tr><tr><td>aes-256-ctr</td><td>32</td><td>16</td></tr><tr><td>aes-128-cfb</td><td>16</td><td>16</td></tr><tr><td>aes-192-cfb</td><td>24</td><td>16</td></tr><tr><td>aes-256-cfb</td><td>32</td><td>16</td></tr><tr><td>camellia-128-cfb</td><td>16</td><td>16</td></tr><tr><td>camellia-192-cfb</td><td>24</td><td>16</td></tr><tr><td>camellia-256-cfb</td><td>32</td><td>16</td></tr><tr><td>chacha20-ietf</td><td>32</td><td>12</td></tr><tr><td>bf-cfb</td><td>16</td><td>8</td></tr><tr><td>chacha20</td><td>32</td><td>8</td></tr><tr><td>salsa20</td><td>32</td><td>8</td></tr><tr><td>rc4-md5</td><td>16</td><td>16</td></tr></table>',18),i=[d];function c(n,o,p,l,h,m){return a(),e("div",null,i)}const g=t(s,[["render",c]]);export{u as __pageData,g as default};