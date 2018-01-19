const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'js/bundle.js',
    path: `${__dirname}/client/public/`,
    publicPath: '/',
  },
  module: {
    loaders: [
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
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true,
    }),
    new CleanWebpackPlugin(['client/public/']),
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ],
};
