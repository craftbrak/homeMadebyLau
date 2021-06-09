<template>
 <form>
   <input type="text" placeholder="name" v-model="r_name" class="form-control" >
   <input type="text" placeholder="description" v-model="r_desciption" class="form-control">
   <input type="text" placeholder="address" v-model="r_address" class="form-control">
   <input type="file" placeholder="image" ref="imag" class="form-control">
   <input type="email" placeholder="email" v-model="r_email" class="form-control">
   <input type="url" placeholder="website" v-model="r_url" class="form-control">
   <input type="text" placeholder="phone Number" v-model="r_phone" class="form-control">
   <input type="button" @click="sendform" value="Create Origin" class="btn btn-primary">
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
          this.$swal({titleText:`${recipe.data.name} has been created`,
            icon:'success'
          })
          console.log('ok')

        }).catch(err => {
        this.$swal({textTitle:err, icon:'error'  })
      })
    }
  }
}
</script>

<style scoped>

</style>
