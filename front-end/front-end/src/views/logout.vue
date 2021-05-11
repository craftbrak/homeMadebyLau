<template>
  <div></div>
</template>

<script>
export default {
  name: 'logout',
  beforeCreate () {
    this.$store.state.user_name = null
    this.$store.state.user_email = null
    this.$store.state.user_right = null
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
