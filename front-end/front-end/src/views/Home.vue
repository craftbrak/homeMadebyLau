<template>
  <div class="home col-8">
    <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
    <RecipeOverview recipeId="1"></RecipeOverview>
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
}
</script>

<style>
#title {
  color: #FF322B;
  float: left;
}

#byLau {
  font-family: "Brush Script MT";
  font-style: italic;
}
</style>
