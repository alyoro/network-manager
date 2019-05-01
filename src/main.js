import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store/store'
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8090/api';

export const EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
