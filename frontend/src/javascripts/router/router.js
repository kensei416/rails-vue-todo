import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Tasks from '../components/tasks.vue'
import Account from '../components/account.vue'
import Contact from '../components/contact.vue'
import Edit from '../components/edit.vue'
import Signup from '../components/signup.vue'
import Login from '../components/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Tasks },
    { path: '/tasks', component: Tasks },
    { path: '/account', component: Account },
    { path: '/contact', component: Contact },
    { path: '/setting', component: Edit },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login }
  ],
  computed: {
    logged_in() {
      return this.$store.getters.isUserLoggedIn
    }
  }
})