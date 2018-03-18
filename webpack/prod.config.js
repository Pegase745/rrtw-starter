const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',

  cache: true,

  target: 'web',

  devtool: 'source-map',

  context: path.resolve(__dirname, '..'),

  entry: {
    client: ['./src/client.tsx'],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
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

  // Save for when ready to MEP
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          beautify: false,
        },
      },
      sourceMap: true,
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
