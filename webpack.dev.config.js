var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'artistry': './src/styl/main.styl',
        'index': './test/ts/index.ts',
        'view': './test/ts/view.ts'
    },
    output: {
        filename: './test/build/[name].js',
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.css', '.styl']
    },
    module: {
        loaders: [{
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    'stylus-loader'
                ]
            })
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } }
                ]
            })
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }]
    },
    plugins: [
        new ExtractTextPlugin("./dist/[name].css")
    ]
};
