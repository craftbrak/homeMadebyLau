<template>
  <form>
    <div class="mb-3">
    <input type="text" v-model="name" placeholder="name" v-translate class="form-control" >
    <input type="text" v-model="desc" placeholder="desciption" v-translate class="form-control" >
    <input type="file" ref="imag" class="form-control" >
    <select v-model="Sseason" class="form-select" >
      <option value="" selected disabled hidden><translate>Select a Season</translate></option>
      <option v-for="option in Soption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <select v-model="Sorig" class="form-select" >
      <option value="" selected disabled hidden><translate>Select a Origin</translate></option>
      <option v-for="option in Ooption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <select v-model="Slang" class="form-select" >
      <option value="" selected disabled hidden><translate>Select a Language</translate></option>
      <option v-for="option in Loption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <input type="button" class="btn btn-primary btn-block" value="create" @click="sendform">
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormIngredient',
  data () {
    return {
      Loption: [],
      Ooption: [],
      Soption: [],
      Sseason: '',
      Slang: '',
      Sorig: '',
      name: '',
      desc: '',
    }
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/languages')
      .then((response) => {
        for (const languag in response.data) {
          this.Loption.push({
            text: response.data[languag].code,
            value: response.data[languag].id
          })
        }
      })
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/seasons')
      .then((response) => {
        for (const season in response.data) {
          this.Soption.push({
            text: response.data[season].full_name,
            value: response.data[season].id
          })
        }
      })
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient_origin')
      .then((response) => {
        for (const origin in response.data) {
          this.Ooption.push({
            text: response.data[origin].name,
            value: response.data[origin].id
          })
        }
      })
  },
  methods: {
    sendform () {
      const form = new FormData()
      form.append('ingre_name', this.name)
      form.append('ingre_description', this.desc)
      form.append('ingre_lang', this.Slang)
      form.append('ingre_season', this.Sseason)
      form.append('ingre_origin', this.Sorig)
      form.append('ingre_image', this.$refs.imag.files[0])
      this.axios.post(process.env.VUE_APP_API_ENDPOINT + '/ingredient', form, {
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
input {
  margin-top: 1em;
}
select{
  margin-top: 1em;
}
input.em {
  width: 18em;
}
</style>
