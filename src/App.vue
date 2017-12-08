<template>
  <div id="app">
    <h1>Quotes</h1>
    <button v-on:click="randomQuote()">Random Quote</button>
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
      this.quote = "";
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
      this.author = author;
      this.wikiLink = "https://en.wikipedia.org/wiki/" + author;
      axios
        .get("https://mighty-poet.glitch.me/api.quotes/author", {
          params: {
            author: author
          }
        })
        .then(response => {
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

a {
  color: ;
}
</style>
