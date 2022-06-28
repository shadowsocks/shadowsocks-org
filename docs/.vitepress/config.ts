import { defineConfig } from 'vite'

export default defineConfig({
  lang: 'en-US',
  title: 'Shadowsocks',
  description: 'A fast tunnel proxy that helps you bypass firewalls.',

  lastUpdated: true,

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide': sidebarGuide(),
      '/config': sidebarConfig(),
      '/sips': sidebarSIPs()
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
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/what-is-shadowsocks', activeMatch: '/guide/' },
    { text: 'Configs', link: '/config/quick-guide', activeMatch: '/config/' },
    { text: 'SIPs', link: '/sips/what-is-sip', activeMatch: '/sips/' },
    {
      text: 'Github Issues',
      link: 'https://github.com/shadowsocks/shadowsocks-org/issues'
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
        { text: 'Quick Guide', link: '/config/quick-guide' },
        { text: 'Advanced', link: '/config/advanced' }
      ]
    },
    {
      text: 'About',
      collapsible: true,
      items: [
        { text: 'Contributors', link: '/guide/contributors' }
      ]
    },
    {
      text: 'Protocols',
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
          link: '/sips/what-is-sip'
        },
        {
          text: 'SIP002 URI Scheme',
          link: '/sips/sip002'
        },
        {
          text: 'SIP003 Plugin',
          link: '/sips/sip003'
        },
        {
          text: 'SIP008 Outline Configuration Delivery',
          link: '/sips/sip008'
        }
      ]
    }
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Quick Guide', link: '/config/quick-guide' },
        { text: 'Advanced', link: '/config/advanced' }
      ]
    }
  ]
}

function sidebarSIPs() {
  return [
    {
      text: 'SIPs',
      items: [
        { text: 'What is SIP?', link: '/sips/what-is-sip' },
        { text: 'SIP002 URI Scheme', link: '/sips/sip002' },
        { text: 'SIP003 Plugin', link: '/sips/sip003' },
        { text: 'SIP008 Outline Configuration Delivery', link: '/sips/sip008' }
      ]
    }
  ]
}