<template>
  <div class="row">
    <div class="col-3">{{recipe.name}}</div>
    <div class="col-6">{{recipe.description}}</div>
    <div class="col-3" v-if="$store.state.user_right == 10">
      <button :data-bs-target="`#deleteModal${recipe.id}`" data-bs-toggle="modal" class="btn btn-rounded btn-danger imgbtn col-1" v-if="$store.state.user_right == 10" id="btndel"></button>
    </div>
  </div>
  <div class="modal fade"  tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" :id="`deleteModal${recipe.id}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-danger"><translate>Add a recipe to a workshop </translate></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3><translate> are you shure you want to delete the workshop ?</translate></h3>
          <button class="btn-danger btn btn-rounded" data-bs-dismiss="modal" @click="deleteRecipe"><translate>yes</translate></button>
          <button class="btn-primary btn btn-rounded" data-bs-dismiss="modal"><translate>non</translate></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "WorkshopRecipeListeItem",
  props:{
    recipeId:Number,
    workshopId:Number
  },
  data () {
    return {
      recipe:null
    }
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/recipe/${this.recipeId}`)
      .then(resp =>{
        this.recipe = resp.data
        console.log(this.recipe)
      })
  },
  methods:{
    deleteRecipe () {
      this.axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}/recipe/${this.recipeId}`)
    }
  }
}
</script>

<style scoped>

</style>
