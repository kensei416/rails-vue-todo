import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import App from '../../src/javascripts/components/login.vue'

const localVue = createLocalVue()

localVue.use(Vuex)



describe('login.vue', ()=> {
  let state
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn(),
    }
    getters = {
      getError: () => null
    }
    store = new Vuex.Store({
      state: {},
      actions,
      getters
    })
  })
  it ('render the login button', () => {
    const wrapper = shallow(App, { store, localVue })
    const vm = wrapper.vm
    const form = vm.form
    const login = wrapper.find('.login')
    form.email = "kensei416@gmail.com"
    form.password = "foobar"
  })
})