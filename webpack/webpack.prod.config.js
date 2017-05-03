const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const config = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new CopyWebpackPlugin([
    {
      from: '../sw/firebase-messaging-production-sw.js',
      to: 'firebase-messaging-sw.js'
    }
  ]),
  new OfflinePlugin({
    responseStrategy: 'network-first'
  })
);

module.exports = config;
