<template>
  <div>
    <div v-for="(recipe,index) in RecipeListItem" :key="index">
      <WorkshopRecipeListItemSelect v-if="$store.state.user_right == 10" :workshop-id="WorkshopId" :language-id="LanguageId" :set="Recipes[index] ? true : false" :recipe-id="Recipes[index] ? Recipes[index] : null" :non-available-recipe-id="Recipes"></WorkshopRecipeListItemSelect>
      <workshop-recipe-liste-item v-else :recipe-id="Recipes[index] ? Recipes[index] : null"></workshop-recipe-liste-item>
    </div>
    <div v-if="$store.state.user_right == 10">
      <button @click="addRecipe"><translate>add recipe</translate></button>
    </div>
  </div>
</template>

<script>
import WorkshopRecipeListItemSelect from "@/components/workshop/WorkshopRecipeListItemSelect";
import WorkshopRecipeListItem from "@/components/workshop/WorkshopRecipeListeItem";
export default {
  name: "WorkshopRecipeList",
  components: {WorkshopRecipeListItem, WorkshopRecipeListItemSelect},
  data () {
    return{
      RecipeListItem,
    }
  },
  props:{
    Recipes : {
      type: Array,
      default: []
    },
    LanguageId:{
      type: Number,
      required: true
    },
    WorkshopId: {
      type: Number,
      required: true
    },
  },
  beforeCreate() {

  },
  methods: {
    addRecipe () {
      this.RecipeListItem.push({comp:WorkshopRecipeListItemSelect , recipe:null})
    }
  }
}
</script>

<style scoped>

</style>
