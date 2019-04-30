import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Search from './views/Search.vue';
import AddNew from './views/AddNew.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/add',
      name: 'add',
      component: AddNew,
      props: true
    }
  ],
});
