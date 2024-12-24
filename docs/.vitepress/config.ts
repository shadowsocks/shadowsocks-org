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
      '/doc': sidebardoc()
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
      appId: 'NCNKXBRNNU',
      apiKey: '56f1b2465364d7fb7a61745427467c43',
      indexName: 'shadowsocks'
    },
  }
}

function nav() {
  return [
    { text: 'Documentation', link: '/doc/what-is-shadowsocks', activeMatch: '/doc/' },
    {
      text: 'Github Issues',
      link: 'https://github.com/shadowsocks/shadowsocks-org/issues'
    },
    {
      text: 'Community',
      link: 'https://discourse.shadowsocks.org/'
    }
  ]
}

function sidebardoc() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is Shadowsocks?', link: '/doc/what-is-shadowsocks' },
        { text: 'Getting Started', link: '/doc/getting-started' },
        { text: 'Deploying', link: '/doc/deploying' }
      ]
    },
    {
      text: 'Configuration',
      collapsible: true,
      items: [
        { text: 'Config Format', link: '/doc/configs' },
        { text: 'Advanced', link: '/doc/advanced' }
      ]
    },
    {
      text: 'Ciphers',
      collapsible: true,
      items: [
        {
          text: 'AEAD',
          link: '/doc/aead'
        },
        {
          text: 'Stream',
          link: '/doc/stream'
        }
      ]
    },
    {
      text: 'SIPs',
      collapsible: true,
      items: [
        {
          text: 'What is SIP?',
          link: '/doc/what-is-sip'
        },
        {
          text: 'SIP002 URI Scheme',
          link: '/doc/sip002'
        },
        {
          text: 'SIP003 Plugin',
          link: '/doc/sip003'
        },
        {
          text: 'SIP008 Online Configuration Delivery',
          link: '/doc/sip008'
        },
        {
          text: 'SIP022 AEAD-2022 Ciphers',
          link: '/doc/sip022'
        },
        {
          text: 'SIP023 Extensible Identity Headers',
          link: '/doc/sip023'
        }
      ]
    },
    {
      text: 'About',
      collapsible: true,
      items: [
        { text: 'Contributors', link: '/doc/contributors' }
      ]
    }
  ]
}