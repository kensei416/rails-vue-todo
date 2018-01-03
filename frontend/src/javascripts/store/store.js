function remove(array, id) {
  return array.filter(e => e.id !== id);
}
function objKey (array, id) {
  for (let key in array) {
    if (array[key].id === id) {
        return key
    }
  }
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
    current_category: { title: "Inbox", id: 1},
    isUserLoggedIn: false,
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
      state.current_category = { title: 'Inbox', id: 1 }
    },
    setTasks (state, tasks) {
      state.user.tasks = tasks
    },
    setErrors (state, errors) {
      console.log(errors.response.data.ErrorMesage)
      state.errors = errors.response.data.ErrorMesage
    },
    logoutUser (state, user) {
      state.user = null
      state.isUserLoggedIn = null
      state.errors = null
      state.current_category = null
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    toggleTask(state, obj) {
      let id = objKey(state.user.tasks, obj.id)
      switch (obj.type) {
        case 'is_done': 
          state.user.tasks[id].is_done = !state.user.tasks[id].is_done
          break
        case 'fav': 
          state.user.tasks[id].fav = !state.user.tasks[id].fav
          break
      }
      
    },
    AddTask(state, payload) {
      state.user.tasks.push({
        id: payload.id,
        title: payload.title,
        is_done: payload.is_done,
        fav: payload.fav,
        category_id: payload.category_id
      })
      console.log(state.user.tasks)
    },
    setRoot(state, root) {
      state.route = root
    },
    setCurrentCategory(state, category) {
      category = {
        id: category.id,
        title: category.title
      }
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
            id: obj[key].id,
            title: obj[key].title,
            is_done: obj[key].is_done,
            fav: obj[key].fav,
          })
        }
        
        commit('setTasks', tasks)
        commit('setLoading', false)
      })
    },
    toggleTask({commit, state}, payload) {
        const id = objKey(state.user.tasks, payload.id)
        if (payload.type === 'is_done') {
          axios.put(`/api/tasks/${payload.id}`, 
            { task: { is_done: !state.user.tasks[id].is_done } })
              .then((response) => {
                commit('toggleTask', payload)
              }, (error) => {
                console.log(error)
              })
        } else {
          axios.put(`/api/tasks/${payload.id}`, 
            { task: { fav: !state.user.tasks[id].fav } })
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
        axios.post(`/api/users/${state.user.id}/tasks`, 
        { task: 
          { title: payload.title, category_id: payload.category_id }})
          .then((response) => {
          commit('AddTask', response.data.task)
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
      if (state.user)
      return state.user.tasks
    },
    getCurrentCategory(state) {
      return state.current_category
    }
  }
})

