<!--This is the component that is used to create and modify a recipe-->
<template>
<form class="FormRecipe container" >
  <fieldset>
  <label ><translate>Name</translate> :</label>
  <input type="text" name="RecipeName" v-model="Rname" required>
  <label ><translate>Description </translate> :</label>
  <input type="text" name="RecipeDescription" v-model="Rdescription" required>
  <label ><translate>Language :</translate></label>
<!--    TO add auto language list generation-->
  <select name="RecipeLanguage" v-model="Rlanguage">
    <option value="" selected disabled hidden><translate>Select a language</translate></option>
    <option v-for="option in Loption" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
  </select>
    <label ><translate>season</translate> :</label>
  <select name="RecipeSeason" v-model="Rseason">
    <option value="" selected disabled hidden><translate>Select a season</translate></option>
    <option v-for="option in Soption" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
  </select>
    <label ><translate>Unfolding</translate> :</label>
  <input type="textarea" name="RecipeUnfolding" v-model="Runfolding" required>
    <label v-translate>Time to prepare (min)</label>
  <input type="number" min="0" v-model="Rprepare" required>
    <label v-translate>Cooking time (min)</label>
    <input type="number" min="0" v-model="Rcooking" required>
  <div id="IngredientList" >
    <label><translate>Ingredient list</translate></label>
    <IngredientOption :ingredientNumber="iNumber" v-for="(ingredient, index) in IngredientOptions"
                      :key="index" @ichange="Ingredientchange" />
  </div>

  <input type="button" value="add Ingredient" @click="addIngredient" v-translate>
  <input type="button" value="new Ingredient" @click="showCreateIngredient" v-translate>
  <input type="button" value="create Recipe" @click="addRecipe" v-translate>
  </fieldset>
  </form>
</template>

<script>
import IngredientOption from './IngredientOption'
import axios from 'axios'
export default {
  name: 'FormRecipe',
  data () {
    return {
      iNumber: 1,
      IngredientOptions: [IngredientOption],
      Ingredients: [],
      Rseason: '',
      Rname: '',
      Rdescription: '',
      Rlanguage: '',
      Runfolding: '',
      Rcooking: '',
      Rprepare: '',
      Soption: [],
      Loption: []
    }
  },
  props: {
    recipe_Id: Number
  },
  components: { IngredientOption },
  methods: {
    Ingredientchange (Ing) {
      this.Ingredients[Ing.IngredientOId - 1] = { ingId: Ing.ingredient, quantity: Ing.quantity, IUnit: Ing.IngredientUnit }
    },
    addIngredient () {
      this.iNumber++
      this.IngredientOptions.push(IngredientOption)
    },
    showCreateIngredient () {
      return false
    },
    addRecipe () {
      const recipe = {
        recipe_name: this.Rname,
        recipe_description: this.Rdescription,
        recipe_language: this.Rlanguage,
        recipe_season: this.Rseason,
        recipe_unfloding: this.Runfolding,
        recipe_timeToPrepare: this.Rprepare,
        recipe_cookingTime: this.Rcooking,
        recipe_Ingredients: this.Ingredients
      }

      axios.post(process.env.VUE_APP_API_ENDPOINT + '/recipe', recipe)
        .then(recipe => {
          console.log(recipe)
        })
    }
  },
  beforeCreate () {
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/seasons')
      .then((responce) => {
        for (const unit in responce.data) {
          this.Soption.push({
            text: responce.data[unit].full_name,
            value: responce.data[unit].id
          })
        }
      })
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/languages')
      .then((responce) => {
        for (const unit in responce.data) {
          this.Loption.push({
            text: responce.data[unit].full_name,
            value: responce.data[unit].id
          })
        }
      })
  },
  created () {
    if (!isNaN(this.recipe_Id)) {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/:' + this.recipe_Id)
        .then((responce) => {
          console.log(responce.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
