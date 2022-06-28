# What is Shadowsocks?

Shadowsocks is a secure split proxy loosely based on [SOCKS5](https://tools.ietf.org/html/rfc1928).


    client <---> ss-local <--[encrypted]--> ss-remote <---> target


The Shadowsocks local component (ss-local) acts like a traditional SOCKS5 server and provides proxy service to clients. It encrypts and forwards data streams and packets from the client to the Shadowsocks remote component (ss-remote), which decrypts and forwards to the target. Replies from target are similarly encrypted and relayed by ss-remote back to ss-local, which decrypts and eventually returns to the original client.

## Addressing

Addresses used in Shadowsocks follow the [SOCKS5 address format](https://tools.ietf.org/html/rfc1928#section-5):

    [1-byte type][variable-length host][2-byte port]

The following address types are defined:

- `0x01`: host is a 4-byte IPv4 address.
- `0x03`: host is a variable length string, starting with a 1-byte length, followed by up to 255-byte domain name.
- `0x04`: host is a 16-byte IPv6 address.

The port number is a 2-byte big-endian unsigned integer.


## TCP 

ss-local initiates a TCP connection to ss-remote by sending an encrypted data stream starting with the target address followed by payload data. The exact encryption scheme differs depending on the cipher used.

    [target address][payload]

ss-remote receives the encrypted data stream, decrypts and parses the leading target address. It then establishes a new TCP connection to the target and forwards payload data to it. ss-remote receives reply from the target, encrypts and forwards it back to the ss-local, until ss-local disconnects.

For better obfuscation purposes, both local and remote SHOULD send the handshake data along with some payload in the first packet.

## UDP

ss-local sends an encrypted data packet containing the target address and payload to ss-remote.

    [target address][payload]

Upon receiving the encrypted packet, ss-remote decrypts and parses the target address. It then sends a new data packet containing only the payload to the target. ss-remote receives data packets back from target and prepends the target address to the payload in each packet, then sends encrypted copies back to ss-local.

    [target address][payload]

Essentially, ss-remote is performing Network Address Translation for ss-local.