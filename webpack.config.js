module.exports = {
  entry: './client/index.js',
  output: {
    filename: bundle.js,
    path: `${__dirname}/client/dist`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

};
