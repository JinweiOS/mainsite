import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BeingThink",
  description: "Make some useful and easy-to-use tools.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vinsp', link: '/docs/vinsp/quick-start.md' }
    ],

    sidebar: [
      {
        text: 'Vinsp使用文档',
        items: [
          { text: '快速开始', link: '/docs/vinsp/quick-start.md' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/beingthink  ' }
    ]
  }
})
