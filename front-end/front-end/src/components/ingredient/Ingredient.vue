<template>
  <div class="ingredient">
    <img :src="ingredientImage">
    <h5 id="Iname">{{ingredient.name}}</h5>
    <span id="name">{{ingredient.Recipe_Ingredient.quantity}} {{unit}}</span>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: Object,
  },
  beforeCreate () {
    this.ingredientImage = process.env.VUE_APP_STATIC_ENDPOINT+ this.ingredient.imagePath
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/units/${this.ingredient.Recipe_Ingredient.UnitId}`)
    .then(resp =>{
      this.unit = resp.data.code
    })

  },
  data () {
    return {
      ingredientImage: this.ingredientImage,
      unit: null
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
