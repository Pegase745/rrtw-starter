const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),

        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                output: {
                  comments: false,
                  beautify: false,
                },
                ie8: false,
                safari10: false,
            },
            sourceMap: true,
        }),
    ],
};
