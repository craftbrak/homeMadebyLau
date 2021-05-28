<template>
  <div></div>
</template>

<script>
export default {
  name: 'logout',
  beforeCreate () {
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_right')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_id')
    this.$store.commit('login')
    this.axios.logout()
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
