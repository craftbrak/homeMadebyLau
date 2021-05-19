<template>
  <router-link class="RecipeOverview" :to="{ name: 'Recipe', params: {recipeId: recipe.id } }">
    <div class="container">
      <h4>{{recipe.name}}</h4>
      <div class="imageSection">
        <img v-bind:src="onscreenImage">
      </div>
      <div class="timeSection">
        <img src="../assets/préparation.png">{{recipe.timeToPrepare}} min | <img src="../assets/cuisson.png"> {{recipe.cookingTime}} min
      </div>
      <p>{{recipe.description}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'RecipeOverview',
  props: {
    recipeId: String
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/' + this.recipeId)
      .then(respons => {
        if (Object.keys(respons.data).length > 0) {
          this.recipe = respons.data
          this.onscreenImage = process.env.VUE_APP_STATIC_ENDPOINT + this.recipe.Recipe_Images[0].imgpath
        } else {
          console.log(`${this.recipeId} does not exit in the database`)
        }
        console.log(this.$store.state.user_name, this.$store.state.user_right)
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

.RecipeOverview {
  width: 45%;
  border: 2px solid #2c3e50;
  color: #2C3E50;
  border-radius: 25px;
  margin: 10px;
  padding: 0;
}
.RecipeOverview:hover {
  border-color: #FF5842;
  color: #FF5842;
}

img {
  max-height: 150px;
  max-width: 100%;
}

.timeSection img {
  max-height: 16px;
}
.timeSection p {
  max-width: 5em;
}
.timeSection {
  display: inline-block;
}

p {
  margin: 0;
}

</style>
