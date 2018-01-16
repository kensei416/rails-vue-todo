'use strict';

module.exports = {

  'Contents test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .assert.title('TodoSample')
      .end();

  },
      
  'Header test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .expect.element('.toolbar').to.be.present
    browser
      .expect.element('.loginButton').to.be.present
    browser
      .expect.element('.signupButton').to.be.present
    browser.end()
  },

  'Header Auth test' : function (browser) {
    browser
      .url('http://localhost:5000/') .pause(1000)
      .click('.loginButton')
    browser
      .url(function(result) {
        console.log(result)
        this.assert.equal(result.value, 'http://localhost:5000/login', 'Url is the same')
      }).end()
  }
};