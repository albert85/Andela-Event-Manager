const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    filename: 'js/bundle.js',
    path: `${__dirname}/client/public/`,
    publicPath: '/',
  },
  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_HOST: 'https://andela-event-manager-app.herokuapp.com/',
      },
    }),
  ],
};
