import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Login from '../../../src/javascripts/components/login.vue'
import module from '../store/store_test'
const localVue = createLocalVue()


localVue.use(Vuex)

describe('Modules.vue', () => {
  let actions
  let store
  let getters
  let state
  beforeEach(() =>{
    state = {
      user: null,
      isUserLoggedIn: false
    }

    actions = {
      loginUser: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions,
      getters: module.getters
    })
  })

  it ('Invalid data should be error', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')

    // #empty email, password
    login.trigger('click')
    expect(vm.FormHasErrors).toBe(true)

    // #empty email
    vm.form.password ="foobar"
    login.trigger('click')
    expect(vm.FormHasErrors).toBe(true)

    // #password empty
    vm.form.email = "kensei416@gmail.com"
    vm.form.password = ""
    login.trigger('click')
    expect(vm.FormHasErrors).toBe(true)
  })

  it ('Valid data should be logged_in', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')
    vm.form.email = "kensei416@gmail.com"
    vm.form.password ="foobar"
    login.trigger('click')
    expect(vm.FormHasErrors).toBe(false)
    expect(actions.loginUser).toHaveBeenCalled()
  })


})