<!--This is the component that is used to create and modify a recipe-->
<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <form class="FormRecipe container">
    <fieldset>
      <h3><input type="text" name="RecipeName" placeholder="Recipe name" v-translate v-model="Rname" required></h3>
      <h5><input type="text" name="RecipeDescription" placeholder="Recipe description" v-translate v-model="Rdescription" required></h5>
      <label><translate>Language :</translate></label>
<!--    TO add auto language list generation-->
      <select name="RecipeLanguage" v-model="Rlanguage">
        <option value="" selected disabled hidden><translate>Select a language</translate></option>
        <option v-for="option in Loption" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
      </select>
      <div class="image-list">
        <input id="file" type="file" ref="file" multiple="multiple" name="recipeImage">
      </div>
      <div id="descriptionSection">
        <div><img src="../assets/préparation.png"><label v-translate>Preparing time (min)</label>
        <input type="number" min="0" v-model="Rprepare" required></div>
        <div><img src="../assets/cuisson.png"><label v-translate>Cooking time (min)</label>
        <input type="number" min="0" v-model="Rcooking" required></div>
        <div><label><translate>Season</translate> :</label>
        <select name="RecipeSeason" v-model="Rseason">
          <option value="" selected disabled hidden><translate>Select a season</translate></option>
          <option v-for="option in Soption" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
        </select></div>
      </div>
      <div id="IngredientList" class="container">
        <div class="solid"><h4><translate>Ingredients</translate> :</h4></div>
        <div><IngredientOption :ingredientNumber="iNumber" v-for="(ingredient, index) in IngredientOptions"
                      :key="index" @ichange="Ingredientchange" /></div>
        <div id="noFlex"><input type="button" value="add Ingredient" @click="addIngredient" v-translate>
        <input type="button" value="new Ingredient" @click="showCreateIngredient" v-translate></div>
      </div>
      <div class="container" id="unfoldingDiv">
        <div class="solid"><h4><translate>Unfolding</translate> :</h4></div>
        <textarea @input="mixin_autoResize_resize" id="recipeUnfolding" name="RecipeUnfolding" v-model="Runfolding" required></textarea>
      </div>
      <div class="center">
        <input type="button" value="create Recipe" @click="addRecipe" v-translate>
      </div>
    </fieldset>
  </form>
</template>

<script>
import IngredientOption from './IngredientOption'
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
      const formData = new FormData()
      formData.append('recipe_name', this.Rname)
      formData.append('recipe_description', this.Rdescription)
      formData.append('recipe_language', this.Rlanguage)
      formData.append('recipe_season', this.Rseason)
      formData.append('recipe_unfloding', this.Runfolding)
      formData.append('recipe_timeToPrepare', this.Rprepare)
      formData.append('recipe_cookingTime', this.Rcooking)
      this.axios.post(process.env.VUE_APP_API_ENDPOINT + '/recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(responce => {
          let recipe = responce.data
          for (let ingredient of this.Ingredients){
            console.log(ingredient)
            const ingr = {
              ingredientId: ingredient.ingId,
              quantity : ingredient.quantity,
              unitId:ingredient.IUnit
            }
            this.axios.post(process.env.VUE_APP_API_ENDPOINT+`/recipe/${recipe.id}/ingredient`,ingr)
              .catch(err => {
                throw err
                console.log(err)
              })
          }
          for (let i = 0; i < this.$refs.file.files.length; i++) {
              const file = this.$refs.file.files[i]
              const formDatax = new FormData()
              formDatax.append('file', file)
              this.axios.post(process.env.VUE_APP_API_ENDPOINT+`/recipe/${recipe.id}/image`,formDatax ,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .catch(err => {
                  throw err
                  console.log(err)
                })
            }
        }).catch(err => {
          alert(err)
        })
    }
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/seasons')
      .then((responce) => {
        for (const unit in responce.data) {
          this.Soption.push({
            text: responce.data[unit].full_name,
            value: responce.data[unit].id
          })
        }
      })
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/languages')
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
      this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/:' + this.recipe_Id)
        .then((responce) => {
          console.log(responce.data)
        })
    }
  }
}
</script>

<style scoped>

#byLau {
  font-family: "Brush Script MT";
  font-style: italic;
}
#descriptionSection {
  display: flex;
  vertical-align: middle;
  height: 100%;
  width: fit-content;
  margin: 15px 0;
}
#file {
  vertical-align: middle;
  margin: 60px;
}
#ingredientsDiv {
  margin-bottom: 1em;
}
#IngredientList {
  display: flex;
  flex-flow: column wrap;
}
#noFlex {
  display: block;
}
#recipeUnfolding {
  width: 90%;
}
#title {
  color: #FF322B;
  text-align: left;
  width: 100%;
}
#unfoldingDiv {
  width: 90%;
  padding: 15px;
  min-height: 12em;
}

.container {
  border: 2px solid #2C3E50;
  color: #2C3E50;
  border-radius: 25px;
  margin: 15px auto;
  width: fit-content;
  padding: 15px 10%;
}
.cover {
  margin: 15px;
}
.formSpan {
  display: inline-block;
  min-width: 8em;
}
.image-list {
  border: 2px solid #2C3E50;
  border-radius: 25px;
}
.ingredient {
  max-width: fit-content;
}
.center {
  display: block;
}
.unfoldingTitle {
  float: left;
  text-align: left;
}
.solid {
  width: 100%;
  text-align: left;
}

input {
  margin: 5px 0;
}

</style>
