<template>
  <div id="app">
    <div v-if='loading' class="loader"></div>
    <div v-else id="main">
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
  </div>
</template>

<script>
import axios from "axios";
import "./app.css";
export default {
  name: "app",
  data() {
    return {
      loading: true,
      startswith: "",
      authors: [],
      quotes: [],
      author: "",
      wikiLink: "",
      quote: {}
    };
  },
  created: function() {
    this.randomQuote();
  },
  methods: {
    randomQuote: function() {
      this.startswith = "";
      this.authors = [];
      this.author = "";
      this.quotes = [];
      this.wikiLink = "";
      axios
        .get("https://mighty-poet.glitch.me/api.quotes/random")
        .then(response => {
          this.loading = false;
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
          this.quotes = response.data;
          this.author = author;
            this.wikiLink = "https://en.wikipedia.org/wiki/" + author;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>