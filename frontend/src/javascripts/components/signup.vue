<template>
  <v-container>
   <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-title v-show="ReturnErrors" class="red--text">
         <h1>Your address or user_id is already used </h1>
        </v-card-title>
        <v-card-title >
         <h1>Sign up</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            placeholder="Press Your Email"
            v-model="form.email"
            required
            type="email"
            ref="email"
            :rules="[
              () => !!form.email || 'This field is required',
              () => !!form.email.match(/^\S+@\S+\.\S+$/) && form.email.length <= 255 || 'Your Email is Invalid'
            ]"
            counter="255"
          ></v-text-field>
          <v-text-field
            label="UserId"
            placeholder="Press Your UserId"
            v-model="form.user_id"
            required
            ref="user_id"
            :rules="[
              () => !!form.user_id || 'This field is required',
              () => !!form.user_id.match(/^[a-z0-9]+$/) && form.user_id.length <= 14 || 'Your Id can not use large characters and maximum word length is 14'
            ]"
            counter="14"
            
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="form.password"
            required
            type="password"
            ref="password"
            :rules="[() => !!form.password && form.password === form.password_confirmation || 'This field is required']"
          ></v-text-field>
          <v-text-field
            label="Passoword Confirmation"
            v-model="form.password_confirmation"
            required
            type="password"
            ref="password_confirmation"
            :rules="[() => !!form.password_confirmation && form.password === form.password_confirmation || 'This field is required']"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat　@click="">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              left
              v-if="formHasErrors"
            >
              <v-btn
                icon
                @click="resetForm"
                slot="activator"
                class="my-0"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
    data () {
      return{
        name: '',
        email: '',
        user_id: '',
        password: '',
        password_confirmation: '',
        formHasErrors: false,
        ReturnErrors: false
      }
    },
    methods: {
      resetForm () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })

        if (!this.formHasErrors) {
          this.$store.dispatch('signUpUser', this.form)
        }
      }
    },
    computed: {
      form () {
        return {
          email: this.email,
          user_id: this.user_id,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
      }
    }
  }
</script>
