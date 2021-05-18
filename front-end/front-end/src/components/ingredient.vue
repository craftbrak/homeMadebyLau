<template v-for="ingredient in ingredients">
  <div>
  </div>
</template>

<script>
export default {
  name: 'ingredient',
  props: {
    ingredients: array
  },
  beforeCreate () {
    console.log(this.ingredients)
  }
}
</script>

<style scoped>

</style>
