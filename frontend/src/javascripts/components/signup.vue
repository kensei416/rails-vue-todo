<template>
  <v-container>
   <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-alert color="error" :value="!!errorMessage" class="error-message">
          <h1>{{ errorMessage }}</h1>
        </v-alert>
        <v-card-title >
         <h1>Sign up</h1>
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
            name="password"
            v-model="form.password"
            :error-messages="errors.collect('password')"
            v-validate="'required|min:8'" 
            data-vv-name="password"
            type="password"
            class="password"
          ></v-text-field>
          <v-text-field
            label="Passoword Confirmation"
            name="password_confirmation"
            v-model="form.password_confirmation"
            :error-messages="errors.collect('password_confirmation')"
            v-validate="'required|min:8|confirmed:password'"
            data-vv-name="password_confirmation"
            type="password"
            class="password_confirmation"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="signup" class="signup">SignUp</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              left
              v-show="formHasErrors||errorMessage"
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
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data () {
       const defaultForm = Object.freeze({
        email: '',
        password: '',
        password_confirmation: '',
        formHasErrors: false
      })
      return{
        $validates: true,
        form: Object.assign({}, defaultForm),
        formHasErrors: false,
      }
    },
    methods: {
      resetForm () {
        this.FormHasErrors =  false
        this.form.email = ''
        this.form.password = ''
        this.form.password_confirmation = ''
        this.errors.clear()
      },
      signup () {
        this.formHasErrors = false

        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('signUpUser', this.form)
          } else {
            this.formHasErrors = true
          }
        })
      }
    },
     computed: mapGetters({
      errorMessage: 'getResponseError'
    })
  }
</script>
