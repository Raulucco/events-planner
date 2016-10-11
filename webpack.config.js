var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(process.cwd(), 'app'),
    entry: {
        // commons: './commons.js',
        // 'babel-polyfill',
        main: ['babel-polyfill', './src/index.jsx']
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/assets/',
        filename: '[name].js',
        chunkFilename: '[name]-[id].js'
    },
    plugins: [
        // new CommonsChunkPlugin('commons', 'commons.js'),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
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
            test: /\.sass$/,
            loader: ExtractTextPlugin.extract('sass-loader', 'css-loader!sass-loader')
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            // query: {
            //     presets: ['es2015', 'react']
            // }
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            login: './login',
            errors: './errors'
            // planner: path.resolve(__dirname, '/app/src')
        }
    },
    recordsPath: path.join(process.cwd(), 'cache', 'webpack.json')
}