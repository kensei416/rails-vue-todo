'use strict';

module.exports = {
  'signup form check test' : function (browser) {
    browser
      .url('http://localhost:5000/signup') .pause(1000)
      .assert.elementPresent('.email')
      .assert.elementPresent('.password')
      .assert.elementPresent('.password_confirmation')
      .assert.elementPresent('.signup')
      .assert.elementPresent('.reset')
  },
  'Input Invalid Value' : function (browser) { //Input Invalid Valueでは、vee-validateで指定したvalidateに違反する値を入力する。
    browser
    .url('http://localhost:5000/signup').pause(1000)
    .setValue('.email input[type=text]', 'nightwatch')
    .click('.signup')
    .assert.containsText('.email .input-group__error', 'The email field must be a valid email.')
    .assert.containsText('.password .input-group__error', 'The password field is required.')
    .assert.containsText('.password_confirmation .input-group__error', 'The password_confirmation field is required.')    
    .assert.elementPresent('.reset')
    .click('.reset').pause(1000)
    .assert.value('.email input[type=text]', '')
    .assert.value('.password input[type=password]', '')
    .end()
  },

  'Input Valid Email & Password' : function (browser) {
    browser
      .url('http://localhost:5000/signup').pause(1000)
      .setValue('.email input[type=text]', 'foobar@gmail.com')
      .setValue('.password input[type=password]', 'foobarff')
      .setValue('.password_confirmation input[type=password]', 'foobarff')
      .click('.signup').pause(1000)
      .assert.urlEquals('http://localhost:5000/signup')
  }
}