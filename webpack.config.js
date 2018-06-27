const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'js/bundle.js',
    path: `${__dirname}/client/public/`,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /.(png|woff|woff2|eot|ttf|svg|jpe?g)$/,
        loader: 'url-loader?limit=100000',
      },
      { test: /tether\.js$/, loader: 'expose?Tether' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', { allChunks: true }),
    new webpack.NoEmitOnErrorsPlugin(),
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),

    new webpack.DefinePlugin({
      'process.env.CLOUDINARY_URL': JSON.stringify(process.env.CLOUDINARY_URL),
      'process.env.CLOUDINARY_PRESET': JSON.stringify(process.env.CLOUDINARY_PRESET),
      'process.env.CLOUDINARY_API_KEY': JSON.stringify(process.env.CLOUDINARY_API_KEY),
    }),

  ],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    child_process: 'empty',
  },
};
