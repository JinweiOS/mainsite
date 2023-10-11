import BeingThink from './src/layout.vue'
import {h} from 'vue'
import DefaultTheme from 'vitepress/theme'
import './color.css'
import './rainbow.css'
import './over.css'

export default {
  ...DefaultTheme,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     'home-features-after': () => h(BeingThink),
  //   })
  // },
}