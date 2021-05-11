<template>
  <form @submit.prevent="loginUser">
    <input type="email" required v-model="email">
    <input type="password" required v-model="password">
    <input type="submit">
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      const data = {
        email: this.email,
        password: this.password
      }
      axios.post(process.env.VUE_APP_API_ENDPOINT + '/session/login', data)
        .then((res) => {
          this.$store.state.user_name = res.data.user_name
          this.$store.state.user_right = res.data.right
          this.$store.state.user_email = res.data.email
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>

</style>
