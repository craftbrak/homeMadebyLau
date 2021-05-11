import { createApp } from 'vue'
import { createGettext } from '@jshmrtn/vue3-gettext'
import App from './App.vue'
import router from './router'
import store from './store'
import translations from '../translations.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import VueCookies from 'vue3-cookies'

const gettext = createGettext({
  availableLanguages: {},
  defaultLanguage: 'en_GB',
  translations
})
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.use(gettext)
app.use(VueCookies)
