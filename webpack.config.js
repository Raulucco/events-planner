var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(process.cwd(), 'app'),
    entry: {
        // commons: './commons.js',
        main: './src/index.tsx'
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
        resolve: {
            extensions: [
                '', '.ts', '.tsx', '.webpack.js',
                '.web.js', '.js', '.json', '.css',
                '.sass', '.scss'
            ]
        },
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('sass-loader', 'css-loader!sass-loader')
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        preLoaders: [{
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    recordsPath: path.join(process.cwd(), 'cache', 'webpack.json')
}