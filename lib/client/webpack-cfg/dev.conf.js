// dev开发基础模式
'use strict';

var path = require('path');
var config = require('../config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractTextPlugin = new ExtractTextPlugin('css/[name].css');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            // css资源
            test: /\.(scss|css)$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?sourceMap', 'postcss-loader?sourceMap=inline', 'sass-loader']
            })
        }, {
            // 图片资源
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: 'img/[name].[ext]'
            }
        }, {
            // html资源
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: false,
                interpolate: true
            }
        }, {
            //采用mustache进行配置文件。
            test: /\.tpl$/,
            loader: 'html-loader',
            options: {
                minimize: false,
                interpolate: false
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, '..', 'test'),
        filename: 'js/[name].js',
        publicPath: config.publicPath,
        chunkFilename: 'js/[name]-chunk.js'
    },
    plugins: [extractTextPlugin, new CleanWebpackPlugin(['test'], {
        root: path.resolve(__dirname, '..')
    }), new OpenBrowserPlugin({
        url: 'http://test.sina.com.cn/'
    }), new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        /**
         * 打包来源精确控制
         * @param  {Object} module 模块路径相关信息
         * module.context: The directory that stores the file. For example: '/my_project/node_modules/example-dependency'
         * module.resource: The name of the file being processed. For example: '/my_project/node_modules/example-dependency/index.js'
         * @param  {Number} count  模块被引用的次数
         * @return {Boolean}       返回boolean类型，如果是true，将进行提取
         */
        minChunks: function minChunks(module, count) {
            // This prevents stylesheet resources with the .css or .scss extension
            // from being moved from their original chunk to the vendor chunk
            if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
                return false;
            }

            return module.context && module.context.indexOf("node_modules") !== -1;
        }
    })]
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(extractTextPlugin, 'extractTextPlugin', 'src/client/webpack-cfg/dev.conf.js');
}();

;