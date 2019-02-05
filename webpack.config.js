// プラグインを利用するためにwebpackを読み込んでおく
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool:
    process.env.NODE_ENV === 'production' ? '#cheap-module-source-map' : false,
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, 'src/webpack/index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].bundle.js',
  },
  optimization: {
    // 共通モジュールのバンドル
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'babel-loader',
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            // 共通箇所の読み込み
            options: {
              data: '@import "_common.scss";',
              includePaths: [path.resolve(__dirname, './src/scss/')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    // ビルド対象に含めたいファイルの拡張子を Array で指定
    extensions: ['*', '.js', '.vue', '.json'], // デフォルトでは ['.wasm', '.mjs', '.js', '.json']
    alias: {
      vue:
        process.env.NODE_ENV === 'production'
          ? 'vue/dist/vue.min.js'
          : 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      velocity: 'velocity-animate',
      axios: 'axios',
      _: 'lodash',
    }),
  ],
};
