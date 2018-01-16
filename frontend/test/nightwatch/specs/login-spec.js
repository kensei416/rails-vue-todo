'use strict';

module.exports = {
  'login form check test' : function (browser) {
    browser
      .url('http://localhost:5000/login') .pause(1000)
      .assert.elementPresent('.email')
      .assert.elementPresent('.password')
      .assert.elementPresent('.login')
      .end();
  },
}