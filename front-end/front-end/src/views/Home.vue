<template>
  <div class="home">
    <RecipeOverview recipeId="1"></RecipeOverview>
  </div>.
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
