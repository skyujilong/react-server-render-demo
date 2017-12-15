'use strict';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'index.js')
    },
    context: path.resolve(__dirname, '../client/pages/'),
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            // 不输出内容
            test: /\.(scss|css)$/,
            loader: 'css-loader/locals'
        }, {
            // 同样不输出内容
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                emitFile: false
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, '../', 'assets/server'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name]-chunk-[chunkhash:6].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new CleanWebpackPlugin(['server'], {
            root: path.resolve(__dirname, '../assets/')
        })
    ],
    target: 'node',
    node:{
        __dirname:false
    },
    resolve: require('../client/webpack-cfg/resolve.conf').resolve,
    externals: [nodeExternals()]
}