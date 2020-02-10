const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
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
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.styl']
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "../../dist/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
