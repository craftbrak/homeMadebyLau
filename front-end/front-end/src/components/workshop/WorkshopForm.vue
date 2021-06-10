<template>
  <form @submit.prevent="upworkshop" class="container">
    <div class="mb-3">
      <label :for="workshopId+'title'" class="form-label"><translate>*Workshop title</translate> </label>
      <input type="text" class="form-control" :id="workshopId+'title'" aria-describedby="emailHelp" v-model="title">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'date'" class="form-label"><translate>*Date of the workshop</translate></label>
      <input type="datetime-local" class="form-control" :id="workshopId+'date'" required v-model="date">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'address'" class="form-label"><translate>Address</translate></label>
      <input type="text" class="form-control" :id="workshopId+'address'" v-model="address">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'link'" class="form-label"><translate>Link </translate></label>
      <input type="text" class="form-control" :id="workshopId+'link'"  v-model="link">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'description'" class="form-label"><translate>*Description </translate></label>
      <input type="text" class="form-control" :id="workshopId+'description'" required  v-model="description">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'subscribeBefore'" class="form-label"><translate>*The date where the subscription for the workshop will be locked </translate></label>
      <input type="datetime-local" class="form-control" required :id="workshopId+'subscribeBefore'"  v-model="subscribeBefore">
    </div>
    <div class="mb-3">
      <label class="form-label"><translate>*Visible for by connected visitors <br></translate></label>
      <div class="mb-2 row">
        <div class="col-6"><label :for="workshopId+'availableT'" class="form-label"><translate> True</translate></label>
          <input type="radio" :value="true" name="available" required class="form-switch" :id="workshopId+'availableT'"  v-model="available">
        </div>
        <div class="col-6">
          <label :for="workshopId+'availablef'" class="form-label"><translate> False</translate></label>
            <input type="radio" :value="false" name="available"  required class="form-switch" :id="workshopId+'availablef'"  v-model="available">
        </div>
      </div>
      </div>
    <div class="mb-3">
      <label :for="workshopId+'maxSubscription'" class="form-label"><translate>*The number of place for a workshop </translate></label>
      <input type="number" class="form-control" :id="workshopId+'maxSubscription'" required v-model="maxSubscription">
    </div>
    <div class="mb-3">
      <label :for="workshopId+'LanguageId'" class="form-label"><translate>*Language of the workshop </translate></label>
      <select class="form-select" :id="workshopId+'LanguageId'" required  v-model="LanguageId" >
        <option v-for="option in Loption" v-bind:key="option.value" v-bind:value="option.id" selected>{{option.full_name}} </option>
      </select>
    </div>
    <h5><translate>* required</translate></h5>
    <button type="submit" class="btn btn-primary btn-block"  ><translate>Ok</translate></button>
  </form>
</template>

<script>
export default {
  name: "WorkshopForm",
  props:{
    workshopId:Number
  },
  data(){
    return {
      Loption: null,
      LanguageId: null,
      maxSubscription: null,
      available: null,
      subscribeBefore: null,
      description: null,
      link: null,
      address: null,
      date: null,
      title: null
    }
  },
  beforeMount() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/languages`)
      .then(resp =>{
        this.Loption = resp.data
      })
      .catch(err => {
        this.$swal({titleText:err , icon:'error'})
      })
    if (this.workshopId){
      this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}`)
        .then(resp =>{
          this.title = resp.data.title
          this.date = new Date(resp.data.date).toUTCString()
          this.address = resp.data.address
          this.link = resp.data.link
          this.description = resp.data.description
          this.subscribeBefore =new Date(resp.data.subscribeBefore).toUTCString()
          this.available = resp.data.available
          this.maxSubscription = resp.data.maxSubscription
          this.LanguageId = resp.data.LanguageId

        })
    }
  },
  methods:{
    upworkshop(){
      let data ={
        "title":this.title,
        "date":this.date,
        "address": this.address,
        "link": this.link,
        "description": this.description,
        "subscribeBefore": this.subscribeBefore,
        "available": this.available,
        "maxSubscription": this.maxSubscription,
        "LanguageId": this.LanguageId
      }
      if (this.workshopId){
        console.log(data)
        this.axios.put(`${process.env.VUE_APP_API_ENDPOINT}/workshop/${this.workshopId}`,data)
          .then((resp) =>{
            this.$swal({titleText:`${resp.data.title} Created`,icon:'success'})
          })
          .catch(err=>{
            this.$swal({titleText:err,icon:'error'})
          })
      }
      else {
        this.axios.post(`${process.env.VUE_APP_API_ENDPOINT}/workshop`,data)
          .then((resp) =>{
          this.$swal({titleText:`${resp.data.title} Created`,icon:'success'})
        })
        .catch(err=>{
          this.$swal({titleText:err,icon:'error'})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
