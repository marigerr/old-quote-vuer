<template>
  <div id="app">
    <div v-if='loading' class="loader"></div>
    <div v-else id="main">    
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RandomQuote from "./components/RandomQuote";
import SearchQuotes from "./components/SearchQuotes";
export default {
  name: "app",
  data() {
    return {
      loading: true,
    };
  },  
  components: {
    RandomQuote,
    SearchQuotes,
  },
  created: function() {
    console.log('app created');
    this.pingApi();
  },
  methods: {  
    pingApi: function() {
      axios
        .get("https://mighty-poet.glitch.me/api.quotes/ping")
        .then(response => {
          console.log(response.data);
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
  font-family: "Zilla Slab", serif;
  text-align: center;
  color: white;
  background-color: black;
  font-size: 24px;

/* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  width: 100%;
  margin: 0px;
  padding: 0px; */
}

/* Loader */

.loader {
  margin: auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid green;
  border-right: 16px solid green;
  border-bottom: 16px solid rgb(81, 61, 173);
  border-left: 16px solid rgb(81, 61, 173);
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>