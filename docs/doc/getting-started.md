# Getting Started

First, you need to pick a shadowsocks server and client implementation. Any implementation below is compatible with each other.

## CLI implementations

- [shadowsocks-libev][ss-libev]: Lightweight C implementation for embedded devices and low end boxes. Very small footprint (several megabytes) for thousands of connections.
- [go-shadowsocks2][go-ss2]: Go implementation focusing on core features and code reusability.
- [shadowsocks-rust][ss-rust]: A rust port of shadowsocks.


### Feature comparison


<table>
<thead>
<tr>
<th></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-libev">ss-libev</a></th>
<th><a href="https://github.com/shadowsocks/go-shadowsocks2">go-ss2</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-rust">ss-rust</a></th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://en.wikipedia.org/wiki/TCP_Fast_Open">TCP Fast Open</a></td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>Multiuser</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>Management API</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>Redirect mode</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>Tunnel mode</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>UDP Relay</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://en.wikipedia.org/wiki/Multipath_TCP">MPTCP</a></td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td><a href="aead">AEAD ciphers</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="sip003">Plugin</a></td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/shadowsocks/shadowsocks-org/issues/180">Plugin UDP (Experimental)</a></td>
<td>✗</td>
<td>✗</td>
<td>✓</td>
</tr>
</tbody>
</table>

## GUI Clients

- [meow][meow-ios]: iOS client.
- [shadowsocks-android][ss-android]: Android client.
- [shadowsocks-windows][ss-win]: Windows client.
- [shadowsocksX-NG][ssx-ng]: MacOS client.
- [shadowsocks-qt5][ss-qt5]: Cross-platform client for Windows/MacOS/Linux.

### Recommended iOS client: meow

[meow][meow-ios] is the recommended Shadowsocks client for iOS. Its core Shadowsocks-related features are:

- Shadowsocks outbound protocol support, powered by the meow-rs engine (Trojan and VLESS outbounds are also available).
- AEAD ciphers (aes-128-gcm, aes-192-gcm, aes-256-gcm, chacha20-ietf-poly1305, xchacha20-ietf-poly1305) and [SIP022](sip022) AEAD-2022 ciphers (2022-blake3-aes-128-gcm, 2022-blake3-aes-256-gcm, 2022-blake3-chacha20-poly1305).
- [SIP002](sip002) `ss://` share links via manual paste or QR code scan, including the plain `method:password` userinfo form used by AEAD-2022, and the legacy base64 form.
- [SIP003](sip003) plugins, implemented natively in-process (iOS does not allow plugin subprocesses): simple-obfs (`obfs-local`, http and tls modes) and v2ray-plugin (WebSocket with optional TLS).
- System-wide VPN via a NetworkExtension packet tunnel — no per-app configuration required.
- UDP relay (QUIC/HTTP3 reliability depends on the outbound proxy and may fall back to TCP).
- Rule-based routing with domain, IP, GeoIP, and GeoSITE rules, plus CN-IP TCP bypass for split routing.
- DNS over HTTPS.
- Clash-style YAML subscriptions with profile switching, per-app proxy group selection, and latency testing.
- Live traffic throughput monitoring and per-day usage charts.
- Runs fully on-device with no data collection. Requires iOS 17+; distributed via TestFlight.



### Feature comparison

For meow's full iOS feature set, see the section above.

<table>
<thead>
<tr>
<th></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-csharp">ss-win</a></th>
<th><a href="https://github.com/shadowsocks/ShadowsocksX-NG">ssx-ng</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-qt5">ss-qt5</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-android">ss-android</a></th>
<th><a href="https://madeye.github.io/meow-ios/">meow</a></th>
</tr>
</thead>
<tbody>
<tr>
<td>System Proxy</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>CHNRoutes</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>PAC Configuration</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✗</td>
<td>✗</td>
</tr>
<tr>
<td>Profile Switching</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>QR Code Scan</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>QR Code Generation</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
</tr>
</tbody>
</table>



[ss-libev]: https://github.com/shadowsocks/shadowsocks-libev
[go-ss2]: https://github.com/shadowsocks/go-shadowsocks2
[ss-rust]: https://github.com/shadowsocks/shadowsocks-rust
[ss-win]: https://github.com/shadowsocks/shadowsocks-csharp
[ssx-ng]: https://github.com/shadowsocks/ShadowsocksX-NG
[ss-qt5]: https://github.com/shadowsocks/shadowsocks-qt5
[ss-android]: https://github.com/shadowsocks/shadowsocks-android
[meow-ios]: https://madeye.github.io/meow-ios/
