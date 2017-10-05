const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
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
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    stats: 'errors-only',
    proxy: {
      '/': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
};
