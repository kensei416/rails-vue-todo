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
      .url('http://localhost:5000/login') .pause(1000)
      .setValue('.email input[type=email]', 'nightwatch')
      .assert.containsText('.email .input-group__error', 'Your Email is Invalid')
      .setValue('.password input[type=password]', '')
      .click('.checkbox')
      .click('.login').pause(2000)
      .assert.containsText('.error-message', 'alert error-message error')
      
  }
}