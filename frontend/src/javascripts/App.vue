<template>
  <v-app>
    <toolbar/>
    <v-container fluid grid-list-md v-show="logged_in">
      <v-layout row wrap>
      <v-flex d-flex xs4 offset-xs2 md3>
        <v-card dark>
           <v-list two-line subheader>
          <v-subheader inset>Category</v-subheader>
          <v-list-tile v-for="category in categories" v-bind:key="category.id" @click="SelectCategory(category.title)">
            <v-list-tile-content>
              <v-list-tile-title>{{ category.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="DeleteCategory(category.id)">
                <v-icon color="grey lighten-1">settings</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-show="dialog">
            <v-text-field 
            label="Write Your Category" 
            required 
            v-model="newCategory"
            prepend-icon="create"
            ref="category"
            @input="geLength"
            @keyup.enter="AddCategory"
            :rules="[()=> !!newCategory || 'This field is required']"
            >
            </v-text-field>
          </v-list-tile>
          <v-list-tile v-show="dialog">
            <v-btn dark @click="AddCategory" class="cyan accent-3"> 
           　　 <v-icon dark>add</v-icon>AddCategory
          　</v-btn>
            <v-btn light @click="CancelCategory">
              Cancel
            </v-btn>
          </v-list-tile>
          <v-list-tile @click="dialog=true" class="red--text" v-show="dialog===false">
           <v-list-tile-action>
             <v-icon>add</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>Add Category</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs8 sm8 md6>
      <router-view></router-view>
      </v-flex>
      </v-layout>
    </v-container>
    <main v-show="!logged_in">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './components/header.vue'

  export default {
    data () {
      return {
        dialog: false,
        newCategory: '',
        formHasErrors: false,
      }
    },
    components: {
    'toolbar': Header
    },
    methods: {
      AddCategory () {
        this.formHasErrors = false
        if (!this.newCategory) this.formHasErrors = true
        this.$refs['category'].validate(true)

        if (!this.formHasErrors) {
          this.$store.dispatch('AddCategory', this.newCategory)
          this.newCategory = null
          this.dialog = false
        }
      },
      DeleteCategory (id) {
        this.$store.dispatch('DeleteCategory', id)
      },
      CancelCategory () {
        this.dialog = false
        this.newCategory = null
        this.$refs['category'].reset()
      },
      SelectCategory(category) {
        this.$store.commit('setCurrentCategory', category)
      },
       geLength () {
        console.log(this.newCategory.length)
      }
    },
    computed: mapGetters({
      logged_in: 'isUserLoggedIn',
      categories: 'getCurrentCategory'
    })
  }
</script>
