<template>
    <select class="IngredientOption" name="{{ingredientNumber}}" v-for="ingredient in ingredients">
      <option value="{{ingredient}}" id="IngredientOptionIngredient">{{ingredient}}</option>
    </select>
</template>

<script>
    export default {
        name: "IngredientOption"
    }
</script>

<style scoped>

</style>
