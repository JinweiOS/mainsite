import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import './color.css'
import './rainbow.css'
import './over.css'

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    // Obtain configuration from: https://giscus.app/
    giscusTalk({
      repo: 'jinweios/mainsitecomment',
      repoId: 'R_kgDOLYpwjw',
      category: 'General', // default: `General`
      categoryId: 'DIC_kwDOLYpwj84Cdjp2',
      mapping: 'pathname', // default: `pathname`
      inputPosition: 'top', // default: `top`
      lang: 'zh-CN', // default: `zh-CN`
      lightTheme: 'dark', // default: `light`
      darkTheme: 'transparent_dark', // default: `transparent_dark`
      // ...
    }, {
      frontmatter, route
    },
      // Whether to activate the comment area on all pages.
      // The default is true, which means enabled, this parameter can be ignored;
      // If it is false, it means it is not enabled.
      // You can use `comment: true` preface to enable it separately on the page.
      true
    );
  }
}