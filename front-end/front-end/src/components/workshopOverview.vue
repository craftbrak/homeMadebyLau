<template>
  <div>
    <div>{{workshop.title}}</div>
    <div>{{new Date(workshop.date).toLocaleString() }}</div>
    <div><translate>subscribe before  </translate>{{new Date(workshop.subscribeBefore).toLocaleString()}}</div>
    <div v-if="workshop.Recipes"></div>
  </div>
</template>

<script>
export default {
  name: "workshopOverview",
  data(){
    return {
      workshop:{}
    }
  },
  props:{
    workshopId: Number
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}`).then(resp =>{
      this.workshop = resp.data
      console.log('ici')
    })
  }
}
</script>

<style scoped>

</style>
