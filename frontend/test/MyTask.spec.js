import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { expect } from 'chai'
import App from '../src/javascripts/components/login.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = shallow(App)
const vm = wrapper.vm

describe('login.vue', ()=> {
  let actions
  let getters
  let store
  let mutations

  beforeEach(() => {
    actions = {}
    getters = {}
    mutations = {}
    store = new Vuex.Store({
      state: {},
      actions,
      getters,
      mutations
    })
  })
  it ('render the login button', () => {
    expect(wrapper)
  })
})