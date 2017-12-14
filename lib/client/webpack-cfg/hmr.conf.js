'use strict';
//热部署相关代码

var config = require('../config.js');
var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
            use: ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap=inline', 'sass-loader']
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
    plugins: [new webpack.NamedModulesPlugin(), new OpenBrowserPlugin({
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
}();

;