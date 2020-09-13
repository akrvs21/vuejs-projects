import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import './assets/app.scss';
import jQuery from 'jquery'
import 'popper.js'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)

window.$ = window.jQuery = jQuery;

Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Hero',require('./components/Hero.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
