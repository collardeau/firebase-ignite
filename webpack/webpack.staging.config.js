const webpack = require('webpack');
const config = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

config.devtool = 'cheap-module-eval-source-map';

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new CopyWebpackPlugin([
    {
      from: '../sw/firebase-messaging-staging-sw.js',
      to: 'firebase-messaging-sw.js'
    }
  ]),
  new OfflinePlugin()
);

module.exports = config;
