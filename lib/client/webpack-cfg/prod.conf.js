// dev开发基础模式
'use strict';

var path = require('path');
var config = require('./../config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 配置是否md5版本化
var cssName = config.md5 ? 'css/[name]-[contenthash:6].css' : 'css/[name].css';
var jsName = config.md5 ? 'js/[name]-[chunkhash:6].js' : 'js/[name].js';
var imgName = config.md5 ? 'img/[name]-[hash:6].[ext]' : 'img/[name].[ext]';

var extractTextPlugin = new ExtractTextPlugin(cssName);
var CleanWebpackPlugin = require('clean-webpack-plugin');
var TinyPngWebpackPlugin = require('tinypng-webpack-plugin');
var webpack = require('webpack');
console.log(path.resolve(__dirname, '..', '..', '..', 'assets'));
module.exports = {
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
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        }, {
            // 图片资源
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: imgName,
                publicPath: config.onLineImgPublicPath
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
        path: path.resolve(__dirname, '../../', 'assets'),
        filename: jsName,
        publicPath: config.onLinePublicPath,
        chunkFilename: 'js/[name]-chunk-[chunkhash:6].js'
    },
    plugins: [extractTextPlugin, new CleanWebpackPlugin(['assets'], {
        root: path.resolve(__dirname, '../../')
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
    }), new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    /* 简单注销压缩系统
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            //支持ie8
            screw_ie8: false
        },
        output: {
            comments: false
        },
        mangle: {
            // 以下内容原样输出
            except: ['$', 'exports', 'require']
        },
    }),
    */
    //新版本loader中的内容不进行UglifyJsPlugin压缩了，这里兼容一下老版本的loader
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
            context: path.resolve(__dirname, '..')
        }
    }),
    //压缩本地图片的方法
    new TinyPngWebpackPlugin({
        key: config.tinyPngKeys
    })]
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(cssName, 'cssName', 'src/client/webpack-cfg/prod.conf.js');

    __REACT_HOT_LOADER__.register(jsName, 'jsName', 'src/client/webpack-cfg/prod.conf.js');

    __REACT_HOT_LOADER__.register(imgName, 'imgName', 'src/client/webpack-cfg/prod.conf.js');

    __REACT_HOT_LOADER__.register(extractTextPlugin, 'extractTextPlugin', 'src/client/webpack-cfg/prod.conf.js');
}();

;