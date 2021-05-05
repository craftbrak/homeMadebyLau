<template>
  <div id="nav">
    <div id="navleft">
      <img alt="HOMEMADE by Lau logo" src="./assets/logo.png">
      <router-link to="/"><translate>Home</translate></router-link> |
      <router-link to="/workshops"><translate>Workshops</translate></router-link> |
      <router-link to="/products"><translate>Products</translate></router-link> |
      <router-link to="/contact"><translate>Contact</translate></router-link>
    </div>
    <div id="navright">
      Shits and giggles
    </div>
  </div>
  <div class="row">
    <div id="leftColumn" class="column col-2"></div>
    <router-view/>
    <div id="rightColumn" class="column col-2"></div>
  </div>
  <div id="footer">
    Mentions légales
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
  background-color: white;
}

#footer {
  background-color: #E9513C;
  color: black;
}

body{
        margin: 0px;
    }

.column {
  background: #FF5842;
}

#nav {
  width: 100%;
  display: block;
  padding: 0px;
  background-color: #FFF6E0;
  height: 2em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #FF5842;
}

#nav img {
  height: 2em;
}

#navleft {
  float:left;
}

#navright {
  float:right;
}
</style>
