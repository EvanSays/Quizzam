const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node-modules/,
      },
      {
        test: /\.(png|woff|eot|ttf|svg|gif)$/,
        use: 'url-loader',
        exclude: /node-modules/,
      },
      {
        test: /\.(scss|css)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    stats: 'errors-only',
    proxy: {
      '/api/v1': 'http://localhost:3000',
    },
  },
};
