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
      .assert.containsText('.error-message', 'Invalid email/password combination')
  },

  'Input Valid Email & Password' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .setValue('.email .input-group__input input[type=text]', 'kensei416@gmail.com')
      .setValue('.password .input-group__input input[type=password]', 'foobar')
      .click('.checkbox')
      .click('.login').pause(1000)
      .assert.urlEquals('http://localhost:5000/')
      .end()
  },

  'When check box is set Check Cookies' : function (browser) {
    browser
      .url('http://localhost:5000/login').pause(1000)
      .setValue('.email .input-group__input input[type=text]', 'kensei416@gmail.com')
      .setValue('.password .input-group__input input[type=password]', 'foobar')
      .click('.checkbox')
      .click('.login').pause(1000)
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 3)
        this.assert.equal(result.value[0].name, '_todo_sample_session')
        this.assert.equal(result.value[1].name, 'remember_token')
        this.assert.equal(result.value[2].name, 'user_id')
      })
      .end
  },

  'When check box is unset value ' : function (browser) {
    browser
    .deleteCookies()    
    .url('http://localhost:5000/login').pause(1000)
    .setValue('.email .input-group__input input[type=text]', 'kensei416@gmail.com')
    .setValue('.password .input-group__input input[type=password]', 'foobar')
    .click('.login').pause(1000)
    .getCookies(function (result) {
      this.assert.equal(result.value.length, 1)
      this.assert.equal(result.value[0].name, '_todo_sample_session')
    })
    .end
  }
}