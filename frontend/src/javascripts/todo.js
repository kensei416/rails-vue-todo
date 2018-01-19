import Vue from 'vue'
import Vuetify from 'vuetify/dist/vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import Router from './router/router'
import store from './store/store'
import { sync } from 'vuex-router-sync'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import Cookies from 'js-cookie';



Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.config.productionTip = false


sync(store, Router)

document.addEventListener("DOMContentLoaded", function(event) {
  
  var app = new Vue({
    el: '#app',
    router: Router,
    store: store,
    render: h => h(App),
    created() {
      if (Cookies.get()) {
        axios.get('/api/sessions').then((response) => {
          this.$store.dispatch('setUser',response.data)
        })
      } else {
        this.navigateTo('/login')
      }
    }
  })
})