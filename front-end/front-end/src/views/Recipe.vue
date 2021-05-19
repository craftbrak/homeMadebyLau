<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <div class="container">
    <h3>{{recipe.name}}</h3>
    <h5>{{recipe.description}}</h5>
    <div id="imageSection">
      <img class="cover" v-bind:src="onscreenImage">
    </div>
    <div id="descricptionSection">
      <div id="infos">
        <img src="../assets/préparation.png">
          {{recipe.timeToPrepare}} min |
        <img src="../assets/cuisson.png">
        {{recipe.cookingTime}} min |
        {{recipe.SeasonId}}
      </div>
    </div>
    <div id="ingredientsDiv" class="framed">
      <div class="solid"><h4>Ingredients :</h4></div>
      <div v-for="(ingredient, index) in recipe.Ingredients" :key="index">
        <Ingredient :ingredient="recipe.Ingredients[index]" ></Ingredient>
      </div>
    </div>
    <div id="unfoldingDiv" class="framed">
      <h4 id="unfoldingTitle"><translate>Unfolding :</translate></h4>
      {{recipe.unfolding}}
    </div>
  </div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'
export default {
  name: 'Recipe',
  components: { Ingredient },
  props: {
    recipeId: String
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/' + this.$route.params.recipeId)
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

#title {
  color: #FF322B;
  text-align: left;
  width: 100%;
}
#byLau {
  font-family: "Brush Script MT";
  font-style: italic;
}
#descricptionSection {
  width: 45%;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  margin-bottom: 15px;
}
#unfoldingDiv {
  text-align: left;
}
#ingredientsDiv {
  margin-bottom: 1em;
}

.container {
  padding: 15px 10%;
}
.cover {
  margin: 15px;
}
.unfoldingTitle {
  float: left;
  text-align: left;
}
.ingredient {
  max-width: fit-content;
}
.solid {
  display: inline-block;
  width: 100%;
  text-align: left;
}
.framed {
  border: 2px solid #FF5842;
  border-radius: 25px;
  padding: 15px;
}

img {
  max-height: 400px;
  max-width: 100%;
}

</style>
