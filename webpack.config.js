var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(process.cwd(), 'app'),
    entry: {
        main: ['babel-polyfill', './src/index.jsx']
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/assets/',
        filename: '[name].js',
        chunkFilename: '[name]-[id].js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    modulesDirectories: [
        'node_modules',
        'bower_components'
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.sass|scss$/,
            loader: ExtractTextPlugin.extract('sass-loader', 'css-loader!sass-loader')
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        },{
            test: /\.jsx?$/,
            loader: 'eslint-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass', '.json', '.scsss'],
        alias: {
            planner: './'
        }
    },
    devtool: 'source-map',
    devServer: {
        devtool: "eval",
        progress: true,
        colors: true,
        hot: true,
        inline: true
    }
}