const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'artistry': './src/styl/main.styl',
        'index': './test/ts/index.ts',
        'view': './test/ts/view.ts',
        'abstract': './test/ts/abstract.ts'
    },
    output: {
        filename: '[name]-[hash:6].js',
        path: path.resolve(__dirname, './test/build')
    },
    optimization: {
        usedExports: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.styl']
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
            use: ['ts-loader']
        }, {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'test/html/index.html'
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true
    }
};
