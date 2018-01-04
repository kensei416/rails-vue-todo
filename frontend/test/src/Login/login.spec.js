import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Login from '../../../src/javascripts/components/login.vue'
import module from '../../../src/javascripts/store/store.js'
const localVue = createLocalVue()


localVue.use(Vuex)

describe('Modules.vue', () => {
  let actions
  let store
  let getters

  beforeEach(() =>{
    getters = {
      getError: () => 'Your email/password invalid'
    }

    actions = {
      loginUser: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it ('Invalid data should be error', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const button = wrapper.find('.login')

    expect(button.exists()).toBe(true)
    expect(wrapper.find('.reset').exists()).toBe(false)    
    button.trigger('click')
    expect(vm.FormHasErrors).toBe(true)
    const reset = wrapper.find('.reset')
    expect(reset.exists()).toBe(true)
    // $refsが動かない。
    // reset.trigger('click')
    // expect(vm.FormHasErrors).toBe(false)
  })

  it ('Valid data should login', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    const button = wrapper.find('.login')
    vm.form.email = 'kensei416@gmail.com'
    vm.form.password = 'foobar'
    button.trigger('click')
    expect(vm.FormHasErrors).toBe(false)
    expect(actions.loginUser).toHaveBeenCalled()
    expect(actions.loginUser.mock.calls).toHaveLength(1)
    expect(actions.loginUser.mock.calls[0][1].email).toEqual("kensei416@gmail.com")
    expect(actions.loginUser.mock.calls[0][1].password).toEqual("foobar")
    expect(actions.loginUser.mock.calls[0][1].remember_me).toEqual("0")
  })

  it ('Getters should be return Error message', () => {
    const wrapper = shallow(Login, { store, localVue })
    const vm = wrapper.vm
    expect(wrapper.find('.error-message').text().trim()).toEqual('Your email/password invalid')
  })
})
