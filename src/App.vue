<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import RandomQuote from "./components/RandomQuote";
import SearchQuotes from "./components/SearchQuotes";
export default {
  name: "app",
  components: {
    RandomQuote,
    SearchQuotes,
  }
};
</script>

<style>
body,
html {
  height: 100%;
  display: grid;
  margin: 0px;
}
#app {
  height: 100%;
  display: grid;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* color: white; */
  /* margin-top: 60px; */
  /* background-color: black;
    font-family: "Zilla Slab", serif;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px; */
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>