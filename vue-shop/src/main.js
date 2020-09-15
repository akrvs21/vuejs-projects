import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import './assets/app.scss';
import jQuery from 'jquery'
import 'popper.js'
import VueFirestore from 'vue-firestore'
import Swal from 'sweetalert2'

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})
Vue.use(VueFirestore)


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



window.Swal = Swal
window.Toast = Toast
window.$ = window.jQuery = jQuery;

Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Hero',require('./components/Hero.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
