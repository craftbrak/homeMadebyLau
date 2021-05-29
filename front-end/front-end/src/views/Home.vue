<template>
  <div class="home">
    <div id="title"><h1>HOMEMADE <span id="byLau">by Lau</span></h1></div>
    <div class="flex">
      <RecipeOverview recipeId="1"></RecipeOverview>
      <RecipeOverview recipeId="2"></RecipeOverview>
      <RecipeOverview recipeId="3"></RecipeOverview>
      <RecipeOverview recipeId="4"></RecipeOverview>
      <RecipeOverview recipeId="5"></RecipeOverview>
      <RecipeOverview recipeId="6"></RecipeOverview>
      <RecipeOverview recipeId="32"></RecipeOverview>
      <RecipeOverview recipeId="31"></RecipeOverview>
      <RecipeOverview recipeId="30"></RecipeOverview>
      <RecipeOverview recipeId="20"></RecipeOverview>
      <RecipeOverview recipeId="10"></RecipeOverview>
      <RecipeOverview recipeId="15"></RecipeOverview>
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
