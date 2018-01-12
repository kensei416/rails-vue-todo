<template>
  <v-card height="800px">
    <v-card-title v-if="current_category">
      <span class="headline">{{ current_category.title }}</span>
    </v-card-title>
    <v-card-actions>
      <v-layout row wrap v-show="dialog">
        <v-flex xs12 sm8>
          <v-card-actions>
            <v-text-field 
            label="Write Your Task" 
            required 
            v-model="newTask"
            prepend-icon="create"
            @keyup.enter="AddTask"
            >
            </v-text-field>
          </v-card-actions>
        </v-flex>
        <v-flex xs12 sm4 >
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Expire Day"
              v-model="dateFormatted"
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
            ></v-text-field>
            <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
              <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save">OK</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex>
          <v-btn dark @click="AddTask" class="cyan accent-3"> 
            <v-icon dark>add</v-icon>AddTask
          </v-btn>
          <v-btn light @click="CancelTask">
            Cancel
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
    <v-btn flat light @click="dialog=!dialog" v-show="dialog===false" v-if="current_category"> 
      <v-icon dark>add</v-icon>AddTask
    </v-btn>
    <v-list three-line v-if="current_category">
      <template v-for="task in tasks">
        <v-list-tile avatar v-bind:key="task.id" v-show="task.is_done===false" v-if="current_category.id === task.category_id">
          <v-list-tile-action>
            <v-btn flat icon @click="updateTask({type: 'is_done', id: task.id})">
              <v-icon>check_box_outline_blank</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="task.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn  flat icon :color="task.fav === true ? 'red' : ''" @click="updateTask({type: 'fav', id: task.id})">
              <v-icon>bookmark_border</v-icon>
            </v-btn>
          </v-list-tile-action>
           <v-list-tile-action>
            <v-btn  flat icon @click="">
              <v-icon>more_horiz</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {

  data () {
    return {
      newTask: '',
      dialog: false,
      date: null,
      dateFormatted: null,
      menu: false
    }
  },
  methods: {
    AddTask() {
      if (this.newTask) {
        const task = {
          title: this.newTask,
          category_id: this.current_category.id
        }
        this.$store.dispatch('AddTask', task)
        this.newTask = null
        this.dialog = false
      }
    },
    updateTask (value) {
      console.log(value)
      this.$store.dispatch('toggleTask', value)
    },
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    CancelTask () {
      this.dialog = false
      this.newTask = null
      this.date = null
      this.dateFormatted = null
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.getTasks
    },
    current_category () {
      return this.$store.getters.getCurrentCategory
    }
  }
}
</script>


