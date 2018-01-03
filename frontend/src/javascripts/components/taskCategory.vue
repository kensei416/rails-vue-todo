<template>
<div>
<v-app v-if="logged_in">
<v-container grid-list-xl text-xs-center>
  <v-layout row>
    <v-flex xs12 sm-8>
      <v-card>
        <v-list subheader>
            <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar @click="dialog=true">
            <v-list-tile-action>
                <v-icon>add</v-icon>
            </v-list-tile-action>
             <v-list-tile-content>
                <v-list-tile-title>新規作成</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            カテゴリの追加
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newCategory"
              label="Category Name"
              @keyup.enter="AddCategory"
            ></v-text-field>
          </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="AddCategory">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</v-container>
</v-app>
<login v-else/>
</div>
</template>

<script>
import Login from './login.vue'

  export default {
    data () {
      return {
        items: [
          { title: '受信箱', icon: 'inbox' },
          { title: 'ブックマーク', icon: 'bookmark_border' },
          { title: '今日', icon: 'today' },
          { title: '家族', icon: 'people_outline' },
        ],
        dialog: false,
        newCategory: null
      }
    },
    methods: {
      navigateTo (root) {
        this.$router.push(root)
      },
      AddCategory () {
        this.items.push({title: this.newCategory, icon: 'list'})
        this.newCategory = null
        this.dialog = false
      }
    },
    computed:{
      logged_in() {
        return this.$store.getters.isUserLoggedIn
      }
    },
    components: {
    'login': Login,
    }
  }
</script>

<style>
.dialog {
  background-color: black;
}
</style>
