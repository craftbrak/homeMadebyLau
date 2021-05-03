<template>
  <button @click="previousRecipe">a</button>

  <div v-for="recipe in visibleRecipe" v-bind:key="recipe.id">
    <RecipeOverview :recipeId="recipe.id"></RecipeOverview>
  </div>
  <button @click="nextRecipe">a</button>
</template>

<script>
import RecipeOverview from "@/components/RecipeOverview";
import axios from "axios";
export default {
  name: "recipeOverviewList",
  components: {RecipeOverview},
  data () {
    return {
      recipes: [],
      visibleRecipe: []
    }
  },
  methods: {
    nextRecipe: {

    },
    previousRecipe: {

    }
  },
  beforeCreate() {
    axios.get(process.env.VUE_APP_API_ENDPOINT + "/recipe").then(resp =>{
      this.recipes = resp.data
      for (let i = 0; i < this.visibleRecipeNumber; i++) {
        this.visibleRecipe[i] = this.recipes[i]
      }
    })
  },
  props: {
    visibleRecipeNumber: String
  }
}
</script>

<style scoped>

</style>
