import DefaultTheme from 'vitepress/theme'
import Banner from './components/Banner.vue'
import './color.css'
import './rainbow.css'
import './over.css'
import { h } from 'vue'
export default Object.assign({}, DefaultTheme, {
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      banner: () => h(Banner),
    })
  },
})