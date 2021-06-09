<template>
  <div>
    <select v-model="selectedRecipeId" @change="setRecipe">
      <option v-for="recipe of availableRecipe" :key="recipe.id" :value="recipe.id" >
        <img :src="process.env.VUE_APP_STATIC_ENDPOINT + this.recipe.Recipe_Images[0].imgpath">
        <p>{{recipe.name}}</p>
      </option>
      <button class="btn" @click="getMoreRecipe">+</button>
    </select>
  </div>
</template>

<script>
export default {
  name: "WorkshopRecipeListItemSelect",
  props:{
    languageId:{
      type: Number,
      required: true
    },
    workshopId: {
      type: Number,
      required: true
    },
    recipeId:{
      type: Number,
      default: null,
      validator () {
        if (this.set){
          return true
        }
        else return false
      }
    },
    nonAvailableRecipeId:{
      type: Array,
      default: null
    },
    setprop:{
      type: Number,
      default: false,
      validator () {
        if (this.recipeId){
          return true
        }
        else return false
      }
    },
  },
  data () {
    return {
      availableRecipe :[],
      selectedRecipeId : null,
      recipeNumber:0,
      CurrentRecipeid: this.recipeId,
      set : this.setprop
    }
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/recipe?languageId=${this.languageId}`)
      .then(resp=>{
        for (const recipe of resp.data) {
          if (!recipe.id in this.nonAvailableRecipeId || recipe.id == this.recipeId){
            this.availableRecipe.push(recipe)
          }
        }
        this.recipeNumber += resp.data.length
        if (this.set){
          this.selectedRecipeId = this.recipeId
        }
      })
  },
  methods: {
    getMoreRecipe () {
      this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/recipe?languageId=${this.languageId}&offset=${this.recipeNumber}`)
        .then(resp=>{
          for (const recipe of resp.data) {
            if (!recipe.id in this.nonAvailableRecipeId || recipe.id == this.recipeId){
              this.availableRecipe.push(recipe)
            }
          }
          this.recipeNumber += resp.data.length
        })
    },
    async deleteRecipe () {
      await this.axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}/recipe/${this.CurrentRecipeid}`)
        .catch(err=> {
        console.log(err)
        this.$swal({titleText:err,
          icon:'error'
        })
      })
    },
    async createRecipe () {
      await this.axios.post(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}/recipe`,{
        "RecipeId":this.selectedRecipeId
      })
        .catch(err=> {
        console.log(err)
        this.$swal({titleText:err,
          icon:'error'
        })
      })
    },
    async setRecipe () {
      if (this.set){
        await this.deleteRecipe()
      }
      await this.createRecipe()
      this.set= true
    }
  }
}
</script>

<style scoped>

</style>
