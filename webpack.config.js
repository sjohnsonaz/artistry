const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    entry: {
        'artistry': './src/styl/main.styl',
        'index': './test/ts/index.ts',
        'view': './test/ts/view.ts'
    },
    output: {
        filename: '[name]-[fullhash].js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.styl'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },

    module: {
        rules: [{
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        }, {
            test: /\.hbs$/,
            use: ['handlebars-loader']
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            }],
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: ['file-loader'],
        }]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/examples/html/index.html',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
    devServer: {
        // host: '0.0.0.0',
        // static: {
        //     directory: path.join(__dirname, 'www'),
        // },
        // compress: true,
        port: 8090,
        // historyApiFallback: true,
        // disableHostCheck: true,
    },
};
