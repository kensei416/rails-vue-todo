<template>
  <v-toolbar color="pink" dark>
        <v-toolbar-title class="white--text">My Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="AddTask">
          <v-icon>add</v-icon>
        </v-btn>
        <v-text-field
          label="Add Your Task"
          v-model="newTask"
          auto-grow	
          class="white--text"
          dark
          @keyup.enter="AddTask"
        >
        </v-text-field>
  </v-toolbar>
</template>
  
<script>
import axios from 'axios'

export default {

  data () {
    return {
      newTask: ''
    }
  },
  methods: {
    AddTask() {
      axios.post('/api/tasks', { task: { title: this.newTask }}).then((response) => {
        this.tasks.push(response.data.task)
        this.newTask = ''
      }, (error) => {
        console.log('error')
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.signup {
  background: #28e5fd;
}
</style>
