<template>
  <div id="nav">
    <router-link to="/"><translate>Home</translate></router-link> |
    <router-link to="/about"><translate>About</translate></router-link> |
    <router-link to="/addrecipe"><translate>Add recipe</translate></router-link>
  </div>
  <router-view/>
  <div id="footer">

  </div>
</template>

<style>
#app { font-family: Roboto, Helvetica, Arial, sans-serif; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: darkgray;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
