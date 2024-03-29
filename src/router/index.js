import Vue from 'vue';
import Router from 'vue-router';
import RandomQuote from '../components/RandomQuote';
import SearchQuotes from '../components/SearchQuotes';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RandomQuote',
      component: RandomQuote,
    },
    {
      path: '/search-quotes',
      name: 'SearchQuotes',
      component: SearchQuotes,
    }    
  ]
});