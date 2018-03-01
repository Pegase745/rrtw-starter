const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
                        options: {
                            transpileOnly: true,
                            useTranspileModule: false,
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
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

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            compress: {
              warnings: false,
              screw_ie8: true,
            },
            output: {
              comments: false,
            },
        }),
    ],
};
