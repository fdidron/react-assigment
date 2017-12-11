const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const Plugins = [
  HtmlWebpackPluginConfig,
  new webpack.NamedModulesPlugin(),
  new FriendlyErrorsWebpackPlugin()
];

console.info('Running in development mode ...');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    quiet: true,
    historyApiFallback: true,
    inline: true,
    open: true
  },
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'react'],
            plugins: [
              'react-hot-loader/babel',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      }
    ]
  },
  plugins: Plugins
};
