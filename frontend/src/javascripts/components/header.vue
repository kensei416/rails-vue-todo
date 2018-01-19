<template >
    <v-toolbar class="cyan accent-3" dark >
      <v-toolbar-title class="white--text">todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat v-for="item in items" :class="item.class" :key="item.icon" @click="navigateTo(item.root)">
        <v-icon>{{item.icon}}</v-icon>{{item.title}}
      </v-btn>
      <v-menu
      offset-y
      :nudge-left="20"
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu"
    >
      <v-btn dark flat icon slot="activator" v-show="logged_in">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-card>
        <v-list subheader>
          <v-list-tile avatar v-for="drop in Geardrop" :key="drop.title" @click="navigateTo(drop.root)">
            <v-list-tile-action>
              <v-icon>{{ drop.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ drop.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ログアウト</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-menu>
    </v-toolbar>
</template>
<script>
import axios from 'axios'

  export default {
    data: () => ({
      Geardrop: [
        // { title: '設定', icon: 'settings', root: '/setting' }
      ],
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),
    methods: {
      navigateTo (root) {
        this.$router.push(root)
        if (!this.$store.state.isUserLoggedIn)
          this.$store.commit('clearFormErrors')
      },
      logout () {
        this.$store.dispatch('logoutUser', this.user.user_id)
        this.$router.push('/login')
      }
    },
    computed: {
      logged_in() {
        return this.$store.getters.isUserLoggedIn
      },
      user() {
        return this.$store.getters.getUser
      },
      items () {
        if (this.logged_in) {
          // return [
          //   { title: '', icon: 'notifications_none', root: '/account' },
          //   { title: '', icon: 'bookmark_border', root: '/contact' }
          // ]
          return [{ title: 'Home', icon: 'home', root: '/' }]
        } else {
          return [
            { title: 'Signup', icon: 'create', root: '/signup', class: 'signupButton' },
            { title: 'Login', icon: 'lock_open', root: '/login', class: 'loginButton' }
          ]
        }
      }
    }
  }

</script>