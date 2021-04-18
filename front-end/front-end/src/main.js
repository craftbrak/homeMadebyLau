import { createApp } from 'vue'
import { createGettext } from '@jshmrtn/vue3-gettext'
import App from './App.vue'
import router from './router'
import store from './store'
import translations from '../translations.json'

const gettext = createGettext({
  availableLanguages: {},
  defaultLanguage: 'en_GB',
  translations
})
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.use(gettext)
