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
      Profile
    </div>
  </div>
  <div class="row">
    <div id="leftColumn" class="column col-2"></div>
    <router-view/>
    <div id="rightColumn" class="column col-2"></div>
  </div>
  <div id="footer">
    <div id="networks">Retrouvez-moi sur :
      <a href="https://www.facebook.com/homemadebylau" target="_blank"><img class="network" alt="Facebook" src="./assets/facebook.png"></a>
      <a href="http://instagram.com/homemadebylau/" target="_blank"><img class="network" alt="Instagram" src="./assets/instagram.png"></a>
      <a href="https://www.youtube.com/channel/UCnpGlhJ2xADc8dk5wOEtZ8w/videos" target="_blank"><img class="network" alt="YouTube" src="./assets/youtube.png"></a>
      <a href="https://www.guydemarle.com/profil/laurencecostermans-88637" target="_blank"><img class="network" alt="Guy Demarle" src="./assets/guy_demarle.png"></a>
    </div>
    <div id="legalMentions">Legal Mentions</div>
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

body {
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

#footer {
  background-color: #E9513C;
  color: white;
  padding: 1em;
  height: 4em;
}

#networks {
  float: left;
}

.network {
  height: 2em;
  padding-left: 5px;
  padding-right: 5px;
}

#legalMentions {
  float: right;
}
</style>
