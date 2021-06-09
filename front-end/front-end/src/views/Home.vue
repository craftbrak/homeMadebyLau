<template>
  <div class="home">
    <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
    <div class="flex">
      <RecipeOverview :recipeId="recipe.id" v-for="recipe in RecipeList" :key="recipe.id" ></RecipeOverview>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import RecipeOverview from '@/components/RecipeOverview'
export default {
  name: 'Home',
  components: {
    RecipeOverview
  }
  ,
  beforeCreate() {
    this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/recipe`)
      .then((recipelist)=>{
        console.log(recipelist)
        this.RecipeList = recipelist.data
      })
  },
  data () {
    return {
      RecipeList :[]
    }
  }
}
</script>

<style>

#title {
  color: #FF322B;
  text-align: left;
  width: 100%;
}
#byLau {
  font-family: "Brush Script MT";
  font-style: italic;
}

.flex {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.container a {
  color: #2C3E50;
}
.container a:hover {
  color: #FF5842;
}

</style>
