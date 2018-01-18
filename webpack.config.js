const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'js/bundle.js',
    path: `${__dirname}/client/public/`,
    publicPath: '/',
  },
  devServer: {
    inline: true,
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
