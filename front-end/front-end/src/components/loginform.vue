<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <form @submit.prevent="loginUser" class="container">
    <div id="formTitle"><h4 class="form-title"><translate>Log in:</translate></h4></div>
    <div><translate class="formSpan form-label">Email : </translate><input type="email" class="em form-control" required v-model="email"></div>
    <div><translate class="formSpan form-label">Password : </translate><input type="password" class="em form-control" required v-model="password"></div>
    <input type="submit" value="Log in" class="btn btn-primary btn-block">
  </form>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async loginUser () {
      const data = {
        email: this.email,
        password: this.password
      }
      const resp = await this.axios.login(data)
      const decoded = jwtDecode(resp.data.accessToken)
      localStorage.setItem('user_name', decoded.user_name)
      localStorage.setItem('user_id', decoded.id)
      localStorage.setItem('user_email', decoded.email)
      localStorage.setItem('user_right', decoded.right)
      this.$store.commit('login')
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.container {
  border: 2px solid #2C3E50;
  color: #2C3E50;
  border-radius: 25px;
  margin: 15px auto;
  width: fit-content;
  padding: 15px;
}

input {
  margin: 5px 0;
}

input.em {
  width: 18em;
}

#title {
  text-align: center;
}

.formSpan {
  display: inline-block;
  min-width: 8em;
}

</style>
