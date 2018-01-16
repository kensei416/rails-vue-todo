<template>
  <v-container>
   <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-alert color="error" :value="!!errorMessage" class="error-message">
         <h1>{{ errorMessage }}</h1>
        </v-alert>
        <v-card-title>
          <h1>Log in</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            placeholder="Press Your Email"
            v-model="form.email"
            :error-messages="errors.collect('email')"
            v-validate="'required|email'"
            data-vv-name="email"
            class="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="form.password"
            :error-messages="errors.collect('password')"
            v-validate="'required|min:6'" 
            data-vv-name="password"
            type="password"
            class="password"
          ></v-text-field>
          <v-checkbox
            color="green"
            ref="checkbox"
            class="checkbox"
            v-model="form.remember_me"
          >
            <div slot="label" @click.stop="form.remember_me=!form.remember_me">
              Remember me on this computer
            </div>
          </v-checkbox>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              left
              v-if="FormHasErrors"
            >
              <v-btn
                icon
                @click="resetForm"
                slot="activator"
                class="my-0 reset"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn 
            color="primary"
            class="login"
            flat @click="login"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data () {
      const defaultForm = Object.freeze({
        email: '',
        password: '',
        remember_me: false
      })
      return{
        form: Object.assign({}, defaultForm),
        FormHasErrors: false, 
        $validates: true
      }
    },
    methods: {
      resetForm () {
        this.FormHasErrors =  false
        this.form.email = null
        this.form.password = null
        this.form.remember_me = false
        this.errors.clear()
      },
       login () {
        this.formHasErrors = false
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('loginUser', this.form)
          } else {
            this.FormHasErrors = true
          }
        })
      }
    },
    computed: mapGetters({
      errorMessage: 'getError'
    })
  }
</script>
