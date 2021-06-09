<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <form @submit.prevent="createUser" class="container">
    <div id="formTitle"><h4><translate>Sign in:</translate></h4></div>
    <div><translate class="formSpan from-label">Mail address : </translate><input type="email" class="em form-control" required v-model="email" v-translate @change="verifEmail"></div>
    <div><translate class="formSpan from-label">Password : </translate><input type="password" class="em form-control" id="password" required v-model="password" v-translate @change="checkpasword"></div>
    <div><translate class="formSpan from-label">Username : </translate><input type="text" class="em form-control" required v-model="user_name" v-translate></div>
    <div><translate class="formSpan from-label">First name : </translate><input type="text" class="em form-control" required v-model="first_name" v-translate></div>
    <div><translate class="formSpan from-label">Last name : </translate><input type="text" class="em form-control" required v-model="last_name" v-translate></div>
    <input type="submit" value="Sign in" class="btn btn-primary btn-block">
  </form>
</template>

<script>
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

      this.axios.post(process.env.VUE_APP_API_ENDPOINT + '/user', form, {
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
      this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/user/' + this.email)
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
  width: 20em;
}

#title {
  text-align: center;
}

.formSpan {
  display: inline-block;
  min-width: 8em;
}

</style>
