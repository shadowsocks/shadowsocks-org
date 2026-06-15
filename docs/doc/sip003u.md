# SIP003u: UDP extension for SIP003 plugins

## Abstract

The original proposal of [SIP003](/doc/sip003) didn't include support for UDP. The lack of UDP support has significantly limited the possible use cases of SIP003. There are reports that Shadowsocks UDP data flows are blocked or detected by malicious third parties. By allowing plugins to transport UDP, it becomes possible to implement features like UDP obfuscation and UDP-over-TCP (UoT).

SIP003u extends SIP003 so that a plugin can tunnel UDP traffic in addition to TCP, while remaining fully backward compatible with plain SIP003.

## Implementation requirements

1. A plugin that supports SIP003u **MUST** support [SIP003](/doc/sip003).

## Passing arguments to a plugin

Arguments are passed exactly the same way as in [SIP003](/doc/sip003), through environment variables (`SS_REMOTE_HOST`, `SS_REMOTE_PORT`, `SS_LOCAL_HOST`, `SS_LOCAL_PORT` and the optional `SS_PLUGIN_OPTIONS`).

## Implementation details

### Default behavior

SIP003u is **disabled by default** in all Shadowsocks implementations. Any plugin that supports SIP003u should still be able to run with implementations that only support [SIP003](/doc/sip003).

### Configuration

A Shadowsocks implementation should add a new configuration key to enable SIP003u. The recommended key is `plugin_mode` in the basic configuration format:

```jsonc
{
    "plugin": "PLUGIN program",
    "plugin_opts": "PLUGIN options",
    // plugin_mode can be:
    //    - "tcp_only" (default) - SIP003
    //    - "tcp_and_udp"        - SIP003u
    //    - "udp_only"           - SIP003u
    "plugin_mode": "tcp_and_udp"
}
```

The plugin itself does not need to know `plugin_mode`. `plugin_mode` only affects which addresses `sslocal`/`ssserver` listen on or connect to. A plugin that supports SIP003u can always listen on both TCP and UDP, even when the Shadowsocks implementation only supports SIP003.

### Listening and forwarding

A plugin starts a UDP listener that `bind()`s to exactly the same address and port as in [SIP003](/doc/sip003). Specifically:

1. A plugin running on the local side (client) creates a UDP socket that `bind()`s to the address specified by `SS_LOCAL_HOST` and `SS_LOCAL_PORT`, and receives local UDP packets from this address.
2. A plugin running on the remote side (server) sends received UDP packets to the address specified by `SS_LOCAL_HOST` and `SS_LOCAL_PORT`.

The plugin is responsible for maintaining a full-cone NAT for UDP associations. A typical UDP relay flow is:

For the local plugin:

1. `recv()` a UDP packet from `sslocal`, with peer address (A).
2. Check whether a tunnel already exists for (A); if not, create one.
3. Send every packet received with peer address (A) into this tunnel.

For the server plugin:

1. Accept a new connection (e.g. a TCP connection) from the local plugin.
2. Create a new UDP socket that `connect()`s to `ssserver`'s UDP port.
3. Read UDP packets from the connection and `sendto()` the UDP socket.

No modifications are needed at the Shadowsocks transport layer between the two plugin endpoints; how UDP is carried over the wire (e.g. UDP-over-TCP, QUIC, multiplexing) is entirely up to the plugin.

## Known good SIP003u plugins

* shadowsocks-yamux-plugin: https://github.com/zonyitoo/shadowsocks-yamux-plugin
* wss-proxy: https://github.com/brevent/wss-proxy

## Implementations supporting SIP003u

* shadowsocks-rust: https://github.com/shadowsocks/shadowsocks-rust
