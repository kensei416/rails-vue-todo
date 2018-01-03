import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import App from '../../src/javascripts/App.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App', () => {
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
      isUserLoggedIn: () => true,
      getCurrentCategory: () => null
    }
    store = new Vuex.Store({
      state: {},
      actions,
      getters
    })
  })
  it('works', () => {
    const wrapper = shallow(App, { store, localVue })
    const vm = wrapper.vm
    expect(wrapper.contains('.open-dialog')).toBe(true)
    vm.dialog = true
    expect(wrapper.contains('.open-dialog')).toBe(false)
  })
})