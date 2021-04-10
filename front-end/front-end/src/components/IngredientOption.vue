<template>
    <label><translate>N°{{ingredientNumber}}</translate></label>
    <select class="IngredientOption" name="{{ingredientNumber}}" v-for="ingredient in ingredients">
      <option value="{{ingredient}}" id="IngredientOptionIngredient">{{ingredient}}</option>
    </select>
    <label>quantity</label>
    <input type="number" name="Iquantity">
</template>

<script>
    export default {
        name: "IngredientOption"
      ,
      props:{
        ingredientNumber:Number,
      }
    }
</script>

<style scoped>

</style>
