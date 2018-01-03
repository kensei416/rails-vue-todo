function remove(array, id) {
  return array.filter(e => e.id !== id);
}


import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    current_category: "Inbox",
    isUserLoggedIn: false,
    tasks: [],
    loading: false,
    errors: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
      state.isUserLoggedIn = true
      state.errors = null
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setErrors (state, errors) {
      console.log(errors.response.data.ErrorMesage)
      state.errors = errors.response.data.ErrorMesage
    },
    logoutUser (state, user) {
      state.user = null
      state.isUserLoggedIn = null
      state.tasks = null
      state.errors = ''
      state.current_category = 'Inbox'
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    toggleTask(state, obj) {
      let id = Number(obj.id) - 1
      switch (obj.type) {
        case 'is_done': 
          state.tasks[id].is_done = !state.tasks[id].is_done
          break
        case 'fav': 
          state.tasks[id].fav = !state.tasks[id].fav
          break
      }
      
    },
    AddTask(state, payload) {
      state.tasks.push({
        id: state.tasks.length+1,
        title: payload,
        is_done: false,
        fav: false,
        user_id: null
      })
    },
    setRoot(state, root) {
      console.log(root)
      state.route = root
    },
    setCurrentCategory(state, category) {
      state.current_category = category
    },
    addCategory(state, category) {
      state.user.categories.push(category)
    },
    deleteCategory (state, id) {
      state.user.categories = remove(state.user.categories, id)
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)

    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    async loginUser({commit}, user) {
      try {
        const response = await axios.post('/api/sessions', 
          { session: { 
            email: user.email, 
            password: user.password,
            remember_me: user.remember_me
          }
        })
          commit('setUser', response.data)
          commit('setRoot', '/')
      } catch (error) {
        commit('setErrors', error)
      }
    },
    async signUpUser({commit}, user) {
      try {
        const response = await axios.post('/api/users', 
          { user: { 
              email: user.email, user_id: user.user_id, 
              password: user.password, password_confirmation: user.password_confirmation
          }
        })
          console.log(response)
          commit('setUser', response.data)
          commit('setRoot', '/')
      } catch (error) {
        console.log(error)
        commit('setErrors', error)
      }
    },
    logoutUser({commit}, id) {
      axios.delete(`/api/sessions/${id}`)
      commit('logoutUser')
    },
    async AddCategory({commit, state}, category) {
      commit('setLoading', true)
      try { 
      const response = await axios.post(`/api/users/${state.user.id}/categories`, 
        { title: category })
        commit('addCategory', response.data.category)
        commit('setLoading', false)
      } catch (error) {
        commit('setErrors', error)
        commit('setLoading', false)
      }
    },
    DeleteCategory({commit, state}, id) {
      commit('setLoading', true)
      try {
        axios.delete(`/api/categories/${id}`)
        commit('deleteCategory', id)
        commit('setLoading', false)
      } catch (error) {
        commit('setErrors', error)
        commit('setLoading', false)
      }
    },
    LoadTasks({commit, state}) {
      commit('setLoading', true)
      axios.get(`/api/users/${state.user.id}/tasks`).then((response) => {
        const tasks = []
        const obj = response.data.tasks
        for (let key in obj) {
          tasks.push({
            id: Number(key)+1,
            title: obj[key].title,
            is_done: obj[key].is_done,
            fav: obj[key].fav,
            user_id: null
          })
        }
        
        commit('setTasks', tasks)
        commit('setLoading', false)
      })
    },
    toggleTask({commit}, payload) {
        if (payload.type === 'is_done') {
          axios.put(`/api/tasks/${payload.id}`, 
            { task: { is_done: !this.state.tasks[Number(payload.id)-1].is_done } })
              .then((response) => {
                commit('toggleTask', payload)
              }, (error) => {
                console.log(error)
              })
        } else {
          axios.put(`/api/tasks/${payload.id}`, 
            { task: { fav: !this.state.tasks[Number(payload.id)-1].fav } })
              .then((response) => {
              commit('toggleTask',payload)
            }, (error) => {
              console.log(error)
            })
        }
    },
    AddTask({commit, state}, payload) {
      commit('setLoading', true)
      try {
        axios.post(`/api/users/${state.user.id}/tasks`, { task: { title: payload, category_id: state.user.id }}).then((response) => {
          commit('AddTask', payload)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setErrors', error)
        commit('setLoading', false)
      }
    }
    
    
  },
  getters: {
    isUserLoggedIn (state) {
      return state.isUserLoggedIn
    },
    getUser (state) {
      return state.user
    },
    getError (state) {
      return state.errors
    },
    getCategories (state) {
      if (state.user) 
        return state.user.categories
    },
    getTasks(state) {
      return state.tasks
    },
    getCurrentCategory(state) {
      return state.current_category
    }
  }
})

