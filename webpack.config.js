const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      mergely: path.join(__dirname, 'node_modules', 'mergely'),
      CodeMirror: path.join(__dirname, 'node_modules', 'codemirror'),
      jQuery: path.join(__dirname, 'node_modules', 'jquery'),
      $: path.join(__dirname, 'node_modules', 'jquery'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],

  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      CodeMirror: 'codemirror',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/favicon.ico', to: 'favicon.ico' },
      ],
    }),
  ],
};
