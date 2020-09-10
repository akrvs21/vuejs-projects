import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// Vue.component register it as a global component
Vue.component("todo",require('./components/Todo.vue').default);

new Vue({
  render: h => h(App),
}).$mount('#app')
