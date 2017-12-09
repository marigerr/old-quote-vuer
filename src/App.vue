<template>
  <div id="app">
    <!-- <p><a href="https://mighty-poet.glitch.me/" target="blank">API Docs</a></p> -->
    <h1>Quotes</h1>
    <button id="randomQuoteBtn" v-on:click="randomQuote()">Random Quote</button>
    <p><a id="wikiLink" v-bind:href="wikiLink" target="_blank">{{quote.author}}</a></p>
    <!-- <p>{{quote.author}}</p> -->
    <p>{{quote.quote}}</p>
    <h2>Search Quotes</h2>
    <input v-model="startswith" v-on:keyup="search()" placeholder="search by author" type="text">
    <ul id="authors">
      <li v-for="author in authors" v-bind:key="author">
        <button v-on:click="authorQuotes(author)">{{ author }}</button>
      </li>
    </ul>
    <a id="wikiLink" v-bind:href="wikiLink" target="_blank">{{author}}</a>
    <ul id="quotes">
      <li v-for="quote in quotes" v-bind:key="quote._id">
        "{{ quote.quote }}"
      </li>
    </ul>         
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      startswith: "",
      authors: [],
      quotes: [],
      author: "",
      wikiLink: "",
      quote: {}
    };
  },
  methods: {
    randomQuote: function() {
      this.startswith = "";
      this.authors = [];
      this.quotes = [];
      this.wikiLink = "";
      this.author = "";
      axios
        .get("https://mighty-poet.glitch.me/api.quotes/random")
        .then(response => {
          this.quote = response.data;
          this.quote.quote = `"${this.quote.quote}"`;
          this.wikiLink = "https://en.wikipedia.org/wiki/" + this.quote.author;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search: function() {
      this.authors = [];
      this.quotes = [];
      this.wikiLink = "";
      this.author = "";
      this.quote = "";
      if (this.startswith !== "") {
        axios
          .get("https://mighty-poet.glitch.me/api.quotes/author-starts-with", {
            params: {
              startswith: this.startswith
            }
          })
          .then(response => {
            this.authors = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    authorQuotes: function(author) {
      axios
        .get("https://mighty-poet.glitch.me/api.quotes/author", {
          params: {
            author: author
          }
        })
        .then(response => {
          this.author = author;
          this.wikiLink = "https://en.wikipedia.org/wiki/" + author;
          this.quotes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
/* html { */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  text-align: center;
    color: #2c3e50;

  /* color: white; */
  margin-top: 60px;
  /* background-color: black;
  font-family: "Zilla Slab", serif;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px; */
}

h1,
h2 {
  font-weight: normal;
}

#authors button {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

#quotes li {
  display: block;
  margin: 10px 10px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

/* a:link {
  color: #22333c;
}
a:visited {
  color: #22333c;
}
a:hover {
  color: #b69274;
}

#randomQuoteBtn {
  width: auto;
  height: auto;
  background-color: lightslategray;
  border: 2px solid #b0a28f;
  color: black;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Zilla Slab", serif;
  font-size: 16px;
  font-weight: bold;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 5px #22333c;
  box-sizing: border-box;
}

#randomQuoteBtn:hover {
  background-color: #22333c;
  color: white;
  font-weight: normal;
}

#randomQuoteBtn:active {
  background-color: #22333c;
  box-shadow: 0 2px #666;
  transform: translateY(4px);
}

#randomQuoteBtn:focus {
  outline: 0;
} */
</style>
