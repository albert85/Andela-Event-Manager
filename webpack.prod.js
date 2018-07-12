const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

require('dotenv').config();

module.exports = merge(common, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
      },
      comments: false,
      sourceMap: true,
      minimize: false,
    }),

  ],
});
