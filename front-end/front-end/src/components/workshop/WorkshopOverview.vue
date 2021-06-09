<template>
  <div :id="workshopId" class="row main" >
    <div class="col-4 btndivText">{{workshop.title}}</div>
    <div class="col-2 btndivText">{{new Date(workshop.date).toLocaleString() }}</div>
    <div class="col-4 btndivText"><translate>subscribe before:  </translate>{{new Date(workshop.subscribeBefore).toLocaleString()}}</div>

    <div class="col-2 btndiv">
      <button :data-bs-target="`#detailsModal${workshopId}`" data-bs-toggle="modal"   class="btn btn-rounded btn-warning imgbtn col-1" id="btnRecipe"></button>
      <button :data-bs-target="`#updateModal${workshopId}`" data-bs-toggle="modal" class="btn btn-rounded btn-warning imgbtn col-1" v-if="$store.state.user_right == 10" id="btnup"></button>
      <button :data-bs-target="`#deleteModal${workshopId}`" data-bs-toggle="modal" class="btn btn-rounded btn-danger imgbtn col-1" v-if="$store.state.user_right == 10" id="btndel"></button>
    </div>
  </div>

  <!--  Update Modal-->
  <div class="modal fade"  tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" :id="`updateModal${workshopId}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-danger"><translate>Update a workshop</translate></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <WorkshopForm :workshop-id="workshopId"></WorkshopForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--  details Modal-->
  <div class="modal fade"  tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true" :id="`detailsModal${workshopId}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-danger"><translate>workshop details</translate></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <WorkshopRecipeList :workshop-id="workshopId" ></WorkshopRecipeList>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--  Delete Modal-->
  <div class="modal fade"  tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" :id="`deleteModal${workshopId}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-danger"><translate>Add a recipe to a workshop </translate></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3><translate> are you shure you want to delete the workshop ?</translate></h3>
          <button class="btn-danger btn btn-rounded" data-bs-dismiss="modal" @click="deleteWorkshop"><translate>yes</translate></button>
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
import WorkshopForm from "@/components/workshop/WorkshopForm";
import WorkshopRecipeList from "@/components/workshop/WorkshopRecipeList";
export default {
  name: "workshopOverview",
  components: {WorkshopRecipeList, WorkshopForm},
  data(){
    return {
      workshop:{},
      recipes:[],
      recipesNumber:0,
    }
  },
  props:{
    workshopId: Number,
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}`).then(resp =>{
      this.workshop = resp.data
      if (this.workshop.Recipe){
        this.recipes =this.workshop.Recipe
        this.recipesNumber = this.workshop.Recipe.length
      }
    })
  },
  methods:{
    deleteWorkshop () {
      this.axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}`)
      .then(()=>{
        this.$swal({titleText:'Success',icon:'success'})
      })
      .catch(err =>{
        this.$swal({titleText:err,icon:'error'})
      })
    }
  }
}
</script>

<style scoped>
#btnRecipe{
  background-image: url("../../assets/details.png");
}
#btndel{
  background-image: url("../../assets/trashcan.png");
}
#btnup{
  background-image: url("../../assets/update.png");
}
.imgbtn{
  background-repeat: no-repeat;
  height: 100%;
  background-size: 40%;
  background-position: center; /* Center the image */;

}
.main{
  margin-top: 1em;
  margin-bottom: 1em;
}

</style>
