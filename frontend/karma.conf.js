var webpackConf = require('./config/dev/webpack.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    reporters: ['spec'],
    files: ['./test/index.js'],
    preprocessors: {
      './test/index.js': ['webpack']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: false
    },
    singleRun: true
  })
}
