const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'artistry': './src/styl/main.styl',
        'index': './test/ts/index.ts',
        'view': './test/ts/view.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './test/build')
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.css', '.styl']
    },
    module: {
        rules: [{
            test: /\.styl$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'clean-css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        }, {
            test: /\.hbs$/,
            use: ['handlebars-loader']
        }, {
            test: /\.tsx?$/,
            use: ['ts-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        })
    ]
};
