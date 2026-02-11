import DefaultTheme from 'vitepress/theme'
import SIP002Generator from './components/SIP002Generator.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('SIP002Generator', SIP002Generator)
  }
}
