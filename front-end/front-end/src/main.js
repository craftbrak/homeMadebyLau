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
import axios from 'axios'
import VueAxios from 'vue-axios'
import { applyAuthTokenInterceptor, clearAuthTokens, setAuthTokens } from 'axios-jwt'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2'


// 1. Create an axios instance that you wish to apply the interceptor to
const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  config => {
    let token
    const tokens =localStorage.getItem('auth-tokens-development')
    if (tokens) {
      token = JSON.parse(tokens).accessToken;
    }
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  error => Promise.reject(error),
);
// 2. Define token refresh function.
const requestRefresh = (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!  <-- important
  return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/session/refresh`, { refresh })
    .then(response => Promise.resolve(response.data.accessToken))
    .catch(async err => {
      console.log(err)
      Swal.fire({titleText:"your session has expire please log back in" ,icon:'error'})
      clearAuthTokens()
      await logout()
      await this.$router.push('/logout')
    })
}

// 3. Apply interceptor
applyAuthTokenInterceptor(axiosInstance, { requestRefresh }) // Notice that this uses the axiosInstance instance.  <-- important

// 4. Logging in
const login = async (params) => {
  const response = await axiosInstance.post(process.env.VUE_APP_API_ENDPOINT + '/session/login', params)

  // save tokens to storage
  setAuthTokens({
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  })
  return response
}

// 5. Logging out
const logout = async () => {
  const tokens =localStorage.getItem('auth-tokens-development')
  let token
  if (tokens) {
    token = JSON.parse(tokens).refreshToken;
  }
  await axiosInstance.post(process.env.VUE_APP_API_ENDPOINT+"/session/logout",{token :token})
  clearAuthTokens()
}

const gettext = createGettext({
  availableLanguages: {},
  defaultLanguage: 'en_GB',
  translations
})
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.use(gettext)
app.use(VueCookies)
app.use(VueAxios, axiosInstance)
app.axios.logout = logout
app.axios.login = login
app.use(VueSweetalert2);
