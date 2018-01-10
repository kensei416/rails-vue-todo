var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: {
    application: './frontend/src/javascripts/todo.js',
  },
  output: {
    path: path.join(process.cwd(), '/app/assets/javascripts'),
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
  devtool: 'inline-source-map'
}