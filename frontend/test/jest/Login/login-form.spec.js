import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import Login from '../../../src/javascripts/components/login.vue'
import module from '../../__mock__/store/store_test.js'
import flushPromises from 'flush-promises'
const localVue = createLocalVue()


localVue.use(Vuex)
localVue.use(VeeValidate)
jest.setTimeout(10000)
jest.useFakeTimers()


describe('Modules.vue', () => {
  let mutations
  let actions
  let store
  let state
  let getters
  beforeEach(() =>{
    state = {
      user: null,
      isUserLoggedIn: false
    }

    mutations = {
      setError: jest.fn()
    }

    actions = {
      loginUser: jest.fn()
    }

    getters = {
      getResponseError: () => '',
      getFormError: () => false
    }

    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters
    })
  })

  
  it ('Input empty email, password', async () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')

    expect(vm.errors.count()).toBe(0)
    expect(mutations.setError.mock.calls.length).toBe(0)
    login.trigger('click')
    await flushPromises()
    expect(mutations.setError).toHaveBeenCalled()
    expect(mutations.setError.mock.calls.length).toBe(2)
    expect(vm.errors.items[0].field).toBe('email')
    expect(vm.errors.items[1].field).toBe('password')
    expect(vm.errors.count()).toBe(2)
  })

  it ('Input empty email', async () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')
    
    expect(vm.errors.count()).toBe(0)
    expect(mutations.setError.mock.calls.length).toBe(0)
    vm.form.password ="foobar"
    login.trigger('click')
    await flushPromises()
    expect(mutations.setError).toHaveBeenCalled()
    expect(mutations.setError.mock.calls.length).toBe(2)
    expect(vm.errors.items[0].field).toBe('email')
    expect(vm.errors.count()).toBe(1)
  })
    
  it ('Input empty password', async () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')

    expect(vm.errors.count()).toBe(0)
    expect(mutations.setError.mock.calls.length).toBe(0)
    vm.form.email = "kensei416@gmail.com"
    vm.form.password = ""
    login.trigger('click')
    await flushPromises()
    expect(mutations.setError).toHaveBeenCalled()
    expect(mutations.setError.mock.calls.length).toBe(2)
    

    expect(vm.errors.items[0].field).toBe('password')
    expect(vm.errors.count()).toBe(1)
  })

  it ('Input Valid form data', async () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const login = wrapper.find('.login')
    vm.form.email = "kensei416@gmail.com"
    vm.form.password ="foobar"
    login.trigger('click')
    await flushPromises()
    expect(mutations.setError).toHaveBeenCalled()
    expect(actions.loginUser).toHaveBeenCalled()
    expect(Object.keys(actions.loginUser.mock.calls[0][1]).length).toBe(3)
    expect(vm.errors.count()).toBe(0)
  })


})