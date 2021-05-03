<template>
  <div class="container">
    <div class="descricptionSection">
      <h4>{{recipe.name}}</h4>
      <p>{{recipe.description}}</p>
    </div>
    <div class="imageSection">
      <img v-bind:src="onscreenImage">
    </div>
    <div class="timeSection row">
      <div class="preparationdiv col-6">
        <img src="../assets/préparation.png">
        <p>{{recipe.timeToPrepare}}</p>
      </div>
      <div class="cookingdiv col-6">
        <img src="../assets/cuisson.png">
        <p>{{recipe.cookingTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RecipeOverview',
  props: {
    recipeId: String
  },
  beforeCreate () {
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/' + this.recipeId)
      .then((recipe) => {
        this.recipe = recipe.data
        console.log(this.recipe)
        // this.onscreenImage = this.recipe.images[0]
      })
  },
  data () {
    return {
      recipe: {},
      onscreenImage: null
    }
  }
}
</script>

<style scoped>

</style>
