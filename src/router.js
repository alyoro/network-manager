import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

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
      component: () => import('./views/Search.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./views/AddNew.vue'),
    },
    {
      path: '/connect',
      name: 'connect',
      component: () => import('./views/ConnectDevices.vue'),
    },
  ],
});
