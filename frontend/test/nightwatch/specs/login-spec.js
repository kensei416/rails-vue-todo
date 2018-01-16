'use strict';

module.exports = {
  'login form check test' : function (browser) {
    browser
      .url('http://localhost:5000/login') .pause(1000)
      .assert.elementPresent('.email')
      .assert.elementPresent('.password')
      .assert.elementPresent('.login')
  },
  
  'Input Invalid Value' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .setValue('.email .input-group__input input[type=text]', 'nightwatch')
      .assert.containsText('.email .input-group__error', 'The email field must be a valid email.')
      .setValue('.password .input-group__input input[type=password]', 'foobar')
      .assert.elementPresent('.password .input-group__error')
      .click('.checkbox')
      .click('.login')
      .click('.reset')
      .assert.value('.email .input-group__input input[type=text]', '')
      .assert.value('.password .input-group__input input[type=password]', '')
      .end()
  },

  'Input Invalid Email & Password' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .assert.cssProperty('.error-message', 'display', 'none')
      .setValue('.email .input-group__input input[type=text]', 'foobar@gmail.com')
      .setValue('.password .input-group__input input[type=password]', 'foobar')
      .click('.checkbox')
      .click('.login')
      .assert.cssProperty('.error-message', 'display', 'flex')
  }
}