<template>
  <div>
    <Links>
    </Links>
    <div v-if='quote.quote' id="quoteBox">
      <h3>{{quote.quote}}</h3>
      <p><a id="wikiLink" v-bind:href="wikiLink" target="_blank">{{quote.author}}</a></p>
    </div>
    <button v-if='quote.quote' id="randomQuoteBtn" v-on:click="randomQuote()">New Quote</button>
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
      this.wikiLink = "";
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
    }
  }
};
</script>