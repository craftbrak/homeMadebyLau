<template>
  <div class="row">
    <div class="col-3">
      <translate>Title: </translate>
    </div>
    <div class="col-3">
      <translate>Description: </translate>
    </div >
    <div class="col-3">
      <translate>Address</translate>
    </div>
    <div class="col-3">
      <translate>Link</translate>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      {{workshop.title}}
    </div>
    <div class="col-3">
      {{workshop.description}}
    </div >
    <div class="col-3">
      {{workshop.address}}
    </div>
    <div class="col-3">
      {{workshop.link}}
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkshopDetails",
  props:{
    workshop: Object
  }
}
</script>

<style scoped>

</style>
