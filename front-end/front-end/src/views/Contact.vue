<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Homepage msg="Homemade by Lau"/>
  </div>.
</template>

<script>
// @ is an alias to /src
import Homepage from '@/components/Homepage.vue'
export default {
  name: 'Contact',
  components: {
    Homepage
  }
}
</script>
