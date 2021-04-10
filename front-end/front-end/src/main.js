import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import GetTextPlugin from 'vue-gettext'
// import translations from '../translations.json'

// Vue.use(GetTextPlugin, {translations: translations})
// import axios from 'axios';
createApp(App).use(store).use(router).mount('#app')
