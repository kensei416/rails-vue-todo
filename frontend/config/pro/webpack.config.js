var webpack = require('webpack')
var path = require('path')
const dir_name = "/Users/kensei/program/ruby/todo-app-v2/app"
module.exports = {
  entry: {
    application: './src/javascripts/todo.js',
  },
  output: {
    path: path.join(dir_name, '/app/assets/javascripts'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {url: false}
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
}