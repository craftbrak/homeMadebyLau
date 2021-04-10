<!--This is the component that is used to create and modify a recipe-->
<template>
<form action="/api/recipe" method="post" class="FormRecipe">
  <fieldset>
  <label ><translate>Name</translate> :</label>
  <input type="text" name="RecipeName" required>
  <label ><translate>Description </translate> :</label>
  <input type="text" name="RecipeDescription" required>
  <label ><translate>Language :</translate></label>
<!--    TO add auto language list generation-->
  <select name="RecipeLanguage">
    <option value="Fr" selected>Fr</option>
    <option value="En">En</option>
  </select>
    <label ><translate>season</translate> :</label>
  <select name="RecipeSeason">
    <option value="winter" selected><translate>winter</translate></option>
    <option value="spring"><translate>spring</translate></option>
    <option value="sumer"><translate>sumer</translate></option>
    <option value="autumn"><translate>autumn</translate></option>
  </select>
    <label ><translate>Unfolding</translate> :</label>
  <input type="textarea" name="RecipeUnfolding" required>
  <div id="IngredientList">
    <label><translate>Ingredient list</translate></label>
    <IngredientOption name="{{ingredientNumber}}"/>
  </div>

  <button value="addIngrdient"><translate>add Ingredient</translate></button>
  <button value="newIngredient"><translate>create new ingredient</translate></button>
  </fieldset>
  </form>
</template>

<script>
    import IngredientOption from "./IngredientOption";
    export default {
        name: "FormRecipe",
      components: {IngredientOption},
      methods:{

      },
      props:{}
    }
</script>

<style scoped>

</style>
