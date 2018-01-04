import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import App from '../../src/javascripts/App.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      AddCategory: jest.fn(),
      actionInput: jest.fn(),
    }
    
    // 変更後のgetters名ではなく変更前を使わないと上手く動作しない。
    getters = {
      isUserLoggedIn: () => true,
      getCategories: () => { 
        [
          {
          created_at:"2018-01-04T04:04:01.842Z",
          id:25,
          title:"ff",
          updated_at:"2018-01-04T04:04:01.842Z"
          }
        ]
      }
    }
    store = new Vuex.Store({
      state: {},
      actions,
      getters
    })
  })
  
  it('open Dialog', () => {
    const wrapper = shallow(App, { store, localVue })
    const vm = wrapper.vm   
    expect(wrapper.exists()).toBe(true)
    const openDialog = wrapper.find('.open-dialog')
    openDialog.trigger('click')
    expect(vm.dialog).toBe(true)
  })

  it ('should be AddCategory input', () => {
    const wrapper = shallow(App, { store, localVue })
    const vm = wrapper.vm   
    const Input = wrapper.find('.input-category')
    const Add = wrapper.find('.add-category')
    const cancel = wrapper.find('.cancel-category')
    const openDialog = wrapper.find('.open-dialog')
    expect(Input.exists()).toBe(true)
    expect(Add.exists()).toBe(true)
    expect(cancel.exists()).toBe(true) 
    openDialog.trigger('click')

    // valid value
    vm.newCategory = 'Home'
    Add.trigger('click')
    expect(actions.AddCategory).toHaveBeenCalled()    
    expect(vm.newCategory).toBe(null)

    //  invalid value 
    vm.newCategory = ""
    Add.trigger('click')
    expect(vm.formHasErrors).toBe(true)

    // click cancel
    vm.newCategory = 'foo'
    expect(vm.newCategory).toBe('foo')
    cancel.trigger('click')
    expect(vm.newCategory).toBe(null)
  })


})