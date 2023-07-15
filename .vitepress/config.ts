import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BeingThink",
  description: "Make some useful and easy-to-use tools.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Pnpm安装', link: '/docs/pnpm/pnpm-mirror.md' }
    ],

    sidebar: [
      // {
      //   text: 'Vinsp使用文档',
      //   items: [
      //     { text: '快速开始', link: '/docs/vinsp/quick-start.md' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
      {
        text: 'Pnpm',
        items: [
          { text: 'pnpm镜像脚本', link: '/docs/pnpm/pnpm-mirror.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/beingthink  ' },
    ]
  }
})
