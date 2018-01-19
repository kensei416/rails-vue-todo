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
      .assert.hidden('.add-category')
      .assert.hidden('.cancel-category')
      .click('.open-dialog')
      .assert.hidden('.open-dialog')
      .assert.elementPresent('.input-category')
      .setValue('.input-category input[type=text]', 'HOME')
      .click('.add-category')
      .assert.hidden('.input-category')
      .end()
  }

};