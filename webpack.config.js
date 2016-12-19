var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/styl/main.styl'
    },
    output: {
        filename: './dist/[name].js',
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.css', '.styl']
    },
    module: {
        loaders: [{
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!clean-css-loader!postcss-loader')
        }]
    },
    postcss: [autoprefixer({
        browsers: ['last 2 versions']
    })],
    plugins: [
        new ExtractTextPlugin("./dist/[name].css")
    ]
};
