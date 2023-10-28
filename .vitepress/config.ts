import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  appearance: 'dark',
  title: "BeingThink",
  description: "Make some useful and easy-to-use tools.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Pnpm独立脚本安装', link: '/docs/pnpm/pnpm-mirror.md' },
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
          { text: 'pnpm独立脚本安装', link: '/docs/pnpm/pnpm-mirror.md' }
        ]
      },
      {
        text: '博客',
        collapsed: true,
        items: [
          { text: 'Babel最佳实践', link: '/docs/blog/2023/0730-babel-usage.md' },
          { text: 'MySQL8.0安装配置', link: '/docs/blog/2023/0918-mysql-config.md' },
          { text: 'PostgreSQL使用及其向量扩展', link: '/docs/blog/2023/1017-postgresql-config.md', },
          { text: 'Node.js不错的Debug方式', link: '/docs/blog/2023/1028-node-debug.md'},
          // QA栏
          {
            text: '日常Q&A',
            base: '/docs/qa/',
            collapsed: true,
            items: [
              { text: 'sudo 子命令找不到', link: 'sudo.md' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/beingthink' },
      { icon: 'twitter', link: 'https://twitter.com/beingthink01' }
    ],

    footer: {
      message: '每天都去寻找世界上正向的新鲜事，如果没有，就去看看家乡的稻穗和夜晚的星星',
      copyright: 'Copyright © 2023-PRESENT Jinwei Peng',
    },
  }
})
