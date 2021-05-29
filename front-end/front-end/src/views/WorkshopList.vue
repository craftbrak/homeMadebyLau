<template>
  <section>
    <div v-for="workshop of workshops" v-bind:key="workshop.id">
      <workshop-overview  :workshop-id="workshop.id"></workshop-overview>
    </div>
  </section>
</template>
<script>
import WorkshopOverview from "@/components/workshopOverview";
export default {
  name: "Workshop",
  components: {WorkshopOverview},
  data () {
    return {
      workshops :[]
    }
  },
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop?limit=10`)
    .then(resp => {
      this.workshops = resp.data
    })
  }
}
</script>

<style scoped>

</style>
