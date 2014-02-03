## Optimize the shadowsocks server on Linux

This article is originally posted on [Lv. MAX](https://maxlv.net/optimize-a-shadowsocks-server/).

First of all, upgrade your Linux kerenl to 3.5 or later.

### Step 1, increase the maximum number of open file descriptors

To handle thousands of concurrent TCP connections, we should increase the limit
of open file descriptors.

Edit the `limits.conf`

```bash
vi /etc/security/limits.conf
```

Add these two lines

```
* soft nofile 51200
* hard nofile 51200
```

Then, before you start the shadowsocks server, make sure to set the ulimit first

```bash
ulimit -n 51200
```

### Step 2, Optimize the kernel parameters

There are several kernel parameters needed to be tuned for shadowsocks. The
priciples are

1. Reuse ports and conections as soon as possible.
2. Enlarge the queues and buffers as large as possible.
3. Choose the TCP congestion algorithm for large latency and high throughput.

Here is an example `/etc/sysctl.conf` of our production servers:

```
net.core.wmem_max = 12582912
net.core.rmem_max = 12582912
net.ipv4.tcp_rmem = 10240 87380 12582912
net.ipv4.tcp_wmem = 10240 87380 12582912
net.ipv4.ip_local_port_range = 18000    65535
net.ipv4.netfilter.ip_conntrack_tcp_timeout_time_wait = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_max_syn_backlog = 3240000
net.core.somaxconn = 3240000
net.ipv4.tcp_max_tw_buckets = 1440000
net.ipv4.tcp_congestion_control = hybla
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 15
net.ipv4.tcp_syn_retries = 2
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_tw_recycle = 1
```

Of course, remember to execute `sysctl -p` to reload the config at runtime.

### How to verify your optimizations work

Use munin or any server monitor tools to generate the graph of your TCP
connections. A well tuned server should look like this

![one month munin TCP graph](http://ww4.sinaimg.cn/large/61b416b1gw1e9jmyps9vpj20dt0b4wg7.jpg)
