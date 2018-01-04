import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import App from '../../../src/javascripts/components/login.vue'
import store from '../../../src/javascripts/store/store.js'
const localVue = createLocalVue()


localVue.use(Vuex)

describe('Modules.vue', () => {
  let actions
  let state
  let store

  beforeEach(() =>{
    state = {
    }
  })
})
