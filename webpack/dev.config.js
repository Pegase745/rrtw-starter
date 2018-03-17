const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.tsx',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
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
            loader: 'react-hot-loader/webpack',
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),

    new webpack.HotModuleReplacementPlugin({
      multiStep: false, // https://github.com/jantimon/html-webpack-plugin/issues/533
    }),
  ],
};
