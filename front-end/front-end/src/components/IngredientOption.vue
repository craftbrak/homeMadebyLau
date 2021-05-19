<template>
    <div class="flex">
      <div>
        <label><translate>N °{{ ingredientNumber }}&#160;</translate></label>
        <select class="IngredientOption" v-model="selectedI" @change="Ichange">
          <option value="" selected disabled hidden><translate>Select an ingredient</translate></option>
          <option v-for="option in Ioptions" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
        </select></div>&#160;&#160;&#160;
        <div><label>Quantity :&#160;</label>
        <input type="number" name="Iquantity" v-model="IQuantity" @change="Ichange" min="0">&#160;
        <select class="IngredientUnit" v-model="selectedU" @change="Ichange">
          <option value="" selected disabled hidden><translate>Select a unit</translate></option>
          <option v-for="option in Uoption" v-bind:key="option.value" v-bind:value="option.value">{{option.text}}</option>
        </select>
      </div>
    </div>
</template>

<script>
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
      Ioptions: [],
      IQuantity: 0,
      selectedU: '',
      Uoption: []
    }
  },
  methods: {
    Ichange () {
      this.$emit('ichange', { ingredient: this.selectedI, quantity: this.IQuantity, IngredientOId: this.ingredientNumber, IngredientUnit: this.selectedU })
    },
    newIngredient () {
      this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient')
        .then((response) => {
          this.ingredients = response.data
          for (const ingredient in this.ingredients) {
            this.Ioptions.push({
              text: this.ingredients[ingredient].name,
              value: this.ingredients[ingredient].id
            })
          }
        })
    }
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/ingredient')
      .then((response) => {
        this.ingredients = response.data
        for (const ingredient in this.ingredients) {
          this.Ioptions.push({
            text: this.ingredients[ingredient].name,
            value: this.ingredients[ingredient].id
          })
        }
      })
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/units')
      .then((responce) => {
        for (const unit in responce.data) {
          this.Uoption.push({
            text: responce.data[unit].full_name,
            value: responce.data[unit].id
          })
        }
      })
  },
  emits: ['ichange']
}
</script>

<style scoped>

.flex {
  width: fit-content;
  margin: auto;
}

</style>
