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
            required
            type="email"
            ref="email"
            class="email"
            :rules="[
              () => !!form.email || 'This field is required',
              () => !!form.email.match(/^\S+@\S+\.\S+$/) && form.email.length <= 255 || 'Your Email is Invalid'
            ]"
            counter="255"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="form.password"
            required
            type="password"
            ref="password"
            class="password"
            :rules="[() => !!form.password || 'This field is required']"
          ></v-text-field>
          <v-checkbox
            color="green"
            ref="checkbox"
            class="checkbox"
            v-model="remember_me"
          >
            <div slot="label" @click.stop="remember_me=!remember_me">
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
        password: ''
      })
      return{
        form: Object.assign({}, defaultForm),
        remember_me: 0,
        FormHasErrors: false,
        rules: {
          email: [
            val => !!val || 'This field is required',
            val => !!val.match(/^\S+@\S+\.\S+$/) || val.length >= 255 || 'Your Email is Invalid'
          ],
          password: [
            val => !!val || 'This field is required',
            val => val.length >= 30 || 'Your password is too long'
          ]
        }
       
      }
    },
    methods: {
      resetForm () {
        this.FormHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
       login () {
        this.FormHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.FormHasErrors = true
        })
        if (!this.FormHasErrors) {
          this.$store.dispatch('loginUser', 
          {
            email: this.form.email,
            password: this.form.password, 
            remember_me: String(this.remember_me)
          })
        }
      }
    },
    computed: mapGetters({
      errorMessage: 'getError'
    })
  }
</script>
