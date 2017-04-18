const webpack = require('webpack');
const Dashboard = require('webpack-dashboard/plugin');
const config = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

config.devtool = 'eval';

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
  new Dashboard()
  // no OfflinePlugin in dev
);

module.exports = config;
