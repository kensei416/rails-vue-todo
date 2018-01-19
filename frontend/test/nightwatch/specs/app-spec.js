'use strict';

module.exports = {

  'Contents test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .assert.title('TodoSample')
      .end()

  },
      
  'Header test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .assert.elementPresent('.toolbar')
      .assert.elementPresent('.loginButton')
      .assert.elementPresent('.signupButton')
      .end()
  },

  'Header Auth check test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .click('.loginButton')
      .assert.urlEquals('http://localhost:5000/login')
      .click('.signupButton')
      .assert.urlEquals('http://localhost:5000/signup')
      .end()
  },
  'Check category forms test' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .setValue('.email .input-group__input input[type=text]', 'foobar@gmail.com')
      .setValue('.password .input-group__input input[type=password]', 'foobarff')
      .click('.checkbox')
      .click('.login').pause(1000)
      .assert.urlEquals('http://localhost:5000/')
      .assert.elementPresent('.open-dialog')
      .assert.hidden('.input-category')
      .assert.hidden('.add-category')
      .assert.hidden('.cancel-category')
      .assert.containsText('ul.categories li:nth-child(1)', 'Category')
      .assert.containsText('ul.categories li:nth-child(2)', 'Inbox')
      .assert.elementNotPresent('ul.categories li:nth-child(6)')
      .click('.open-dialog')
      .assert.hidden('.open-dialog')
      .assert.elementPresent('.input-category')
      .setValue('.input-category input[type=text]', 'HOME')
      .click('.add-category').pause(1000)
      .assert.elementPresent('ul.categories li:nth-child(6)')
      .assert.containsText('ul.categories li:nth-child(3)', 'HOME')
      .click('ul.categories li:nth-child(3) .btn')
      .assert.elementNotPresent('ul.categories li:nth-child(6)')
      .assert.hidden('.input-category')
      .assert.hidden('.add-category')
      .assert.hidden('.cancel-category')
      .end()
  },
  'Check task forms test' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .setValue('.email .input-group__input input[type=text]', 'foobar@gmail.com')
      .setValue('.password .input-group__input input[type=password]', 'foobarff')
      .click('.checkbox')
      .click('.login').pause(1000)
      .click('.open-dialog')
      .setValue('.input-category input[type=text]', 'HOME')
      .click('.add-category').pause(1000)
      .assert.elementNotPresent('.card__title .headline')
      .click('ul.categories li:nth-child(3)')
      .assert.containsText('.card__title .headline', 'HOME')
      .assert.elementPresent('.open-taskform')
      .click('.open-taskform')
      .assert.hidden('.open-taskform')
      // Add Task
      .assert.visible('.input-task input[type=text]')
      .assert.visible('.input-expireday input[type=text]')
      .assert.visible('.add-task')
      .assert.visible('.cancel-task')
      .setValue('.input-task input[type=text]', 'sample')
      .click('.add-task').pause(1000)
      // Check Bookmark Task
      .assert.elementPresent('ul.tasks .list__tile div:nth-child(3) .btn')
      .click('ul.tasks .list__tile div:nth-child(3) .btn').pause(1000)
      .assert.elementPresent('ul.tasks .red--text')
      .click('ul.categories li:nth-child(3) .btn')
      // Check Done Task
      .end()
  }

};