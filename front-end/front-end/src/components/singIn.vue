<template>
  <form @submit.prevent="createUser">
    <input type="email" required v-model="email" placeholder="email" v-translate @change="verifEmail">
    <input type="password" id="password" required v-model="password" placeholder="password" v-translate @change="checkpasword">
    <input type="text" required placeholder="user name" v-model="user_name" v-translate>
    <input type="text" required placeholder="first name" v-model="first_name" v-translate>
    <input type="text" required placeholder="last name" v-model="last_name" v-translate>
    <input type="submit">
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'singIn',
  data () {
    return {
      email: '',
      password: null,
      user_name: '',
      first_name: '',
      last_name: ''
    }
  },
  methods: {
    createUser () {
      console.log('p')
      const form = new FormData()
      form.append('email', this.email)
      form.append('password', this.password)
      form.append('user_name', this.user_name)
      form.append('first_name', this.first_name)
      form.append('last_name', this.last_name)

      axios.post(process.env.VUE_APP_API_ENDPOINT + '/user', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.data.message) alert(res.data.message)
          this.$store.state.user_name = res.data.user_name
          this.$store.state.user_right = res.data.right
          this.$store.state.user_email = res.data.email
          this.$router.push('/')
        })
    },
    verifEmail () {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/user/' + this.email)
        .then(resp => {
          if (resp.data.message) {
            alert(resp.data.message)
          }
        })
    },
    checkpasword () {
      console.log('ChekPassword')
    }
  }
}
</script>

<style scoped>

</style>
