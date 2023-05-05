import{_ as s,c as e,o as a,R as n}from"./chunks/framework.8deae197.js";const u=JSON.parse('{"title":"Advanced configurations","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced.md","filePath":"guide/advanced.md","lastUpdated":1683253111000}'),o={name:"guide/advanced.md"},t=n(`<h1 id="advanced-configurations" tabindex="-1">Advanced configurations <a class="header-anchor" href="#advanced-configurations" aria-label="Permalink to &quot;Advanced configurations&quot;">​</a></h1><h2 id="optimize-the-shadowsocks-server-on-linux" tabindex="-1">Optimize the shadowsocks server on Linux <a class="header-anchor" href="#optimize-the-shadowsocks-server-on-linux" aria-label="Permalink to &quot;Optimize the shadowsocks server on Linux&quot;">​</a></h2><p>First of all, upgrade your Linux kernel to 3.5 or later.</p><h3 id="step-1-increase-the-maximum-number-of-open-file-descriptors" tabindex="-1">Step 1, increase the maximum number of open file descriptors <a class="header-anchor" href="#step-1-increase-the-maximum-number-of-open-file-descriptors" aria-label="Permalink to &quot;Step 1, increase the maximum number of open file descriptors&quot;">​</a></h3><p>To handle thousands of concurrent TCP connections, we should increase the limit of file descriptors opened.</p><p>Edit the <code>limits.conf</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/security/limits.conf</span></span></code></pre></div><p>Add these two lines</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">* soft nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;">* hard nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># for server running in root:</span></span>
<span class="line"><span style="color:#A6ACCD;">root soft nofile 51200</span></span>
<span class="line"><span style="color:#A6ACCD;">root hard nofile 51200</span></span></code></pre></div><p>Then, before you start the shadowsocks server, set the ulimit first</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">ulimit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">51200</span></span></code></pre></div><h3 id="step-2-tune-the-kernel-parameters" tabindex="-1">Step 2, Tune the kernel parameters <a class="header-anchor" href="#step-2-tune-the-kernel-parameters" aria-label="Permalink to &quot;Step 2, Tune the kernel parameters&quot;">​</a></h3><p>The priciples of tuning parameters for shadowsocks are</p><ol><li>Reuse ports and conections as soon as possible.</li><li>Enlarge the queues and buffers as large as possible.</li><li>Choose the TCP congestion algorithm for large latency and high throughput.</li></ol><p>Here is an example <code>/etc/sysctl.conf</code> of our production servers:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">fs.file-max = 51200</span></span>
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
<span class="line"><span style="color:#A6ACCD;">net.ipv4.tcp_congestion_control = hybla</span></span></code></pre></div><p>Of course, remember to execute <code>sysctl -p</code> to reload the config at runtime.</p>`,17),p=[t];function l(c,i,r,d,h,C){return a(),e("div",null,p)}const A=s(o,[["render",l]]);export{u as __pageData,A as default};
