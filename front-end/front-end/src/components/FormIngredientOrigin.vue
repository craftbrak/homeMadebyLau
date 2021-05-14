<template>
 <form>
   <input type="text" placeholder="name" v-model="r_name" >
   <input type="text" placeholder="description" v-model="r_desciption">
   <input type="text" placeholder="address" v-model="r_address">
   <input type="file" placeholder="image" ref="imag">
   <input type="email" placeholder="email" v-model="r_email">
   <input type="url" placeholder="website" v-model="r_url">
   <input type="text" placeholder="phone Number" v-model="r_phone">
   <input type="button" @click="sendform" value="Create Origin">
 </form>
</template>

<script>
export default {
  name: 'FormIngredientOrigin',
  data () {
    return {
      r_name: '',
      r_desciption: '',
      r_address: '',
      r_image: null,
      r_email: '',
      r_url: '',
      r_phone: ''
    }
  },
  methods: {
    sendform () {
      const form = new FormData()
      form.append('origin_name', this.r_name)
      form.append('origin_description', this.r_desciption)
      form.append('origin_address', this.r_address)
      form.append('origin_website', this.r_url)
      form.append('origin_phone_number', this.r_phone)
      form.append('origin_email', this.r_email)
      form.append('origin_image', this.$refs.imag.files[0])
      this.axios.post(process.env.VUE_APP_API_ENDPOINT + '/ingredient_origin', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(recipe => {
          console.log(recipe)
        }).catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
