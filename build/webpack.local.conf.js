const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const config = require('./config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseConfig, {
  module: {
    rules: [{
      test: /\.scss/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader'
          // options: {
          //     sourceMap: true
          // }
        },
        'sass-loader'
      ],
      include: resolve('src')
    },
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: resolve('dist'),
    open: false,
    https: true,
    host: 'localhost',
    port: 8888,
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: true,
    compress: true,
    proxy: config.local.proxyTable
  }
})

module.exports = webpackConfig
