<template>
  <div>
    <div v-if="recipesNumber>0 " v-for="recipe in Recipes" :key="recipe">
      <div>{{ Recipes[1].name }}</div>
<!--      <WorkshopRecipeListItem :recipe-id="Recipes[recipe]"></WorkshopRecipeListItem>-->
    </div>
    <div v-if="$store.state.user_right == 10">
<!--      <select class="form-select">-->
<!--        <option>see ya</option>-->
<!--      </select>-->
<!--      <button class="btn btn-warning btn-rounded" @click="addRecipe"><translate>add recipe</translate></button>-->
    </div>
  </div>
</template>

<script>
import WorkshopRecipeListItem from "@/components/workshop/WorkshopRecipeListeItem";
export default {
  name: "WorkshopRecipeList",
  components: {WorkshopRecipeListItem},
  data () {
    return{
      RecipeListItem:[],
      Recipes:[],
      LanguageId:null,
      workshop:null,
      recipesNumber:null,
      i:0
    }
  },
  props:{
    WorkshopId: {
      type: Number,
      required: true
    },
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.WorkshopId}`).then(resp =>{
      this.workshop = resp.data
      if (this.workshop.Recipe){
        this.Recipes =this.workshop.Recipe
        console.log(this.Recipes)
        this.recipesNumber = this.workshop.Recipe.length
      }
    })

  },
  methods: {
    addRecipe () {

    }
  }
}
</script>

<style scoped>

</style>
