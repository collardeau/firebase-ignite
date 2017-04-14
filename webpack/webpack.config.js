/* eslint-disable */
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    app: './entry.js',
    vendor: ['react', 'react-dom', 'firebase']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'bundle.[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([{ from: '../assets', ignore: '.*' }])
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist')
  }
};
