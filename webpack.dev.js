const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': 'http://[::1]:8000',
      secure: false,
    },
  },
});
