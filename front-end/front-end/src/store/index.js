import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    user_name: localStorage.getItem('user_name'),
    user_right: localStorage.getItem('user_right'),
    user_email: localStorage.getItem('user_email'),
    user_id: localStorage.getItem('user_id')
  },
  mutations: {
    login (state) {
      // mutate state
      state.user_name = localStorage.getItem('user_name')
      state.user_right = localStorage.getItem('user_right')
      state.user_email = localStorage.getItem('user_email')
      state.user_id = localStorage.getItem('user_id')
    }
  },
  actions: {
  },
  plugins: [createPersistedState()],
  modules: {
  }
})
