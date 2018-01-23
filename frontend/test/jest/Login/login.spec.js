import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import Login from '../../../src/javascripts/components/login.vue'
import module from '../store/store_test'
const localVue = createLocalVue()

localVue.use(VeeValidate)
localVue.use(Vuex)

describe('Modules.vue', () => {
  let actions
  let mutations
  let store
  let getters
  let state
  beforeEach(() =>{
    state = {
      formHasErrors: false,
      isUserLoggedIn: false
    }

    actions = {
      loginUser: jest.fn()
    }

    mutations = {
      setError: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions,
      mutations,
      getters: module.getters
    })
  })

  it ('Invalid data should be error', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')
    
    // // empty email, password
    login.trigger('click')
    expect(mutations.setError).toHaveBeenCalled()
    // empty email
    vm.form.password ="foobar"
    login.trigger('click')
    expect(mutations.setError).toHaveBeenCalled()

    // password empty
    vm.form.email = "kensei416@gmail.com"
    vm.form.password = ""
    login.trigger('click')
    expect(mutations.setError).toHaveBeenCalled()
  })

  it ('Valid data should be logged_in', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')
    vm.form.email = "kensei416@gmail.com"
    vm.form.password ="foobar"
    login.trigger('click')
    // expect(vm.formHasErrors).toBe(false)
    expect(actions.loginUser).toHaveBeenCalled()
  })


})