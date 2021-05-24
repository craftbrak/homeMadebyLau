<template>
  <div id="nav">
    <div id="navleft">
      <img alt="HOMEMADE by Lau logo" src="./assets/logo.png">
      <router-link to="/"><translate>Home</translate></router-link>
      <router-link to="/Workshop" hidden><translate> | Workshops</translate></router-link>
      <router-link to="/Products" hidden><translate> | Products</translate></router-link>
      <router-link to="/Contact" hidden><translate> | Contact</translate></router-link>
      <router-link to="/addrecipe" v-if="$store.state.user_right === 10 " ><translate> | Add recipe</translate></router-link>
    </div>
    <div id="navright">
      <div id="searchbar" hidden>
        <input type="text" placeholder="Look for a recipe, a product...">
        <button><img id="search" alt="Search" src="./assets/loupe.png"></button>
      </div>
      <router-link to="/user" v-if="$store.state.user_name"><translate>{{ $store.state.user_name }}</translate></router-link>
      <router-link to="/login" v-if="!$store.state.user_name"><translate>Log in</translate></router-link>
      |
      <router-link to="/register" v-if="!$store.state.user_name"><translate>register</translate></router-link>
      <router-link to="/logout" v-if="$store.state.user_name"><translate>logout</translate></router-link>
      <img alt="Profile" src="./assets/profil.png">
    </div>
  </div>
  <div class="row" id="mainBody">
    <div id="leftColumn" class="column col-2"></div>
    <div class="col-8">
      <router-view/>
    </div>
    <div id="rightColumn" class="column col-2"></div>
  </div>
  <div id="footer">
    <div id="networks"><translate>You can find me on:</translate>
      <a href="https://www.facebook.com/homemadebylau" target="_blank"><img class="network" alt="Facebook" src="./assets/facebook.png"></a>
      <a href="http://instagram.com/homemadebylau/" target="_blank"><img class="network" alt="Instagram" src="./assets/instagram.png"></a>
      <a href="https://www.youtube.com/channel/UCnpGlhJ2xADc8dk5wOEtZ8w/videos" target="_blank"><img class="network" alt="YouTube" src="./assets/youtube.png"></a>
      <a href="https://www.guydemarle.com/profil/laurencecostermans-88637" target="_blank"><img class="network" alt="Guy Demarle" src="./assets/guy_demarle.png"></a>
    </div>
    <div id="legalMentions">Legal Mentions</div>
  </div>
</template>

<script>

</script>

<style>
html,body {
  height: 100%;
}
html,body {
  min-height: 100%;
}

#app { font-family: Roboto, Helvetica, Arial, sans-serif; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  min-height: 100%;
}

body {
  margin: 0px;
}

#mainBody.row {
  min-height: calc(100% - 6.8em);
  height: 100%;
}

img {
  padding: 0px 5px;
}

.column {
  background: #FF5842;
}

#nav {
  width: 100%;
  display: block;
  padding: 0px;
  background-color: #FFF6E0;
  height: 2.8em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #FF5842;
}

#nav img {
  height: 2.7em;
}

#navleft {
  float:left;
}

#navright {
  float:right;
}

#navright div {
  display: inline-block;
}

#searchbar {
  margin: 5px 10px;
  border: 1px solid gray;
  height: calct(1.5em + 2px);
}

#searchbar img {
  height: 1em;
}

#searchbar button {
  height: calc(1.5em + 5px);
}

#navright input {
  height: calc(1.5em - 2px);;
  width: 20em;
  border: 0;
  margin: 0;
  padding-left: 3px;
  background-color: #FFF6E0;
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
}

#legalMentions {
  float: right;
}
</style>
