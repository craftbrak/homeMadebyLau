<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <form @submit.prevent="loginUser" class="container">
    <div id="formTitle"><h4><translate>Log in:</translate></h4></div>
    <div><translate class="formSpan">Username : </translate><input type="email" required v-model="email"></div>
    <div><translate class="formSpan">Password : </translate><input type="password" required v-model="password"></div>
    <input type="submit" value="Log in">
  </form>
</template>

<script>
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
      this.axios.post(process.env.VUE_APP_API_ENDPOINT + '/session/login', data)
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

#title {
  text-align: center;
}

.formSpan {
  display: inline-block;
  min-width: 8em;
}

</style>
