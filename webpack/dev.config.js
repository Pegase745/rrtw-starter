const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  cache: true,

  target: 'web',

  devtool: 'eval-source-map',

  stats: {
    colors: true,
    reasons: true,
    errorDetails: true,
  },

  context: path.resolve(__dirname, '..'),

  entry: {
    client: ['webpack-hot-middleware/client', './src/client.tsx'],
  },

  output: {
    path: path.resolve(__dirname, '../dist', 'public'),
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../src/favicon.svg') },
    ]),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),

    new webpack.HotModuleReplacementPlugin({
      multiStep: false, // https://github.com/jantimon/html-webpack-plugin/issues/533
    }),
  ],
};
