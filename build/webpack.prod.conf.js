const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('./config');



function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function subPath(_path) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, _path);
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: subPath('css/[name].css'),
    chunkFilename: subPath('css/[name].[contenthash:8].css')
  }),
  new CleanWebpackPlugin(['dist'], {
    root: resolve('/'),
    verbose: true,
    // exclude: ["files","to","ignore"]//排除不删除的目录，主要用于避免删除公用的文件
  }),
  new ProgressBarPlugin({
    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
  })
];

if (config.buildDetail) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8899,
  }));
}

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: subPath('js/[name].[chunkhash:8].js'),
    path: resolve('dist')
  },
  module: {
    rules: [{
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: resolve('src')
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        uglifyOptions: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  performance: {
    hints: false
  },
  plugins: plugins
})

module.exports = webpackConfig
