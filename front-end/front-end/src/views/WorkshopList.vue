<template>
  <section>
    <div class="row">
      <div class="row wOvervieuw">
        <div class="col-4"><translate>Title:</translate> </div>
        <div class="col-1"><translate>At:</translate> </div>
        <div class="col-3"><translate>subscribe before: </translate></div>
        <div class="col-2"><translate>places: </translate></div>
      </div>
       </div>
    <div >
      <div v-for="workshop of workshops" v-bind:key="workshop.id" class="row">
        <workshop-overview  :WorkshopId="workshop.id" class="col-12 wOvervieuw"></workshop-overview>

      </div>
      <div v-if="$store.state.user_right == 10">
        <button class="btn btn-primary btn-block btn-rounded" data-bs-target="#createModal" data-bs-toggle="modal"><translate>Add Workshop</translate></button>
      </div>
    </div>
    <!--  Create Modal-->
    <div class="modal fade"  tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true" id="createModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-danger"><translate>Update a workshop</translate></h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <WorkshopForm></WorkshopForm>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import WorkshopOverview from "@/components/workshop/WorkshopOverview";
import WorkshopForm from "@/components/workshop/WorkshopForm";

export default {
  name: "Workshop",
  components: {WorkshopOverview, WorkshopForm},
  data () {
    return {
      workshops :[]
    }
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop?limit=20`)
    .then(resp => {
      this.workshops = resp.data
    })
  }
}
</script>

<style scoped>

.wOvervieuw{
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
