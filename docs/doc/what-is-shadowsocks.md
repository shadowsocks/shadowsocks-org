# What is Shadowsocks?

Shadowsocks is a secure split proxy loosely based on [SOCKS5](https://tools.ietf.org/html/rfc1928).

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 70" style="display:block;margin:1em auto;width:100%;height:auto;max-width:720px" role="img" aria-label="Shadowsocks data flow: client to ss-local to ss-remote to target, with encrypted link between ss-local and ss-remote">
  <defs>
    <marker id="ss-arr-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="none" stroke="currentColor">
    <rect x="10" y="15" width="90" height="40" rx="4"/>
    <rect x="180" y="15" width="100" height="40" rx="4"/>
    <rect x="440" y="15" width="100" height="40" rx="4"/>
    <rect x="620" y="15" width="90" height="40" rx="4"/>
    <line x1="100" y1="35" x2="180" y2="35" marker-start="url(#ss-arr-1)" marker-end="url(#ss-arr-1)"/>
    <line x1="280" y1="35" x2="440" y2="35" marker-start="url(#ss-arr-1)" marker-end="url(#ss-arr-1)"/>
    <line x1="540" y1="35" x2="620" y2="35" marker-start="url(#ss-arr-1)" marker-end="url(#ss-arr-1)"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="14" text-anchor="middle">
    <text x="55" y="40">client</text>
    <text x="230" y="40">ss-local</text>
    <text x="490" y="40">ss-remote</text>
    <text x="665" y="40">target</text>
    <text x="360" y="28" font-size="11">encrypted</text>
  </g>
</svg>


The Shadowsocks local component (ss-local) acts like a traditional SOCKS5 server and provides proxy service to clients. It encrypts and forwards data streams and packets from the client to the Shadowsocks remote component (ss-remote), which decrypts and forwards to the target. Replies from target are similarly encrypted and relayed by ss-remote back to ss-local, which decrypts and eventually returns to the original client.

## Addressing

Addresses used in Shadowsocks follow the [SOCKS5 address format](https://tools.ietf.org/html/rfc1928#section-5):

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 60" style="display:block;margin:1em auto;width:100%;height:auto;max-width:540px" role="img" aria-label="SOCKS5 address format: 1-byte type, variable-length host, 2-byte port">
  <g fill="none" stroke="currentColor">
    <rect x="10" y="10" width="520" height="40" rx="3"/>
    <line x1="130" y1="10" x2="130" y2="50"/>
    <line x1="410" y1="10" x2="410" y2="50"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" text-anchor="middle">
    <text x="70" y="28" font-size="13">type</text>
    <text x="70" y="44" font-size="11" opacity="0.7">1B</text>
    <text x="270" y="28" font-size="13">host</text>
    <text x="270" y="44" font-size="11" opacity="0.7">variable</text>
    <text x="470" y="28" font-size="13">port</text>
    <text x="470" y="44" font-size="11" opacity="0.7">2B</text>
  </g>
</svg>

The following address types are defined:

- `0x01`: host is a 4-byte IPv4 address.
- `0x03`: host is a variable length string, starting with a 1-byte length, followed by up to 255-byte domain name.
- `0x04`: host is a 16-byte IPv6 address.

The port number is a 2-byte big-endian unsigned integer.


## TCP 

ss-local initiates a TCP connection to ss-remote by sending an encrypted data stream starting with the target address followed by payload data. The exact encryption scheme differs depending on the cipher used.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 40" style="display:block;margin:1em auto;width:100%;height:auto;max-width:480px" role="img" aria-label="TCP stream payload format: target address followed by payload">
  <g fill="none" stroke="currentColor">
    <rect x="10" y="5" width="460" height="30" rx="3"/>
    <line x1="210" y1="5" x2="210" y2="35"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="13" text-anchor="middle">
    <text x="110" y="24">target address</text>
    <text x="340" y="24">payload</text>
  </g>
</svg>

ss-remote receives the encrypted data stream, decrypts and parses the leading target address. It then establishes a new TCP connection to the target and forwards payload data to it. ss-remote receives reply from the target, encrypts and forwards it back to the ss-local, until ss-local disconnects.

For better obfuscation purposes, both local and remote SHOULD send the handshake data along with some payload in the first packet.

## UDP

ss-local sends an encrypted data packet containing the target address and payload to ss-remote.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 40" style="display:block;margin:1em auto;width:100%;height:auto;max-width:480px" role="img" aria-label="UDP packet payload format: target address followed by payload">
  <g fill="none" stroke="currentColor">
    <rect x="10" y="5" width="460" height="30" rx="3"/>
    <line x1="210" y1="5" x2="210" y2="35"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="13" text-anchor="middle">
    <text x="110" y="24">target address</text>
    <text x="340" y="24">payload</text>
  </g>
</svg>

Upon receiving the encrypted packet, ss-remote decrypts and parses the target address. It then sends a new data packet containing only the payload to the target. ss-remote receives data packets back from target and prepends the target address to the payload in each packet, then sends encrypted copies back to ss-local.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 40" style="display:block;margin:1em auto;width:100%;height:auto;max-width:480px" role="img" aria-label="UDP reply packet format: target address followed by payload">
  <g fill="none" stroke="currentColor">
    <rect x="10" y="5" width="460" height="30" rx="3"/>
    <line x1="210" y1="5" x2="210" y2="35"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="13" text-anchor="middle">
    <text x="110" y="24">target address</text>
    <text x="340" y="24">payload</text>
  </g>
</svg>

Essentially, ss-remote is performing Network Address Translation for ss-local.