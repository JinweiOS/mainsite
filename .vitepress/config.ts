import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  appearance: 'dark',
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/src/CustomNavBar.vue', import.meta.url)
          )
        }
      ]
    }
  },
  title: "BeingThink",
  description: "Make some useful and easy-to-use tools.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Pnpm安装', link: '/docs/pnpm/pnpm-mirror.md' },
      { text: '博客', link: '/docs/blog/2023/0730-babel-usage.md' }
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
        collapsed: true,
        items: [
          { text: 'pnpm镜像脚本', link: '/docs/pnpm/pnpm-mirror.md' }
        ]
      },
      {
        text: '博客',
        collapsed: true,
        items: [
          { text: 'Babel最佳实践', link: '/docs/blog/2023/0730-babel-usage.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/beingthink' },
    ]
  }
})
