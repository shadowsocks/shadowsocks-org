# Getting Started

First, you need to pick a shadowsocks server and client implementation. Any implementation below is compatible with each other.

## Servers

- [shadowsocks][ss]: The original Python implementation.
- [shadowsocks-libev][ss-libev]: Lightweight C implementation for embedded devices and low end boxes. Very small footprint (several megabytes) for thousands of connections.
- [go-shadowsocks2][go-ss2]: Go implementation focusing on core features and code reusability.
- [shadowsocks-rust][ss-rust]: A rust port of shadowsocks.


### Feature comparison


<table>
<thead>
<tr>
<th></th>
<th><a href="https://github.com/shadowsocks/shadowsocks">ss</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-libev">ss-libev</a></th>
<th><a href="https://github.com/shadowsocks/go-shadowsocks2">go-ss2</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-rust">ss-rust</a></th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://en.wikipedia.org/wiki/TCP_Fast_Open">TCP Fast Open</a></td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/shadowsocks/shadowsocks/wiki/Configure-Multiple-Users">Multiuser</a></td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/shadowsocks/shadowsocks/wiki/Manage-Multiple-Users">Management API</a></td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>Redirect mode</td>
<td>✗</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>Tunnel mode</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>UDP Relay</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="AEAD-Ciphers">AEAD ciphers</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="Plugin">Plugin</a></td>
<td>✗</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
</tbody>
</table>

## Clients

- [shadowsocks-android][ss-android]: Android client.
- [shadowsocks-windows][ss-win]: Windows client.
- [shadowsocksX-NG][ssx-ng]: MacOS client.
- [shadowsocks-qt5][ss-qt5]: Cross-platform client for Windows/MacOS/Linux.



### Feature comparison


<table>
<thead>
<tr>
<th></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-csharp">ss-win</a></th>
<th><a href="https://github.com/shadowsocks/ShadowsocksX-NG">ssx-ng</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-qt5">ss-qt5</a></th>
<th><a href="https://github.com/shadowsocks/shadowsocks-android">ss-android</a></th>
</tr>
</thead>
<tbody>
<tr>
<td>System Proxy</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>CHNRoutes</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>PAC Configuration</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✗</td>
</tr>
<tr>
<td>Profile Switching</td>
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
</tr>
<tr>
<td>QR Code Generation</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
</tbody>
</table>



[ss]: https://github.com/shadowsocks/shadowsocks
[ss-libev]: https://github.com/shadowsocks/shadowsocks-libev
[go-ss2]: https://github.com/shadowsocks/go-shadowsocks2
[ss-rust]: https://github.com/shadowsocks/shadowsocks-rust
[ss-win]: https://github.com/shadowsocks/shadowsocks-csharp
[ssx-ng]: https://github.com/shadowsocks/ShadowsocksX-NG
[ss-qt5]: https://github.com/shadowsocks/shadowsocks-qt5
[ss-android]: https://github.com/shadowsocks/shadowsocks-android