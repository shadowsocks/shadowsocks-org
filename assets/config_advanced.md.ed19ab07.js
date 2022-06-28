import{_ as s,c as e,o as n,a}from"./app.4486604d.js";const C=JSON.parse('{"title":"Optimize the shadowsocks server on Linux","description":"","frontmatter":{},"headers":[{"level":2,"title":"Optimize the shadowsocks server on Linux","slug":"optimize-the-shadowsocks-server-on-linux"},{"level":3,"title":"Step 1, increase the maximum number of open file descriptors","slug":"step-1-increase-the-maximum-number-of-open-file-descriptors"},{"level":3,"title":"Step 2, Tune the kernel parameters","slug":"step-2-tune-the-kernel-parameters"}],"relativePath":"config/advanced.md","lastUpdated":1656402251000}'),p={name:"config/advanced.md"},o=a(`<h2 id="optimize-the-shadowsocks-server-on-linux" tabindex="-1">Optimize the shadowsocks server on Linux <a class="header-anchor" href="#optimize-the-shadowsocks-server-on-linux" aria-hidden="true">#</a></h2><p>First of all, upgrade your Linux kernel to 3.5 or later.</p><h3 id="step-1-increase-the-maximum-number-of-open-file-descriptors" tabindex="-1">Step 1, increase the maximum number of open file descriptors <a class="header-anchor" href="#step-1-increase-the-maximum-number-of-open-file-descriptors" aria-hidden="true">#</a></h3><p>To handle thousands of concurrent TCP connections, we should increase the limit of file descriptors opened.</p><p>Edit the <code>limits.conf</code></p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">vi /etc/security/limits.conf</span></span>
<span class="line"></span></code></pre></div><p>Add these two lines</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">* soft nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;">* hard nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># for server running in root:</span></span>
<span class="line"><span style="color:#A6ACCD;">root soft nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;">root hard nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Then, before you start the shadowsocks server, set the ulimit first</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">ulimit</span><span style="color:#A6ACCD;"> -n 51200</span></span>
<span class="line"></span></code></pre></div><h3 id="step-2-tune-the-kernel-parameters" tabindex="-1">Step 2, Tune the kernel parameters <a class="header-anchor" href="#step-2-tune-the-kernel-parameters" aria-hidden="true">#</a></h3><p>The priciples of tuning parameters for shadowsocks are</p><ol><li>Reuse ports and conections as soon as possible.</li><li>Enlarge the queues and buffers as large as possible.</li><li>Choose the TCP congestion algorithm for large latency and high throughput.</li></ol><p>Here is an example <code>/etc/sysctl.conf</code> of our production servers:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">fs.file-max = 51200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">net.core.rmem_max = 67108864</span></span>
<span class="line"><span style="color:#A6ACCD;">net.core.wmem_max = 67108864</span></span>
<span class="line"><span style="color:#A6ACCD;">net.core.netdev_max_backlog = 250000</span></span>
<span class="line"><span style="color:#A6ACCD;">net.core.somaxconn = 4096</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_tw_recycle = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_keepalive_time = 1200</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.ip_local_port_range = 10000 65000</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_max_syn_backlog = 8192</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_max_tw_buckets = 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_fastopen = 3</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_mem = 25600 51200 102400</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_rmem = 4096 87380 67108864</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_wmem = 4096 65536 67108864</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_mtu_probing = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_congestion_control = hybla</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Of course, remember to execute <code>sysctl -p</code> to reload the config at runtime.</p>`,16),l=[o];function t(c,r,i,d,h,m){return n(),e("div",null,l)}var u=s(p,[["render",t]]);export{C as __pageData,u as default};
