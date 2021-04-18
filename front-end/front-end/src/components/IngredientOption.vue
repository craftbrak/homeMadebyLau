<template>
    <label><translate>N °{{ ingredientNumber }}</translate></label>
    <select class="IngredientOption" v-model="selectedI" @change="Ichange">
      <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
    </select>
    <label>quantity</label>
    <input type="number" name="Iquantity" v-model="IQuantity" @change="Ichange" min="0">
    <select class="IngredientUnit" v-model="selectedU" @change="Ichange">
      <option value="g" selected>g</option>
      <option value="ml" >ml</option>
      <option value="te" ><translate>teaspoon</translate></option>
      <option value="ta" ><translate>tablespoon</translate></option>
      <option value="p" ><translate>pinch</translate></option>
    </select>
</template>

<script>
import axios from 'axios'
import translate from '@jshmrtn/vue3-gettext'
export default {
  name: 'IngredientOption',
  props: {
    ingredientNumber: Number
  },
  components: {
    translate
  },
  data () {
    return {
      ingredients: '',
      selectedI: '',
      options: [],
      IQuantity: 0,
      selectedU: ''
    }
  },
  methods: {
    Ichange () {
      this.$emit('ichange', { ingredient: this.selectedI, quantity: this.IQuantity, IngredientOId: this.ingredientNumber })
    },
    newIngredient () {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient')
        .then((response) => {
          this.ingredients = response.data
          for (const ingredient in this.ingredients) {
            this.options.push({
              text: this.ingredients[ingredient].name,
              value: this.ingredients[ingredient].id
            })
          }
        })
    }
  },
  beforeCreate () {
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient')
      .then((response) => {
        this.ingredients = response.data
        for (const ingredient in this.ingredients) {
          this.options.push({
            text: this.ingredients[ingredient].name,
            value: this.ingredients[ingredient].id
          })
        }
      })
  },
  emits: ['ichange']
}
</script>

<style scoped>

</style>
