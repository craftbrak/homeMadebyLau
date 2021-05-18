<template>
  <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
  <div class="container">
    <div id="upperhalf">
      <div id="descricptionSection">
        <h4>{{recipe.name}}</h4>
        <h5>{{recipe.description}}</h5>
        <div id="infos">
          <img src="../assets/préparation.png">
          {{recipe.timeToPrepare}} min |
          <img src="../assets/cuisson.png">
          {{recipe.cookingTime}} min |
          {{recipe.SeasonId}}
        </div>
      </div>
      <div id="imageSection">
        <img v-bind:src="onscreenImage">
      </div>
    </div>
    <div id="unfoldingDiv">
      {{recipe.unfolding}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
  props: {
    recipeId: String
  },
  beforeCreate () {
    this.axios.get(process.env.VUE_APP_API_ENDPOINT + '/recipe/' + this.$route.params.recipeId)
      .then(respons => {
        if (Object.keys(respons.data).length > 0) {
          this.recipe = respons.data
          this.onscreenImage = process.env.VUE_APP_STATIC_ENDPOINT + this.recipe.Recipe_Images[0].imgpath
          console.log(process.env.VUE_APP_STATIC_ENDPOINT + this.recipe.Recipe_Images[0].imgpath)
        } else {
          console.log(`${this.recipeId} does not exit in the database`)
        }
        console.log(this.$store.state.user_name, this.$store.state.user_right)
      })
  },
  data () {
    return {
      recipe: {},
      onscreenImage: null
    }
  }
}
</script>

<style scoped>

#title {
  color: #FF322B;
  text-align: left;
  width: 100%;
}
#byLau {
  font-family: "Brush Script MT";
  font-style: italic;
}
#descricptionSection {
  width: 45%;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
#imageSection {
  width: 45%;
  display: inline-block;
}
#upperhalf {
  display: inline-block;
  width: 100%;
}

.container {
  padding: 0;
}

img {
  max-height: 150px;
  max-width: 100%;
}

</style>
