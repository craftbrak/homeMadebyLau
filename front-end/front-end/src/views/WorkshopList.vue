<template>
  <section>
    <div v-for="workshop of workshops" v-bind:key="workshop.id">
      <workshop-overview  :workshop-id="workshop.id"></workshop-overview>
    </div>
    <div v-if="$store.state.user_right == 10">
      <router-link to="/AddWorkShop"><translate>Add Workshop</translate></router-link>
    </div>
  </section>
</template>
<script>
import WorkshopOverview from "@/components/workshop/WorkshopOverview";
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
