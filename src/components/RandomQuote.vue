<template>
  <div>
    <div v-if='loading' class="loader"></div>
    <div v-else id="main">
      <Links>
      </Links>
      <p>{{quote.quote}}</p>
      <p><a id="wikiLink" v-bind:href="wikiLink" target="_blank">{{quote.author}}</a></p>
      <button id="randomQuoteBtn" v-on:click="randomQuote()">New Quote</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Links from "./Links.vue";
import "./RandomQuote.css";

export default {
  name: "randomquote",
  data() {
    return {
      loading: true,
      author: "",
      wikiLink: "",
      quote: {}
    };
  },
  components: {
    Links
  },
  created: function() {
    this.randomQuote();
  },
  methods: {
    randomQuote: function() {
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
    }
  }
};
</script>