import Vue from 'vue/dist/vue.esm.browser.js'
import TheMenu from './components/TheMenu.vue'

const app = new Vue({
  // el: '#app'
  el: '#qiskit-navbar',
  components: {
    TheMenu
  }
})
