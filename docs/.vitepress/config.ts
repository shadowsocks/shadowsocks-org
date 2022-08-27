export default {
  lang: 'en-US',
  title: 'Shadowsocks',
  description: 'A fast tunnel proxy that helps you bypass firewalls.',

  lastUpdated: true,

  head: [
    ['script', {src: 'https://www.googletagmanager.com/gtag/js?id=G-NX48EZF634'}],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-NX48EZF634');`]
  ],

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide': sidebarGuide()
    },

    editLink: {
      pattern: 'https://github.com/shadowsocks/shadowsocks-org/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shadowsocks/shadowsocks-org' }
    ],

    footer: {
      message: 'This website is released under the MIT License.',
      copyright: 'Copyright © 2022 Shadowsocks contributors'
    },

    algolia: {
      appId: '63UAAQ8ZPC',
      apiKey: '6807c68bb3792d05a235f3f7eb93a0cf',
      indexName: 'shadowsocks_org'
    },
  }
}

function nav() {
  return [
    { text: 'Guide', link: '/guide/what-is-shadowsocks', activeMatch: '/guide/' },
    {
      text: 'Github Issues',
      link: 'https://github.com/shadowsocks/shadowsocks-org/issues'
    },
    {
      text: 'Community',
      link: 'https://github.com/shadowsocks/shadowsocks-org/discussions'
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is Shadowsocks?', link: '/guide/what-is-shadowsocks' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Deploying', link: '/guide/deploying' }
      ]
    },
    {
      text: 'Configuration',
      collapsible: true,
      items: [
        { text: 'Config Format', link: '/guide/configs' },
        { text: 'Advanced', link: '/guide/advanced' }
      ]
    },
    {
      text: 'Ciphers',
      collapsible: true,
      items: [
        {
          text: 'AEAD',
          link: '/guide/aead'
        },
        {
          text: 'Stream',
          link: '/guide/stream'
        }
      ]
    },
    {
      text: 'SIPs',
      collapsible: true,
      items: [
        {
          text: 'What is SIP?',
          link: '/guide/what-is-sip'
        },
        {
          text: 'SIP002 URI Scheme',
          link: '/guide/sip002'
        },
        {
          text: 'SIP003 Plugin',
          link: '/guide/sip003'
        },
        {
          text: 'SIP008 Online Configuration Delivery',
          link: '/guide/sip008'
        }
      ]
    },
    {
      text: 'About',
      collapsible: true,
      items: [
        { text: 'Contributors', link: '/guide/contributors' }
      ]
    }
  ]
}