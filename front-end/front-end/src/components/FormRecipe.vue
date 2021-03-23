<template>
<form action="/api/recipe" method="post" class="FormRecipe">
  <input type="text" name="RecipeName" required>
  <input type="text" name="RecipeDescription" required>
  <select name="RecipeLanguage">
    <option value="Fr" selected>Fr</option>
    <option value="En">En</option>
  </select>
  <select name="RecipeSeason">
    <option value="{{language.season.winter}}" selected>{{language.season.winter}}</option>
    <option value="{{language.season.spring}}">{{language.season.spring}}</option>
    <option value="{{language.season.sumer}}">{{language.season.sumer}}</option>
    <option value="{{language.season.autumn}}">{{language.season.autumn}}</option>
  </select>
  <input type="text" name="RecipeUnfolding" required>
  <IngredientOption name="{{ingredientNumer}}"/>
  <input type="button" name="addIngredient">
  <input type="text" name="RecipeName" required>
  <input type="text" name="RecipeName" required>
  </form>
</template>

<script>
    import IngredientOption from "./IngredientOption";
    export default {
        name: "FormRecette.vue",
      components: {IngredientOption}
    }
</script>

<style scoped>

</style>
