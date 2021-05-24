<template>
  <div class="ingredient">
    <img :src="'' + ingredientImage">
    <h5 id="name">{{ingredient.name}}</h5>
    <span id="name">{{ingredient.Recipe_Ingredient.quantity}} {{ingredient.Recipe_Ingredient.UnitId}}</span>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: Object
  },
  beforeCreate () {
    this.ingredientImage = process.env.VUE_APP_STATIC_ENDPOINT_NO_BACKSLASH + this.ingredient.imagePath
  },
  data () {
    return {
      ingredientImage: this.ingredientImage
    }
  }
}

</script>

<style scoped>

img {
  max-height: 3em;
  max-width: 5em;
}

</style>
