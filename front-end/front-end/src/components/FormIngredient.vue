<template>
  <form>
    <input type="text" v-model="name" placeholder="name" v-translate>
    <input type="text" v-model="desc" placeholder="desciption" v-translate>
    <input type="file" ref="imag">
    <select v-model="Sseason">
      <option value="" selected disabled hidden><translate>Select a unit</translate></option>
      <option v-for="option in Soption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <select v-model="Sorig">
      <option value="" selected disabled hidden><translate>Select a unit</translate></option>
      <option v-for="option in Ooption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <select v-model="Slang">
      <option value="" selected disabled hidden><translate>Select a unit</translate></option>
      <option v-for="option in Loption" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <input type="button" value="create" @click="sendform">
  </form>
</template>

<script>
import axios from 'axios'

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
      desc: ''
    }
  },
  beforeCreate () {
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/languages')
      .then((response) => {
        for (const languag in response.data) {
          this.Loption.push({
            text: response.data[languag].code,
            value: response.data[languag].id
          })
        }
      })
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/seasons')
      .then((response) => {
        for (const season in response.data) {
          this.Soption.push({
            text: response.data[season].full_name,
            value: response.data[season].id
          })
        }
      })
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient_origin')
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
      axios.post(process.env.VUE_APP_API_ENDPOINT + '/ingredient', form, {
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
