import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Search from './views/Search.vue';
import AddNew from './views/AddNew.vue';
import Settings from './views/Settings.vue';
import LoginPage from './views/LoginPage.vue';
import store from '@/store/store.js'

Vue.use(Router);

let router = new Router({
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path:'/login',
      name: 'login',
      component: LoginPage
    }
  ],
});

router.beforeEach((to, from, next) => {
 const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters["moduleAuthentication/isLoggedIn"];
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

export default router
