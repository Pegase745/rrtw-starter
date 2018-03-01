const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

module.exports = {
    cache: true,

    target: 'web',

    devtool: 'eval-source-map',

    context: path.resolve(__dirname, '..'),

    entry: {
        client: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './src/client.tsx',
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
                        options: {
                            transpileOnly: true,
                            useTranspileModule: false,
                            sourceMap: false,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new SimpleProgressPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module =>
                module.context && module.context.indexOf('node_modules') !== -1,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),

        new webpack.HotModuleReplacementPlugin({
            multiStep: false, // https://github.com/jantimon/html-webpack-plugin/issues/533
        }),

        new webpack.NamedModulesPlugin(),
    ],
};
