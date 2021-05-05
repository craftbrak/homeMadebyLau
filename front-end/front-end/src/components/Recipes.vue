<template>
  <div class="hello">
    <h3>{{ title }}</h3>
    <p>Des recettes avec leurs images</p>
  </div>
</template>

<script>
export default {
  name: 'Recipes',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
