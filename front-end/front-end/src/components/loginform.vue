<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <form @submit.prevent="loginUser" class="container">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"><translate>Email address</translate> </label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
      <div id="emailHelp" class="form-text"><translate>We'll never share your email with anyone else.</translate> </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"><translate>Password</translate></label>
      <input type="password" class="form-control" id="exampleInputPassword1" required v-model="password">
    </div>
    <button type="submit" class="btn btn-primary btn-block"><translate>Login</translate></button>
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

/*.formSpan {*/
/*  display: inline-block;*/
/*  min-width: 8em;*/
/*}*/

</style>
